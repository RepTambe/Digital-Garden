# Solution Cluster Upgrade Process

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Cluster-Maintenance/Solution-Cluster-Upgrade-Process/page

Summary: This article demonstrates the process of upgrading a Kubernetes cluster while ensuring zero downtime for production applications.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Cluster Maintenance Section Introduction|Section Overview]]
- [[Solution Backup and Restore 2|Previous: Solution Backup and Restore 2]]


## Key Notes
- In this lesson, we will walk through a hands-on lab demonstrating the process of upgrading a Kubernetes cluster running production applications. This upgrade covers inspecting the current cluster state, draining nodes, upgrading control plane and worker node components, and validating the new version—all while ensuring zero downtime during the migration of workloads.
- Inspecting the Current Cluster
- Before upgrading, we need to verify the existing cluster configuration. Start by checking the current version of the Kubernetes cluster and confirming the node status by running:
- root@controlplane:~#
- <
- >
- The output confirms that the cluster is running version v1.19.0 with one master and one worker node. Next, check for any node taints to determine if nodes are available to host applications:
- |
- Taints:
- Since no taints are present, both nodes can host workloads.
- Now, verify the deployed applications (deployments) in the cluster:
- 5/5
- Here, we observe that a single application named “blue” is running. To further validate distribution, check which nodes the pods are scheduled on:
- The output indicates that pods are running on both the control plane and node01.
- Upgrade Strategy
- Since application uptime is critical and no additional virtual machines are available, the recommended strategy is to upgrade one node at a time. This sequential approach allows workloads to be migrated safely between nodes, thus avoiding downtime. Upgrading all nodes simultaneously would disrupt active workloads, so a staged upgrade—first the control plane, then the worker node—is the optimal solution.
- Checking the Latest Stable Version with kubeadm
- Before initiating the upgrade, determine the latest stable Kubernetes version available via kubeadm:
- [upgrade/config] Making sure the configuration is correct:
- [upgrade/config] Reading configuration from cluster...
- [upgrade/config] FYI: You can look at this config file with
- 'kubectl -n kube-system get cm kubeadm-config -oyaml'
- [preflight] Running pre-flight checks.
- [upgrade] Running cluster health checks.
