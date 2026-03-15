# Managing Application Logs

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Logging-Monitoring/Managing-Application-Logs/page

Summary: This article provides a guide on managing application logs in Kubernetes, covering logging mechanisms in Docker and Kubernetes for effective monitoring and troubleshooting.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Logging and Monitoring Section Introduction|Section Overview]]
- [[Logging and Monitoring Section Introduction|Previous: Logging and Monitoring Section Introduction]]
- [[Monitor Cluster Components|Next: Monitor Cluster Components]]


## Key Notes
- Welcome to this comprehensive guide on managing application logs in Kubernetes. In this article, we explore various logging mechanisms, starting with Docker and moving on to Kubernetes, to help you monitor and troubleshoot your applications effectively.
- Logging in Docker
- Docker containers typically log events to the standard output. Consider the “event simulator” container, which generates random events simulating a web server. When you run this container, it writes log entries such as:
- kodekloud/event-simulator
- 15:57:15,937
- 15:57:16,943
- 15:57:17,944
- 15:57:18,951
- 15:57:19,954
- 15:57:21,956
- 15:57:22,957
- 15:57:23,959
- 15:57:24,959
- 15:57:25,962
- 15:57:26,965
- 15:57:27,965
- 15:57:29,967
- <
- >
- Logging in Kubernetes
- Deploying the same Docker image within a Kubernetes pod leverages Kubernetes’ logging capabilities. To get started, create a pod using the following YAML definition:
- event-simulator-pod
- Create the pod with this command:
- event-simulator.yaml
