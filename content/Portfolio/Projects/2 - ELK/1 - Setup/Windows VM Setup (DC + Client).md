# Windows VM Setup (DC + Client)

This runbook documents the setup of two Windows VMs for the HELK lab:  
- **Windows DC** → Domain Controller  
- **Windows Client** → Domain-joined workstation  

Both forward logs via **Sysmon + Winlogbeat** to HELK.

---

## 1. VM Provisioning

### Specs
| VM              | Role                   | vCPU | RAM   | Disk  | Example IP  |
|-----------------|------------------------|------|-------|-------|-------------|
| DC01            | Domain Controller      | 2    | 4–8G  | 40G   | 10.2.0.11   |
| Client01        | Workstation (Win 10/11)| 2    | 4G    | 40G   | 10.2.0.12   |

- Create in **Proxmox** (or hypervisor of choice) using official ISOs.  
- Assign to **lab VLAN/subnet** (e.g., `10.2.0.0/24`).  
- Configure **static IPs** (see table).  

---

## 2. Domain Controller Setup

1. Install **Windows Server 2019/2022**.  
2. Set hostname: `DC01`.  
3. Assign static IP (ex: `10.2.0.11`).  
. Install **Active Directory Domain Services (AD DS)** role.  
4. Promote server to DC:
   - Run `dcpromo` via Server Manager  
   - Create domain: `lab.local`  
   - Restart when finished  

---

## 3. Client Setup

1. Install Windows 10/11 Enterprise.  
2. Set hostname: `CLIENT01`.  
3. Assign static IP (ex: `10.2.0.12`).  
4. Configure DNS → point to DC01 (`10.2.0.11`).  
5. Join domain:
   - System → About → "Join a domain"  
   - Enter `lab.local`  
   - Provide domain admin creds  
   - Reboot  

---

## 4. Sysmon Installation

### Download Sysmon
- Get Sysmon from [Microsoft Sysinternals](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon).  
- Place in `C:\Tools\Sysmon\`.  

### Config File
Save config as `sysmon-config.xml` (use [SwiftOnSecurity config](https://github.com/SwiftOnSecurity/sysmon-config) or tuned version).

### Install
```powershell
cd C:\Tools\Sysmon
.\sysmon.exe -accepteula -i sysmon-config.xml

```
 Verify
```
Get-Service -Name Sysmon64
Get-WinEvent -LogName "Microsoft-Windows-Sysmon/Operational" -MaxEvents 10
```
## 5. Winlogbeat Installation

### Download

- Download from [Elastic Downloads](https://www.elastic.co/downloads/beats/winlogbeat)
- Extract to: `C:\Program Files\Winlogbeat\`.
 ## Config (`winlogbeat.yml`)

Edit `C:\Program Files\Winlogbeat\winlogbeat.yml`:
```
winlogbeat.event_logs:
  - name: Security
  - name: System
  - name: Application
  - name: Microsoft-Windows-Sysmon/Operational
  - name: Windows PowerShell
  - name: Microsoft-Windows-PowerShell/Operational

output.logstash:
  hosts: ["10.2.0.10:5044"]  # HELK IP

```

### Install & Start

Run from PowerShell (admin):
```
cd 'C:\Program Files\Winlogbeat'
.\install-service-winlogbeat.ps1
Start-Service winlogbeat

```
Verify
```
Get-Service winlogbeat
Get-Content "C:\Program Files\Winlogbeat\logs\winlogbeat.log" -Tail 50

```
## 6. Verify Forwarding to HELK

On HELK:
`sudo journalctl -u logstash -f`

In Kibana:

- Index pattern: `logs-windows-*`
- Search:
- event.provider: "Microsoft-Windows-Sysmon"
Check for process creation, logons, PowerShell activity.
## 8. Next Steps

- Add more clients or servers for broader visibility.
    
- Expand Sysmon config with more event IDs.
    
- Create Sigma/KQL rules for:
    
    - Suspicious PowerShell
        
    - DCSync attempts
        
    - Lateral movement
        
- Test detection with **Atomic Red Team** simulations.