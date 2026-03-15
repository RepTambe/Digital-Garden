# Kube Controller Manager

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Kube-Controller-Manager/page

Summary: This guide covers the Kube Controller Managers role, configuration, and importance in managing controllers within a Kubernetes cluster.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Core Concepts Section Introduction|Section Overview]]
- [[Kube API Server|Previous: Kube API Server]]
- [[Kube Proxy|Next: Kube Proxy]]


## Key Notes
- Welcome to this comprehensive guide on the Kube Controller Manager, a vital component in Kubernetes responsible for managing a variety of controllers within your cluster. Understanding its role and configuration is crucial for ensuring a resilient and well-orchestrated Kubernetes environment.
- In Kubernetes, a controller acts like a department in an organization—each controller is tasked with handling a specific responsibility. For instance, one controller might monitor the health of nodes, while another ensures that the desired number of pods is always running. These controllers constantly observe system changes to drive the cluster toward its intended state.
- The Node Controller, for example, checks node statuses every five seconds through the Kube API Server. If a node stops sending heartbeats, it is not immediately marked as unreachable; instead, there is a grace period of 40 seconds followed by an additional five minutes for potential recovery before its pods are rescheduled onto a healthy node.
- Example: Checking Node Statuses
- <
- >
- In the case where a node fails to recover, the output might look like this:
- Another essential controller is the Replication Controller, which ensures that the specified number of pods is maintained by creating new pods when needed. This mechanism reinforces the resilience and reliability of your Kubernetes cluster.
- All core Kubernetes constructs—such as Deployments, Services, Namespaces, and Persistent Volumes—rely on these controllers. Essentially, controllers serve as the “brains” behind many operations in a Kubernetes cluster.
- How Controllers Are Packaged
- All individual controllers are bundled into a single process known as the Kubernetes Controller Manager. When you deploy the Controller Manager, every associated controller is started together. This unified deployment simplifies management and configuration.
- Installing and Configuring the Kube Controller Manager
- To install and view the Kube Controller Manager, follow these steps:
- Download the Kube Controller Manager from the Kubernetes release page.
- Extract the binary and run it as a service.
- Review the configurable options provided, which allow you to tailor its behavior.
- Downloading the Controller Manager
- Sample Service Configuration
- kube-controller-manager.service
- =
- /usr/local/bin/kube-controller-manager
- --address=0.0.0.0
- --cluster-cidr=10.200.0.0/16
- --cluster-name=kubernetes
