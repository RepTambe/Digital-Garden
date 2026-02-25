# ETCD in HA

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Design-and-Install-a-Kubernetes-Cluster/ETCD-in-HA/page

Summary: This lesson covers deploying ETCD in high-availability configurations, including cluster setup, data consistency, and the Raft protocol for Kubernetes resilience.

## Key Notes
- Welcome to this lesson on deploying ETCD in a high-availability (HA) configuration. In this guide, we will review ETCD fundamentals, explain how to configure a distributed cluster, and detail how data consistency is maintained across nodes using the Raft protocol. This HA setup is a critical requirement for running Kubernetes in a resilient manner.
- What is ETCD?
- ETCD is a distributed, reliable key-value store that is both fast and secure. Unlike traditional databases that store data in tables, ETCD organizes data as documents or pages. Each document holds all necessary information about a specific entity and can be formatted in JSON, YAML, or other structures. Changing one document does not affect others, which makes ETCD an excellent choice for modern, scalable architectures.
- Distributed ETCD Clusters
- ETCD’s design is inherently distributed. Picture three different servers each running an identical instance of ETCD. This redundancy ensures that if one server (or node) fails, the remaining nodes continue to have an accurate copy of the data.
- ETCD supports both read and write operations on any node. However, write operations require careful coordination. While clients might send write requests to any node, only the leader node processes these writes. If a write request lands on a follower, it is forwarded to the leader. The write operation is only confirmed after the leader gets an acknowledgement from a majority of the nodes.
- Read operations are simpler since every node contains the same data. Despite this, write operations necessitate a leader election through the Raft consensus protocol.
- The Raft Consensus Protocol
- Raft plays a crucial role in ensuring data consistency within an ETCD cluster. When the cluster boots up, no leader is present until one node’s randomized timeout expires, triggering an election. During this election, the candidate node requests votes from its peers. Once it obtains the necessary votes, it is crowned the leader and begins sending regular heartbeat messages to assert its control.
- If the leader fails or experiences network issues, the remaining nodes automatically trigger a new election to establish a new leader. This robust process guarantees that all write requests are processed correctly and that every node’s data remains synchronized.
- Quorum and Fault Tolerance
- For a write operation to be successful in an ETCD cluster, it must be replicated to a majority of nodes, which is referred to as a quorum. For instance, in a three-node cluster, the update must reach at least two nodes. The quorum is calculated using the formula:
- quorum = (total number of nodes / 2) + 1
- This means a three-node cluster requires a quorum of 2, a five-node cluster requires 3, etc. Odd-numbered clusters are preferred because even-numbered ones may split into equal groups during network partitions, preventing either group from achieving quorum and potentially causing cluster failure.
- Consider a six-node cluster: if a network partition results in subgroups of four and two, the larger group meets quorum and continues operation. However, if the split creates two groups of three, neither side meets the quorum of four nodes. In contrast, a seven-node cluster might split into groups of four and three, allowing the larger group to maintain functionality. For these reasons, odd node counts (e.g., three, five, seven) are strongly recommended for a robust HA cluster.
- Installing and Configuring ETCD
- To install ETCD, follow these steps:
- Download the latest supported binary.
- Extract the downloaded archive.
- Create the required directory structure.
- Copy the generated certificate files to their designated locations.
- For example, to download and extract the ETCD binary, use the following commands:
- \"https://github.com/coreos/etcd/releases/download/v3.3.9/etcd-v3.3.9-linux-amd64.tar.gz\"
- etcd-v3.3.9-linux-amd64.tar.gz
