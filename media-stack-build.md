# Media Stack Build - Complete Automation Setup

**Date:** February 19, 2026  
**Duration:** ~5 hours  
**Starting Point:** Working k3s cluster with ArgoCD and monitoring  
**Ending Point:** Fully automated media server with request → download → stream workflow

---

## Overview

Built a complete media automation system using Docker Compose on worker-02 with Kubernetes ingress routing. The system automatically downloads, organizes, and serves media based on user requests.

### Final Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    USER EXPERIENCE                         │
│                                                            │
│  Request in Jellyseerr → Auto-downloads → Watch in Jellyfin│
└────────────────────────────────────────────────────────────┘
                             ↓
┌────────────────────────────────────────────────────────────┐
│              KUBERNETES LAYER (Routing)                     │
│                                                            │
│  Traefik Ingress (10.10.10.50)                            │
│  Routes *.homelab.local → worker-02 Docker containers     │
└────────────────────────────────────────────────────────────┘
                             ↓
┌────────────────────────────────────────────────────────────┐
│         DOCKER COMPOSE LAYER (Applications)                │
│         Running on worker-02 (10.10.10.22)                 │
│                                                            │
│  Jellyseerr → Sonarr/Radarr → Prowlarr → Transmission     │
│                    ↓                                       │
│              Downloads to /downloads                       │
│                    ↓                                       │
│         Imports to /tv or /movies                          │
│                    ↓                                       │
│            Jellyfin serves media                           │
└────────────────────────────────────────────────────────────┘
                             ↓
┌────────────────────────────────────────────────────────────┐
│            STORAGE LAYER (NFS)                             │
│                                                            │
│  HP Proxmox host (10.10.10.11)                            │
│  3.6TB ZFS pool: /media-pool                               │
│  Exported via NFS to worker-02                             │
│                                                            │
│  /media-pool/tv        → TV shows                          │
│  /media-pool/movies    → Movies                            │
│  /media-pool/anime     → Anime                             │
│  /media-pool/downloads → Temporary downloads               │
│  /media-pool/config    → App configurations                │
└────────────────────────────────────────────────────────────┘
```

---

## Components Deployed

### Media Management
- **Sonarr** - TV show automation and management
- **Radarr** - Movie automation and management
- **Bazarr** - Subtitle automation
- **Prowlarr** - Centralized indexer management (replaces Jackett)

### Download & Discovery
- **Transmission** - Torrent client
- **Prowlarr** - Indexes torrents from multiple sources

### User Interface
- **Jellyfin** - Media streaming server (like Plex/Emby)
- **Jellyseerr** - User request management (like Overseerr)
- **Audiobookshelf** - Audiobook and podcast server

---

## Phase 1: Storage Setup

### Problem: Limited VM Storage

worker-02 VM only had 50GB disk - insufficient for media. The HP Proxmox host has a 3.6TB ZFS pool called `media-pool` that was underutilized.

### Solution: NFS Mount

Shared the ZFS pool from Proxmox host to worker-02 via NFS.

#### On HP Proxmox Host (10.10.10.11)

**1. Installed NFS Server**
```bash
apt update
apt install nfs-kernel-server -y
```

**2. Configured NFS Export**
```bash
nano /etc/exports
```

Added:
```
/media-pool 10.10.10.0/24(rw,sync,no_subtree_check,no_root_squash)
```

**Explanation:**
- `/media-pool` - Directory to share
- `10.10.10.0/24` - Entire k8s subnet can access
- `rw` - Read/write permissions
- `sync` - Ensure writes complete before acknowledging
- `no_subtree_check` - Don't verify subdirectory permissions (faster)
- `no_root_squash` - Root on client = root on server (required for Docker)

**3. Applied Export**
```bash
exportfs -ra
systemctl restart nfs-kernel-server
systemctl enable nfs-kernel-server
```

**4. Created Directory Structure**
```bash
# Create download directories
zfs create media-pool/downloads
mkdir -p /media-pool/downloads/complete
mkdir -p /media-pool/downloads/incomplete

# Create config directory
zfs create media-pool/config
mkdir -p /media-pool/config/{jellyfin,sonarr,radarr,bazarr,transmission,prowlarr,jellyseerr,audiobookshelf}

# Create anime directory
mkdir -p /media-pool/anime

# Set permissions (initially - troubleshooting happened later)
chmod -R 755 /media-pool/movies /media-pool/tv /media-pool/anime /media-pool/downloads /media-pool/config
```

#### On worker-02 (10.10.10.22)

**1. Installed NFS Client**
```bash
sudo apt update
sudo apt install nfs-common -y
```

**2. Created Mount Point**
```bash
sudo mkdir -p /mnt/media
```

**3. Mounted NFS Share**
```bash
sudo mount -t nfs 10.10.10.11:/media-pool /mnt/media
```

**4. Made Mount Permanent**
```bash
echo "10.10.10.11:/media-pool /mnt/media nfs defaults,_netdev 0 0" | sudo tee -a /etc/fstab
sudo systemctl daemon-reload
```

**Verification:**
```bash
ls -la /mnt/media/
df -h | grep media
```

### NFS Permission Issues (Troubleshooting)

**Problem:** NFS UID mapping was broken. Files owned by UID 1000 on Proxmox showed as UID 0 (root) on worker-02.

**Symptoms:**
- Sonarr/Radarr couldn't write to `/tv` and `/movies` directories
- Error: "Folder is not writable by user 'abc'"

**Investigation:**
```bash
# On Proxmox: Showed 1000 1000
ls -lan /media-pool/ | grep -E 'tv|movies'

# On worker-02: Showed 0 0 (wrong!)
ls -lan /mnt/media/ | grep -E 'tv|movies'
```

**Attempted Fixes:**
1. ✗ Tried `chown -R 1000:1000` on Proxmox - didn't propagate through NFS
2. ✗ Tried remounting with different NFS versions
3. ✗ Tried configuring idmapd on worker-02
4. ✗ Tried `chmod 777` - permissions didn't propagate correctly

**Final Workaround:**
Changed Docker containers to run as UID 0 (root) instead of UID 1000:

```yaml
environment:
  - PUID=0  # Changed from 1000
  - PGID=0  # Changed from 1000
```

**Why this works:** Since NFS showed files as owned by UID 0, running containers as UID 0 gave them write access.

**Security Note:** Running as root in containers is not ideal security practice, but acceptable for homelab. Proper fix would be to debug NFSv4 idmapd configuration.

---

## Phase 2: Docker Installation

Installed Docker and Docker Compose on worker-02 to run the media stack.

### Installation Steps

```bash
ssh debian@10.10.10.22

# Update packages
sudo apt update

# Install prerequisites
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Install Docker from Debian repos (simpler than Docker's official repo)
sudo apt install -y docker.io docker-compose

# Add user to docker group (avoid sudo)
sudo usermod -aG docker debian

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Log out and back in for group to take effect
exit
ssh debian@10.10.10.22

# Verify installation
docker --version
# Output: Docker version 20.10.24+dfsg1

docker-compose --version
# Output: docker-compose version 1.29.2
```

**Why Docker Compose vs Kubernetes?**

The media stack runs in Docker Compose instead of Kubernetes because:
- ✅ **Simpler:** Single `docker-compose.yaml` vs many k8s manifests
- ✅ **Direct storage access:** Containers access NFS mount directly
- ✅ **Resource efficient:** No k8s overhead for stateful apps
- ✅ **Perfect for single-node:** All apps run on worker-02 (where storage is mounted)

Kubernetes still handles external routing via Traefik ingress.

---

## Phase 3: Media Stack Deployment

### Docker Compose Configuration

Created comprehensive docker-compose.yaml with all services.

**Directory:**
```bash
mkdir -p ~/media-stack
cd ~/media-stack
nano docker-compose.yaml
```

**Complete docker-compose.yaml:**

```yaml
version: "3.8"

services:
  # Jellyfin - Media Server
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    restart: unless-stopped
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Denver
    volumes:
      - /mnt/media/config/jellyfin:/config
      - /mnt/media/movies:/data/movies
      - /mnt/media/tv:/data/tvshows
    ports:
      - "8096:8096"
    networks:
      - media

  # Sonarr - TV Show Management
  sonarr:
    image: linuxserver/sonarr:latest
    container_name: sonarr
    restart: unless-stopped
    environment:
      - PUID=0  # Running as root due to NFS permission issues
      - PGID=0
      - TZ=America/Denver
    volumes:
      - /mnt/media/config/sonarr:/config
      - /mnt/media/tv:/tv
      - /mnt/media/anime:/anime
      - /mnt/media/downloads:/downloads
    ports:
      - "8989:8989"
    networks:
      - media

  # Radarr - Movie Management
  radarr:
    image: linuxserver/radarr:latest
    container_name: radarr
    restart: unless-stopped
    environment:
      - PUID=0  # Running as root due to NFS permission issues
      - PGID=0
      - TZ=America/Denver
    volumes:
      - /mnt/media/config/radarr:/config
      - /mnt/media/movies:/movies
      - /mnt/media/downloads:/downloads
    ports:
      - "7878:7878"
    networks:
      - media

  # Bazarr - Subtitle Management
  bazarr:
    image: linuxserver/bazarr:latest
    container_name: bazarr
    restart: unless-stopped
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Denver
    volumes:
      - /mnt/media/config/bazarr:/config
      - /mnt/media/movies:/movies
      - /mnt/media/tv:/tv
    ports:
      - "6767:6767"
    networks:
      - media

  # Prowlarr - Indexer Manager
  prowlarr:
    image: linuxserver/prowlarr:latest
    container_name: prowlarr
    restart: unless-stopped
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Denver
    volumes:
      - /mnt/media/config/prowlarr:/config
    ports:
      - "9696:9696"
    networks:
      - media

  # Transmission - Torrent Client
  transmission:
    image: linuxserver/transmission:latest
    container_name: transmission
    restart: unless-stopped
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Denver
    volumes:
      - /mnt/media/config/transmission:/config
      - /mnt/media/downloads:/downloads
    ports:
      - "9091:9091"
      - "51413:51413"
      - "51413:51413/udp"
    networks:
      - media

  # Jellyseerr - Request Management
  jellyseerr:
    image: fallenbagel/jellyseerr:latest
    container_name: jellyseerr
    restart: unless-stopped
    environment:
      - LOG_LEVEL=info
      - TZ=America/Denver
    volumes:
      - /mnt/media/config/jellyseerr:/app/config
    ports:
      - "5055:5055"
    networks:
      - media

  # Audiobookshelf - Audiobook Server
  audiobookshelf:
    image: ghcr.io/advplyr/audiobookshelf:latest
    container_name: audiobookshelf
    restart: unless-stopped
    environment:
      - TZ=America/Denver
    volumes:
      - /mnt/media/audiobooks:/audiobooks
      - /mnt/media/config/audiobookshelf:/config
      - /mnt/media/books:/books
    ports:
      - "13378:80"
    networks:
      - media

networks:
  media:
    driver: bridge
```

**Key Configuration Details:**

**Container Naming:**
- Each service gets a descriptive name (e.g., `sonarr`, `radarr`)
- Containers can communicate using these names (e.g., `http://sonarr:8989`)

**Restart Policy:**
- `unless-stopped` - Containers restart on failure or reboot, unless manually stopped

**Environment Variables:**
- `PUID/PGID` - User/Group ID for file permissions
- `TZ` - Timezone for logs and schedules

**Volume Mounts:**
- Config volumes persist settings across container restarts
- Media volumes provide access to TV/movies/downloads

**Networking:**
- All containers on `media` bridge network
- Containers communicate by name (DNS provided by Docker)
- Ports exposed to host for Traefik ingress

### Deployment

```bash
cd ~/media-stack
docker-compose up -d
```

**Verification:**
```bash
docker ps
# Should show 8 containers running

docker-compose ps
# Shows status of all services
```

**Output:**
```
NAME            STATUS      PORTS
audiobookshelf  Up          0.0.0.0:13378->80/tcp
bazarr          Up          0.0.0.0:6767->6767/tcp
jellyfin        Up (healthy) 0.0.0.0:8096->8096/tcp
jellyseerr      Up          0.0.0.0:5055->5055/tcp
prowlarr        Up          0.0.0.0:9696->9696/tcp
radarr          Up          0.0.0.0:7878->7878/tcp
sonarr          Up          0.0.0.0:8989->8989/tcp
transmission    Up          0.0.0.0:9091->9091/tcp, 0.0.0.0:51413->51413/tcp+udp
```

### Prowlarr vs Jackett Decision

Initially deployed Jackett, but switched to **Prowlarr** after research:

**Why Prowlarr?**
- ✅ **Central management** - Add indexers once, syncs to all *arr apps
- ✅ **Automatic propagation** - Connects to Sonarr/Radarr and pushes indexers
- ✅ **Modern** - Built by same team as Sonarr/Radarr
- ✅ **Better statistics** - More monitoring and visibility

**Jackett limitations:**
- ❌ Manual configuration - Must add to each *arr app separately
- ❌ No sync - Changes don't propagate
- ❌ Older codebase

### Jellyseerr vs Overseerr vs Seerr

Evaluated three request management options:

**Overseerr:** Original, built for Plex  
**Jellyseerr:** Fork for Jellyfin  
**Seerr:** Unified for both

**Attempted Seerr first** but encountered permission issues with NFS mounts:
```
Error: EACCES: permission denied, mkdir '/app/config/logs/'
```

**Reverted to Jellyseerr** which is proven stable and specifically designed for Jellyfin.

---

## Phase 4: Kubernetes Ingress Configuration

Created Kubernetes Ingress resources to route external traffic to Docker containers via Traefik.

### Challenge: Routing to External Services

**Problem:** Docker containers run outside Kubernetes, but we want k8s Ingress to route to them.

**Solution:** Use **headless Services + manual Endpoints** pattern.

### Service + Endpoints Pattern Explained

For each Docker container, create three Kubernetes resources:

1. **Headless Service** (`clusterIP: None`) - Abstract pointer
2. **Endpoints** - Actual IP:port of Docker container
3. **Ingress** - Routing rule based on hostname

**Example for Jellyfin:**

```yaml
---
# Service (headless - no ClusterIP assigned)
apiVersion: v1
kind: Service
metadata:
  name: jellyfin-external
  namespace: default
spec:
  clusterIP: None  # Headless service
  ports:
  - port: 8096
    targetPort: 8096

---
# Endpoints (where traffic actually goes)
apiVersion: v1
kind: Endpoints
metadata:
  name: jellyfin-external  # Must match Service name
  namespace: default
subsets:
- addresses:
  - ip: 10.10.10.22  # worker-02 IP
  ports:
  - port: 8096  # Jellyfin container port

---
# Ingress (routing rule)
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: jellyfin
  namespace: default
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: web
spec:
  ingressClassName: traefik
  rules:
  - host: jellyfin.homelab.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: jellyfin-external  # References Service
            port:
              number: 8096
```

**Why this works:**

```
Browser: jellyfin.homelab.local
    ↓
DNS (/etc/hosts): 10.10.10.50
    ↓
Traefik (at 10.10.10.50): Reads Ingress rules
    ↓
Ingress: jellyfin.homelab.local → jellyfin-external Service
    ↓
Service (headless): Look up Endpoints with same name
    ↓
Endpoints: 10.10.10.22:8096
    ↓
Traefik proxies request to worker-02:8096
    ↓
Jellyfin Docker container responds
```

### Complete Ingress Manifest

Created `apps/media-ingress/ingress.yaml` with all services:

```yaml
# Jellyfin, Sonarr, Radarr, Bazarr, Prowlarr, 
# Transmission, Jellyseerr, Audiobookshelf
# (Full file contains all 8 services with same pattern)
```

**Applied to Kubernetes:**
```bash
kubectl apply -f apps/media-ingress/ingress.yaml
```

**Verification:**
```bash
kubectl get ingress -n default
kubectl get svc -n default | grep external
kubectl get endpoints -n default
```

### Why Not ExternalName Services?

**Initial attempt used ExternalName services:**
```yaml
spec:
  type: ExternalName
  externalName: 10.10.10.22
```

**Problem:** Traefik had issues resolving direct IPs via ExternalName. Requests hung with no response.

**Solution:** Switched to headless Services + Endpoints pattern, which Traefik handles reliably.

### DNS Configuration

Updated `/etc/hosts` on laptop to route all domains to Traefik:

```bash
sudo nano /etc/hosts
```

Added:
```
10.10.10.50  jellyfin.homelab.local
10.10.10.50  sonarr.homelab.local
10.10.10.50  radarr.homelab.local
10.10.10.50  bazarr.homelab.local
10.10.10.50  prowlarr.homelab.local
10.10.10.50  transmission.homelab.local
10.10.10.50  jellyseerr.homelab.local
10.10.10.50  audiobookshelf.homelab.local
```

**Why same IP for everything?**

Traefik reads the HTTP `Host` header to route requests:

```
GET / HTTP/1.1
Host: jellyfin.homelab.local  ← Traefik uses this
```

All traffic goes to Traefik (10.10.10.50), which routes based on hostname.

### Ingress Troubleshooting

**Issue 1: Ingress showed no ADDRESS**
```bash
kubectl get ingress
# ADDRESS column was empty
```

**Cause:** Missing `ingressClassName: traefik` in Ingress spec.

**Fix:** Added to all Ingress resources:
```yaml
spec:
  ingressClassName: traefik
```

**Issue 2: YAML Syntax Error**
```
error parsing ingress.yaml: error converting YAML to JSON: yaml: line 286: could not find expected ':'
```

**Cause:** Corrupted jellyseerr Endpoints section:
```yaml
subsets:
- addresses:
  - ip: 10.10.10.22
networking.k8s.io/v1      # Wrong! Got pasted in wrong place
kind: Ingress  ports:     # Mangled
```

**Fix:** Corrected indentation:
```yaml
subsets:
- addresses:
  - ip: 10.10.10.22
  ports:  # Properly indented
  - port: 5055
```

**Lesson:** YAML is extremely whitespace-sensitive. Copy-paste errors are common.

---

## Phase 5: Application Configuration

### Step 1: Configure Prowlarr (Indexer Management)

Prowlarr centralizes torrent indexer management and syncs to Sonarr/Radarr automatically.

**URL:** http://prowlarr.homelab.local

#### Connect Prowlarr to Sonarr

1. **Settings** → **Apps** → **+** → **Sonarr**
2. Fill in:
   - **Name:** `Sonarr`
   - **Sync Level:** `Full Sync`
   - **Prowlarr Server:** `http://prowlarr:9696`
   - **Sonarr Server:** `http://sonarr:8989` (container name, not .homelab.local)
   - **API Key:** From Sonarr Settings → General → Security

**Why use container names?**
- Prowlarr and Sonarr are on same Docker network
- `sonarr.homelab.local` only resolves on host (not inside containers)
- Docker DNS resolves container names to IPs automatically

3. Click **Test** (should show green checkmark)
4. Click **Save**

#### Connect Prowlarr to Radarr

Same process:
1. **Settings** → **Apps** → **+** → **Radarr**
2. Fill in:
   - **Name:** `Radarr`
   - **Sync Level:** `Full Sync`
   - **Prowlarr Server:** `http://prowlarr:9696`
   - **Radarr Server:** `http://radarr:7878`
   - **API Key:** From Radarr Settings → General → Security
3. **Test** → **Save**

#### Add Indexers to Prowlarr

Once connected, indexers added to Prowlarr automatically sync to both Sonarr and Radarr.

**Public Indexers Added:**
- **EZTV** - TV shows (very reliable)
- **YTS** - Movies (very reliable)
- **TorrentGalaxy** - General
- **Nyaa** - Anime

**Note:** Attempted 1337x but encountered Cloudflare protection errors.

**Process:**
1. In Prowlarr: **Indexers** → **Add Indexer**
2. Search for indexer name
3. Click **+** button
4. Click **Save** (most public indexers need no configuration)

**Automatic Sync:**
After adding each indexer, Prowlarr immediately pushes it to Sonarr and Radarr.

**Verification:**
```
http://sonarr.homelab.local → Settings → Indexers
http://radarr.homelab.local → Settings → Indexers
(Both show same indexers automatically!)
```

### Step 2: Configure Transmission (Download Client)

Both Sonarr and Radarr need to know where to send torrents.

#### In Sonarr

1. **Settings** → **Download Clients** → **+** → **Transmission**
2. Fill in:
   - **Name:** `Transmission`
   - **Host:** `transmission` (container name)
   - **Port:** `9091`
   - **Username:** (leave blank)
   - **Password:** (leave blank)
   - **Category:** `tv-sonarr` (optional, organizes downloads)
3. **Test** → **Save**

#### In Radarr

1. **Settings** → **Download Clients** → **+** → **Transmission**
2. Fill in:
   - **Name:** `Transmission`
   - **Host:** `transmission`
   - **Port:** `9091`
   - **Category:** `movies-radarr`
3. **Test** → **Save**

**Why categories?**
Transmission can organize downloads by label, making it easier to see which app requested what.

### Step 3: Configure Root Folders

Root folders tell Sonarr/Radarr where to import completed downloads.

#### Sonarr Root Folders

1. **Settings** → **Media Management** → **Root Folders** → **Add Root Folder**
2. Add `/tv` for regular TV shows
3. Add `/anime` for anime (optional, for organization)

**Volume mapping:**
- Inside container: `/tv` and `/anime`
- On host: `/mnt/media/tv` and `/mnt/media/anime`
- On NFS server: `/media-pool/tv` and `/media-pool/anime`

#### Radarr Root Folder

1. **Settings** → **Media Management** → **Root Folders** → **Add Root Folder**
2. Add `/movies`

**Volume mapping:**
- Inside container: `/movies`
- On host: `/mnt/media/movies`
- On NFS server: `/media-pool/movies`

**Permission Issue:**
Initial attempts failed with: `Folder '/tv/' is not writable by user 'abc'`

**Resolution:** Changed Sonarr and Radarr to run as UID 0 (root) in docker-compose.yaml due to NFS permission mapping issues.

### Step 4: Configure Bazarr (Subtitles)

Bazarr automatically downloads subtitles for media in Sonarr and Radarr.

**URL:** http://bazarr.homelab.local

#### Connect to Sonarr

1. **Settings** → **Sonarr**
2. Check **"Enabled"**
3. Fill in:
   - **Hostname or IP:** `sonarr`
   - **Port:** `8989`
   - **API Key:** From Sonarr
4. **Test** → **Save**

#### Connect to Radarr

1. **Settings** → **Radarr**
2. Check **"Enabled"**
3. Fill in:
   - **Hostname or IP:** `radarr`
   - **Port:** `7878`
   - **API Key:** From Radarr
4. **Test** → **Save**

Bazarr now monitors Sonarr and Radarr libraries and automatically downloads subtitles.

### Step 5: Configure Jellyfin (Media Server)

First-time setup wizard.

**URL:** http://jellyfin.homelab.local

1. **Language:** Select English
2. **User Account:** Create admin username/password
3. **Media Libraries:**
   - Add **TV Shows** library: `/data/tvshows`
   - Add **Movies** library: `/data/movies`
4. **Metadata Settings:** Use defaults
5. **Finish** setup

**Volume mapping:**
- Inside container: `/data/tvshows` and `/data/movies`
- On host: `/mnt/media/tv` and `/mnt/media/movies`
- On NFS server: `/media-pool/tv` and `/media-pool/movies`

Jellyfin will now scan and index all media in these directories.

### Step 6: Configure Jellyseerr (Request Management)

Jellyseerr allows users to request content, which automatically triggers Sonarr/Radarr.

**URL:** http://jellyseerr.homelab.local

#### Initial Setup

1. **Sign in with Jellyfin:**
   - **Jellyfin URL:** `http://jellyfin:8096` (container name)
   - **Email:** Jellyfin username
   - **Password:** Jellyfin password
   - Click **Sign In**

2. **Sync Libraries:**
   - Jellyseerr discovers TV and Movie libraries
   - Click **Continue**

3. **Connect Sonarr:**
   - Check **"Enable Sonarr"**
   - **Default Server:** ✓
   - **Server Name:** `Sonarr`
   - **Hostname or IP:** `sonarr`
   - **Port:** `8989`
   - **API Key:** From Sonarr
   - **Quality Profile:** Select one (e.g., "Any")
   - **Root Folder:** `/tv`
   - **Language Profile:** Original
   - **Test** → **Save**

4. **Connect Radarr:**
   - Check **"Enable Radarr"**
   - **Default Server:** ✓
   - **Server Name:** `Radarr`
   - **Hostname or IP:** `radarr`
   - **Port:** `7878`
   - **API Key:** From Radarr
   - **Quality Profile:** Select one
   - **Root Folder:** `/movies`
   - **Test** → **Save**

5. **Finish Setup**

---

## Phase 6: Testing End-to-End Workflow

### The Complete Automation Flow

```
1. User requests content in Jellyseerr
   ↓
2. Jellyseerr sends request to Sonarr (TV) or Radarr (movies)
   ↓
3. Sonarr/Radarr searches indexers via Prowlarr
   ↓
4. Finds best torrent, sends to Transmission
   ↓
5. Transmission downloads to /downloads/complete/tv-sonarr or movies-radarr
   ↓
6. Download completes, Sonarr/Radarr detects it
   ↓
7. Sonarr/Radarr imports and renames file
   ↓
8. Moves file to /tv or /movies
   ↓
9. Bazarr detects new media, downloads subtitles
   ↓
10. Jellyfin detects new media in library
    ↓
11. User watches in Jellyfin!
```

### Live Test

**Requested:** A TV show via Jellyseerr

**Observed:**
1. ✅ Request appeared in Sonarr immediately
2. ✅ Sonarr searched indexers (via Prowlarr)
3. ✅ Found torrent, sent to Transmission
4. ✅ Transmission downloaded (visible in web UI)
5. ⚠️  Warning appeared in Sonarr about remote path mapping
6. ✅ Warning was cosmetic - import worked anyway
7. ✅ File appeared in `/tv` directory properly renamed
8. ✅ Show appeared in Jellyfin library
9. ✅ Playback worked perfectly!

### Remote Path Mapping Warning

**Warning in Sonarr:**
```
You are using docker; download client Transmission places downloads in 
/downloads/complete/tv-sonarr but this directory does not appear to exist 
inside the container. Review your remote path mappings and container volume settings.
```

**Cause:** Sonarr and Transmission are separate containers. When Transmission says "downloaded to /downloads/complete/tv-sonarr", Sonarr needs to know that's the same path it sees.

**Why it worked anyway:** Both containers mount `/mnt/media/downloads` as `/downloads`, so the paths actually match. The warning is informational.

**Proper fix (optional):**
Add Remote Path Mapping in Sonarr/Radarr:
- **Settings** → **Download Clients** → **Transmission** → **Remote Path Mappings**
- **Host:** `transmission`
- **Remote Path:** `/downloads/`
- **Local Path:** `/downloads/`

This explicitly tells Sonarr the paths are equivalent.

---

## Final Configuration Summary

### Accessible Services

All services accessible via clean URLs:

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
├── audiobooks/       # Audiobookshelf library
├── books/            # Ebook storage
└── music/            # Future music library
```

### Docker Containers

| Container | Image | Port | Volume Mounts |
|-----------|-------|------|---------------|
| jellyfin | jellyfin/jellyfin | 8096 | /config, /data/movies, /data/tvshows |
| sonarr | linuxserver/sonarr | 8989 | /config, /tv, /anime, /downloads |
| radarr | linuxserver/radarr | 7878 | /config, /movies, /downloads |
| bazarr | linuxserver/bazarr | 6767 | /config, /movies, /tv |
| prowlarr | linuxserver/prowlarr | 9696 | /config |
| transmission | linuxserver/transmission | 9091, 51413 | /config, /downloads |
| jellyseerr | fallenbagel/jellyseerr | 5055 | /app/config |
| audiobookshelf | ghcr.io/advplyr/audiobookshelf | 13378 | /audiobooks, /config, /books |

### Resource Usage

**worker-02 Docker containers:**
- Total containers: 8
- Approximate memory usage: ~4-5GB
- CPU usage: Low (spikes during downloads/imports)
- Network: Internal Docker bridge + NFS traffic

**NFS traffic:**
- Metadata reads (library scans)
- File writes (imports)
- Config reads/writes

---

## Key Concepts Learned

### 1. Hybrid k8s + Docker Architecture

**Kubernetes handles:**
- External routing (Traefik Ingress)
- Service discovery
- High availability for infrastructure

**Docker Compose handles:**
- Media applications (simpler for stateful apps)
- Direct storage access (no PVC complexity)
- Single-node deployments

**Best of both worlds:**
- Professional routing via k8s
- Simple app management via Docker Compose
- Users access via clean URLs
- Maintainable and scalable

### 2. NFS for Centralized Storage

**Advantages:**
- ✅ Centralized storage (all media in one place)
- ✅ ZFS benefits (snapshots, compression)
- ✅ Independent of VM lifecycle
- ✅ Can be accessed by multiple clients

**Challenges:**
- ❌ UID mapping complexity (NFSv4 idmapd)
- ❌ Permission debugging can be tricky
- ❌ Network overhead (minimal on local network)

### 3. Prowlarr's Automatic Sync

**Old way (Jackett):**
```
Add indexer to Jackett
↓
Manually add Jackett to Sonarr
↓
Manually add Jackett to Radarr
↓
Changes don't sync
```

**New way (Prowlarr):**
```
Connect Prowlarr to Sonarr once
Connect Prowlarr to Radarr once
↓
Add indexers to Prowlarr
↓
Automatically appears in Sonarr AND Radarr
↓
Changes sync automatically
```

### 4. Docker Container Networking

**Key insight:** Containers on same Docker network use DNS.

**Communication patterns:**
- ✅ `http://sonarr:8989` - Container to container (works)
- ❌ `http://sonarr.homelab.local` - Requires external DNS (doesn't work inside containers)
- ✅ `http://10.10.10.22:8989` - Direct IP (works but not maintainable)

**Best practice:** Always use container names for inter-container communication.

### 5. Kubernetes External Services

**Pattern for routing k8s → external services:**

```yaml
Service (headless)
  ↓ (linked by name)
Endpoints (manual IP:port)
  ↓ (referenced by)
Ingress (routing rule)
```

**Why not just use ClusterIP Service with selector?**
- Selectors only work for Pods inside k8s
- Docker containers aren't Pods
- Manual Endpoints bypass selector requirement

### 6. The *arr Stack Ecosystem

**Understanding the roles:**
- **Prowlarr** - Finds content (indexers)
- **Sonarr/Radarr** - Manages content (TV/movies)
- **Bazarr** - Enhances content (subtitles)
- **Transmission** - Acquires content (downloads)
- **Jellyfin** - Delivers content (streaming)
- **Jellyseerr** - Requests content (user interface)

**They work together:**
Each app has a specific job, communicates via APIs, and together form an automated media pipeline.

---

## Troubleshooting & Solutions

### Issue 1: NFS Permission Denied

**Error:** `Folder '/tv/' is not writable by user 'abc'`

**Diagnosis:**
```bash
# On Proxmox: Correct permissions
ls -lan /media-pool/tv  # Shows 1000 1000

# On worker-02: Wrong permissions
ls -lan /mnt/media/tv   # Shows 0 0
```

**Root Cause:** NFSv4 UID mapping not working correctly. idmapd misconfigured or not running.

**Attempted Fixes:**
1. ✗ `chown -R 1000:1000` on Proxmox
2. ✗ `chmod 777` on Proxmox
3. ✗ Remounting with different NFS options
4. ✗ Configuring idmapd.conf

**Working Solution:**
Changed containers to run as UID 0 (root):
```yaml
environment:
  - PUID=0
  - PGID=0
```

**Trade-off:** Security vs functionality. Running as root is acceptable for homelab but should be fixed properly in production.

### Issue 2: Ingress Not Getting ADDRESS

**Symptom:**
```bash
kubectl get ingress
# ADDRESS column empty for media ingresses
```

**Cause:** Missing `ingressClassName` in Ingress spec.

**Solution:**
```yaml
spec:
  ingressClassName: traefik  # Added this
  rules:
  - host: jellyfin.homelab.local
```

Modern Kubernetes requires explicit Ingress class assignment.

### Issue 3: YAML Syntax Errors

**Error:** `error converting YAML to JSON: yaml: line 286: could not find expected ':'`

**Cause:** Copy-paste corruption created malformed YAML:
```yaml
subsets:
- addresses:
  - ip: 10.10.10.22
networking.k8s.io/v1      # Wrong place!
kind: Ingress  ports:     # Mangled
```

**Solution:** Fixed indentation:
```yaml
subsets:
- addresses:
  - ip: 10.10.10.22
  ports:  # Correctly indented under the dash
  - port: 5055
```

**Lesson:** YAML is whitespace-sensitive. Always validate after editing.

### Issue 4: Seerr Container Won't Start

**Error:** `EACCES: permission denied, mkdir '/app/config/logs/'`

**Cause:** Seerr has stricter permission requirements than Jellyseerr.

**Attempted Fixes:**
1. ✗ `chown 1000:1000` on NFS
2. ✗ `chmod 777` on NFS
3. ✗ Added `user: "1000:1000"` to docker-compose
4. ✗ Added PUID/PGID environment variables

**Solution:** Reverted to Jellyseerr, which handles NFS permissions better.

**Lesson:** Newer isn't always better. Jellyseerr is more mature and stable.

### Issue 5: Prowlarr Can't Reach Sonarr

**Error:** `Name does not resolve (sonarr.homelab.local:80)`

**Cause:** Prowlarr is inside Docker, can't resolve .homelab.local from /etc/hosts.

**Solution:** Use container name instead:
```
sonarr.homelab.local → http://sonarr:8989
```

**Lesson:** Containers use Docker's internal DNS, not host's /etc/hosts.

### Issue 6: Remote Path Mapping Warning

**Warning:** `This directory does not appear to exist inside the container`

**Cause:** Sonarr and Transmission see same path differently.

**Why it worked anyway:** Both containers mount `/mnt/media/downloads` as `/downloads`, so paths match.

**Proper fix:** Add explicit Remote Path Mapping in Sonarr/Radarr.

---

## Future Improvements

### Short Term

**1. Fix NFS Permissions Properly**
- Debug NFSv4 idmapd configuration
- Goal: Run containers as UID 1000 instead of root
- Security improvement

**2. Add More Indexers**
- Research private trackers
- Configure region-specific indexers
- Improve search quality

**3. Configure Quality Profiles**
- Define preferred resolutions (1080p, 4K)
- Set size limits
- Configure codec preferences

**4. Set Up Pi-hole DNS**
- Deploy Pi-hole in k8s or as VM
- Configure as network DNS server
- Add wildcard: `*.homelab.local → 10.10.10.50`
- Other devices can access services

### Medium Term

**1. Add SSL Certificates**
- Install cert-manager in k8s
- Configure Let's Encrypt
- Enable HTTPS for all services
- Update Ingress for TLS

**2. Implement Backup Strategy**
- Backup Jellyfin library database
- Backup *arr configs
- Snapshot ZFS pool regularly
- Test restore procedures

**3. Add More Media Services**
- **Lidarr** - Music automation
- **Readarr** - Ebook automation
- **Calibre** - Ebook management

**4. Monitoring & Alerting**
- Monitor download/import success rates
- Alert on failed downloads
- Track storage usage
- Monitor container health

### Long Term

**1. Remote Access**
- Configure Tailscale VPN
- Access media away from home
- Secure external access

**2. Multi-User Management**
- Jellyfin user accounts
- Jellyseerr user management
- Request quotas/limits

**3. Advanced Automation**
- Custom scripts for imports
- Automated quality upgrades
- Intelligent retention policies

**4. Performance Optimization**
- Consider moving from NFS to iSCSI
- Evaluate direct VM disk passthrough
- Optimize transcoding (GPU acceleration)

---

## Lessons Learned

### Technical

**1. NFS UID Mapping is Complex**
- NFSv4 idmapd requires proper configuration
- Testing permissions before deployment saves time
- Having a fallback (running as root) kept progress moving

**2. Docker vs Kubernetes Trade-offs**
- Docker Compose is simpler for stateful apps
- Kubernetes excels at routing and HA
- Hybrid approach leverages strengths of both

**3. Container Networking**
- Always use container names for inter-container communication
- Understand the difference between host and container networking
- Docker bridge networks provide automatic DNS

**4. YAML is Unforgiving**
- Indentation matters critically
- Copy-paste can introduce subtle errors
- Always validate syntax before applying

### Process

**1. Incremental Deployment**
- Build piece by piece
- Test each component before moving forward
- Easier to debug when you know what changed

**2. Documentation During Build**
- Capture decisions and reasoning in real-time
- Screenshots of configurations
- Save working configs as you go

**3. Troubleshooting Methodology**
- Check logs first (`docker logs`, `kubectl logs`)
- Verify network connectivity (`ping`, `curl`)
- Test components in isolation
- Google error messages

**4. Accept Workarounds**
- Perfect is enemy of done
- Temporary solutions can become permanent
- Note technical debt for future cleanup

### Design

**1. Security vs Convenience**
- Running containers as root is a risk
- Acceptable for homelab, not production
- Document security trade-offs

**2. Storage Centralization**
- NFS complexity worth it for flexibility
- Single source of truth for all media
- Easier to backup and manage

**3. Service URL Design**
- Consistent naming (*.homelab.local)
- Memorable and logical
- Easy to add more services

---

## Conclusion

Successfully built a complete, automated media server with professional-grade routing and request management. The hybrid Kubernetes + Docker Compose architecture provides the best of both worlds: k8s handles ingress and makes services accessible via clean URLs, while Docker Compose simplifies application management.

### What Works

✅ **Request → Download → Watch workflow fully automated**  
✅ **8 services accessible via clean URLs**  
✅ **3.6TB centralized storage**  
✅ **GitOps ingress configuration**  
✅ **Automatic subtitle downloads**  
✅ **Multi-user request management**

### Known Issues

⚠️  **NFS UID mapping broken** - Running Sonarr/Radarr as root (workaround)  
⚠️  **Manual /etc/hosts** - Need Pi-hole for network-wide DNS  
⚠️  **No SSL** - All traffic over HTTP (internal network only)

### Time Investment

**Total:** ~5 hours  
- Storage setup: 1 hour
- Docker deployment: 30 minutes  
- Ingress configuration: 1.5 hours
- Application configuration: 1 hour
- Troubleshooting: 1 hour

### Knowledge Gained

- NFS server configuration and troubleshooting
- Docker Compose multi-container orchestration
- Kubernetes Ingress to external services pattern
- Media automation ecosystem (*arr apps)
- Docker networking and DNS
- Permission management across NFS/Docker boundary

---

## Quick Reference Commands

### Docker Management
```bash
# View all containers
docker ps

# View logs
docker logs <container_name>
docker logs <container_name> --tail=50
docker logs <container_name> -f  # Follow

# Restart containers
docker-compose restart
docker-compose restart <service_name>

# Rebuild after config changes
docker-compose up -d

# Stop all containers
docker-compose down
```

### NFS Management
```bash
# Check mount
mount | grep media
df -h | grep media

# Remount
sudo umount /mnt/media
sudo mount /mnt/media

# Check permissions
ls -lan /mnt/media/

# On NFS server
exportfs -v  # Show exports
showmount -e localhost  # Show export list
```

### Kubernetes Ingress
```bash
# View ingresses
kubectl get ingress -n default

# View services
kubectl get svc -n default

# View endpoints
kubectl get endpoints -n default

# Describe ingress (for troubleshooting)
kubectl describe ingress <name> -n default

# Apply ingress changes
kubectl apply -f apps/media-ingress/ingress.yaml
```

### Useful URLs
```
Jellyfin:       http://jellyfin.homelab.local
Jellyseerr:     http://jellyseerr.homelab.local
Sonarr:         http://sonarr.homelab.local
Radarr:         http://radarr.homelab.local
Prowlarr:       http://prowlarr.homelab.local
Transmission:   http://transmission.homelab.local
Bazarr:         http://bazarr.homelab.local
Audiobookshelf: http://audiobookshelf.homelab.local
```

---

*Build completed: February 19, 2026 at 2:00 AM*  
*All systems operational and tested end-to-end*
