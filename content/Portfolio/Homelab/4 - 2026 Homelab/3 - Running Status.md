Tags: [[0 - Overview]] [[0 - HomeLab]]

# Running Status

**Last updated:** August 3, 2026

Live handoff snapshot of the build — what's working, what's proven end-to-end, and what's next. Pairs with [[2 - Build Roadmap|the roadmap]] for the long-term plan.

## Cluster State

```
am4-gpu          Ready    <none>          — bare-metal, 10.10.20.14, RTX 4070 Ti Super, nvidia.com/gpu: 1 allocatable
talos-cp-1       Ready    control-plane   — 10.10.20.11
talos-worker-1   Ready    <none>          — 10.10.20.12
talos-worker-2   Ready    <none>          — 10.10.20.13
```

Talos `v1.13.6`, Kubernetes `v1.35.6`, Cilium `v1.19.5` healthy across all four nodes. Default CNI and kube-proxy disabled in favor of Cilium.

## AI Inference Stack — Working End-to-End

The full chain is proven: **GPU (driver + containerd + device plugin) → Ollama (in-cluster model serving) → LiteLLM (unified OpenAI-compatible gateway) → NodePort access.**

- **GPU enablement:** kernel module + containerd NVIDIA-runtime patch, NVIDIA device plugin, and a CUDA test pod confirmed real hardware access (RTX 4070 Ti Super, 16GB VRAM) from inside a container.
- **Ollama:** deployed with `nodeSelector` pinning it to `am4-gpu`, `runtimeClassName: nvidia`, and a `Recreate` rollout strategy — required, since the cluster has exactly one schedulable GPU and a rolling update would otherwise try (and fail) to schedule a second pod requesting it. Currently serving `gemma4:12b` (~51% VRAM used, comfortable headroom for context growth).
- **LiteLLM gateway:** routes the model name `gemma4-12b` to Ollama's in-cluster service DNS, exposed via a pinned NodePort (`30400`) as a stopgap until Gateway API / Tailscale access lands in Phase 2. Verified with a real `/v1/chat/completions` request.

**Not yet done:** move the LiteLLM auth key out of a ConfigMap into a real Secret, add a Postgres backing store for per-tenant budgets, GPU time-slicing, additional models in the roster, and the Wake-on-LAN scale-to-zero controller.

## Infrastructure as Code

- GitHub repository created and linked; initial scaffold and Terraform commits pushed
- Existing Talos VMs **imported** (not recreated) into Terraform state
- `terraform validate` passes, `terraform plan` returns "No changes" — zero drift against the live cluster
- The AM4 GPU node is bare metal and intentionally sits outside the Proxmox Terraform config

The VM layer is genuinely under Infrastructure as Code now; remaining Terraform work is improving it (modules, variables, CI), not adopting it.

## Bazzite Dual-Boot

Bazzite (gaming OS) installed on the AM4's second drive, with the Talos SSD physically disconnected during install. After reconnecting and moving the machine back into the rack, all four cluster nodes came up `Ready` — confirming the dual-boot setup doesn't disturb the Talos install. Secure Boot MOK key enrollment for the NVIDIA driver is still pending (a first password attempt didn't match on confirm; safe to retry any time).

## Immediate Next Actions

**AI inference**
1. Move LiteLLM's auth key into a real Kubernetes Secret
2. Gateway API route or Tailscale access instead of the NodePort stopgap
3. Load additional models (GLM-4.7-Flash, GPT-OSS 20B, Mistral Small 3.1)
4. GPU time-slicing so multiple pods can share the card
5. Postgres backing store once persistent storage (Longhorn) exists
6. Wake-on-LAN scale-to-zero Go controller

**Platform engineering**
1. Reusable Terraform VM module
2. Encrypt Talos configs with SOPS
3. Write the rebuild runbook
4. CI on every push (`terraform fmt`/`validate`/`plan`)
5. Begin ArgoCD bootstrap

**Media server**
1. Harden qBittorrent credentials (still default/temporary)
2. Verify `iptables-persistent` survives an actual reboot
3. Wire up Prowlarr indexers → Sonarr/Radarr for full library automation

See [[4 - Incidents & Lessons|Incidents & Lessons]] for the debugging stories behind several of the "done" items above.
