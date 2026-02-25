# Services Loadbalancer

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Services-Loadbalancer/page

Summary: This article explores the LoadBalancer service type in Kubernetes, focusing on simplifying access to front-end applications through cloud-native load balancing.

## Key Notes
- In this article, we explore another service type: the LoadBalancer. Previously, we examined the NodePort service that exposes an application on a specific port of the worker nodes. Here, we focus on front-end applications such as the voting app and the result app.
- Imagine that these pods are distributed across a cluster—say, a four-node cluster. To allow external users to access these applications, services of type NodePort were created. The NodePort service routes incoming traffic from designated ports on the worker nodes to the corresponding pods. With NodePort, you can reach the applications using any node’s IP address along with its high port number. For example, if the voting app and the result app are bound to different IP-port combinations, users could access the application using any node’s IP address and its specified port, even if the pods are running on only two of the nodes.
- While NodePort works, it forces users to remember multiple IP-port pairs, which can be inconvenient.
- Google Cloud Platform (GCP)
- Below is a diagram that illustrates a cloud-based voting app architecture on Google Cloud Platform. The image shows nodes, pods, deployments, and a load balancer configured to handle the voting and result services:
- Keep in mind that the LoadBalancer service type only functions as intended on supported cloud environments. In unsupported settings—such as VirtualBox—the LoadBalancer type behaves like NodePort by exposing the service on a high port without providing external load balancing.
- In upcoming articles, we will demonstrate how to deploy applications on cloud platforms and observe how this configuration works in action. Stay tuned for more detailed guides in our series.
