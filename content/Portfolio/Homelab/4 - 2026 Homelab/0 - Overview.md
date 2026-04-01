Tags: [[0 - HomeLab]] [[0 - Projects]] [[Networking-Computer]]

# 2026 Homelab Overview

My 2026 homelab is a layered infrastructure environment designed to support local AI inference, media services, storage, and hands-on platform engineering work.

The core design decision is separation of concerns. Compute, control, data, and user access each have a defined place in the system so that experimentation does not compromise stability and production-like services do not interfere with learning work. It is also the environment I am using to move toward MLOps engineering by learning how AI serving infrastructure behaves in a system that has to be designed and operated deliberately.

## Core Layers

- AI compute layer for local GPU inference
- Control layer for routing, reverse proxying, and orchestration
- Data layer for media, storage, and downloads
- Interface layer for workstation access and development

## What This Environment Supports

- Local-first AI inference with cloud fallback
- Stable media services using the ARR stack
- Safe RHCSA and Rocky Linux experimentation
- A practical base for future platform engineering projects
- A hands-on path into MLOps through model serving, routing, and AI infrastructure operations

## Current Node Roles

### AI Node

Dedicated GPU compute host for model serving and inference workloads.

- Platform: AM4
- GPU: RTX 4070 Ti Super with 16 GB VRAM
- RAM target: 64 GB
- OS: Ubuntu Server 24.04
- Primary services: `vLLM`, `Ollama`
- Future service: `ComfyUI`

### Control and Lab Node

The control-plane host runs the gateway, virtualization layer, and practice environments used for operating system and infrastructure work.

- Hardware: Optiplex 3080 SFF
- CPU: Intel i5
- RAM target: 32 to 64 GB
- OS: Proxmox

### Media and Storage Node

A stable data platform for media serving, download automation, and photo management.

- Hardware: HP Elitedesk G4
- RAM target: 16 to 32 GB
- Storage: 2 x 4 TB HDD plus 256 GB NVMe
- OS: Ubuntu Server 24.04
- Primary services: Jellyfin, Sonarr, Radarr, Prowlarr, qBittorrent, Immich

### Main Workstation

The workstation is the primary operator interface into the environment rather than part of the server layer itself.

- Platform: AM5
- GPU: RX 7800 XT or equivalent
- OS: Windows with optional dual boot
- Usage: SSH, VS Code, Parsec, gaming

## Design Principles

### One Machine, One Job

- The AI node handles compute
- The Optiplex handles control and experimentation
- The Elitedesk handles data and media

### Local-First AI

Local GPU inference is the default path. Cloud APIs are used as fallback rather than as the primary architecture.

### Stable Systems Stay Stable

Stable services stay on stable nodes. Experimental work belongs on the lab infrastructure.

### Minimal Complexity First

Additional orchestration only gets introduced when it solves a real operational problem. Complexity is treated as a cost, not a milestone.

## Supporting Notes

[[1 - Architecture|2026 Architecture]]
[[2 - Build Roadmap|2026 Build Roadmap]]
[[README|GitHub README Draft]]
