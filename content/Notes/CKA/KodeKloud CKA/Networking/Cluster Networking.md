# Cluster Networking

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/Cluster-Networking/page

Summary: This article explores networking configurations for master and worker nodes in a Kubernetes cluster, including required ports and verification commands.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[2025 Updates Introduction to Gateway API|Previous: 2025 Updates Introduction to Gateway API]]
- [[CNI in kubernetes|Next: CNI in kubernetes]]


## Key Notes
- In this article, we explore the networking configurations necessary for both the master and worker nodes within a Kubernetes cluster. Each node must be equipped with at least one network interface configured with an IP address. Additionally, every host should have a unique hostname and MAC address—this is especially important when creating virtual machines (VMs) by cloning existing ones.
- Required Ports for Kubernetes Components
- Effective communication among the control plane components and worker nodes relies on specific port configurations. The following table summarizes the key ports that must be open:
- Port Range
- Kubernetes API Server (master)
- Used by worker nodes, the kube-controller-manager, external users, and other control plane components to access the API Server.
- Kubelet (master and worker)
- Monitors cluster activities and manages nodes.
- Kube-scheduler (master)
- Required for scheduling operations.
- Kube-controller-manager (master)
- Needed for managing cluster state and various controllers.
- 30000–32767
- Worker Nodes Services
- Exposes services for external access on worker nodes.
- 2379 & 2380
- etcd Server (master)
- Port 2379 is used for client communication, and port 2380 is used for communication between etcd servers in multi-master deployments.
- Kubernetes Documentation
- Verifying Network Configuration
- To ensure that your cluster’s network environment is set up correctly, it is useful to run several common commands. These commands help you inspect interfaces, IP addresses, hostnames, routing tables, and active services:
- 192.168.1.10/24
- 192.168.1.0/24
- /proc/sys/net/ipv4/ip_forward
