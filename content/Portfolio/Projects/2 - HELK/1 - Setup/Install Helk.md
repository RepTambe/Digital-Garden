# HELK Installation Guide

This runbook documents the steps to install HELK (Hunting ELK) on the Ubuntu VM.

---

## Prerequisites

- Ubuntu 20.04 / 22.04 LTS VM  
- Static IP (ex: `10.2.0.10`)  
- 4 vCPU / 8–16 GB RAM / 100GB+ disk  
- Internet access for package & Docker pulls  

---

## 1. Prepare the VM

Update system and install dependencies:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl wget apt-transport-https ca-certificates gnupg lsb-release
```
```
```

## 2. Install Docker & Docker Compose 
```
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to Docker group (optional)
sudo usermod -aG docker $USER

# Install Docker Compose (plugin)
sudo apt install -y docker-compose-plugin
```
## 3. Clone HELK Repository 
 ```
git clone https://github.com/Cyb3rWard0g/HELK.git
cd HELK/docker

```
## 4. Run Installer 
```
sudo ./helk_install.sh
```
## 5. Verify Installation 
```
docker ps
Expected:

- `helk-elasticsearch`
    
- `helk-logstash`
    
- `helk-kibana`
    
- `helk-zookeeper`
    
- `helk-kafka`
    
- `helk-jupyter`
```
## 6. Access Kibana & Jupyter 
```
## 6. Access Kibana & Jupyter

- Kibana: http://10.2.0.10:5601
  Jupyter: http://10.2.0.10:8880
```