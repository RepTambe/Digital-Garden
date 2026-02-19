# Detection Engineering Roadmap

## Vision
Build a reusable detection library that shows I can go from raw telemetry → detection logic → validation.  
This lab will serve as my personal detection engineering portfolio.

---

## Goals
- **Short-Term**
  - ✅ Forward Windows logs (Sysmon, Security) into HELK
  - ✅ Write initial KQL queries for suspicious logons
  - ⏳ Translate one Sigma rule into Elastic
- **Long-Term**
  - Build a curated Sigma library mapped to ATT&CK
  - Automate testing with Atomic Red Team
  - Publish detection write-ups on [[atambe.xyz]]

---

## Phases
1. **Phase 1 — Foundations**  
   Collect Windows event logs, validate ingestion, create baseline queries.  

2. **Phase 2 — Adversary Emulation**  
   Use Atomic Red Team (e.g., Invoke-Mimikatz, DCSync) and validate detections.  

3. **Phase 3 — Advanced Engineering**  
   Automate testing, detection-as-code, and cross-SIEM translations (Splunk → Elastic → Sigma).  

---

## Detection Backlog (MITRE ATT&CK)
- **Credential Access**
  - [ ] T1003.006 DCSync detection  
  - [ ] T1555 LSASS dump  
- **Execution**
  - [ ] T1059.001 PowerShell encoded commands  
- **Persistence**
  - [ ] T1112 Registry Run Keys  
- **Defense Evasion**
  - [ ] T1036 Masquerading  

---

## Related
- [[1 - Lab Progress|Lab Progress]]
- [[2 - Detecting Mimikatz|Detecting Mimikatz]]
