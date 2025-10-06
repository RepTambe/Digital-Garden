# HELK Infrastructure

## Lab Platform
- **Hypervisor:** Proxmox VE (OptiPlex 3080 SFF )
- **Storage:** ZFS pool with SSD/HDD mix
- **Segmentation:** VLANs (management, lab, DMZ)

---

## VM Layout

| Host            | OS / Role                | vCPU | RAM   | Disk  | Network       |
| --------------- | ------------------------ | ---- | ----- | ----- | ------------- |
| HELK            | Ubuntu 20.04/22.04 LTS   | 4    | 8–16G | 100G+ | VLAN 20 (lab) |
| Windows DC      | Windows Server 2019/2022 | 2    | 4–8G  | 40G   | VLAN 20       |
| Windows Client  | Windows 10/11 Enterprise | 2    | 4G    | 40G   | VLAN 20       |
| (Optional Kali) | Kali Linux (emulation)   | 2    | 2–4G  | 40G   | VLAN 20       |

> Adjust specs depending on your host hardware.

---

## Networking
- **Core subnet:** `10.2.0.0/24` (lab VLAN)
- **HELK VM:** `10.2.0.10` (hostname `helk.lab.local`)
- **DC VM:** `10.2.0.11` (hostname `dc01.lab.local`)
- **Client VM:** `10.2.0.12` (hostname `client01.lab.local`)
- **Gateway:** UniFi UCG-Fiber

> Ensure DNS on Client points to the DC IP for domain join.

---

## Domain Setup
- **Domain name:** `lab.local` (adjust as needed)
- **DC01:** promoted to Domain Controller
- **Client01:** joined to `lab.local`

---

## Tools & Packages
- **Sysmon**: installed on DC + Client
- **Winlogbeat**: installed on DC + Client
- **Logstash/Elasticsearch/Kibana**: running on HELK VM
- **Optional:** WireGuard for remote homelab access

---

## Diagram

```mermaid
graph TD
    UCG[UniFi UCG-Fiber] --> S1[Aruba 6100 Switch]
    S1 --> HELK[HELK VM (10.2.0.10)]
    S1 --> DC[Windows DC (10.2.0.11)]
    S1 --> Client[Windows Client (10.2]()
