# Kube Proxy

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Kube-Proxy/page

Summary: This article provides an overview of Kube Proxy&#x27;s role in Kubernetes networking and its function in ensuring reliable communication between pods and Services.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Core Concepts Section Introduction|Section Overview]]
- [[Kube Controller Manager|Previous: Kube Controller Manager]]
- [[Kube Scheduler|Next: Kube Scheduler]]


## Key Notes
- Welcome to this detailed guide on Kube Proxy and its critical role in Kubernetes networking. In this article, you will learn how Kube Proxy ensures reliable communication between pods and how it enables Services to function seamlessly across your cluster.
- Pod Networking in Kubernetes
- Kubernetes enables every pod within a cluster to communicate with one another by deploying a robust pod networking solution. This creates an internal virtual network that spans all nodes, connecting every pod.
- Imagine your web application is running on one node while your database application is on another. Though the web application could connect to the database via its pod IP, these IPs are transient and may change. The recommended solution is to create a Service. By exposing the database through a Service (e.g., using the name “DB”), the web application can maintain a consistent connection without relying on fluctuating pod IPs. Each Service is assigned a stable IP address, and traffic routed to the Service is automatically forwarded to the appropriate backend pod.
- A Service in Kubernetes is a virtual entity that doesn’t correspond to a container or network interface. Instead, it provides a persistent endpoint in the cluster’s memory, allowing stable access to the underlying pods.
- How Kube Proxy Works
- Kube Proxy is a lightweight process that runs on every node in the Kubernetes cluster. Its key function is to monitor for Service creations and configure network rules that redirect traffic to the corresponding pods. One common method it uses is by setting up IP tables rules.
- For example, if a Service is assigned the IP 10.96.0.12, Kube Proxy configures the IP tables on each node so that any traffic directed to that IP is forwarded to the actual pod IP, such as 10.32.0.15. This redirection mechanism ensures that Services work transparently across the cluster, regardless of which node initiates the request.
- Installing Kube Proxy
- To get started with Kube Proxy:
- Kubernetes release page
- Extract the binary and run it as a service on your nodes.
- Typically, when using kubeadm, Kube Proxy is deployed as a DaemonSet. This approach guarantees that a single Kube Proxy pod runs on every node in the cluster.
- Using kubeadm, Kube Proxy is automatically managed as a DaemonSet, streamlining the process of ensuring that every node runs a Kube Proxy instance.
- Verifying the Kube Proxy Deployment
- After installation, you can verify that Kube Proxy is functioning correctly by checking the status of pods and the DaemonSet in the kube-system namespace. Run the following commands:
- These commands list the running pods and DaemonSets, confirming that Kube Proxy is deployed and operating as expected.
- This guide provided a high-level overview of Kube Proxy and its essential role in routing network traffic within Kubernetes. By understanding how Services interact with Kube Proxy, and how the component ensures reliable pod-to-pod communication, you are better prepared to manage and scale your Kubernetes deployments.
- Thank you for reading. Stay tuned for more in-depth discussions on Kubernetes networking, Services, and other core components in upcoming modules.
