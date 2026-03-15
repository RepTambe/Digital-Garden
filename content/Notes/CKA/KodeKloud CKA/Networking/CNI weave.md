# CNI weave

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/CNI-weave/page

Summary: This article provides a comprehensive guide on the Weaveworks CNI plugin, covering its architecture, functionality, and deployment in Kubernetes environments.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[CNI in kubernetes|Previous: CNI in kubernetes]]
- [[CoreDNS in Kubernetes|Next: CoreDNS in Kubernetes]]


## Key Notes
- Welcome to this comprehensive guide on the Weaveworks CNI plugin. In this lesson, we’ll explore how this solution works, its architecture, and how it compares to a custom CNI script integrated into Kubelet.
- Previously, we examined a custom CNI script that handled networking tasks through commands similar to the following:
- ./net-script.sh
- <
- >
- ……
- Instead of using our custom approach, the Weave plugin automates and streamlines the network setup. Let’s dive in to understand how Weave functions.
- Manual Networking vs. Weave CNI
- In traditional networking, the routing table on each host maps different networks. When a packet moves from one pod to another, it usually exits through the network and is directed by a router to the destination node hosting the target pod. Although this works well in small-scale networks, scaling to hundreds of nodes and pods makes managing numerous routing table entries extremely challenging.
- Imagine a Kubernetes cluster as a company with different office sites (nodes). Each office has various departments (pods). Initially, a package (packet) may be delivered using a simple routing method. However, as the company expands across regions and countries, maintaining a comprehensive routing table becomes unmanageable.
- Think of Weave as a specialized shipping service. It deploys dedicated agents (pods) at each node that collectively form a peer-to-peer network, ensuring efficient communication and accurate routing in a large-scale environment.
- How Weave Works
- The Weave CNI plugin deploys an agent on each Kubernetes node. These agents exchange information about nodes, networks, and pods to maintain a complete topology of the cluster. Each node runs a Weave bridge, allowing dynamic IP address assignment. In the upcoming practice lesson, you will determine the exact range of IP addresses assigned by Weave.
- Keep in mind that a pod may be connected to multiple bridge networks (e.g., both the Weave bridge and the Docker bridge). The container’s routing configuration controls the path a packet follows, and Weave ensures that each pod has the correct route through its assigned agent. When sending a packet to a pod on another node, Weave intercepts, encapsulates, and routes it using updated source and destination details. At the destination node, the corresponding Weave agent decapsulates the packet and delivers it to the intended pod.
- Network Diagrams
- The following diagram illustrates a network setup with multiple Docker nodes, each residing in its own subnet, interconnected using Weaveworks to manage container networking:
- A subsequent diagram further explains this concept by representing a network of offices across several countries. This diagram highlights the connections and data flow with a Weaveworks truck illustration:
- Deploying Weave on a Kubernetes Cluster
- Deploying Weave on a Kubernetes cluster is straightforward. Once you have set up your base Kubernetes environment—with nodes, inter-node networking, and control plane components—you can deploy the Weave plugin using a single command. This command deploys the necessary components (Weave peers) as pods on every node, often configured via a DaemonSet.
- Here’s an example command to inspect the routing settings within a running pod:
- To deploy the Weave components, run:
- \"https://cloud.weave.works/k8s/net?k8s-version=$(
- |
- '\\ ')\"
