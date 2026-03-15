# Configure High Availability

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Design-and-Install-a-Kubernetes-Cluster/Configure-High-Availability/page

Summary: This guide explains configuring high availability in Kubernetes to ensure continuous operation during master node failures.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Choosing Kubernetes Infrastructure|Previous: Choosing Kubernetes Infrastructure]]
- [[Design a Kubernetes Cluster|Next: Design a Kubernetes Cluster]]


## Key Notes
- Welcome to this guide on configuring high availability in Kubernetes. In this article, we explain what happens when a master node fails and how to set up your environment to ensure continuous operation. We focus on maintaining sufficient redundancy for the control plane components while highlighting the crucial role of each component.
- When a master node becomes unavailable, the worker nodes and the applications running on them continue to function normally. However, if a container or pod (especially one managed by a replica set) crashes, the replication controller on the master is responsible for starting a new pod. Without a functioning master, its controllers, schedulers, and the Kube API server become unreachable, meaning you cannot manage the cluster externally with commands like kubectl or via the API.
- To mitigate this single point of failure, it is essential to deploy multiple master nodes in a high availability configuration. This setup builds redundancy across all critical components—from the master nodes and control plane components to the worker nodes and applications managed by replica sets and services.
- The remainder of the article focuses on the master node components and their operation in a high availability environment.
- High Availability Master Components
- In a standard three-node cluster, you start with one master and two worker nodes. The master node hosts the core control plane components, including the API server, controller manager, scheduler, and etcd server. When you add a second master node for high availability, the same components are deployed on the new master.
- API Server in Active-Active Mode
- The Kube API server processes requests and provides cluster information. It runs in an active-active mode; multiple API servers can operate concurrently on different nodes. In a typical configuration, the kubectl utility contacts the master node on port 6443 as specified in the kubeconfig file. However, when multiple master nodes are present, you must avoid sending duplicate requests to all of them. Instead, use a load balancer to distribute traffic evenly among the API servers.
- You can implement load balancing with tools such as nginx or HAProxy to ensure smooth operation.
- Scheduler and Controller Manager in Active-Standby Mode
- Both the scheduler and controller manager continuously monitor the cluster state to perform required actions. Running multiple instances of these components simultaneously could lead to duplicate operations, like launching extra pods. To prevent this, they should run in an active-standby mode. A leader election process ensures that only one instance manages the operations at a time.
- For instance, the controller manager uses leader election (enabled by default) to secure a lock on a specific Kubernetes endpoint known as the “kube-controller-manager” endpoint. The first instance to update this endpoint becomes active, while the others remain passive. The active process holds the lock for a defined lease duration (default is 15 seconds) and renews it every 10 seconds, while all instances attempt to acquire leadership every 2 seconds. If the active instance fails, a passive instance can quickly take over.
- Below is an example command to start the controller manager with leader election enabled:
- kube-controller-manager
- [other
- options]
- The scheduler is configured similarly, using the same leader election options.
- etcd Topologies in High Availability
- etcd is the Kubernetes component that stores all cluster data. There are two common topologies for its deployment:
- Stacked Control Plane Nodes Topology:
- External etcd Servers Topology:
- Remember that even in high availability configurations, only the API server communicates directly with etcd. In your API server configuration, you must specify the list of etcd servers (it can be a single address or multiple addresses, depending on your chosen topology).
- In upcoming articles, we will delve deeper into how etcd operates within a cluster and outline best practices for determining the optimal number of nodes in your etcd cluster.
- Cluster Design Summary
