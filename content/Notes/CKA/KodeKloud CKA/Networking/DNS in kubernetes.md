# DNS in kubernetes

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/DNS-in-kubernetes/page

Summary: This article explains how DNS is managed in Kubernetes, covering service and pod DNS records and their role in pod communication.

## Key Notes
- Welcome to this comprehensive guide on how DNS is managed within a Kubernetes cluster. In this article, we explore the mechanisms behind both service and pod DNS records, along with practical examples for enabling communication between pods. Before diving in, ensure you are familiar with the basics of DNS. If you’re new to DNS concepts, please review the prerequisites below.
- Imagine a three-node Kubernetes cluster with multiple pods and services distributed across them. Each node typically has a unique name and IP address registered in your organization’s DNS server. However, our focus here is on the internal DNS resolution among the cluster’s pods and services. By default, when you create a cluster, Kubernetes deploys a built-in DNS server (unless manually configured otherwise), which facilitates name resolution for pods and services.
- Consider a simple scenario with two pods and a service in your cluster:
- test pod
- web pod
- Within the cluster, any pod can resolve and access the web service using its service name. For example, to access the web-service from the test pod, you could use:
- Earlier, we discussed namespaces in Kubernetes. Remember that pods within the same namespace (default namespace is usually “default”) can communicate using just their short names. The image below illustrates the concept of separate namespaces and how naming differs between them.
- To illustrate DNS resolution with namespaces, consider the following examples:
- web-service.apps.svc.cluster.local
- 10-244-2-5.apps.pod.cluster.local
- This DNS entry resolves to the pod’s IP address. You can test the resolution with the command below:
- For more detailed information on Kubernetes DNS and other concepts, consider reviewing the following resources:
- Kubernetes Basics
- Kubernetes Documentation
- CoreDNS Documentation
- By understanding these DNS concepts, you can better manage communication within your Kubernetes cluster and ensure reliable service discovery in your environment.
