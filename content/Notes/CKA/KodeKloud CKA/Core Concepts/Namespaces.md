# Namespaces

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Namespaces/page

Summary: This article explores Kubernetes namespaces, their role in organizing resources, and how to manage them effectively within a cluster.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Core Concepts Section Introduction|Section Overview]]
- [[Kubelet|Previous: Kubelet]]
- [[Pods|Next: Pods]]


## Key Notes
- In this lesson, we explore the concept of namespaces in Kubernetes and how they help organize and isolate resources within your cluster.
- Understanding Namespaces Through Analogy
- Imagine there are two boys named Mark. To differentiate between them, you refer to them by their last names—Smith and Williams. They come from different houses where people often use first names for those familiar with them. However, when addressing someone from another house or an outsider, the full name is used. In Kubernetes, these “houses” represent namespaces. They allow you to group and manage resources differently based on their context and intended use.
- Default Namespace and System Namespaces
- By default, when you create objects such as pods, deployments, and services in your cluster, they are placed within a specific namespace (similar to being “inside a house”). The default namespace is automatically created during the Kubernetes cluster setup. Additionally, several system namespaces are created at startup:
- If you’re running a small environment or a personal cluster for learning, you might predominantly use the default namespace. In enterprise or production environments, however, namespaces provide essential isolation and resource management by allowing environments like development and production to coexist on the same cluster.
- Isolating Resources with Namespaces
- Namespaces allow you to set distinct policies and resource limits for different environments. This isolation prevents one namespace from interfering with another. For instance, you can apply separate resource quotas for CPU, memory, and the total number of pods to ensure fair usage across environments.
- Within a single namespace, resources can refer to each other directly via their simple names. For example, a web application pod in the default namespace can access a database service simply by using its service name:
- If the web app pod needs to communicate with a service located in a different namespace, you must use its fully qualified DNS name. For example, connecting to a database service named “db-service” in the “dev” namespace follows this format:
- \"db-service.dev.svc.cluster.local\"
- Here, “svc” indicates the service subdomain, followed by the namespace (“dev”) and the service name, ending with the default domain “cluster.local”.
- Managing Namespaces with kubectl
- Listing Pods in a Namespace
- To list all pods in the default namespace:
- >
- kubectl get pods
- 1/1
- =
- coredns-78cdf6894-92d52
- coredns-78cdf6894-jx25g
- kube-apiserver-master
- kube-controller-manager-master
- kube-flannel-ds-amd64-hz4cf
