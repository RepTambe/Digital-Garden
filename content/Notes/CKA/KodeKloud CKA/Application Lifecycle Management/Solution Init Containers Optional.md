# Solution Init Containers Optional

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Solution-Init-Containers-Optional/page

Summary: This guide provides a step-by-step lab on Kubernetes init containers, covering pod configurations, updates, and troubleshooting.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Application Lifecycle Management Section Introduction|Section Overview]]
- [[Solution Env Variables Optional|Previous: Solution Env Variables Optional]]
- [[Solution Multi Container Pods Optional|Next: Solution Multi Container Pods Optional]]


## Key Notes
- This guide walks you through a step-by-step lab on Kubernetes init containers. You will learn how to inspect pod configurations, differentiate between regular and init containers, update pod specifications to include an init container, and troubleshoot a failing pod.
- Identifying Pods and Their Container Configurations
- Begin by listing all pods in your cluster. In this lab, there are three pods: red, green, and blue.
- ~
- ☸️
- 1/1
- 2/2
- From the output, note that the pod named green is running two containers. However, to identify if a pod includes an init container, further inspection is required.
- Detailed Pod Descriptions
- Retrieve a detailed description of the pods to uncover specific container configurations:
- ⚡
- kubectl describe pod
- For example, reviewing the blue pod displays the following snippet:
- Command:
- echo The app is running! && sleep 3600
- State: Running
- Started: Sun, 17 Apr 2022 18:52:01 +0000
- Init Containers:
- init=myservice:
- Container ID: containerd://28fa7c4e96d7b048794557903be8a61357eba3fa1e30568dcb3e30aa52adfbcd
- Image:
- Image ID: docker.io/library/busybox@sha256:d2b53584f580310186df7a2055ce3ff83cc0df6caacf1e3489bf
- Port: <none>
- Host Port: <none>
