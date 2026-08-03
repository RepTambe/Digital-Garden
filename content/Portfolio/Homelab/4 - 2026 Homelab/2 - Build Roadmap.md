Tags: [[0 - Overview]] [[0 - HomeLab]]

# 2026 Build Roadmap

Six-month platform build, phased so each stage ends in a clear, working exit criteria. Full detail lives in the build repo's `ROADMAP.md`.

## Phase 0 — Foundations — 🟡 Partially Met

Clean slate, network in place, repo scaffolded.

- [x] Proxmox installed on the Dell, reachable on VLAN 10
- [x] VLANs 10/20 configured on the UniFi + MikroTik trunk
- [ ] AM4 and HP builds relocated to their final location and re-verified
- [ ] Proxmox Backup Server targeting external/HP-backed storage
- [ ] Monorepo scaffolded with the full directory structure

## Phase 1 — Cluster Bootstrap — 🟢 Complete

Result: an immutable Talos Linux Kubernetes cluster on Proxmox, adopted into Terraform with verified zero-drift state management and tracked in GitHub — reproducible, version-controlled infrastructure.

- [x] Three-node Talos cluster, Kubernetes 1.35.6, Cilium, kube-proxy replacement
- [x] Machine configs patched with Longhorn extensions, Cilium-only networking
- [x] Cluster bootstrapped, kubeconfig retrieved
- [x] Existing production cluster imported into Terraform state — `terraform plan` returns "No changes"

## Phase 1.5 — Infrastructure Automation — 🟡 In Progress

Goal: go from "Terraform knows about the cluster" to "Terraform can rebuild it from nothing, unattended."

- [ ] Reusable Terraform VM module (parameterize count, name, disk, vCPU/RAM)
- [ ] Remote Terraform state
- [ ] CI on every push: `terraform fmt`, `validate`, `plan`
- [ ] Encrypt Talos secrets with SOPS
- [ ] Documented and tested teardown/rebuild runbook

## Phase 2 — Core Platform — 🟡 In Progress

Result: a GitOps-driven platform core using ArgoCD app-of-apps, Cilium (eBPF CNI, BGP-routed LB-IPAM, Gateway API), cert-manager, Longhorn distributed storage, and Tailscale zero-trust access with ACLs managed as code.

- [x] Cilium installed via Helm — kube-proxy replacement enabled, healthy on all nodes
- [ ] ArgoCD + root app-of-apps (everything enters the cluster through Git from here on)
- [ ] cert-manager with Let's Encrypt
- [ ] ExternalDNS
- [ ] Longhorn for persistent storage
- [ ] Tailscale tailnet across all machines, ACLs as code
- [ ] Gateway API with BGP-routed LoadBalancer IPs
- [ ] Smoke-test demo app deployed entirely via Git commit

## Phase 3 — Platform Services

Secrets, policy, and observability — the difference between a cluster and a platform.

- [ ] Vault + External Secrets Operator
- [ ] Kyverno baseline policies (resource limits, no `:latest`, pod security standards)
- [ ] kube-prometheus-stack + Loki + Alloy
- [ ] Multi-tenancy scaffolding (ResourceQuota, LimitRange, NetworkPolicy, ArgoCD AppProject per namespace)

## Phase 4 — CI/CD & Supply Chain

`git push` → tested → built → scanned → signed → deployed, hands-free.

- [ ] Harbor registry with Trivy scanning
- [ ] Actions Runner Controller (ephemeral, autoscaling GitHub Actions runners)
- [ ] Reusable pipeline: lint → test → build → push → sign with cosign
- [ ] Kyverno policy: only signed images may run in tenant namespaces

## Phase 5 — GPU / AI Platform — 🟡 In Progress

Result: GPU scheduling enabled on a bare-metal Kubernetes node — kernel driver modules configured, containerd patched to route GPU workloads through the NVIDIA container runtime, the Kubernetes device plugin deployed, and verified end-to-end with a CUDA test pod confirming real hardware access from inside a container.

- [x] Talos on AM4 bare metal with NVIDIA system extensions, joined as `am4-gpu`
- [x] Kernel module + containerd NVIDIA runtime configuration
- [x] NVIDIA device plugin deployed
- [x] GPU proven end-to-end with a CUDA test pod (RTX 4070 Ti Super visible inside a container)
- [x] Ollama deployed as a GPU-scheduled workload (`Recreate` strategy, `hostPath` model storage)
- [x] LiteLLM deployed as the unified OpenAI-compatible gateway, routing to Ollama, exposed via NodePort
- [ ] Node tainted/labeled so only GPU workloads schedule there
- [ ] GPU time-slicing so multiple pods can share the card
- [ ] vLLM as a throughput alternative to Ollama
- [ ] Wake-on-LAN scale-to-zero Go controller (`kube-wol-operator`) — the flagship Go artifact for this project

**Phase 5b — dual-boot gaming (optional, same node):** Bazzite installed on a second drive, confirmed it doesn't disturb the Talos install on reboot. Secure Boot MOK key enrollment still pending before the NVIDIA driver works inside Bazzite.

*Exit criteria: from the couch, trigger wake → node joins → model serving within ~5 minutes; idle timeout powers it back down. A single OpenAI-compatible endpoint serves both local and frontier models with cost tracking, budgets, and automatic failover.*

## Phase 6 — Developer Experience / IDP

The layer that makes this a *platform*, not just a cluster.

- [ ] Backstage with a catalog entry for every platform component
- [ ] Golden-path scaffolder template (repo + CI + Helm chart + ArgoCD app + guardrails, one action)
- [ ] Crossplane composition for self-service database provisioning
- [ ] Crossplane AWS provider for a small real cloud footprint (S3, Route53, SQS)
- [ ] Platform CLI in Go (cobra) — second Go artifact

## Phase 7 — Media Server (parallel track) — ✅ Core Goals Met

- [x] Debian on the HP EliteDesk, migrated to its own VLAN
- [x] `mdadm` RAID1 mirror for storage, mounted and persistent
- [x] Media stack live: Jellyfin, Audiobookshelf, Calibre-Web
- [x] Acquisition stack live: gluetun (VPN) + qBittorrent + Sonarr + Radarr + Prowlarr, port forwarding confirmed
- [ ] Compose files and secrets committed to the monorepo (currently living directly on the server)
