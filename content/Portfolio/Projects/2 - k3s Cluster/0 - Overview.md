Tags: [[0 - HomeLab]] [[0 - Projects]]

# k3s Kubernetes Cluster

Building a production-grade Kubernetes cluster on my homelab infrastructure using k3s, Cilium, and GitOps.

## Sessions

### Session 1: Feb 4, 2026

**Starting Point:** Phase 1 complete (VMs provisioned, basic networking)
**Ending Point:** Phase 2 complete (Full k3s cluster with ingress)
**Key Accomplishments:** Installed k3s, Cilium CNI, MetalLB, Traefik, configured kubectl locally

### Session 2: Feb 6, 2026

**Starting Point:** Working k3s cluster with Traefik ingress
**Ending Point:** GitOps workflow with ArgoCD
**Key Accomplishments:** ArgoCD installation, GitHub repo setup, first GitOps deployment, auto-sync configuration

---

## Phase 2: k3s Cluster Installation

### Step 1: Installed k3s on Control Plane

**Node:** k3s-control-01 (10.10.10.20)

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

**Key Concept:** The control plane is the "brain" of Kubernetes containing:
- API Server (port 6443) - The interface for everything
- Scheduler - Decides where to place pods
- Controller Manager - Ensures desired state matches reality
- etcd - Database storing cluster state

### Step 2: Retrieved Node Token

```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```

This is the authentication credential that workers use to join the cluster.

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

**Key Concept:** Workers are the "muscle" - they run your actual applications (pods). The control plane tells them what to run, they execute.

---

## Phase 2.5: Cilium CNI Installation

### What is Cilium?

Container Network Interface - the networking layer that makes pods work.

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

### Installation

```bash
# Install Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml

# Add Cilium repo and install
helm repo add cilium https://helm.cilium.io/
helm repo update

helm install cilium cilium/cilium --version 1.16.5 \
  --namespace kube-system \
  --set ipam.mode=kubernetes \
  --set kubeProxyReplacement=true \
  --set hubble.relay.enabled=true \
  --set hubble.ui.enabled=true
```

After Cilium installation, all nodes showed Ready status.

---

## Phase 3: kubectl on Laptop

### Setup

```bash
# Install kubectl (Arch Linux)
sudo pacman -S kubectl

# Copy kubeconfig from control plane
mkdir -p ~/.kube
scp debian@10.10.10.20:/etc/rancher/k3s/k3s.yaml ~/.kube/config

# Fix server address (change 127.0.0.1 to actual IP)
nano ~/.kube/config
# Changed: server: https://127.0.0.1:6443
# To:      server: https://10.10.10.20:6443
```

Now managing cluster directly from laptop instead of SSH.

---

## Phase 4: MetalLB LoadBalancer

### What is MetalLB?

On bare metal (homelab), nothing provides LoadBalancer IPs like cloud providers do. MetalLB assigns IPs from a configured pool (10.10.10.50-69) and announces them via ARP.

### Installation

```bash
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.14.9/config/manifests/metallb-native.yaml
```

### Configuration (metallb-config.yaml)

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

---

## Phase 5: Test Application (nginx)

Deployed nginx to prove pods, MetalLB, and services work.

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

MetalLB assigned 10.10.10.50 - accessible in browser!

---

## Phase 6: Traefik Ingress Controller

### What is Traefik?

Instead of each service needing its own LoadBalancer IP, Traefik provides one IP (10.10.10.51) and routes by hostname:
- jellyfin.homelab.local → Jellyfin service
- audiobookshelf.homelab.local → Audiobookshelf service

### Installation

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

Traefik got assigned 10.10.10.51.

---

## Phase 7: Ingress for nginx

### Ingress Resource (nginx-ingress.yaml)

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

Added to /etc/hosts: `10.10.10.51  nginx.homelab.local`

Now accessible at http://nginx.homelab.local!

---

## Phase 8: GitOps with ArgoCD

### What is GitOps?

Operations paradigm where Git is the single source of truth for infrastructure and applications.

**Core Principles:**
1. **Declarative** - Entire system described declaratively in Git
2. **Versioned** - Git provides history, rollback, audit trail
3. **Automated** - Changes in Git automatically applied to cluster
4. **Continuously Reconciled** - System self-heals to match Git state

### ArgoCD Installation

```bash
kubectl create namespace argocd

kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

### Exposed ArgoCD UI

Fixed HTTP redirect loop and created ingress:

```bash
kubectl patch configmap argocd-cmd-params-cm -n argocd \
  --type merge \
  -p '{"data":{"server.insecure":"true"}}'
kubectl rollout restart deployment argocd-server -n argocd
```

### Created Git Repository

**Repository:** https://github.com/RepTambe/k8shome

**Structure:**
```
k8shome/
├── apps/
│   └── nginx-test/
│       └── deployment.yaml
└── README.md
```

### GitOps Workflow

```
Developer → Git Commit → Git Push → ArgoCD Detects → Cluster Updates
```

Enabled **Auto-Sync**, **Prune Resources**, and **Self Heal** for automatic reconciliation.

---

## Final Architecture

```
                    Internet / Home Network
                            ↓
                    ┌───────────────────┐
                    │  Router / Switch  │
                    └────────┬──────────┘
                             ↓
        ┌────────────────────┴────────────────────┐
        ↓                                         ↓
┌───────────────────┐                  ┌──────────────────┐
│ nginx-test        │                  │ Traefik          │
│ LoadBalancer      │                  │ LoadBalancer     │
│ 10.10.10.50       │                  │ 10.10.10.51      │
└─────────┬─────────┘                  └────────┬─────────┘
          ↓                                     ↓
    ┌─────────────┐                    ┌────────────────┐
    │ nginx-test  │                    │ Ingress Rules  │
    │ Service     │                    │ nginx.homelab  │
    └──────┬──────┘                    │ argocd.homelab │
           ↓                           └────────┬───────┘
    ┌──────────────────────────────────────────────┐
    │              Cilium CNI                      │
    │        Pod Networking Layer                  │
    └──────────────┬───────────────────────────────┘
                   ↓
    ┌──────────────────────────────────────────────┐
    │      k3s Cluster (3 nodes)                   │
    │  Control: 10.10.10.20                        │
    │  Worker1: 10.10.10.21                        │
    │  Worker2: 10.10.10.22                        │
    └──────────────────────────────────────────────┘
```

---

## Summary Statistics

**Nodes:** 3 (1 control plane, 2 workers)
**Total Resources:** 14 CPU cores, 32GB RAM
**Pods Running:** ~27 (Cilium, MetalLB, Traefik, ArgoCD, nginx-test)
**Services:** 2 LoadBalancer (nginx-test, Traefik)
**IPs Assigned:** 2 of 20 available (10.10.10.50-51)
**Ingress Rules:** 2 (nginx.homelab.local, argocd.homelab.local)
**GitOps Apps:** 1 (nginx-test via ArgoCD)

---

## Next Steps

- **DNS Infrastructure:** Deploy Pi-hole for network-wide .homelab.local resolution
- **Monitoring Stack:** Prometheus + Grafana for cluster visibility
- **Production Apps:** Deploy Jellyfin media server with persistent storage
- **SSL Certificates:** cert-manager for automatic HTTPS
