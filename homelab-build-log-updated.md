# Homelab k3s Build - Detailed Session Log

## Session 1: Feb 4, 2026

**Starting Point:** Phase 1 complete (VMs provisioned, basic networking)
**Ending Point:** Phase 2 complete (Full k3s cluster with ingress)
**Duration:** Full session
**Key Accomplishments:** Installed k3s, Cilium CNI, MetalLB, Traefik, configured kubectl locally

## Session 2: Feb 6, 2026

**Starting Point:** Working k3s cluster with Traefik ingress
**Ending Point:** GitOps workflow with ArgoCD
**Duration:** ~2 hours
**Key Accomplishments:** ArgoCD installation, GitHub repo setup, first GitOps deployment, auto-sync configuration

---

## Phase 2: k3s Cluster Installation

### Step 1: Installed k3s on Control Plane

**Node:** k3s-control-01 (10.10.10.20)

**Command:**
```bash
ssh debian@10.10.10.20

curl -sfL https://get.k3s.io | sh -s - server \
  --disable traefik \
  --disable servicelb \
  --flannel-backend=none \
  --disable-network-policy \
  --write-kubeconfig-mode 644 \
  --node-name k3s-control-01 \
  --cluster-cidr=10.42.0.0/16 \
  --service-cidr=10.43.0.0/16
```

**What this did:**
- Installed k3s in server (control plane) mode
- Disabled built-in Traefik (we'll install our own)
- Disabled built-in ServiceLB (we'll use MetalLB)
- Disabled Flannel CNI (we'll use Cilium)
- Made kubeconfig readable without sudo
- Set cluster networking ranges

**Verification:**
```bash
sudo systemctl status k3s
# Output: Active: active (running)
# Memory: 599.2M (very lightweight!)

sudo k3s kubectl get nodes
# Output: k3s-control-01   NotReady   control-plane
# NotReady is expected - no CNI installed yet
```

**Key Concept Learned:** The control plane is the "brain" of Kubernetes. It contains:
- API Server (port 6443) - The interface for everything
- Scheduler - Decides where to place pods
- Controller Manager - Ensures desired state matches reality
- etcd - Database storing cluster state

---

### Step 2: Retrieved Node Token

**Command:**
```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```

**Output:** Long token starting with `K10...::server:...`

**What this is:** Authentication credential that workers use to join the cluster. Like a cluster password.

---

### Step 3: Joined Worker Nodes

**Worker 1 (10.10.10.21):**
```bash
ssh debian@10.10.10.21

curl -sfL https://get.k3s.io | K3S_URL=https://10.10.10.20:6443 \
  K3S_TOKEN=<token> \
  sh -s - agent --node-name k3s-worker-01
```

**Worker 2 (10.10.10.22):**
```bash
ssh debian@10.10.10.22

curl -sfL https://get.k3s.io | K3S_URL=https://10.10.10.20:6443 \
  K3S_TOKEN=<token> \
  sh -s - agent --node-name k3s-worker-02
```

**What happened:**
- Workers installed k3s in agent (worker) mode
- Connected to control plane API at 10.10.10.20:6443
- Authenticated with the node token
- Registered themselves in the cluster

**Key Concept Learned:** Workers are the "muscle" - they run your actual applications (pods). The control plane tells them what to run, they execute.

---

### Step 4: Verified Cluster

**Command:**
```bash
sudo k3s kubectl get nodes
```

**Output:**
```
NAME             STATUS     ROLES           AGE
k3s-control-01   NotReady   control-plane   30m
k3s-worker-01    NotReady   <none>          5m
k3s-worker-02    NotReady   <none>          5m
```

**Why NotReady?** No CNI (networking) installed yet. Nodes can't communicate pods properly without a CNI.

---

## Phase 2.5: Cilium CNI Installation

### What is Cilium?

**Purpose:** Container Network Interface - the networking layer that makes pods work.

**What it does:**
- Assigns IP addresses to pods
- Routes traffic between pods on different nodes
- Handles network policies (firewall rules for pods)
- Replaces kube-proxy for better performance

**Why Cilium over k3s default (Flannel)?**
- Modern eBPF-based (kernel-level networking)
- Better performance
- Advanced observability with Hubble
- Industry standard for production clusters

---

### Step 1: Installed Helm

**What is Helm?** Package manager for Kubernetes - like apt/pacman but for k8s applications.

**Command on control plane:**
```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

**Issue encountered:** Helm couldn't find kubeconfig

**Solution:**
```bash
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
```

**Why needed:** k3s stores kubeconfig at `/etc/rancher/k3s/k3s.yaml`, but Helm looks for `~/.kube/config` by default.

---

### Step 2: Added Cilium Repository

```bash
helm repo add cilium https://helm.cilium.io/
helm repo update
```

**What this did:** Added Cilium's package repository to Helm, like adding a PPA.

---

### Step 3: Installed Cilium

```bash
helm install cilium cilium/cilium --version 1.16.5 \
  --namespace kube-system \
  --set ipam.mode=kubernetes \
  --set kubeProxyReplacement=true \
  --set hubble.relay.enabled=true \
  --set hubble.ui.enabled=true
```

**Flag explanations:**

**`--namespace kube-system`**
- Install in kube-system (where core k8s components live)

**`ipam.mode=kubernetes`**
- IPAM = IP Address Management
- Let Kubernetes assign pod IPs from 10.42.0.0/16 range
- Alternative: Cilium manages its own IP pools

**`kubeProxyReplacement=true`**
- Use Cilium's eBPF-based networking instead of traditional kube-proxy
- Much faster (microseconds vs milliseconds)
- Better observability

**`hubble.relay.enabled=true`**
- Hubble = Network observability tool
- Relay = Backend that collects flow data

**`hubble.ui.enabled=true`**
- Web UI for visualizing network traffic
- Can see real-time service maps later

---

### Step 4: Watched Cilium Start

```bash
sudo k3s kubectl get pods -n kube-system -w
```

**What we saw:**
- cilium-xxxxx pods (one per node) going through Init → Running
- cilium-operator pod starting
- hubble-relay and hubble-ui pods starting
- All reached Running status in ~1-2 minutes

---

### Step 5: Verified Nodes Ready

```bash
sudo k3s kubectl get nodes
```

**Output:**
```
NAME             STATUS   ROLES           AGE
k3s-control-01   Ready    control-plane   45m
k3s-worker-01    Ready    <none>          20m
k3s-worker-02    Ready    <none>          20m
```

**Success!** All nodes Ready. Cilium networking is working.

---

## Phase 3: kubectl on Laptop

### Why Do This?

**Before:** Had to SSH to control plane to run kubectl commands (slow, annoying)

**After:** Manage cluster directly from laptop (fast, professional)

---

### Step 1: Installed kubectl on Laptop

**Command (Arch Linux):**
```bash
sudo pacman -S kubectl
```

**Verification:**
```bash
kubectl version --client
# Output: Client Version: v1.35.0
```

---

### Step 2: Copied Kubeconfig

**Command:**
```bash
mkdir -p ~/.kube
scp debian@10.10.10.20:/etc/rancher/k3s/k3s.yaml ~/.kube/config
```

**What this did:** Copied cluster credentials from control plane to laptop.

---

### Step 3: Fixed Server Address

**Problem:** Kubeconfig had server address as `127.0.0.1:6443` (localhost)

**Solution:**
```bash
nano ~/.kube/config
# Changed: server: https://127.0.0.1:6443
# To:      server: https://10.10.10.20:6443
```

**Why:** Need to point to the actual control plane IP, not localhost.

---

### Step 4: Tested kubectl

```bash
kubectl get nodes
```

**Output:**
```
NAME             STATUS   ROLES           AGE
k3s-control-01   Ready    control-plane   2d23h
k3s-worker-01    Ready    <none>          2d10h
k3s-worker-02    Ready    <none>          2d9h
```

**Success!** Managing cluster from laptop.

---

### How kubectl Works - Deep Dive

**What's in the kubeconfig:**
1. **Cluster info** - API server address (https://10.10.10.20:6443) and CA certificate
2. **User credentials** - Client certificate and private key (proof of identity)
3. **Context** - Which cluster + which user to use

**When you run `kubectl get nodes`:**

1. kubectl reads `~/.kube/config`
2. Builds HTTPS request: `GET /api/v1/nodes`
3. Sends to `https://10.10.10.20:6443` with client certificates
4. API server authenticates the certificates
5. API server queries etcd database for node info
6. API server returns JSON response
7. kubectl formats it into that nice table

**Key insight:** Every kubectl command is an API call over HTTPS. The kubeconfig contains the address and authentication credentials.

---

## Phase 4: MetalLB LoadBalancer

### What is MetalLB?

**Problem:** In cloud Kubernetes (AWS, GCP), LoadBalancer services automatically get public IPs. On bare metal (your homelab), nothing provides those IPs.

**Solution:** MetalLB assigns IPs from a pool you configure (10.10.10.50-69).

**How it works:**
- You create a LoadBalancer service
- MetalLB assigns an IP from the pool
- MetalLB announces that IP on your network via ARP
- Your router learns "10.10.10.50 is at this k8s node"
- Traffic flows to the service

---

### Step 1: Installed MetalLB

**Command:**
```bash
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.14.9/config/manifests/metallb-native.yaml
```

**What this did:**
- Created `metallb-system` namespace
- Deployed controller pod (assigns IPs)
- Deployed speaker pods (DaemonSet - one per node, announces IPs via ARP)

---

### Step 2: Configured IP Pool

**Created file:** `metallb-config.yaml`

```yaml
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: homelab-pool
  namespace: metallb-system
spec:
  addresses:
  - 10.10.10.50-10.10.10.69
---
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: homelab-l2
  namespace: metallb-system
spec:
  ipAddressPools:
  - homelab-pool
```

**IPAddressPool:**
- Defines 20 IP addresses (10.10.10.50 through .69)
- Named "homelab-pool"

**L2Advertisement:**
- Tells MetalLB to use Layer 2 mode (ARP announcements)
- When an IP is assigned, speaker pods broadcast "10.10.10.50 is HERE"

**Applied:**
```bash
kubectl apply -f metallb-config.yaml
```

---

### Step 3: Verified Configuration

```bash
kubectl get ipaddresspools -n metallb-system
kubectl get l2advertisements -n metallb-system
```

**Output:** Both resources created successfully.

---

## Phase 5: Test Application (nginx)

### Purpose

Prove that:
1. Pods can run
2. MetalLB assigns IPs
3. Services work
4. Load balancing works

---

### Step 1: Deployed nginx

**Created file:** `test-nginx.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-test
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-test
  template:
    metadata:
      labels:
        app: nginx-test
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-test
  namespace: default
spec:
  type: LoadBalancer
  selector:
    app: nginx-test
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

**Applied:**
```bash
kubectl apply -f test-nginx.yaml
```

---

### nginx Deployment Explanation

**Deployment:**
- `replicas: 2` - Run 2 copies of nginx (for HA and load balancing)
- `selector.matchLabels: app=nginx-test` - This deployment manages pods with this label
- `template` - Blueprint for creating pods
  - `image: nginx:latest` - Pull nginx container from Docker Hub
  - `containerPort: 80` - nginx listens on port 80

**What Kubernetes did:**
1. Deployment controller saw "I need 2 pods"
2. Created 2 pods from the template
3. Scheduler assigned them to nodes (worker-01 and worker-02)
4. Kubelet on each node pulled nginx image and started containers

---

### Service Explanation

**Service:**
- `type: LoadBalancer` - Request external IP from MetalLB
- `selector: app=nginx-test` - Route traffic to pods with this label
- `port: 80` - Service listens on port 80
- `targetPort: 80` - Forward to pod's port 80

**What Kubernetes did:**
1. Created Service object
2. MetalLB controller saw "new LoadBalancer service!"
3. MetalLB assigned 10.10.10.50 (first available IP from pool)
4. MetalLB speaker announced via ARP
5. Endpoints controller found the 2 nginx pods
6. Created endpoints: 10.10.10.50 → [pod1-ip:80, pod2-ip:80]

---

### Step 2: Verified Service Got IP

```bash
kubectl get svc nginx-test
```

**Output:**
```
NAME         TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)
nginx-test   LoadBalancer   10.43.16.199   10.10.10.50   80:30953/TCP
```

**Success!** MetalLB assigned 10.10.10.50.

---

### Step 3: Tested in Browser

**Accessed:** http://10.10.10.50

**Result:** "Welcome to nginx!" page loaded.

**Traffic flow:**
1. Browser → 10.10.10.50:80
2. Network routes to k8s node (via MetalLB's ARP announcement)
3. Cilium intercepts: "This is service nginx-test"
4. Cilium load balances to one of the 2 pods
5. nginx pod serves the page
6. Response back through Cilium → browser

---

## Phase 6: Traefik Ingress Controller

### What is Traefik?

**Current problem:**
- Each service needs its own LoadBalancer IP
- nginx = 10.10.10.50, jellyfin would be .51, etc.
- You run out of IPs and have to remember which is which

**Traefik solution:**
- One LoadBalancer IP (10.10.10.51)
- Route by hostname:
  - jellyfin.homelab.local → Jellyfin service
  - audiobookshelf.homelab.local → Audiobookshelf service
- All on same IP, differentiated by hostname

**Analogy:** Instead of every shop having its own address, they're in one mall with a directory.

---

### Step 1: Installed Helm on Laptop

```bash
sudo pacman -S helm
```

**Why on laptop?** We manage the cluster from laptop now, not via SSH.

---

### Step 2: Installed Traefik

**Commands:**
```bash
helm repo add traefik https://traefik.github.io/charts
helm repo update

helm install traefik traefik/traefik \
  --namespace traefik \
  --create-namespace \
  --set ports.web.exposedPort=80 \
  --set ports.websecure.exposedPort=443 \
  --set service.type=LoadBalancer
```

**Flag explanations:**

**`--namespace traefik --create-namespace`**
- Create namespace just for Traefik (organization)

**`--set ports.web.exposedPort=80`**
- HTTP traffic on port 80
- "web" entrypoint = HTTP

**`--set ports.websecure.exposedPort=443`**
- HTTPS traffic on port 443 (for later when we add SSL)
- "websecure" entrypoint = HTTPS

**`--set service.type=LoadBalancer`**
- Get external IP from MetalLB
- Creates LoadBalancer service for Traefik

---

### Step 3: Verified Traefik Running

```bash
kubectl get svc -n traefik
```

**Output:**
```
NAME      TYPE           CLUSTER-IP    EXTERNAL-IP   PORT(S)
traefik   LoadBalancer   10.43.36.60   10.10.10.51   80:30807/TCP,443:31727/TCP
```

**Success!** MetalLB assigned 10.10.10.51 (second IP from pool).

```bash
kubectl get pods -n traefik
```

**Output:**
```
NAME                       READY   STATUS    RESTARTS   AGE
traefik-7b6654bb57-cxvrv   1/1     Running   0          68s
```

**Traefik is running!**

---

### What Traefik Does

**Traefik is a reverse proxy and ingress controller.**

**How it works:**
1. Watches Kubernetes API for Ingress resources
2. When you create an Ingress, Traefik sees it automatically
3. Configures routing rules dynamically
4. Routes traffic based on hostname in HTTP headers

**Example:**
- You create Ingress: "jellyfin.homelab.local → jellyfin service"
- Traefik updates its config: "Route jellyfin.homelab.local to jellyfin service"
- Request arrives with `Host: jellyfin.homelab.local`
- Traefik forwards to jellyfin service

---

## Phase 7: Ingress for nginx

### Step 1: Created Ingress Resource

**File:** `nginx-ingress.yaml`

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-ingress
  namespace: default
spec:
  ingressClassName: traefik
  rules:
  - host: nginx.homelab.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-test
            port:
              number: 80
```

**What this says:**
- `host: nginx.homelab.local` - Match requests for this hostname
- `path: /` - Match all paths
- `backend.service.name: nginx-test` - Route to nginx-test service
- `ingressClassName: traefik` - Use Traefik to handle this

**Applied:**
```bash
kubectl apply -f nginx-ingress.yaml
```

---

### Step 2: Updated /etc/hosts

**Problem:** nginx.homelab.local is not a real domain name. DNS doesn't know about it.

**Solution:** Tell laptop directly "nginx.homelab.local is at 10.10.10.51"

**Command:**
```bash
sudo nano /etc/hosts
```

**Added:**
```
10.10.10.51  nginx.homelab.local
```

---

### What is /etc/hosts?

**Purpose:** Local DNS override file. Maps hostnames to IP addresses.

**How DNS normally works:**
1. Type: google.com
2. Computer checks /etc/hosts first
3. Not found, asks DNS server
4. DNS returns IP
5. Browser connects

**With our entry:**
1. Type: nginx.homelab.local
2. Computer checks /etc/hosts
3. Found! nginx.homelab.local = 10.10.10.51
4. Browser connects to 10.10.10.51
5. Never asks DNS

**Why needed:** nginx.homelab.local isn't registered in DNS. /etc/hosts tells our laptop where it is.

**Limitation:** Only works on this laptop. Other devices on network can't access it (yet - we'll fix with Pi-hole later).

---

### Step 3: Tested Ingress

**Accessed:** http://nginx.homelab.local

**Result:** "Welcome to nginx!" page loaded.

**Full traffic flow:**
1. Browser: "What's nginx.homelab.local?"
2. /etc/hosts: "That's 10.10.10.51"
3. Browser → HTTP request to 10.10.10.51:80
   - Header: `Host: nginx.homelab.local`
4. MetalLB routes to Traefik pod
5. Traefik receives request
6. Traefik reads `Host: nginx.homelab.local` header
7. Traefik checks Ingress rules: "nginx.homelab.local → nginx-test service"
8. Traefik forwards to nginx-test service (ClusterIP)
9. Service load balances to one of 2 nginx pods
10. nginx pod serves page
11. Response back through: pod → service → Traefik → browser

---

## Key Concepts Mastered

### 1. Kubernetes API

**What it is:** The control plane's REST API at https://10.10.10.20:6443

**Everything goes through it:**
- kubectl commands
- Workers reporting status
- Controllers managing resources
- Scheduler placing pods

**Authentication:** Client certificates in kubeconfig prove identity

**Key insight:** Kubernetes is API-driven. Every interaction is an HTTP request.

---

### 2. Deployments and Pods

**Pod:** Smallest unit - one or more containers, ephemeral (temporary)

**Deployment:** Desired state declaration
- "I want 2 nginx pods running"
- Controller ensures reality matches desired state
- Self-healing: if pod crashes, creates new one

**Labels and Selectors:** How resources connect
- Deployment selector finds its pods
- Service selector finds which pods to route to

---

### 3. Services

**Problem:** Pods have random IPs that change when they restart

**Solution:** Service = stable endpoint with load balancing

**Types:**
- ClusterIP (default) - Internal only
- NodePort - Opens high port on all nodes
- LoadBalancer - Gets external IP from MetalLB

**How it works:**
- Service has label selector
- Finds matching pods
- Creates endpoints list
- Routes traffic to pod IPs

---

### 4. Ingress

**Problem:** Each service needs different IP or port

**Solution:** Ingress routes by hostname
- One IP (Traefik's LoadBalancer)
- Many services
- Route by HTTP Host header

**Components:**
- Ingress resource (routing rules)
- Ingress controller (Traefik - does the actual routing)

---

### 5. Networking Stack

**Pod Network (10.42.0.0/16):**
- Cilium CNI assigns IPs to pods
- Handles pod-to-pod communication
- eBPF-based for performance

**Service Network (10.43.0.0/16):**
- Virtual IPs (ClusterIPs)
- Load balancing to pods
- Handled by Cilium (kube-proxy replacement)

**External Access:**
- MetalLB assigns IPs from 10.10.10.50-69
- ARP announcements on local network
- LoadBalancer services get real IPs

---

## Final Architecture

```
                    Internet / Home Network
                            ↓
                    ┌───────────────────┐
                    │  Router / Switch  │
                    │  Learns via ARP:  │
                    │  .50 = k8s node   │
                    │  .51 = k8s node   │
                    └────────┬──────────┘
                             ↓
        ┌────────────────────┴────────────────────┐
        ↓                                         ↓
┌───────────────────┐                  ┌──────────────────┐
│ nginx-test        │                  │ Traefik          │
│ LoadBalancer      │                  │ LoadBalancer     │
│ 10.10.10.50       │                  │ 10.10.10.51      │
│                   │                  │                  │
│ Direct IP access  │                  │ Routes by        │
│                   │                  │ hostname         │
└─────────┬─────────┘                  └────────┬─────────┘
          ↓                                     ↓
    ┌─────────────┐                    ┌────────────────┐
    │ nginx-test  │                    │ Ingress Rules  │
    │ Service     │                    │ nginx.homelab  │
    │ (ClusterIP) │                    │ → nginx-test   │
    └──────┬──────┘                    └────────┬───────┘
           ↓                                    ↓
    ┌──────────────────────────────────────────────┐
    │              Cilium CNI                      │
    │        Pod Networking Layer                  │
    │    Routes between pods on any node           │
    └──────────────┬───────────────────────────────┘
                   ↓
    ┌──────────────────────────────────────────────┐
    │         nginx-test Pods (2 replicas)         │
    │                                              │
    │  Pod 1: 10.42.1.5 (worker-01)               │
    │  Pod 2: 10.42.2.8 (worker-02)               │
    │                                              │
    │  Both running nginx:latest                   │
    └──────────────────────────────────────────────┘
```

---

## Troubleshooting Solved

### Issue 1: kubectl "command not found" when joining workers

**Problem:** Tried to run join command on laptop instead of SSH'd into worker

**Solution:** SSH into each worker VM first, then run join command there

**Lesson:** kubectl on laptop sends API calls to cluster. Installing k3s must happen ON the VMs.

---

### Issue 2: Helm "cluster unreachable"

**Problem:** Helm looking for kubeconfig at `~/.kube/config`, but k3s stores it at `/etc/rancher/k3s/k3s.yaml`

**Solution:** `export KUBECONFIG=/etc/rancher/k3s/k3s.yaml`

**Lesson:** Tools need to know where to find kubeconfig. Environment variable tells them.

---

### Issue 3: kubectl timeout to `1.10.10.20`

**Problem:** Typo in kubeconfig - missing leading `10.`

**Solution:** Edited `~/.kube/config`, changed `1.10.10.20` to `10.10.10.20`

**Lesson:** IP addresses must be exact. Always double-check.

---

### Issue 4: Accidentally created `k3s-worker-01clear` node

**Problem:** Typo when naming worker during join

**Solution:** `kubectl delete node k3s-worker-01clear`

**Lesson:** Can delete node registrations from cluster. Doesn't affect actual VMs.

---

## Files Created This Session

### On Laptop (~/)

1. **metallb-config.yaml** - MetalLB IP pool configuration
2. **test-nginx.yaml** - nginx test deployment + service
3. **nginx-ingress.yaml** - Ingress rule for nginx

**Recommended:** Create `~/homelab/manifests/` directory and organize these files there.

---

## Next Session Preparation

### Option A: ArgoCD for GitOps

**What:** Automated deployment from Git repository

**Steps:**
1. Install ArgoCD
2. Create Git repo for manifests
3. Configure ArgoCD to watch repo
4. Deploy apps via Git commits (no kubectl apply!)

**Benefits:**
- Industry best practice
- Git as source of truth
- Easy rollbacks
- Audit trail

---

### Option B: Deploy Jellyfin

**What:** Media server for your movies/shows

**Steps:**
1. Create namespace: `media`
2. Deploy Jellyfin on worker-02 (has the storage)
3. Configure NFS volume from EliteDesk media-pool
4. Create Ingress: jellyfin.homelab.local
5. Add SSL certificate (optional)

**Challenges:**
- Stateful workload (needs persistent storage)
- NFS volume setup
- Performance tuning

---

### Option C: Infrastructure Enhancements

**DNS (Pi-hole):**
- Deploy on utility VM
- Configure as network DNS
- Wildcard: `*.homelab.local → 10.10.10.51`
- Now all devices can access services

**SSL Certificates:**
- Install cert-manager
- Configure Let's Encrypt
- Automatic HTTPS for all services

**Monitoring:**
- Prometheus for metrics
- Grafana for dashboards
- See cluster health, resource usage

---

## Summary Statistics

**Nodes:** 3 (1 control plane, 2 workers)
**Total Resources:** 14 CPU cores, 32GB RAM
**Pods Running:** ~20 (Cilium, MetalLB, Traefik, CoreDNS, nginx-test)
**Services:** 2 LoadBalancer (nginx-test, Traefik)
**IPs Assigned:** 2 of 20 available (10.10.10.50-51 used, .52-.69 free)
**Ingress Rules:** 1 (nginx.homelab.local)

**Time to Deploy:** ~2 hours (with detailed explanations)
**Knowledge Gained:** Kubernetes fundamentals, networking, APIs, ingress

---

*Session 1 completed: February 4, 2026*
*All systems operational and ready for applications*

---

# Phase 3: GitOps with ArgoCD (Session 2 - Feb 6, 2026)

## What is GitOps?

**Definition:** Operations paradigm where Git is the single source of truth for declarative infrastructure and applications.

**Core Principles:**
1. **Declarative** - Entire system described declaratively in Git
2. **Versioned** - Git provides history, rollback, audit trail
3. **Automated** - Changes in Git automatically applied to cluster
4. **Continuously Reconciled** - System self-heals to match Git state

**Benefits:**
- No manual kubectl apply commands
- Complete audit trail (who changed what, when)
- Easy rollbacks (git revert)
- Disaster recovery (re-apply entire repo)
- Collaboration (PRs, code review for infrastructure)

**How it works:**
```
Developer → Git Commit → Git Push → ArgoCD Detects → Cluster Updates
```

---

## Step 1: Installing ArgoCD

**What is ArgoCD?**
- GitOps continuous delivery tool for Kubernetes
- Monitors Git repos and automatically syncs to cluster
- Web UI for visualization and management
- Industry standard (used by major companies)

### Installation Commands

**Created namespace and installed ArgoCD:**
```bash
kubectl create namespace argocd

kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

**What this installed:**
- **argocd-server** - API + Web UI
- **argocd-repo-server** - Pulls manifests from Git
- **argocd-application-controller** - Monitors apps and syncs
- **argocd-applicationset-controller** - Manages app templates
- **argocd-dex-server** - Authentication (SSO)
- **argocd-notifications-controller** - Alerts/webhooks
- **argocd-redis** - Cache

**Watched pods start:**
```bash
kubectl get pods -n argocd -w
```

All 7 components reached Running status in ~2 minutes.

---

## Step 2: Exposed ArgoCD UI via Ingress

### Problem: HTTP Redirect Loop

**Issue:** ArgoCD by default redirects HTTP → HTTPS, causing infinite loop without SSL.

**Solution:** Configure ArgoCD to accept insecure HTTP connections.

### Configuration Steps

**Patched ArgoCD ConfigMap:**
```bash
kubectl patch configmap argocd-cmd-params-cm -n argocd \
  --type merge \
  -p '{"data":{"server.insecure":"true"}}'
```

**How kubectl patch works:**
- `kubectl patch` - Modify existing resource without replacing
- `configmap argocd-cmd-params-cm` - ArgoCD's config storage
- `--type merge` - Merge new data with existing (additive)
- `-p '{"data":{"server.insecure":"true"}}'` - JSON patch content
  - Adds `server.insecure: "true"` to ConfigMap data
  - ArgoCD reads this on startup

**Restarted ArgoCD server to apply:**
```bash
kubectl rollout restart deployment argocd-server -n argocd
```

**`rollout restart` explained:**
- Gracefully replaces pods one by one
- Creates new pod with updated config
- Waits for new pod to be Ready
- Terminates old pod
- Zero downtime restart

### Created Ingress

**File:** `argocd-ingress.yaml`

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: argocd-server
  namespace: argocd
  annotations:
    traefik.ingress.kubernetes.io/router.tls: "false"
spec:
  rules:
  - host: argocd.homelab.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: argocd-server
            port:
              name: http
```

**Key fields explained:**

**`annotations:`** - Metadata that modifies behavior
- `traefik.ingress.kubernetes.io/router.tls: "false"` 
- Tells Traefik: don't try TLS/HTTPS for this route
- Ingress controller-specific (Traefik in our case)

**`spec.rules[].host:`** - Hostname to match
- Traefik reads HTTP `Host:` header
- Routes `Host: argocd.homelab.local` to this backend

**`pathType: Prefix`** - Path matching strategy
- **Prefix** - Match `/` and all subpaths (`/`, `/api`, `/login`)
- **Exact** - Only match exact path
- **ImplementationSpecific** - Controller decides

**`backend.service.port.name:`** - Use named port
- `name: http` references port name in service definition
- Alternative: `number: 80` for port number
- Named ports are self-documenting

**Applied:**
```bash
kubectl apply -f argocd-ingress.yaml
```

### Updated /etc/hosts

**Added DNS entry:**
```bash
sudo nano /etc/hosts
# Added: 10.10.10.51  argocd.homelab.local
```

**Traffic flow:**
1. Browser: argocd.homelab.local
2. /etc/hosts: → 10.10.10.51
3. MetalLB routes to Traefik pod
4. Traefik reads Host header
5. Ingress rule: argocd.homelab.local → argocd-server service
6. Service → argocd-server pod
7. ArgoCD UI served

---

## Step 3: Retrieved Admin Password

**Command:**
```bash
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d && echo
```

**How this works:**
- `get secret` - Retrieve Kubernetes secret resource
- `-o jsonpath="{.data.password}"` - Extract password field
  - Secrets store data base64-encoded
  - jsonpath navigates JSON structure
- `| base64 -d` - Decode from base64
- `&& echo` - Add newline after password

**Logged into UI:**
- URL: http://argocd.homelab.local
- Username: `admin`
- Password: (from command above)

---

## Step 4: Created Git Repository

**Repository:** https://github.com/RepTambe/k8shome

**Structure created:**
```
k8shome/
├── apps/
│   └── nginx-test/
│       └── deployment.yaml
└── README.md
```

### Configured SSH Authentication

**Problem:** Git clone defaulted to HTTPS (requires username/password).

**Solution:** Changed remote to SSH.

**Commands:**
```bash
# Check current remote
git remote -v
# Output: https://github.com/RepTambe/k8shome.git

# Change to SSH
git remote set-url origin git@github.com:RepTambe/k8shome.git

# Verify
git remote -v
# Output: git@github.com:RepTambe/k8shome.git
```

**Key learning:** 
- Each repo stores remote URL in `.git/config`
- Only need to set once per repo
- Future clones: use `git clone git@github.com:...` for SSH from start

### Created Application Manifest

**File:** `apps/nginx-test/deployment.yaml`

Combined all nginx resources (Deployment, Service, Ingress) into one file:

```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-test
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-test
  template:
    metadata:
      labels:
        app: nginx-test
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-test
  namespace: default
spec:
  selector:
    app: nginx-test
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-test
  namespace: default
spec:
  rules:
  - host: nginx.homelab.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-test
            port:
              number: 80
```

**Why combine resources:**
- `---` separates YAML documents in one file
- Keeps related resources together
- Single source of truth for entire app
- Common pattern in production

**Committed and pushed:**
```bash
git add apps/nginx-test/deployment.yaml
git commit -m "Add nginx test application"
git push origin main
```

---

## Step 5: Created ArgoCD Application

### Via Web UI

**Clicked "NEW APP" and configured:**

**General:**
- Application Name: `nginx-test`
- Project: `default`
- Sync Policy: `Manual` (changed to auto later)

**Source:**
- Repository URL: `https://github.com/RepTambe/k8shome.git`
- Revision: `main`
- Path: `apps/nginx-test`

**Destination:**
- Cluster URL: `https://kubernetes.default.svc` (in-cluster)
- Namespace: `default`

**What happened:**
1. ArgoCD cloned Git repo
2. Found manifests in `apps/nginx-test/`
3. Parsed YAML (Deployment, Service, Ingress)
4. Compared to current cluster state
5. Showed status: **OutOfSync** (Git differs from cluster)

### Synced Application

**Clicked SYNC → SYNCHRONIZE**

**ArgoCD's sync process:**
1. Read desired state from Git
2. Compare to actual state in cluster
3. Generate diff (what needs to change)
4. Apply changes via Kubernetes API
5. Watch resources until healthy
6. Report status: **Synced** + **Healthy**

**Result:**
- All resources green (Synced + Healthy)
- nginx deployment running with 2 replicas
- Service and Ingress configured

---

## Step 6: Tested GitOps Workflow

### Changed Replicas in Git

**Edited file:**
```bash
nano apps/nginx-test/deployment.yaml
# Changed: replicas: 2 → replicas: 3
```

**Committed:**
```bash
git add apps/nginx-test/deployment.yaml
git commit -m "Scale nginx to 3 replicas"
git push origin main
```

### Synced via ArgoCD

**Manual sync:**
- App showed **OutOfSync** after refresh
- Clicked SYNC
- Third pod created

**Verified:**
```bash
kubectl get pods -l app=nginx-test
# Output: 3 pods running
```

**This proved:** Git is now the source of truth. Changes in Git = changes in cluster.

---

## Step 7: Enabled Auto-Sync

### Configuration

**In ArgoCD UI:**
1. App Details → Sync Policy
2. Enabled **Auto-Sync**
3. Enabled **Prune Resources** (delete removed resources)
4. Enabled **Self Heal** (revert manual changes)

**What each does:**

**Auto-Sync:**
- ArgoCD polls Git every 3 minutes
- Automatically applies detected changes
- No manual SYNC button needed

**Prune Resources:**
- If you delete a resource from Git
- ArgoCD deletes it from cluster
- Keeps cluster clean

**Self Heal:**
- If someone runs `kubectl edit` manually
- ArgoCD reverts to Git state
- Enforces Git as single source of truth

### Tested Auto-Sync

**Scaled back down:**
```bash
nano apps/nginx-test/deployment.yaml
# Changed: replicas: 3 → replicas: 2

git add apps/nginx-test/deployment.yaml
git commit -m "Scale nginx back to 2 replicas"
git push origin main
```

**Result:**
- Waited ~3 minutes (or clicked REFRESH)
- ArgoCD automatically synced
- Third pod terminated
- No manual SYNC needed

**Verified:**
```bash
kubectl get pods -l app=nginx-test -w
# Watched one pod terminate automatically
```

---

## GitOps Workflow - Complete Picture

### The Loop

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Developer                                              │
│      ↓                                                  │
│  Edit YAML in Git                                       │
│      ↓                                                  │
│  git commit + push                                      │
│      ↓                                                  │
│  GitHub (source of truth)                               │
│      ↓                                                  │
│  ArgoCD polls (every 3 min)                             │
│      ↓                                                  │
│  Detects diff (Git vs Cluster)                          │
│      ↓                                                  │
│  Auto-Sync applies changes                              │
│      ↓                                                  │
│  Kubernetes creates/updates/deletes resources           │
│      ↓                                                  │
│  Self-Heal: Reverts manual changes ────────────────────┘
│      ↑                                                  
│      │                                                  
│  kubectl edit (someone tries manual change)             
```

### Key Concepts Mastered

**1. Declarative Configuration**
- Describe desired state, not steps
- "I want 3 nginx pods" not "create pod, create pod, create pod"
- Kubernetes reconciles actual → desired

**2. Git as Single Source of Truth**
- Cluster state defined in Git
- Manual changes rejected (self-heal)
- History = git log
- Rollback = git revert

**3. Continuous Reconciliation**
- ArgoCD constantly compares Git vs Cluster
- Drift detection (cluster doesn't match Git)
- Automatic correction
- Self-healing system

**4. Separation of Concerns**
- **Git** - What should run
- **ArgoCD** - Keep cluster matching Git
- **Kubernetes** - Actually run the workloads

---

## Troubleshooting Solved

### Issue 1: ArgoCD HTTP Redirect Loop

**Problem:** ArgoCD UI redirecting HTTP → HTTPS infinitely

**Root cause:** ArgoCD defaults to secure mode (HTTPS only)

**Solution:** 
```bash
kubectl patch configmap argocd-cmd-params-cm -n argocd \
  --type merge -p '{"data":{"server.insecure":"true"}}'
kubectl rollout restart deployment argocd-server -n argocd
```

**Lesson:** ConfigMaps control application behavior. Patching is better than editing full YAML.

---

### Issue 2: Git Push Asking for Password

**Problem:** `git push` requesting username/password instead of using SSH

**Root cause:** Remote URL using HTTPS instead of SSH

**Solution:**
```bash
git remote set-url origin git@github.com:RepTambe/k8shome.git
```

**Lesson:** Check `git remote -v` to verify authentication method. SSH is better for automation.

---

### Issue 3: Nested Directory Structure

**Problem:** Created `apps/nginx-test/apps/nginx-test/` instead of `apps/nginx-test/`

**Root cause:** Ran `mkdir -p apps/nginx-test` while already inside `apps/nginx-test/`

**Solution:**
```bash
cd ~/homelab/k8shome
rm -rf apps/nginx-test/apps
```

**Lesson:** Always verify `pwd` before creating directories. Git only tracks repo contents.

---

## Architecture After ArgoCD

```
                     Developer Laptop
                           ↓
                    Git Commit + Push
                           ↓
                  ┌──────────────────┐
                  │  GitHub          │
                  │  k8shome repo    │
                  │  (Source Truth)  │
                  └────────┬─────────┘
                           ↓
                    ArgoCD Polls
                           ↓
              ┌────────────────────────┐
              │  ArgoCD                │
              │  - Monitors Git        │
              │  - Detects changes     │
              │  - Syncs to cluster    │
              │  - Self-heals drift    │
              └────────┬───────────────┘
                       ↓
         ┌─────────────────────────────┐
         │   Kubernetes API Server     │
         │   (10.10.10.20:6443)        │
         └──────────┬──────────────────┘
                    ↓
    ┌───────────────┴───────────────┐
    ↓                               ↓
┌───────────┐                ┌──────────────┐
│  Worker 1 │                │  Worker 2    │
│           │                │              │
│  nginx    │                │  nginx       │
│  pods     │                │  pods        │
└───────────┘                └──────────────┘
```

---

## Files Created This Session

### On Laptop

**~/homelab/**
- `argocd-ingress.yaml` - Ingress for ArgoCD UI

**~/homelab/k8shome/** (Git repo)
```
k8shome/
├── apps/
│   └── nginx-test/
│       └── deployment.yaml
└── README.md
```

### In Kubernetes Cluster

**New Resources:**
- Namespace: `argocd`
- 7 ArgoCD pods (server, repo-server, controller, etc.)
- ArgoCD services (ClusterIP)
- Ingress: argocd-server
- Application: nginx-test (managed by ArgoCD)

---

## Summary Statistics - Session 2

**New Components:**
- ArgoCD: 7 pods, 1 Ingress
- Git repository: 1 app (nginx-test)
- GitOps applications: 1 (nginx-test)

**Total Cluster State:**
- **Nodes:** 3 (1 control, 2 workers)
- **Namespaces:** default, kube-system, argocd
- **Pods:** ~27 (Cilium, MetalLB, Traefik, ArgoCD, nginx)
- **Ingress Rules:** 2 (argocd.homelab.local, nginx.homelab.local)
- **IPs Assigned:** 2/20 (10.10.10.50-51)

**GitOps Stats:**
- **Repos connected:** 1 (k8shome)
- **Applications:** 1 (nginx-test)
- **Auto-sync enabled:** Yes
- **Self-heal enabled:** Yes

**Time to Complete:** ~2 hours (with detailed explanations)

**Knowledge Gained:**
- GitOps principles and workflow
- ArgoCD architecture and components
- ConfigMap patching
- Auto-sync and self-healing
- Git-based deployment patterns

---

## Next Steps - Options

### Option A: Infrastructure as Code (Full GitOps)

**Goal:** Manage ALL cluster components via Git

**Tasks:**
1. Move MetalLB config to Git
2. Move Traefik installation to Git (Helm chart)
3. Bootstrap ArgoCD itself via Git (inception!)
4. Create "app of apps" pattern

**Benefits:**
- Complete cluster reproducibility
- Disaster recovery (re-apply repo)
- Infrastructure changes via PRs

---

### Option B: Monitoring Stack

**Goal:** Visibility into cluster health

**Tasks:**
1. Deploy Prometheus (metrics collection)
2. Deploy Grafana (dashboards)
3. Create dashboards for:
   - Node resources (CPU, RAM, disk)
   - Pod metrics
   - Network traffic (Cilium/Hubble)
4. Alert rules (Slack/email)

**Benefits:**
- See what's consuming resources
- Troubleshoot performance issues
- Capacity planning

---

### Option C: Production Application

**Goal:** Deploy real workload (Jellyfin media server)

**Tasks:**
1. Create persistent volume (NFS from worker-02)
2. Deploy Jellyfin via ArgoCD
3. Configure Ingress with SSL (cert-manager)
4. Set up media library access
5. Performance tuning

**Benefits:**
- Stateful workload experience
- Storage management
- Real-world application

---

### Option D: DNS Infrastructure

**Goal:** Network-wide .homelab.local resolution

**Tasks:**
1. Deploy Pi-hole on utility VM
2. Configure as network DNS
3. Add wildcard: `*.homelab.local → 10.10.10.51`
4. All devices can access services (phones, tablets, etc.)

**Benefits:**
- No more /etc/hosts on every device
- Ad blocking for home network
- Better service discovery

---

*Session 2 completed: February 6, 2026*
*GitOps workflow operational - Git is now the source of truth*

