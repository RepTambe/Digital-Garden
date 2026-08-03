Tags: [[0 - Overview]] [[0 - HomeLab]] [[Networking-Computer]]

# 2026 Homelab Architecture

The environment is organized as a **platform with tenants**, not a pile of loosely related hosts. Each node has a defined responsibility, and every significant decision is written down as an ADR — treating the lab like a real platform team would treat its engineering roadmap.

## Node Layout

### AM4 GPU Node — `am4-gpu`

Bare-metal Kubernetes worker dedicated to GPU inference.

- Talos Linux (no Proxmox passthrough — see ADR-002)
- RTX 4070 Ti Super, 16GB VRAM
- Dual-boots into Bazzite (gaming OS) on a second drive, isolated from the Talos SSD during install
- Joined the cluster on VLAN 20 (`10.10.20.14`)

### Dell OptiPlex 3080 — Proxmox Host

Runs the Kubernetes control plane and worker VMs, plus the management VM.

| VM | vCPU | RAM | Disk | Purpose |
| --- | --- | --- | --- | --- |
| talos-cp-1 | 2 | 8GB | 40GB | Control plane |
| talos-worker-1 | 4 | 18GB | 150GB | Workloads |
| talos-worker-2 | 4 | 18GB | 150GB | Workloads |
| mgmt-1 | 2 | 8GB | 50GB | Bootstrap box, DNS, Git mirror |

Storage split: 256GB NVMe for Proxmox boot/ISOs/scratch; 512GB SATA SSD for all VM disks (~120GB buffer, thin-provisioned). No local backup datastore fits on these drives — backups target an external USB disk or a share on the HP's spare HDD capacity.

### HP EliteDesk — Standalone Media Server

Deliberately kept **outside** the Kubernetes cluster (see ADR-003). Debian + Docker Compose running Jellyfin, Audiobookshelf, Calibre-Web, and an ARR/acquisition stack behind a VPN.

## Network Plan

UniFi (UCG Fiber gateway) + MikroTik CRS310 switch, VLAN-segmented.

| VLAN | Name | Subnet | Purpose |
| --- | --- | --- | --- |
| 1 | Default | 192.168.1.0/24 | Household devices |
| 10 | HomeLab | 10.10.10.0/24 | Infra management — Proxmox UI, mgmt VM, `talosctl` |
| 20 | Lab-Cluster | 10.10.20.0/24 | Kubernetes node network (Talos VMs + AM4 GPU node) |
| 30 | IoT | 192.168.2.0/24 | Pre-existing, unrelated to the lab |
| 40 | Lab-Media | 10.10.40.0/24 | Media server, reachable from Default for streaming |

Static assignments on VLAN 20: `talos-cp-1` = `.11`, `talos-worker-1` = `.12`, `talos-worker-2` = `.13`, `am4-gpu` = `.14`. Cluster API endpoint: `https://10.10.20.11:6443`.

Firewall stance today is permissive between VLANs (no lockdown rules yet) — tightening this is a deferred Phase 2 cleanup item.

## Repository Structure

One monorepo, mirrored GitHub ↔ Gitea on the management VM:

```
homelab/
├── ROADMAP.md
├── docs/
│   ├── adr/                    # architecture decision records
│   ├── network.md
│   └── runbooks/                # rebuild, restore, recover
├── terraform/
│   ├── proxmox/                 # VM definitions
│   └── modules/
├── talos/
│   ├── machineconfigs/          # generated + patches, secrets via SOPS
│   └── patches/
├── kubernetes/
│   ├── bootstrap/                # ArgoCD install + root app-of-apps
│   ├── platform/                 # cilium, cert-manager, longhorn, vault, kyverno, observability, harbor, arc
│   ├── ai/                       # gpu-operator, vllm/ollama, time-slicing config
│   └── tenants/                  # per-"team" apps, namespaces, AppProjects
├── .github/workflows/
└── media-server/
    └── docker-compose.yml
```

Secrets: SOPS + age for anything committed to Git; Vault + External Secrets Operator for runtime secrets.

## Architecture Decisions

Key ADRs — the full rationale and tradeoffs for each are logged in the build repo's `docs/adr/`.

- **ADR-001 — Talos Linux over k3s.** Immutable, API-driven, fully declarative node OS: no SSH, no config drift, the entire machine state lives in Git.
- **ADR-002 — Bare-metal GPU node, no Proxmox passthrough.** Consumer GPU passthrough is friction with no resume value; bare-metal + the NVIDIA GPU Operator is the pattern production GPU clusters actually use.
- **ADR-003 — Media server stays outside the cluster.** Household-critical services shouldn't depend on infrastructure I deliberately break. The cluster is the disposable experiment plane; the media box is a stable appliance.
- **ADR-004 — Cilium with Gateway API and LB-IPAM.** One eBPF-based stack instead of stitching together a CNI, a load-balancer, and an ingress controller separately. Gateway API is the Ingress successor.
- **ADR-005 — GitHub Actions with self-hosted runners (ARC).** GitHub stays the public source of truth; builds execute on lab hardware via Actions Runner Controller — autoscaling, ephemeral runner pods, and caching are real platform skills.
- **ADR-006 — GitOps via ArgoCD app-of-apps.** Humans never `kubectl apply` to a tenant namespace; everything enters the cluster through Git.
- **ADR-007 — LiteLLM as a unified inference gateway.** One OpenAI-compatible endpoint for every caller, routing between local vLLM/Ollama and hosted APIs, with centralized keys, budgets, and failover.
- **ADR-008 — Tailscale for remote access.** Zero port-forwarding, identity-based access, WireGuard-backed encryption; ACL policy lives in the monorepo as code.

Incident-driven ADRs (the debugging stories worth keeping) live in [[4 - Incidents & Lessons|Incidents & Lessons]].

## Anti-Patterns

- Mixing AI and media workloads on the same node
- Treating the media server as an experiment box
- Adding orchestration layers (Kubernetes, Backstage, Crossplane) before they solve a real problem
- `kubectl apply`-ing anything that should have gone through Git
