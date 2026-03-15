# 🗺️ 8-Month Platform Engineering Learning Plan

**Author**: Augustine Tambe
**Created**: March 4, 2026
**Milestones**: CKA exam at end of Month 2 | RHCSA exam at Month 5 | Advanced platform skills Months 6–8

---

## Timeline Summary

```
Month 1  ███████░░░  Linux/Networking/Cloud + CKA 15%→60%
Month 2  ██████████  CKA Sprint → EXAM 🎓
Month 3  ████████░░  RHCSA begins + Terraform
Month 4  ██████████  RHCSA deep dive
Month 5  ██████████  RHCSA EXAM 🎓 + Secrets/Security
Month 6  ████████░░  Helm + ArgoCD/GitOps
Month 7  ████████░░  Observability + Policy + Mesh
Month 8  ██████████  Advanced topics + Capstone
```

---

## Weekly Cadence

| Day | Activity |
|-----|----------|
| **Mon–Thu** | Study new concepts (1–2 hours/day) |
| **Fri** | Hands-on in your work clusters or local Kind cluster |
| **Sat** | Cert-specific labs (CKA → Killer.sh/KodeKloud, RHCSA → RHEL VM drills) |
| **Sun** | Review notes, fill gaps, rest |

---

## Resource Stack

| Resource | For What |
|----------|----------|
| **Mumshad Mannambeth (Udemy)** | CKA — already in progress (15%) |
| **Killer.sh** | CKA practice exams (free with registration) |
| **KodeKloud** | CKA + RHCSA labs |
| **Sander van Vugt (O'Reilly / Pearson)** | RHCSA video course — best instructor |
| **Asghar Ghori — RHCSA book** | RHCSA deep reference |
| **Microsoft Learn AZ-900 path** | Cloud fundamentals (free) |
| **kubernetes.io/docs** | CKA exam reference (only allowed resource) |
| Your own work codebase | Real-world practice — better than any lab |

---

## Month 1 — Linux, Networking & Cloud Fundamentals + CKA Acceleration

> You're 15% into Mumshad's course — goal is to be at ~60% by end of this month.

### Week 1–2: Linux & Networking Essentials (also RHCSA head start)

- [ ] **Linux CLI** — `grep`, `awk`, `sed`, `find`, `xargs`, `jq`, `yq`, pipes, redirection
- [ ] **File system** — FHS layout (`/etc`, `/var`, `/usr`, `/tmp`), `df`, `du`, `mount`
- [ ] **Permissions** — `chmod`, `chown`, `umask`, SUID/SGID, sticky bit (CKA + RHCSA)
- [ ] **Process management** — `ps aux`, `top`/`htop`, `kill`, signals, `systemctl` (RHCSA heavy)
- [x] **Networking** — TCP/IP model, DNS resolution (`dig`, `nslookup`), `curl`, `netstat`/`ss`, ports, firewalls (`iptables` basics)
- [ ] **SSH** — Key-based auth, `~/.ssh/config`, tunneling, agent forwarding
- [ ] **Shell scripting** — Variables, loops, conditionals, functions, `set -euo pipefail`

**Practice**: Write or dissect a real shell script end to end — trace OS detection, package management, and architecture-aware install logic.

### Week 3–4: Cloud Fundamentals + CKA Push

#### Cloud Fundamentals (Azure-focused)

- [ ] **Cloud models** — IaaS vs PaaS vs SaaS, shared responsibility model
- [ ] **Azure core services**:
  - **Compute** — VMs, AKS, Azure Functions (your stack uses all three)
  - **Networking** — VNets, Subnets, NSGs, Load Balancers, Application Gateway, NAT Gateway
  - **Storage** — Blob storage, Storage Accounts (your Terraform state lives here)
  - **Identity** — Azure AD (Entra ID), Service Principals, Managed Identities, Workload Identity
  - **Security** — Key Vault, Defender, RBAC (Subscription → Resource Group → Resource level)
- [x] **Azure Government** — How it differs from public Azure (sovereign cloud regions)
- [ ] **Azure CLI** — `az login`, `az aks get-credentials`, `az keyvault secret list`
  - Practice: `az login` then explore resources with `az resource list`

**Resource**: [Microsoft Learn: Azure Fundamentals (AZ-900 path)](https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/) — free, self-paced. You don't need to take the AZ-900 exam, but the material covers exactly what you need.

#### CKA — Mumshad Course Push (target: 60% complete)

- [ ] Cluster architecture & installation
- [ ] Core workloads — Pods, ReplicaSets, Deployments
- [ ] Services & networking
- [ ] Scheduling — taints, tolerations, affinity, nodeSelector
- [ ] **Do every lab** — don't just watch, type it out

---

## Month 2 — CKA Sprint & Exam 🎯

> Goal: Finish Mumshad's course + 2 weeks of exam-focused practice → take CKA.

### Week 1–2: Complete Mumshad's Course (60% → 100%)

- [ ] **Storage** — PV, PVC, StorageClasses, volume types
- [ ] **Security** — RBAC, ServiceAccounts, SecurityContexts, NetworkPolicies
- [ ] **Troubleshooting** — Node failures, pod crashes, networking issues, DNS debugging
- [ ] **Cluster maintenance** — `etcdctl` backup/restore, OS upgrades, `kubeadm upgrade`
- [ ] **Logging & monitoring** — `kubectl logs`, `kubectl top`, metrics server
- [ ] Complete **all remaining labs and mock exams** in the course

### Week 3: Killer.sh + Focused Practice

- [ ] **Take Killer.sh Practice Exam #1** (comes free with CKA registration)
  - Simulate real conditions: 2 hours, one monitor, only kubernetes.io/docs
  - Review every wrong answer thoroughly
- [ ] **Speed drills** — Practice imperative commands until they're muscle memory:

```bash
alias k=kubectl
export do="--dry-run=client -o yaml"
k run nginx --image=nginx $do > pod.yaml
k create deploy web --image=nginx --replicas=3
k expose deploy web --port=80 --type=NodePort
k create configmap cfg --from-literal=key=val
k create secret generic sec --from-literal=pass=s3cret
k create sa mysa
k create role viewer --verb=get,list --resource=pods
k create rolebinding view --role=viewer --serviceaccount=default:mysa
```

- [ ] **Troubleshooting drills** — Practice these scenarios:
  - Fix a broken kubelet (check `systemctl status kubelet`, `/var/log/syslog`)
  - Fix a pod stuck in `CrashLoopBackOff` or `ImagePullBackOff`
  - Fix broken DNS (`kubectl exec busybox -- nslookup kubernetes`)
  - Repair a NetworkPolicy blocking traffic
  - `etcdctl snapshot save` / `snapshot restore`
- [ ] **Learn `kubectl explain`** — faster than searching docs during the exam:

```bash
kubectl explain pod.spec.containers.livenessProbe
kubectl explain deployment.spec.strategy
```

### Week 4: Final Prep & Exam

- [ ] **Take Killer.sh Practice Exam #2**
- [ ] Review the [CKA exam curriculum](https://github.com/cncf/curriculum) — make sure you can do everything listed
- [ ] **Exam day tips**:
  - Set up aliases and autocompletion first (`source <(kubectl completion bash)`)
  - Read every question fully before starting
  - Skip questions worth few points if they're hard — come back later
  - Copy YAML from kubernetes.io docs, don't write from scratch
  - Use `kubectl explain` instead of searching docs
  - Check your work: `k get` the resource after creating it

### CKA Exam Domains & Weights

| Domain | Weight | Key Topics |
|--------|--------|-----------|
| Cluster Architecture | 25% | RBAC, kubeadm, etcd backup, node management |
| Workloads & Scheduling | 15% | Deployments, scaling, resource limits, scheduling |
| Services & Networking | 20% | Services, Ingress, DNS, NetworkPolicies |
| Storage | 10% | PV/PVC, StorageClasses, volume modes |
| Troubleshooting | 30% | Node/pod debugging, logs, cluster component failures |

**Practice in your own stack**: Spin up a local Kind cluster and use it to practice CKA scenarios. Real cluster experience > theoretical study.

---

## Month 3 — RHCSA Prep Begins + Terraform Fundamentals

> Post-CKA recovery month — shift gears to Linux system admin + start IaC.

### Week 1–2: RHCSA Core — System Administration Basics

**Pick a study resource** (recommended: Sander van Vugt's RHCSA course on O'Reilly or Asghar Ghori's RHCSA book)

- [ ] **RHEL basics** — Install RHEL/CentOS/Rocky Linux in a VM or container
- [ ] **Essential tools** — File management, text editors (`vi`/`vim` — **mandatory for RHCSA**), I/O redirection, `man` pages
- [ ] **`vim` mastery** — The RHCSA is entirely CLI-based, you must know `vim`:
  - Normal mode: `dd`, `yy`, `p`, `u`, `/search`, `:%s/old/new/g`
  - Insert mode, visual mode, saving/quitting
- [ ] **Users & groups** — `useradd`, `usermod`, `groupadd`, `passwd`, `/etc/passwd`, `/etc/shadow`
- [ ] **File permissions (deep)** — Standard perms, ACLs (`setfacl`, `getfacl`), SUID/SGID/sticky bit
- [ ] **`sudo` configuration** — `/etc/sudoers`, `visudo`

### Week 3–4: Terraform Foundations (Applied to Your Stack)

- [ ] **Core concepts** — Providers, resources, data sources, state, plan/apply cycle
- [ ] **HCL syntax** — Variables, locals, outputs, conditionals (`count`, `for_each`), string interpolation
- [ ] **Modules** — Inputs, outputs, composition
  - Study how AKS clusters are provisioned via reusable modules
  - Study how databases (SQL Server, elastic pools) are managed as modules
- [ ] **State management** — Remote backend (Azure Storage blob), `terraform state list/show/mv/rm`
- [ ] **Root module composition** — How dev/prod environments are conditionally composed with `count = var.deploy_dev ? 1 : 0`
- [ ] **Terraform workflow**: `terraform init` → `terraform plan` → `terraform apply`

**Practice**: Run `terraform plan` against a dev environment and read the entire output. Understand what each resource is doing.

---

## Month 4 — RHCSA Deep Dive

> Full RHCSA focus — this is the hardest certification month.

### Week 1–2: RHCSA Core — Storage, Networking & Services

- [ ] **Storage management**:
  - Partitions: `fdisk`, `gdisk`, `parted`
  - LVM: `pvcreate`, `vgcreate`, `lvcreate`, `lvextend` — **high weight on exam**
  - File systems: `mkfs.xfs`, `mkfs.ext4`, `mount`, `/etc/fstab`
  - Swap: `mkswap`, `swapon`
  - Stratis and VDO (RHEL 8/9 specific)
- [ ] **Networking**:
  - `nmcli` — configure connections, static IP, DNS, gateway
  - `ip addr`, `ip route`, hostname configuration
  - Firewall: `firewall-cmd` — zones, services, ports, permanent rules
- [ ] **Services & boot**:
  - `systemctl` — start, stop, enable, disable, mask, status
  - `systemd` targets (multi-user, graphical, rescue, emergency)
  - Boot process, GRUB2, resetting root password

### Week 3–4: RHCSA Core — Security, Automation & Containers

- [ ] **SELinux** — **Critical for RHCSA**:
  - Modes: enforcing, permissive, disabled
  - `getenforce`, `setenforce`, `sestatus`
  - Contexts: `ls -Z`, `chcon`, `restorecon`
  - Booleans: `getsebool`, `setsebool -P`
  - Troubleshooting: `audit2why`, `audit2allow`
- [ ] **Scheduled tasks** — `crontab`, `at`, systemd timers
- [ ] **Time services** — `timedatectl`, `chrony`
- [ ] **NFS & autofs** — Configure NFS mounts, automounting
- [ ] **Containers with Podman** (RHCSA includes this):
  - `podman run`, `podman build`, `podman ps`
  - Rootless containers, configuring containers as systemd services
- [ ] **Shell scripting** — Automate tasks with bash (RHCSA may require simple scripts)

### RHCSA Exam Domains (EX200)

| Domain | Key Topics |
|--------|-----------|
| Essential Tools | File mgmt, vim, grep, I/O redirection, tar, SSH |
| Operate Running Systems | Boot targets, processes, logs, systemctl |
| Configure Local Storage | Partitions, LVM, fstab, swap, Stratis |
| File Systems | Create/mount, permissions, ACLs |
| Users & Groups | Create, modify, password policies, sudo |
| Security | SELinux, firewall-cmd, SSH key auth |
| Containers | Podman, rootless, systemd integration |
| Networking | nmcli, hostname, firewall |

---

## Month 5 — RHCSA Exam + Secrets & Security in Your Stack

### Week 1–2: RHCSA Final Prep & Exam 🎯

- [ ] **Full practice exam** — Time yourself (2.5 hours), do everything on a fresh RHEL VM
- [ ] **Rapid-fire drills**:
  - Reset root password from GRUB
  - Create an LVM, extend it, mount persistently
  - Configure SELinux context for a non-standard web directory
  - Set up `firewall-cmd` rules for HTTP/HTTPS
  - Configure static networking with `nmcli`
  - Create a Podman container running as a systemd service
  - Configure autofs for NFS mounts
- [ ] **Take the RHCSA exam**

**RHCSA Tips**:
- It's fully hands-on — no multiple choice
- You get a VM and tasks to complete
- Reboot at least once during the exam to verify persistent configs survive
- SELinux and LVM come up almost every single time
- Read every task completely before starting — some tasks depend on others

### Week 3–4: Secrets Management & Security (Your Stack)

- [ ] **Azure Key Vault** — dev and prod vaults, access policies, and secret versioning
- [ ] **External Secrets Operator (ESO)** — The full secret flow:

```
Azure Key Vault → ClusterSecretStore → ExternalSecret → K8s Secret → Pod env var
```

- [ ] **Azure Workload Identity** — How pods authenticate to Azure without storing credentials
- [ ] **Container image signing** — Notation, Cosign
- [ ] **Container scanning** — Grype (vulnerabilities), Syft (SBOMs)
- [ ] **RBAC in AKS** — Azure AD groups, `kubelogin`, admin context vs user context

---

## Month 6 — GitOps, Helm & ArgoCD

> Now that you have Linux + K8s + Cloud certs, go deep on your team's GitOps workflow.

### Week 1–2: Helm Deep Dive

- [ ] **Chart structure** — `Chart.yaml`, `values.yaml`, `templates/`, helpers, hooks
- [ ] **Templating** — `{{ .Values }}`, `{{ include }}`, `range`, `if/else`, `with`, `tpl`
- [ ] **Chart dependencies** — `Chart.lock`, subcharts
- [ ] **Helm commands** — `install`, `upgrade`, `rollback`, `template`, `lint`, `test`, `diff`
- [ ] **Study real charts in your codebase**:
  - A cluster app-of-apps chart for the dev environment
  - A cluster chart for the prod environment
  - A simpler utility chart (e.g. DB tasks) to learn chart structure from scratch

### Week 3–4: ArgoCD & GitOps Mastery

- [ ] **GitOps principles** — Declarative, versioned, automated, self-healing
- [ ] **ArgoCD objects** — Application, AppProject, ApplicationSet
- [ ] **App-of-Apps pattern** — Pipeline deploys Root App → points to a cluster chart → spawns child apps (ESO, cert-manager, istio-gateway, etc.)
- [ ] **Sync waves & hooks** — Control deployment ordering
- [ ] **Per-environment chart versions** — Version files per environment (dev, prod, infra)
  - Change version → merge to `main` → pipeline auto-deploys
- [ ] **ArgoCD CLI** — `argocd app list`, `argocd app sync`, `argocd app diff`, `argocd app history`

**Practice**: Spin up a local Kind cluster, install ArgoCD, explore the UI, and manually sync/rollback apps.

---

## Month 7 — Observability, Policy & Networking

### Week 1–2: Observability Stack

- [ ] **Datadog** — Agent (DaemonSet), Operator, APM, logs, metrics, dashboards
  - Pod annotations: `ad.datadoghq.com/*` for auto-discovery
- [ ] **Cilium & Hubble** — CNI, eBPF-based networking, network policies, flow observability
  - `cilium status`, `hubble observe`
  - Run Hubble UI to visualize traffic flows
- [ ] **Kubernetes-native monitoring** — `kubectl top pods/nodes`, metrics server, resource recommendations

### Week 3–4: Policy & Service Mesh

- [ ] **Kyverno** — Policy engine for K8s:
  - Validate (block bad configs), Mutate (auto-fix), Generate (create resources)
- [ ] **Istio / Service Mesh** — VirtualServices, Gateways, DestinationRules
  - Typical traffic flow: App Gateway → Istio Ingress → Gateway → VirtualService → Service → Pod
- [ ] **cert-manager** — Issuers, ClusterIssuers, Certificates, Let's Encrypt ACME
- [ ] **Gateway API** — The K8s-native successor to Ingress (your stack deploys these CRDs)

---

## Month 8 — Advanced Platform Engineering & Putting It All Together

### Week 1–2: Advanced Infrastructure

- [ ] **KEDA** — Event-driven autoscaling (scale on queue depth, HTTP rate, cron, etc.)
- [ ] **VPA** — Vertical Pod Autoscaler (right-sizing resource requests)
- [ ] **Descheduler** — Rebalancing pods after node changes
- [ ] **Azure Service Operator (ASO)** — Managing Azure resources from inside K8s
- [ ] **Terraform advanced** — `terraform import`, state manipulation, drift detection
- [ ] **Azure DevOps pipelines advanced** — Write a new pipeline from scratch following your team's template pattern

### Week 3–4: Capstone — Full Stack Ownership

- [ ] **End-to-end exercise**: Trace a change through the entire system:
  1. Terraform creates an AKS cluster + Key Vault
  2. Pipeline deploys cluster components (ArgoCD, ESO, cert-manager, Kyverno)
  3. ArgoCD syncs the app-of-apps chart
  4. ESO pulls secrets from Key Vault
  5. Apps deploy with Istio ingress, TLS certs, and Datadog monitoring
- [ ] **Build something new**: Add a new cluster component end-to-end:
  - Terraform module → Helm chart → Values per environment → Pipeline → ArgoCD integration
- [ ] **Incident simulation**: Practice troubleshooting:
  - Secret sync failure (ESO → Key Vault connectivity)
  - ArgoCD app stuck in `OutOfSync`
  - Pod can't pull image from ACR
  - Ingress not routing traffic (Istio VirtualService misconfigured)
  - Terraform state drift

---

## Post-Plan — Transition into MLOps

> After Month 8, the goal is to stop being "platform-only" and become the engineer who can support model delivery, ML infrastructure, and production AI workloads end to end.

### Why MLOps Fits Next

- You will already have the right base: Kubernetes, Terraform, GitOps, observability, secrets management, CI/CD, and cloud infrastructure
- MLOps builds on platform engineering, but shifts the application layer toward data pipelines, model training, model serving, and experiment lifecycle management
- This move makes you more valuable because very few engineers can bridge platform reliability and ML delivery well

### Phase 1: MLOps Foundations

- [ ] **Learn the ML lifecycle** — data prep, training, evaluation, packaging, deployment, monitoring, retraining
- [ ] **Python for ML workflows** — virtual environments, packaging, `pandas`, notebooks, APIs, CLI tooling
- [ ] **Model artifact flow** — datasets, feature sets, trained model binaries, registries, reproducibility
- [ ] **Containers for ML** — packaging inference apps, GPU vs CPU considerations, image size, startup time
- [ ] **Serving basics** — REST inference APIs, batch jobs, async workers

**Target outcome**: Be able to explain the difference between deploying an app and deploying a model-backed service.

### Phase 2: Core MLOps Tooling

- [ ] **MLflow** — experiment tracking, model registry, runs, artifacts
- [ ] **Kubeflow** or **KServe** — understand the Kubernetes-native ML stack
- [ ] **Model serving patterns** — single-model, multi-model, canary rollouts, shadow deployments
- [ ] **Data and workflow orchestration** — start with simple scheduled pipelines, then explore Airflow or Prefect
- [ ] **Storage for ML workloads** — object storage, artifact versioning, dataset handling
- [ ] **GPU scheduling basics** — node pools, requests/limits, taints, tolerations, device plugins

**Target outcome**: Stand up a minimal model training-to-serving workflow on Kubernetes.

### Phase 3: Production ML Operations

- [ ] **Model observability** — latency, throughput, error rate, saturation, model-specific metrics
- [ ] **Data drift / concept drift** — understand what changes in data or model behavior should trigger review
- [ ] **Secure ML platforms** — secret handling, registry access, supply chain concerns, RBAC for ML teams
- [ ] **CI/CD for ML** — separate code deploys from model promotion workflows
- [ ] **Feature and model promotion** — dev → staging → prod validation gates
- [ ] **Cost awareness** — GPU cost, idle training jobs, right-sizing inference workloads

**Target outcome**: Operate ML systems with the same discipline as platform systems.

### Suggested 3-Month MLOps Ramp

#### Month 9: ML + Python + Model Serving Basics

- [ ] Learn Python well enough to build and package a small inference API
- [ ] Train or download a small model and serve it with FastAPI
- [ ] Containerize it and deploy it to Kubernetes
- [ ] Add logging, metrics, health probes, and autoscaling

#### Month 10: Experiment Tracking + Pipelines

- [ ] Stand up MLflow and log experiments, metrics, and model artifacts
- [ ] Build a simple training pipeline that outputs a versioned model
- [ ] Store artifacts in object storage
- [ ] Add a promotion step from "best run" to "deployable model"

#### Month 11: Kubernetes-Native MLOps

- [ ] Explore KServe or Kubeflow serving patterns
- [ ] Deploy a model with canary or shadow rollout strategy
- [ ] Add dashboards and alerts for inference latency and failure rate
- [ ] Document an end-to-end operating model for ML workloads on your platform

### MLOps Capstone Idea

- [ ] Build a small internal ML platform demo:
  1. Training pipeline produces a model artifact
  2. MLflow tracks runs and stores the promoted model
  3. A CI/CD or GitOps flow deploys the model service to Kubernetes
  4. KServe or a custom FastAPI service exposes inference
  5. Datadog or Prometheus tracks API and model health
  6. A rollback path exists for bad model versions

### Recommended Learning Stack

| Area | Starting Point |
|------|----------------|
| **Python** | FastAPI, `pandas`, packaging basics |
| **Experiment Tracking** | MLflow |
| **Serving** | FastAPI first, then KServe |
| **Pipelines** | Simple Python jobs → Airflow/Prefect later |
| **Model Hosting** | Kubernetes + Helm + ArgoCD |
| **Observability** | Datadog / Prometheus + model-specific metrics |
| **Cloud Direction** | Azure ML later if your job starts leaning heavily into managed ML services |

### Long-Term Outcome

- You become a **Platform Engineer with MLOps depth**, not just someone who can deploy clusters
- You can support both application platforms and ML delivery platforms
- You position yourself for roles like:
  - **Senior Platform Engineer**
  - **Cloud Platform Engineer**
  - **MLOps Engineer**
  - **AI Platform Engineer**

---

## Contributing to Open Source

Contributing to open source is one of the best ways to accelerate your growth as a platform engineer — you read production-grade code, work with distributed teams, and build a public record of your skills.

### Where to Start

**Good first-contribution targets for platform engineers:**

| Project | Why It's Good for PE |
|---------|----------------------|
| **Kubernetes** | Core to everything — docs, issues, and KEPs are all public |
| **Helm** | Chart tooling — great for someone learning Helm internals |
| **ArgoCD** | GitOps engine — active community, many good first issues |
| **External Secrets Operator** | Directly relevant to secrets management work |
| **Kyverno** | Policy engine — well-documented contribution process |
| **Cilium** | CNI/eBPF networking — higher bar but very rewarding |
| **cert-manager** | TLS automation — approachable Go codebase |
| **OpenTofu** | Open-source Terraform fork — active and welcoming |

### How to Find Issues

```bash
# Search GitHub for beginner-friendly issues
label:"good first issue" + label:"help wanted"

# Good starting searches on GitHub:
# kubernetes/kubernetes good first issue
# argoproj/argo-cd good first issue
# external-secrets/external-secrets good first issue
```

### Contribution Types (Easiest → Hardest)

1. **Documentation fixes** — typos, unclear explanations, missing examples. No code required, high value.
2. **Adding examples** — write a usage example for an undocumented feature.
3. **Bug reports** — a well-written, reproducible bug report is a real contribution.
4. **Bug fixes** — pick a confirmed bug with a clear reproduction path.
5. **Feature implementation** — tackle a `good first issue` feature request.
6. **Core feature work** — after you know the codebase well.

### Workflow

```bash
# 1. Fork and clone
gh repo fork argoproj/argo-cd --clone

# 2. Create a branch
git checkout -b fix/docs-typo-in-sync-policy

# 3. Make your change, then run linters/tests
make lint
make test

# 4. Commit with a clear message following the project's convention
git commit -m "docs: fix typo in sync policy documentation"

# 5. Push and open a PR
gh pr create --title "docs: fix typo in sync policy documentation"
```

### Tips

- **Read `CONTRIBUTING.md` first** — every project has one. Follow it exactly.
- **Start with docs or tests** — easier to get merged, you learn the codebase, maintainers notice you.
- **Join the Slack/Discord** — Kubernetes, ArgoCD, Cilium all have active Slack workspaces. Say hi before opening a PR.
- **Don't ghost your PR** — if a maintainer requests changes, respond within a few days.
- **One thing at a time** — small, focused PRs get merged. Large PRs get abandoned.
- **Your day job is a superpower** — real operational experience with these tools gives you insight most contributors don't have. Use it.

---

## Top 10 Things to Internalize Early

1. **`task`** — Run it often. It's your command menu for everything.
2. **Always specify `--context`** — Wrong context = deploying to wrong cluster = bad day.
3. **Dev first, prod second** — Always.
4. **Never commit secrets** — `terraform.tfvars`, `.env` files stay local.
5. **Read the pipeline template** — Your team likely has a shared Helm deploy pipeline template. Read it.
6. **K9s is your best friend** — Run it daily to understand what's running in your clusters.
7. **`kubectl get events --sort-by=.lastTimestamp`** — First thing to check when debugging.
8. **Understand the secret flow** — Key Vault → ESO → K8s Secret → Pod env var.
9. **ArgoCD UI** — Check sync status before and after every deployment.
10. **Read the `docs/` folder** — If your team has internal docs, read them. They're worth more than any tutorial.

---

*Good luck on the CKA and RHCSA — you've got this! 🚀*
