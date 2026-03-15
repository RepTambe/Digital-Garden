# ETCD for Beginners

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/ETCD-for-Beginners/page

Summary: This article introduces etcd, a distributed key-value store, covering its operation, installation, and transition from API v2 to v3.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Core Concepts Section Introduction|Section Overview]]
- [[Docker vs ContainerD|Previous: Docker vs ContainerD]]
- [[ETCD in Kubernetes|Next: ETCD in Kubernetes]]


## Key Notes
- This article provides a concise introduction to etcd—a distributed, reliable key-value store that is both simple and fast. Whether you’re new to key-value storage concepts or already familiar with etcd’s role in Kubernetes environments, this guide offers valuable insights into its operation and quick start instructions using the etcdctl client tool.
- Later in the article, we will dive deeper into high availability topics. You’ll learn about distributed systems, how etcd operates in cluster mode, the Raft consensus protocol, and best practices for configuring a resilient etcd cluster.
- What Is a Key-Value Store?
- Traditional relational databases, such as SQL databases, store data in tables with rows and columns. For example, a table that contains information about individuals might look like this:
- Each row represents a single person.
- Each column holds a specific detail about that person (e.g., name, age).
- If you need to include additional information (like salary data for employed individuals or grades for students), you must expand the table. This means adding columns that may not apply universally to every row.
- In contrast, a key-value store organizes data as independent documents or files. Each document contains all relevant information for an individual, allowing flexible and dynamic data structures:
- Working individuals can have documents with salary details.
- Students can have documents with grade details.
- For complex data transactions, structured formats like JSON or YAML are used. Here are some examples of key-value pairs stored as JSON documents:
- \"name\"
- \"John Doe\"
- \"age\"
- \"location\"
- \"New York\"
- \"salary\"
- \"Dave Smith\"
- \"organization\"
- \"ACME\"
- \"Aryan Kumar\"
- \"Grade\"
- \"A\"
- \"Lily Oliver\"
