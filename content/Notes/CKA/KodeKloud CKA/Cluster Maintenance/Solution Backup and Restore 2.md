# Solution Backup and Restore 2

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Cluster-Maintenance/Solution-Backup-and-Restore-2/page

Summary: Learn to back up and restore etcd databases across multiple Kubernetes clusters using the kubectl client on the student node.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Cluster Maintenance Section Introduction|Section Overview]]
- [[Solution Backup and Restore|Previous: Solution Backup and Restore]]
- [[Solution Cluster Upgrade Process|Next: Solution Cluster Upgrade Process]]


## Key Notes
- In this lesson, you will learn how to back up and restore etcd databases across multiple Kubernetes clusters. We will use the student node—which already has the kubectl client installed—to access and work with both clusters in our environment.
- Verifying the Environment and Cluster Configuration
- Before proceeding, it is critical to ensure that your kubectl configuration is correct. Begin by listing the nodes and reviewing the current configuration.
- Run the following command to list the nodes:
- ~
- ⟶
- cluster1-controlplane
- <
- >
- Then, check the current kubectl configuration to verify all defined clusters:
- apiVersion:
- clusters:
- cluster:
- certificate-authority-data:
- DATA+OMITTED
- server:
- name:
- contexts:
- context:
- user:
- current-context:
- kind:
- preferences:
- users:
