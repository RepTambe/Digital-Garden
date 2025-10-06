# HELK Project Overview

## What is HELK?
The **Hunting ELK (HELK)** project is my personal detection engineering and threat hunting lab.  
It is built on the ELK stack with added components like Kafka, Jupyter, and prebuilt pipelines for ingesting logs and building detections.

Core components:
- **Elasticsearch, Logstash, Kibana**
- **Kafka** for event streaming
- **Jupyter notebooks** for analysis
- **Sigma rules** integration
- **Beats/Elastic Agent ingestion** (Winlogbeat, Sysmon, etc.)

---

## Goals
- Build a centralized detection & hunting platform for lab events.
- Forward Windows DC + Client logs (Sysmon + Winlogbeat) to HELK.
- Practice adversary emulation (Atomic Red Team, custom scripts, DCSync).
- Translate detections across platforms (Splunk SPL → Elastic KQL → Sigma).
- Develop a reusable portfolio of detections and playbooks.

---

## Architecture (High-Level)

```mermaid
graph TD
    A[Windows DC] -->|Sysmon + Winlogbeat| B[HELK Logstash]
    C[Windows Client] -->|Sysmon + Winlogbeat| B
    B --> D[Kafka]
    D --> E[Elasticsearch]
    E --> F[Kibana]
    E --> G[Jupyter Notebooks]
