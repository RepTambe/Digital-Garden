Tags: [[0 - HomeLab]] [[0 - Projects]] [[Networking-Computer]]

# 2026 Homelab Overview

**Goal:** build a production-grade internal developer platform (IDP) at home, run the way a real platform engineering team would run it.
**Started:** July 2026

The lab is not a pile of services — it's a **platform with tenants**. The platform team is me; the "tenants" are workloads (AI inference, personal projects, demo apps, and eventually the media stack). Success is measured by self-service: a new service should go from `git init` to running-in-cluster with monitoring, TLS, and CI/CD without any manual cluster surgery.

## Hardware Inventory

| Machine | Specs | Role | Power profile |
| --- | --- | --- | --- |
| Dell OptiPlex 3080 SFF | i5-10500 (6c/12t), 64GB DDR4, 256GB NVMe + 512GB SATA SSD | Proxmox host — runs the Talos cluster VMs + management VM | 24/7 (~15–25W idle) |
| AM4 desktop | Ryzen, 32GB DDR4, RTX 4070 Ti Super (16GB VRAM) | Bare-metal GPU node — joins the cluster for AI workloads | On-demand via Wake-on-LAN |
| HP EliteDesk 800 G4 SFF | i5-8500 (6c/6t), 32GB DDR4, 2× 4TB HDD | Standalone media server — Jellyfin + Audiobookshelf | 24/7 (~25–35W) |

Estimated baseline electricity: ~$6/month (Dell + HP running 24/7, AM4 powered off when idle).

## Core Layers

- **Compute** — GPU-backed AI inference (bare-metal Talos worker)
- **Control plane** — Kubernetes cluster on Proxmox VMs (Talos + Cilium + ArgoCD)
- **Data** — persistent storage, secrets, and the standalone media stack
- **Interface** — CI/CD, developer golden paths, and self-service tooling

## Design Principles

1. **Git or it didn't happen.** No manual changes to the cluster — Talos has no SSH, so if a fix wasn't committed, it isn't real.
2. **Rebuild > repair.** If a node misbehaves, replace it. Test the rebuild runbook regularly.
3. **The media server is not a lab.** It's a household-critical appliance, not an experiment target — see [[1 - Architecture#adr-003-media-server-stays-outside-the-cluster|ADR-003]].
4. **Document decisions, not just configs.** Every significant choice becomes an ADR.
5. **Every phase ends in something concrete and working**, not a partial setup left "good enough."
6. **Friction is signal.** When my own golden path annoys me, that's the platform backlog.

## Current Architecture Maturity

| Layer | Status |
| --- | --- |
| Networking (VLANs, switch/router config) | ✅ |
| Proxmox | ✅ |
| Terraform VM layer | ✅ |
| Talos | ✅ |
| Kubernetes | ✅ |
| Cilium | ✅ |
| GitHub | ✅ |
| GitOps (ArgoCD) | ✅ |
| Remote access / Tailscale core path | ✅ |
| Cilium Gateway API | 🟡 |
| Go software artifact (Daily Brief) | 🟡 |
| Secrets (SOPS/Vault) | 🟡 |
| Observability | ⬜ |
| Developer platform (Backstage, golden paths) | ⬜ |
| AI platform (GPU node, LiteLLM, llama.cpp) | 🟡 |

## What This Environment Supports

- Local-first AI inference on a bare-metal Kubernetes GPU node, unified behind an OpenAI-compatible gateway and reachable from anywhere over a private tailnet — no ports forwarded
- A GitOps-driven Kubernetes platform built on immutable infrastructure (Talos)
- A Go tenant application ([[3 - Running Status|Daily Brief]]) built to prove the platform from the consumer side
- Stable media services isolated from the experimental cluster
- Certification study (CKA) that doubles as hands-on build work

## Supporting Notes

[[1 - Architecture|Architecture & Decisions]]
[[2 - Build Roadmap|Build Roadmap]]
[[3 - Running Status|Running Status]]
[[4 - Incidents & Lessons|Incidents & Lessons]]
[[README|GitHub README Draft]]
