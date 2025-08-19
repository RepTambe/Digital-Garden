tags: [detection, splunk, attack-range, mitre, T1059.001]
date: {{date}}
status: complete
---

# 🧪 Lab 1: PowerShell Execution – T1059.001

## ✅ Status
- [x] Simulate: `powershell.exe -EncodedCommand ...`
- [x] Write SPL to detect it (EventCode 4688 + CommandLine)
- [x] Save alert and document in vault

---

## 📜 Description
This lab simulates and detects **obfuscated PowerShell execution** using the `-EncodedCommand` flag, which is common in malicious scripts.  
Mapped to MITRE ATT&CK technique **T1059.001** – PowerShell under the Execution tactic.

---

## 🛠 Simulation Steps

### Step 1 – Run Atomic T1059.001-1 Mimikatz

```
PS C:\AtomicREdTeam\atomics> Invoke-AtomicTest T1059.001 -TestNumbers 1

```





