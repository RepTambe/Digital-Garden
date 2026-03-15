# Introduction to Autoscaling 2025 Updates

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Introduction-to-Autoscaling-2025-Updates/page

Summary: This article explores autoscaling in Kubernetes, focusing on Horizontal and Vertical Pod Autoscaling for the Certified Kubernetes Administrator exam.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Application Lifecycle Management Section Introduction|Section Overview]]
- [[In place Resize of Pods 2025 Updates|Previous: In place Resize of Pods 2025 Updates]]
- [[Multi Container Pods|Next: Multi Container Pods]]


## Key Notes
- Kubernetes Autoscaling course on KodeKloud
- Before diving into autoscaling in Kubernetes, let’s review the traditional concepts of scaling using physical servers.
- Imagine a past scenario where applications were deployed on physical servers with fixed CPU and memory capacities. When the application load exceeded server capacity, you had two options:
- Shut down the application and upgrade the existing server by adding more CPU and memory (vertical scaling).
- If the application could run multiple instances, add another server to distribute the load without downtime (horizontal scaling).
- Vertical scaling means enhancing a single server’s resources, whereas horizontal scaling means incorporating additional servers to manage increased load.
- Now, let’s see how these concepts apply to Kubernetes and containerized environments. Kubernetes is designed to dynamically scale containerized applications. Two primary scaling strategies in Kubernetes are:
- Scaling workloads – adding or removing containers (Pods) in the cluster.
- Scaling the underlying cluster infrastructure – adding or removing nodes (servers) in the cluster.
- To clarify:
- For the cluster infrastructure:
- Horizontal scaling:
- Vertical scaling:
- For workloads:
- There are two approaches to scaling in Kubernetes: manual and automated.
- Manual scaling and automated scaling both have their place. Manual scaling involves direct intervention and command execution, while automated scaling leverages Kubernetes controllers for dynamic adjustments.
- Manual Scaling
- For manual scaling, use the following methods:
- Cluster Infrastructure Horizontal Scaling:
- Workload Horizontal Scaling:
- --replicas=
- <
- >
- Workload Vertical Scaling:
