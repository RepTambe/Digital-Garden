Tags: [[0 - HomeLab]] [[0 - Projects]]

# Media Stack - Automated Media Server

Built a complete media automation system using Docker Compose on worker-02 with Kubernetes ingress routing. The system automatically downloads, organizes, and serves media based on user requests.

## Sessions

### Session 1: Feb 19, 2026

**Starting Point:** Working k3s cluster with ArgoCD and monitoring
**Ending Point:** Fully automated media server with request -> download -> stream workflow
**Key Accomplishments:** NFS storage, 8 Docker containers, Kubernetes ingress routing, end-to-end automation

---

## Architecture

[[1 - Media Stack Diagram|Full Architecture Diagram]]

The stack runs as a hybrid Kubernetes + Docker Compose deployment:

- **Kubernetes** handles external routing via Traefik Ingress
- **Docker Compose** runs the media applications on worker-02
- **NFS** provides centralized storage from the HP Proxmox host's 3.6TB ZFS pool

### User Flow

```
Request in Jellyseerr -> Auto-downloads -> Watch in Jellyfin
```

### Service Map

| Service | URL | Purpose |
|---------|-----|---------|
| Jellyfin | http://jellyfin.homelab.local | Watch media |
| Jellyseerr | http://jellyseerr.homelab.local | Request content |
| Sonarr | http://sonarr.homelab.local | Manage TV shows |
| Radarr | http://radarr.homelab.local | Manage movies |
| Bazarr | http://bazarr.homelab.local | Manage subtitles |
| Prowlarr | http://prowlarr.homelab.local | Manage indexers |
| Transmission | http://transmission.homelab.local | View downloads |
| Audiobookshelf | http://audiobookshelf.homelab.local | Listen to audiobooks |

---

## Phase 1: NFS Storage Setup

### Problem

worker-02 VM only had 50GB disk - insufficient for media. The HP Proxmox host has a 3.6TB ZFS pool.

### Solution: NFS Mount

Shared the ZFS pool from Proxmox host (10.10.10.11) to worker-02 (10.10.10.22) via NFS.

**On HP Proxmox Host:**

```bash
apt install nfs-kernel-server -y

# /etc/exports
/media-pool 10.10.10.0/24(rw,sync,no_subtree_check,no_root_squash)

exportfs -ra
systemctl enable nfs-kernel-server
```

**On worker-02:**

```bash
sudo apt install nfs-common -y
sudo mkdir -p /mnt/media
sudo mount -t nfs 10.10.10.11:/media-pool /mnt/media

# Permanent mount
echo "10.10.10.11:/media-pool /mnt/media nfs defaults,_netdev 0 0" | sudo tee -a /etc/fstab
```

### Storage Layout

```
/media-pool/ (3.6TB ZFS on HP Proxmox)
├── tv/               # Sonarr imports here
├── movies/           # Radarr imports here
├── anime/            # Sonarr anime imports here
├── downloads/        # Transmission downloads here
│   ├── complete/
│   └── incomplete/
├── config/           # Persistent configs
│   ├── sonarr/
│   ├── radarr/
│   ├── jellyfin/
│   ├── bazarr/
│   ├── prowlarr/
│   ├── transmission/
│   ├── jellyseerr/
│   └── audiobookshelf/
├── audiobooks/
├── books/
└── music/            # Future
```

---

## Phase 2: Docker Compose Deployment

Installed Docker on worker-02 and deployed 8 containers via docker-compose.

**Why Docker Compose instead of Kubernetes?**
- Simpler for stateful apps - single yaml vs many k8s manifests
- Direct NFS mount access without PVC complexity
- Lower overhead for single-node workloads

### Components

**Media Management:**
- **Sonarr** - TV show automation (port 8989)
- **Radarr** - Movie automation (port 7878)
- **Bazarr** - Subtitle automation (port 6767)
- **Prowlarr** - Centralized indexer management (port 9696)

**Download & Discovery:**
- **Transmission** - Torrent client (port 9091)
- **Prowlarr** - Indexes torrents from multiple sources

**User Interface:**
- **Jellyfin** - Media streaming server (port 8096)
- **Jellyseerr** - User request management (port 5055)
- **Audiobookshelf** - Audiobook and podcast server (port 13378)

### Deployment

```bash
cd ~/media-stack
docker-compose up -d
```

All containers share a `media` bridge network and communicate by container name (Docker DNS).

---

## Phase 3: Kubernetes Ingress Configuration

### Challenge

Docker containers run outside Kubernetes, but we want k8s Traefik Ingress to route to them.

### Solution: Headless Services + Manual Endpoints

For each Docker container, created three Kubernetes resources:

1. **Headless Service** (`clusterIP: None`) - Abstract pointer
2. **Endpoints** - Actual IP:port of Docker container on worker-02
3. **Ingress** - Routing rule based on hostname

**How it works:**

```
Browser: jellyfin.homelab.local
    -> DNS (/etc/hosts): 10.10.10.50
    -> Traefik reads Ingress rules
    -> Ingress: jellyfin.homelab.local -> jellyfin-external Service
    -> Service (headless): Look up Endpoints
    -> Endpoints: 10.10.10.22:8096
    -> Traefik proxies to worker-02
    -> Jellyfin responds
```

All 8 services route through Traefik at 10.10.10.50 using HTTP Host header-based routing.

---

## Phase 4: Application Configuration

### Prowlarr (Central Indexer Management)

Connected Prowlarr to Sonarr and Radarr for automatic indexer sync. Added public indexers (EZTV, YTS, TorrentGalaxy, Nyaa) that automatically propagate to both apps.

**Key insight:** Use container names (`http://sonarr:8989`) for inter-container communication, not `.homelab.local` domains which only resolve on the host.

### Transmission (Download Client)

Added as download client in both Sonarr and Radarr using container name `transmission:9091`.

### Jellyfin (Media Server)

Configured libraries:
- `/data/tvshows` -> `/mnt/media/tv` -> `/media-pool/tv`
- `/data/movies` -> `/mnt/media/movies` -> `/media-pool/movies`

### Jellyseerr (Request Management)

Connected to Jellyfin for auth, Sonarr for TV, and Radarr for movies. Users request content here and it flows through the entire automation pipeline.

---

## Phase 5: End-to-End Testing

### Automation Flow

```
1. User requests content in Jellyseerr
2. Jellyseerr sends request to Sonarr/Radarr
3. Sonarr/Radarr searches indexers via Prowlarr
4. Finds best torrent, sends to Transmission
5. Transmission downloads to /downloads/complete/
6. Sonarr/Radarr imports and renames file to /tv or /movies
7. Bazarr downloads subtitles
8. Jellyfin detects new media in library
9. User watches in Jellyfin
```

Tested successfully - full pipeline from request to playback working.

---

## Troubleshooting

### NFS Permission Issues

NFS UID mapping broken - files owned by UID 1000 on Proxmox showed as UID 0 on worker-02. Workaround: changed Sonarr/Radarr containers to run as UID 0 (root). Acceptable for homelab but should be fixed properly.

### ExternalName Services Failed

Initially tried ExternalName services for k8s -> Docker routing. Traefik couldn't resolve direct IPs. Switched to headless Services + Endpoints pattern which works reliably.

### Seerr vs Jellyseerr

Attempted Seerr first but hit NFS permission errors. Reverted to Jellyseerr which handles it better.

---

## Key Concepts Learned

### Hybrid k8s + Docker Architecture

Kubernetes handles professional routing via Ingress, Docker Compose simplifies stateful app management. Best of both worlds.

### Prowlarr vs Jackett

Prowlarr provides central indexer management with automatic sync to all *arr apps. Jackett requires manual per-app configuration.

### Container Networking

Containers on same Docker network use DNS by container name. Host `/etc/hosts` entries don't resolve inside containers.

### External Services in Kubernetes

Pattern: Headless Service + Manual Endpoints + Ingress. Bypasses selector requirement since Docker containers aren't k8s Pods.

---

## Known Issues

- NFS UID mapping broken - running Sonarr/Radarr as root
- Manual /etc/hosts required - need Pi-hole for network-wide DNS
- No SSL - all traffic over HTTP (internal network only)

## Next Steps

- Fix NFS permissions (debug NFSv4 idmapd)
- Deploy Pi-hole for network-wide DNS
- Add SSL certificates via cert-manager
- Configure quality profiles for preferred resolutions
- Add Lidarr (music) and Readarr (ebooks)
