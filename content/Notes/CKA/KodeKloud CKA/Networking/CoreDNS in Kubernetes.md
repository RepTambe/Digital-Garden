# CoreDNS in Kubernetes

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/CoreDNS-in-Kubernetes/page

Summary: This lesson covers how Kubernetes uses CoreDNS for DNS resolution to facilitate communication between pods and services within a cluster.

## Key Notes
- Welcome to this lesson on CoreDNS in Kubernetes. In this guide, you will learn how Kubernetes implements DNS resolution within a cluster to facilitate seamless communication between pods and services.
- In our previous lesson, we explored how to address a service or pod from another pod. Now, we will explain how Kubernetes leverages a centralized DNS server to achieve that functionality.
- Imagine you have two pods with different IP addresses. One approach to enable communication between them is to add an entry into each pod’s hosts file. For instance, on the first pod, you might map the second pod (named “web”) to IP 10.244.2.5, and on the second pod, map the first pod (named “test”) to IP 10.244.1.5. However, when dealing with thousands of pods that are frequently created and removed, manually managing these entries becomes impractical.
- Instead of manually editing hosts files, Kubernetes deploys a central DNS server. Each pod is pre-configured via its /etc/resolv.conf file to use this centralized server (typically at 10.96.0.10), which automatically updates DNS records for new pods and services.
- Kubernetes does not create DNS entries for individual pods manually. Instead, it sets up DNS records for services, and for pods, it converts IP addresses into hostnames by replacing dots with dashes.
- Before Kubernetes version 1.12, this service was known as Kube-DNS. Starting with version 1.12, however, the recommended DNS server is CoreDNS, which brings enhanced flexibility and performance. Below is a conceptual illustration showing how pods configure their /etc/resolv.conf to point to the DNS server:
- /etc/resolv.conf
- CoreDNS Setup in the Cluster
- CoreDNS is deployed as a pod within the kube-system namespace. To ensure high availability, Kubernetes runs two replicas of CoreDNS pods managed by a ReplicaSet (now part of a Deployment). Each pod runs the CoreDNS executable, which you could also run manually if deploying CoreDNS independently.
- CoreDNS requires a configuration file—commonly named “Corefile” and located at /etc/coredns/Corefile—that outlines various plugins used to process DNS queries. An example configuration is shown below:
- /etc/coredns/Corefile :53 :9153
- This configuration performs the following functions:
- Logs and handles errors.
- Provides health check endpoints.
- Integrates with Kubernetes via the Kubernetes plugin, configuring the primary domain to cluster.local and transforming pod IP addresses into a dashed hostname format.
- Exposes Prometheus metrics for monitoring.
- Caches DNS responses and supports dynamic reloads of the configuration upon changes.
- Note that this configuration is stored in a ConfigMap. If adjustments are needed, simply update the ConfigMap:
- Once the CoreDNS pod is running with the correct configuration, it continuously monitors the Kubernetes API for new pods and services, allowing DNS records to be updated dynamically.
- DNS Service and Pod Configuration
- To enable pods to communicate with the CoreDNS server, Kubernetes creates a service (named kube-dns by default) with the IP address 10.96.0.10. This IP is automatically set as the primary nameserver in all pod /etc/resolv.conf files. The service details are as follows:
- <
- >
- 53/UDP,53/TCP
