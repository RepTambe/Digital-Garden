# Cluster Architecture

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Cluster-Architecture/page

Summary: This article provides an overview of Kubernetes cluster architecture, detailing the roles and components of master and worker nodes in managing containerized applications.

## Key Notes
- Hello and welcome to our comprehensive guide on Kubernetes cluster architecture. In this article, we provide a high-level overview of how Kubernetes organizes and manages containerized applications. You will learn about each component’s roles, responsibilities, and configurations, as well as practical insights into examining an existing cluster.
- Kubernetes simplifies the deployment, scaling, and management of containerized applications through automation. To help explain this concept, imagine two kinds of ships: cargo ships (worker nodes) that carry containers, and control ships (master nodes) that monitor and manage the cargo ships. In Kubernetes, the cluster consists of nodes—whether physical or virtual, on-premises or cloud-hosted—that host your containerized applications.
- Master Node Components
- The master node contains several control plane components that manage the entire Kubernetes cluster. It keeps track of all nodes, decides where applications should run, and continuously monitors the cluster. Think of the master node as the central command center coordinating the fleet.
- In a busy harbor, many containers are loaded and unloaded daily. Kubernetes maintains detailed information about each container and its corresponding node in a highly available key-value store called etcd. Etcd uses a simple key-value format along with a quorum mechanism, ensuring reliable and consistent data storage across the cluster.
- When a new container (or “ship cargo”) is ready, the Kubernetes scheduler—similar to port cranes—determines which worker node (or “ship”) should host it. The scheduler takes into account current load, resource requirements, and specific constraints like taints, tolerations, or node affinity rules. This scheduling process is vital for efficient cluster operation.
- The Kubernetes replication controller and other controllers work like dock office staff, ensuring that the desired number of containers are running and managing node operations.
- Other key master node components include:
- ETCD Cluster:
- Kube Scheduler:
- Controllers:
- Kube API Server:
- Worker Node Components
- Worker nodes, which can be compared to cargo ships, are responsible for running the containerized applications. Each node is managed by the Kubelet, the node’s “captain,” which ensures that containers are running as instructed.
- Kubelet:
- Kube Proxy:
- The entire control system is containerized. Whether you are using Docker, Containerd, or CRI-O, every node (including master nodes with containerized components) requires a compatible container runtime engine.
- The high-level worker node architecture ensures that applications remain available and responsive, even as they communicate across a distributed network.
- Summary of Kubernetes Architecture
- The Kubernetes cluster architecture is divided into two main segments:
- Component Category
- Key Components
- Master Node
- etcd, Kube Scheduler, Controllers, Kube API Server
