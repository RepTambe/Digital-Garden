Tags: [[0 - Overview]] [[0 - HomeLab]]

# 2026 Build Roadmap

This roadmap tracks the environment from initial hardware bring-up toward a more complete local and hybrid platform.

## Phase 1: Base Infrastructure

- [x] Ubuntu installed on the AI node
- [x] NVIDIA drivers working
- [ ] Proxmox installed on the Optiplex
- [ ] Ubuntu installed on the Elitedesk

## Phase 2: AI Serving

- [ ] Deploy `vLLM`
- [ ] Build the FastAPI gateway
- [ ] Implement basic local routing

## Phase 3: Media Platform

- [ ] Deploy the ARR stack
- [ ] Configure storage mounts
- [ ] Deploy Immich

## Phase 4: Hybrid Routing and Visibility

- [ ] Add cloud fallback integration
- [ ] Add logging and metrics

## Phase 5: Optional Platform Expansion

- [ ] Stand up a k3s cluster
- [ ] Add a monitoring stack
- [ ] Add CI/CD pipelines

## What Success Looks Like

- Local AI inference works reliably on the dedicated GPU node
- Media services remain stable and isolated from experiments
- Gateway routing is simple enough to maintain but flexible enough to grow
- The lab continues to support RHCSA work and future platform engineering projects
