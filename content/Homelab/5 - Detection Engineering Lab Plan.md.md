kanban-plugin: basic
title: Detection Engineering Lab Plan
---

## 📦 Phase 1: Foundation (Days 1–3)

- [ ] Log into Splunk UI and confirm data (`index=* | stats count by index`)
- [ ] Identify key log sources: `WinEventLog:*`, `Sysmon`, `PowerShell`
- [ ] Practice basic SPL queries
- [ ] Pick 5 MITRE ATT&CK techniques to study
- [ ] Create an Obsidian vault with the detection template
- [ ] Review MITRE ATT&CK site and Navigator

## ⚔️ Phase 2: Detecting Core Techniques (Days 4–10)

- [ ] Lab 1: PowerShell Execution (T1059.001)
  - [ ] Simulate: `powershell.exe -EncodedCommand ...`
  - [ ] Write SPL to detect it (EventCode 4688 + CommandLine)
  - [ ] Save alert and document in vault

- [ ] Lab 2: Credential Dumping – Mimikatz (T1003.001)
  - [ ] Simulate PowerSploit Mimikatz
  - [ ] Detect LSASS access with EventCode 10 or 4662
  - [ ] Save detection and alert

- [ ] Lab 3: DCSync Attack (T1003.006)
  - [ ] Simulate Mimikatz `lsadump::dcsync`
  - [ ] Detect with EventCode 4662 + DS-Replication-Get-Changes
  - [ ] Document in vault

- [ ] Lab 4: Lateral Movement – PsExec/WMI (T1021.001)
  - [ ] Simulate PsExec or WMI remote execution
  - [ ] Detect: Logon Type 3, EventCode 4624, 5140
  - [ ] Write SPL and tune false positives

## 🧠 Phase 3: Detection Maturity (Days 11–17)

- [ ] Add field-based tuning to reduce false positives
- [ ] Cross-reference detection with MITRE ATT&CK Navigator
- [ ] Import similar detection logic from Splunk Security Content GitHub
- [ ] Build dashboard showing:
  - [ ] Alerts by technique
  - [ ] Host involvement
  - [ ] Time trends (timechart)
- [ ] Create tuning section in each Obsidian note

## 🚨 Phase 4: Final Project (Days 18–21)

- [ ] Simulate a full attack chain:
  - [ ] Initial Access → Execution → Credential Access → Lateral Movement → Impact
- [ ] Build detection logic for each stage
- [ ] Document detections in vault
- [ ] Link each detection to MITRE techniques
- [ ] Create a summary dashboard
- [ ] Create a final “Detection Suite” folder
