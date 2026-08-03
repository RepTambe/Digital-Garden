# Homelab — Platform Engineering Build

A production-grade internal developer platform (IDP), built at home on three machines, treated the way a real platform team treats its infrastructure: everything in Git, every decision written down.

## What This Is

Not a pile of self-hosted services — a **platform with tenants**. The "tenants" are workloads: AI inference, personal projects, demo apps, and (eventually) the media stack. Success is measured by self-service: a new service goes from `git init` to running-in-cluster with monitoring, TLS, and CI/CD without manual cluster surgery.

## Stack

- **Talos Linux** — immutable, API-driven Kubernetes node OS, no SSH, no config drift
- **Cilium** — eBPF CNI, kube-proxy replacement, Gateway API, LB-IPAM
- **Terraform** — VM layer adopted with verified zero drift
- **ArgoCD** (in progress) — GitOps app-of-apps, nothing reaches the cluster without a Git commit
- **NVIDIA GPU Operator + LiteLLM** — a bare-metal GPU worker node serving local models behind a unified OpenAI-compatible gateway, with hosted-model fallback
- **Tailscale** (in progress) — zero-trust remote access, ACLs as code
- **Vault, Kyverno, kube-prometheus-stack** (planned) — secrets, policy, and observability as platform services, not afterthoughts

## Hardware

| Machine | Role |
| --- | --- |
| Dell OptiPlex 3080 SFF | Proxmox host — runs the Talos control plane + worker VMs |
| AM4 desktop (RTX 4070 Ti Super) | Bare-metal GPU worker, dual-boots into a gaming OS on a second drive |
| HP EliteDesk 800 G4 | Standalone media server — deliberately kept outside the cluster |

## Current Status

Three-node Talos cluster running Kubernetes with Cilium, imported into Terraform with confirmed zero drift. GPU node joined and fully schedulable — proven end-to-end with a CUDA test pod, now running Ollama behind a LiteLLM gateway serving real inference requests. GitOps (ArgoCD), secrets management (Vault), and observability are the next layer.

See the full build log: [[0 - Overview|Overview]] · [[1 - Architecture|Architecture & Decisions]] · [[2 - Build Roadmap|Roadmap]] · [[3 - Running Status|Running Status]] · [[4 - Incidents & Lessons|Incidents & Lessons]]

## What This Project Demonstrates

- Immutable infrastructure design and GitOps discipline
- Terraform adoption of existing infrastructure with zero-drift verification
- Bare-metal GPU enablement in Kubernetes (kernel drivers → containerd runtime → device plugin)
- Real incident response and root-causing across network, storage, and container layers
- A platform-with-tenants architecture, not a single-host container deployment
