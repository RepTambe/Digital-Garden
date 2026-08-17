Tags: [[0 - Overview]] [[0 - HomeLab]]

# Running Status

**Last updated:** August 17, 2026

Live handoff snapshot of the build — what's working, what's proven end-to-end, and what's next. Pairs with [[2 - Build Roadmap|the roadmap]] for the long-term plan.

**Headline (Aug 17):** ArgoCD is live with a root app-of-apps, and the first real GitOps workloads are running. LiteLLM and `llama.cpp` are both Argo-managed; LiteLLM is hardened and its master key is out of the ConfigMap; `llama.cpp` serves Qwen 3.8 27B at 73,728 context with native MTP on the 4070 Ti Super, routed through LiteLLM and verified end-to-end.

## Cluster State

```
am4-gpu          Ready    <none>          — bare-metal, 10.10.20.14, RTX 4070 Ti Super, nvidia.com/gpu: 1 allocatable
talos-cp-1       Ready    control-plane   — 10.10.20.11
talos-worker-1   Ready    <none>          — 10.10.20.12
talos-worker-2   Ready    <none>          — 10.10.20.13
```

Talos `v1.13.6`, Kubernetes `v1.35.6`, Cilium `v1.19.5` healthy across all four nodes. Default CNI and kube-proxy disabled in favor of Cilium. The GPU is fully schedulable — kernel modules, containerd NVIDIA runtime, and device plugin all verified end-to-end with a CUDA test pod (driver 580.167.08, CUDA 13.0).

## GitOps — ArgoCD Now Owns Deployments

ArgoCD is bootstrapped and managing real workloads. A `homelab-root` Application watches `RepTambe/homelab-platform`, `main`, path `kubernetes/apps`; child apps enter the cluster through Git from here on.

- **Self-heal proven:** manually scaled the `demo` Deployment to 3 replicas with `kubectl`; Argo detected the drift and restored the Git-declared value of 1.
- **Current Applications:** `homelab-root`, `demo`, `litellm`, `llamacpp` — all `Synced` / `Healthy`.
- The old three-node / Terraform-first workflow is superseded: new platform services should be committed to Git and reconciled by Argo, not applied by hand.

## AI Inference Stack — Working End-to-End

The full chain is proven: **GPU (driver + containerd + device plugin) → `llama.cpp` (Qwen 3.8 27B, in-cluster) → LiteLLM (unified OpenAI-compatible gateway) → NodePort access.** The normal path is LAN client → LiteLLM `:30400` → `llamacpp.ai.svc.cluster.local:8080` → Qwen. Direct `kubectl port-forward` to llama.cpp is only a debugging tool.

- **`llama.cpp` (primary GPU workload):** GitOps-managed under `kubernetes/ai/llamacpp/`, upstream `ghcr.io/ggml-org/llama.cpp:server-cuda` (no custom Dockerfile needed), pinned to `am4-gpu` with `runtimeClassName: nvidia`, `Recreate` strategy, HF cache persisted at `/var/lib/llamacpp-models`, real `/health` readiness probe. Serves `Qwen3.8-27B-UD-Q3_K_XL.gguf` at context `73728`, main KV `q4_1`, MTP draft KV `q5_1`, native `draft-mtp` (`n-max=2`), Flash Attention on. **Fit gotcha:** leave GPU layers on auto-fit (`--fit on --fit-target 256`) and add `--no-mmproj`; forcing `-ngl 99` breaks auto-fit and causes CUDA OOM at 73k.
- **LiteLLM gateway:** GitOps-managed under `kubernetes/ai/litellm/`, hardened non-root image (`ghcr.io/berriai/litellm-non_root:main-latest`, UID/GID 101, dropped caps, `allowPrivilegeEscalation: false`, `RuntimeDefault` seccomp). Master key rotated **out of the ConfigMap** into Kubernetes Secret `litellm-secrets` (injected as `LITELLM_MASTER_KEY`). Routes `qwen3.8-27b` → llama.cpp; the `gemma4-12b` → Ollama route stays configured but is unavailable while Ollama is scaled to 0. NodePort `30400` remains the LAN-facing stopgap.
- **Ollama:** still installed with its persistent model store (`gemma4:12b`, `qwen3.6:27b` on disk), but **scaled to 0** so llama.cpp can own the single GPU. Don't scale it back to 1 until GPU time-slicing exists.

**Measured results (RTX 4070 Ti Super 16GB):** direct llama.cpp ~149 prompt tok/s, ~56 gen tok/s, 129/130 MTP draft tokens accepted (~99.2%). Through LiteLLM, ~51 tok/s (87/89 accepted) and ~66 tok/s (22/22 accepted) on a later short request. `/v1/models` reports `n_ctx=73728`.

**Not yet done:** Gateway API / Tailscale exposure to retire the NodePort; SOPS/Vault + External Secrets so the LiteLLM key is rebuild-safe (the current Secret is created out-of-band); pin mutable `:main-latest` / `:server-cuda` tags; Postgres backing store + per-tenant budgets/virtual keys; GPU time-slicing so Ollama and llama.cpp can coexist; resource requests/limits + placement so LiteLLM stays off the GPU node; the Wake-on-LAN scale-to-zero Go controller.

## Infrastructure as Code

- GitHub repository `RepTambe/homelab-platform` created and linked; scaffold and Terraform commits pushed
- Existing Talos VMs **imported** (not recreated) into Terraform state
- `terraform validate` passes, `terraform plan` returns "No changes" — zero drift against the live cluster
- The AM4 GPU node is bare metal and intentionally sits outside the Proxmox Terraform config

The VM layer is genuinely under Infrastructure as Code now; remaining Terraform work is improving it (modules, remote state, CI), not adopting it.

## Bazzite Dual-Boot — Installed & Confirmed

Bazzite (Fedora Atomic gaming OS) installed on the AM4's Seagate 2TB HDD with the Talos SSD physically disconnected during install. After reconnecting and re-racking, all four cluster nodes came up `Ready` — the dual-boot doesn't disturb Talos. **CSM/Legacy Boot in BIOS was the root cause** of a long install-time troubleshooting chain (Ventoy kept falling through to a leftover Ubuntu 24.04 install); disabling CSM fixed it immediately (see [[4 - Incidents & Lessons|Incidents & Lessons]] and ADR-015). Secure Boot MOK key enrollment for the NVIDIA driver is **still pending** — first password attempt didn't match on confirm; safe to retry any time with a short, simple password.

## Daily Brief (Phase 6.5) — Design Finalized, Build Starting

A production-style **Go** backend service that aggregates GitHub activity, notes, calendar, and weather into a daily briefing — the deliberate answer to "infra skills are real, but where's the software engineering?" **Built independently for the learning value**; AI assistance is scoped to architecture, hints, debugging, and review — *no code merged that can't be explained line-by-line.*

- Lives in its **own** repo `RepTambe/daily-brief` (not yet created), separate from `homelab-platform`, which owns only deploy/config. This makes the interview story two defensible pieces: "I built a Go service, then deployed it on the platform I built."
- LLM synthesis calls the **already-running in-cluster LiteLLM gateway** (`http://litellm.ai.svc.cluster.local:4000`, model `qwen3.8-27b`) — no new AI infra. Auth must come from a Secret, and calls need real timeout/retry/degradation handling since the single GPU pod can queue.
- Build order: V0.1 local skeleton → V0.2 GitHub integration → V0.3 Postgres → V0.4 scheduler → V0.5 LLM synthesis → V0.6 ntfy delivery → V1.0 full production deploy.

## Immediate Next Actions

**AI inference**
1. Gateway API route or Tailscale access instead of the NodePort stopgap
2. Move the LiteLLM key from the out-of-band Secret to SOPS/Vault + External Secrets
3. Pin the tested LiteLLM and llama.cpp images to immutable versions/digests
4. Postgres backing store once persistent storage (Longhorn) exists, then virtual keys/budgets
5. Decide whether GPU time-slicing is worth it; until then treat Ollama and llama.cpp as mutually exclusive GPU owners
6. Actually *use* the Qwen endpoint for real coding / Daily Brief work before more tuning
7. Retry Bazzite's MOK enrollment

**Platform engineering**
1. Continue Phase 2 through GitOps: cert-manager, ExternalDNS, Longhorn, Tailscale, Gateway API
2. Reusable Terraform VM module + remote state
3. Encrypt Talos configs with SOPS
4. Write/test the rebuild runbook
5. CI on every push (`terraform fmt`/`validate`/`plan`)
6. Migrate remaining hand-applied resources under ArgoCD

**Media server**
1. Harden qBittorrent credentials (still default/temporary)
2. Verify `iptables-persistent` survives an actual reboot
3. Commit compose files + `.env` (SOPS-encrypted) to the monorepo
4. Wire Prowlarr indexers → Sonarr/Radarr for full library automation

**Quick cleanup**
1. Identify what's on MikroTik `ether2` before labeling ports (unplug/replug test)

See [[4 - Incidents & Lessons|Incidents & Lessons]] for the debugging stories behind several of the "done" items above (control-plane VM not powered on, the Ventoy boot-order race, the VLAN 40 migration outage, and the CSM/Bazzite chain).
