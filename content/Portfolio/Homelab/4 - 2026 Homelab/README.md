# Homelab — Platform Engineering Build

A production-grade internal developer platform (IDP), built at home on three machines, treated the way a real platform team treats its infrastructure: everything in Git, every decision written down.

## What This Is

Not a pile of self-hosted services — a **platform with tenants**. The "tenants" are workloads: AI inference, personal projects, demo apps, and (eventually) the media stack. Success is measured by self-service: a new service goes from `git init` to running-in-cluster with monitoring, TLS, and CI/CD without manual cluster surgery.

## Stack

- **Talos Linux** — immutable, API-driven Kubernetes node OS, no SSH, no config drift
- **Cilium** — eBPF CNI, kube-proxy replacement, Gateway API, LB-IPAM
- **Terraform** — VM layer adopted with verified zero drift
- **ArgoCD** — GitOps app-of-apps; nothing reaches the cluster without a Git commit
- **NVIDIA device plugin + llama.cpp + LiteLLM** — a bare-metal GPU worker serving Qwen 3.8 27B at 73k context behind a unified OpenAI-compatible gateway
- **Tailscale** — zero-trust remote access via the Kubernetes Operator; the AI gateway is tailnet-only, with ACLs-as-code still to come
- **Vault, Kyverno, kube-prometheus-stack** (planned) — secrets, policy, and observability as platform services, not afterthoughts

## Hardware

| Machine | Role |
| --- | --- |
| Dell OptiPlex 3080 SFF | Proxmox host — runs the Talos control plane + worker VMs |
| AM4 desktop (RTX 4070 Ti Super) | Bare-metal GPU worker, dual-boots into a gaming OS on a second drive |
| HP EliteDesk 800 G4 | Standalone media server — deliberately kept outside the cluster |

## Current Status

Four-node Talos cluster (3 VMs + 1 bare-metal GPU worker) running Kubernetes with Cilium, imported into Terraform with confirmed zero drift. ArgoCD owns deployments, with self-heal proven against deliberate live drift. The GPU node serves Qwen 3.8 27B through `llama.cpp` behind a LiteLLM gateway, exposed as a **private tailnet-only HTTPS service** — the LAN NodePort has been retired. Next layers: Gateway API for LAN routing, secrets management (SOPS/Vault + External Secrets), Longhorn storage, and observability.

See the full build log: [[0 - Overview|Overview]] · [[1 - Architecture|Architecture & Decisions]] · [[2 - Build Roadmap|Roadmap]] · [[3 - Running Status|Running Status]] · [[4 - Incidents & Lessons|Incidents & Lessons]]

## What This Project Demonstrates

- Immutable infrastructure design and GitOps discipline
- Terraform adoption of existing infrastructure with zero-drift verification
- Bare-metal GPU enablement in Kubernetes (kernel drivers → containerd runtime → device plugin)
- Zero-trust service exposure (Tailscale Operator, MagicDNS, identity-based access) replacing port-based access
- Real incident response and root-causing across network, storage, and container layers
- A platform-with-tenants architecture, not a single-host container deployment
