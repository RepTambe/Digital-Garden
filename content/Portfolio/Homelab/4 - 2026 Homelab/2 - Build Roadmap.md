Tags: [[0 - Overview]] [[0 - HomeLab]]

# 2026 Build Roadmap

Six-month platform build, phased so each stage ends in a clear, working exit criteria. Full detail lives in the build repo's `ROADMAP.md`. See [[3 - Running Status|the running status]] for the live handoff snapshot.

## Phase 0 — Foundations — 🟡 Partially Met

Clean slate, network in place, repo scaffolded.

- [x] Proxmox installed on the Dell, reachable on VLAN 10
- [x] VLANs 10/20/40 configured on the UniFi + MikroTik trunk
- [ ] Proxmox Backup Server targeting external/HP-backed storage
- [ ] Monorepo scaffolded with the full directory structure

*Note: the original Phase 0 checklist (physical staging, BIOS steps, WoL test-before-relocation) predates most of the actual build and was never retroactively checked off item-by-item. In practice all three machines are built, racked, and reachable — the underlying goals are effectively met.*

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

Result: a GitOps-driven platform core using ArgoCD app-of-apps, Cilium (eBPF CNI, BGP-routed LB-IPAM, Gateway API), cert-manager, Longhorn distributed storage, and Tailscale zero-trust access with ACLs managed as code. **GitOps is now the front of this phase — it changes how every subsequent piece gets deployed.**

- [x] **ArgoCD + root app-of-apps** — `homelab-root` watches `kubernetes/apps` in `RepTambe/homelab-platform`, `Synced` / `Healthy`; everything enters the cluster through Git from here on
- [x] **First GitOps workload + self-heal proven** — `demo` app deployed entirely by Git commit; manually scaled to 3 replicas and watched Argo restore the Git-declared 1. LiteLLM and llama.cpp are now Argo-managed too
- [x] Cilium v1.19.5 healthy on all four nodes with kube-proxy replacement and the L7 proxy enabled — applied as a **rendered manifest, not a live Helm release**, which changes how every future values change has to be made
- [x] **Tailscale zero-trust access (core path)** — the Kubernetes Operator deployed *through ArgoCD*, `tag:k8s-operator`/`tag:k8s` defined in tailnet policy, a least-privilege OAuth client issued with credentials out of Git, LiteLLM exposed through a Tailscale-managed Ingress with MagicDNS + HTTPS at `https://litellm.tail33031c.ts.net`, `chief` joined and verified end-to-end, and NodePort `30400` retired
- [x] **Gateway API readiness audited** without changing cluster networking — Cilium source-of-truth located, rendered-not-Helm confirmed, Gateway API CRDs confirmed absent
- [ ] cert-manager with Let's Encrypt
- [ ] ExternalDNS
- [ ] Longhorn for persistent storage
- [ ] Finish the Tailscale track: remaining machines joined, subnet router on the mgmt host, ACL/grant policy as code in the monorepo
- [ ] Enable Gateway API on the existing Cilium version (CRDs → `gatewayAPI.enabled` → re-render v1.19.5 → `GatewayClass` → shared `Gateway` + first `HTTPRoute`) and settle the LB-IPAM exposure model
- [ ] Smoke-test demo app with Gateway route + TLS + PVC, all via Git commit

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
- [x] Kernel module + containerd NVIDIA runtime configuration (device plugin alone wasn't enough — see ADR-013)
- [x] NVIDIA device plugin deployed
- [x] GPU proven end-to-end with a CUDA test pod (RTX 4070 Ti Super visible inside a container)
- [x] Ollama deployed as a GPU-scheduled workload (`Recreate` strategy, `hostPath` model storage) — now scaled to 0 while llama.cpp owns the GPU
- [x] **`llama.cpp` + CUDA deployed via ArgoCD** — upstream `server-cuda` image serving Qwen 3.8 27B at 73,728 context with native MTP; auto-fit required (forcing `-ngl 99` caused CUDA OOM)
- [x] LiteLLM deployed as the unified OpenAI-compatible gateway, hardened + GitOps-managed, routing `qwen3.8-27b` → llama.cpp — now ClusterIP-only behind the Tailscale HTTPS ingress
- [ ] Node tainted/labeled so only GPU workloads schedule there
- [ ] GPU time-slicing so multiple pods can share the card
- [ ] vLLM — only if a real workload justifies it; llama.cpp covers the long-context/MTP coding use case for now
- [ ] Wake-on-LAN scale-to-zero Go controller (`kube-wol-operator`) — the flagship Go artifact for this project

**Phase 5a — LiteLLM gateway:** deployed and GitOps-managed with a hardened non-root image; master key rotated out of the ConfigMap into Secret `litellm-secrets`; now privately exposed over the tailnet at `https://litellm.tail33031c.ts.net` with the NodePort stopgap removed. Still to do: Postgres backing store, fully declarative secrets (Vault/ESO), per-tenant virtual keys/budgets, hosted-model fallback routing, Prometheus metrics, and an Open WebUI frontend.

**Phase 5b — dual-boot gaming (optional, same node):** Bazzite installed on the 2TB HDD, confirmed it doesn't disturb Talos on reboot; boot order set; Ventoy USB removed. Secure Boot MOK key enrollment still pending before the NVIDIA driver works inside Bazzite. Still untested: node showing `NotReady` while booted into the gaming OS.

*Exit criteria: from the couch, trigger wake → node joins → model serving within ~5 minutes; idle timeout powers it back down. A single OpenAI-compatible endpoint serves both local and frontier models with cost tracking, budgets, and automatic failover.*

## Phase 6 — Developer Experience / IDP

The layer that makes this a *platform*, not just a cluster.

- [ ] Backstage with a catalog entry for every platform component
- [ ] Golden-path scaffolder template (repo + CI + Helm chart + ArgoCD app + guardrails, one action)
- [ ] Crossplane composition for self-service database provisioning
- [ ] Crossplane AWS provider for a small real cloud footprint (S3, Route53, SQS)
- [ ] Platform CLI in Go (cobra) — second Go artifact

## Phase 6.5 — Daily Brief: Production Go Backend — 🟡 In Progress (Go fundamentals / V0.1)

A real, operated Go tenant application — the deliberate answer to the gap check against *Software Engineer, Infrastructure* postings (Go depth, testing, API design), not another platform component. **Built independently for the learning value; no code merged that can't be explained line-by-line.**

- Lives in its **own** repo `RepTambe/daily-brief` — now created, with its own Go module (separate from `homelab-platform`, which owns only deploy/config) — a clean "I built a Go service, then operated it on the platform I built" story
- **Day 1 done (Aug 17):** deliberate fundamentals rather than features — TDD red/green/refactor as a loop, table-driven tests and subtests, slices/`range`/blank identifier, string normalization with `TrimSpace`/`Join`, and composition through `Title`, `FormatItems`, and `Build`. Suite green. **Day 2:** a `Brief` struct with a failing `Brief.String()` test written first
- **Self-imposed constraint:** no HTTP, Postgres, Kubernetes, or external APIs until structs → methods → domain modeling is genuinely understood — the point is Go depth, not a deployed toy
- LLM synthesis calls the in-cluster LiteLLM gateway (`qwen3.8-27b`); auth from a Secret, with real timeout/retry/degradation handling
- Build order, software-first: V0.1 local skeleton → V0.2 GitHub integration → V0.3 Postgres → V0.4 scheduler/reliability → V0.5 LLM synthesis → V0.6 ntfy delivery → V1.0 production deploy (CI/CD, Helm, ArgoCD, observability)
- Runs locally first — platform work must not block application development

## Phase 7 — Media Server (parallel track) — ✅ Core Goals Met

- [x] Debian on the HP EliteDesk, migrated to its own VLAN (Lab-Media, VLAN 40)
- [x] `mdadm` RAID1 mirror for storage, mounted and persistent (one failed drive replaced)
- [x] Media stack live: Jellyfin, Audiobookshelf, Calibre-Web
- [x] Acquisition stack live: gluetun (OpenVPN — WireGuard never worked, see ADR-010) + qBittorrent + Sonarr + Radarr + Prowlarr, port forwarding confirmed
- [ ] Compose files and secrets committed to the monorepo (SOPS-encrypted; currently living on the server)
- [ ] Nightly config backup to the Dell's spare capacity

## Architecture Maturity

| Layer | Status |
| --- | :---: |
| Networking (VLANs, switch/router) | ✅ |
| Proxmox | ✅ |
| Terraform VM layer | ✅ |
| Talos / Kubernetes / Cilium | ✅ |
| GitHub | ✅ |
| GitOps (ArgoCD) | ✅ |
| Remote access / Tailscale core path | ✅ |
| Cilium Gateway API | 🟡 |
| Go software artifact (Daily Brief) | 🟡 |
| Secrets (SOPS/Vault) | 🟡 |
| Observability | ⬜ |
| Developer platform (Backstage, golden paths) | ⬜ |
| AI platform (GPU node, LiteLLM, llama.cpp) | 🟡 |
