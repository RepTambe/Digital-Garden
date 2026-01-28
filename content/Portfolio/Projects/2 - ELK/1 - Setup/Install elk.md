# HELK Installation Guide

This runbook documents the steps to install HELK (Hunting ELK) on the Ubuntu VM.

---

## Prerequisites

- Ubuntu Server 22.04 LTS VM  
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
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker "$USER"
fleee```
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