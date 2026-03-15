# Services

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Services/page

Summary: This guide explores Kubernetes services, focusing on enabling communication between application components and detailing the creation and use of NodePort services.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Core Concepts Section Introduction|Section Overview]]
- [[ReplicaSets|Previous: ReplicaSets]]
- [[Services Cluster IP|Next: Services Cluster IP]]


## Key Notes
- Hello, and welcome to this in-depth guide on Kubernetes Services for Beginners. My name is Mumshad Mannambeth, and in this article, we’ll explore how Kubernetes services enable seamless communication between various application components—both within the cluster and from the outside world.
- Kubernetes services allow different sets of Pods to interact with each other. Whether connecting the front end to back-end processes or integrating external data sources, services help to decouple microservices while maintaining reliable communication. For instance, you can expose your front-end to end users and enable back-end components to interact efficiently.
- Use Case: From Internal Networking to External Access
- So far, we’ve seen how Pods communicate internally using the Kubernetes network. Consider a scenario where you deploy a Pod running a web application and want an external user to access it. Here’s a quick overview of the setup:
- Kubernetes Node IP:
- Laptop IP (same network):
- Internal Pod Network:
- Pod IP:
- World!
- While this method works from the node, the goal is to have external access directly from your laptop using the node’s IP. This is where a Kubernetes service, specifically a NodePort service, becomes essential. A NodePort service maps requests arriving at a designated node port (like 30008) to the Pod’s target port.
- For example:
- This configuration externally exposes the web server running inside the Pod.
- Types of Kubernetes Services
- Kubernetes supports several service types, each serving a unique purpose:
- NodePort:
- ClusterIP:
- LoadBalancer:
- Remember: The NodePort service type maps a specific node port (e.g., 30008) to the target port on your Pod (e.g., 80). This provides external access while keeping internal port targeting intact.
- NodePort Service Breakdown
- With a NodePort service, there are three key ports to consider:
- Target Port:
- Port:
- Creating a NodePort Service
- The process of creating a NodePort service begins with defining the service in a YAML file. The definition file follows a similar structure to those used for Deployments or ReplicaSets, including API version, kind, metadata, and spec.
