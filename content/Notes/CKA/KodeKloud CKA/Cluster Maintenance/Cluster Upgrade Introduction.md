# Cluster Upgrade Introduction

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Cluster-Maintenance/Cluster-Upgrade-Introduction/page

Summary: This article explains the process of upgrading a Kubernetes cluster, focusing on control plane components and strategies for upgrading master and worker nodes.

## Key Notes
- Welcome to this article on upgrading a Kubernetes cluster. Here, we will explain the upgrade process focusing on the core control plane components, while keeping external dependencies like ETCD and CoreDNS aside. In a previous article, we discussed how Kubernetes manages software releases and how its components can have independent versioning.
- It is important to note that not all components are required to run on the same version. Although different components can operate on varying release versions, the Kube API Server remains the primary control plane component that all others communicate with. Consequently, no component should ever run on a version higher than the API Server. For example:
- The controller manager and scheduler may be one version lower than the API Server.
- The Kubelet and Kube Proxy components may be two versions lower than the API Server.
- For instance, if the API Server is at version 1.10, then:
- The controller manager and scheduler can run on version 1.10 or 1.9.
- The Kube Control utility is an exception and may run on a version that is higher, lower, or the same as the API Server. This flexibility supports live, rolling upgrades where components can be upgraded individually.
- When to Upgrade
- Suppose you’re running Kubernetes 1.10, and new releases 1.11 and 1.12 are available. Kubernetes officially supports up to the three most recent minor versions. With 1.12 as the latest, the supported versions are 1.12, 1.11, and 1.10. When version 1.13 is released, only 1.13, 1.12, and 1.11 will be supported. It is advisable to upgrade your cluster to the next release before support for your current version is dropped.
- An effective upgrade strategy is to upgrade one minor version at a time (e.g., upgrade from 1.10 to 1.11, then from 1.11 to 1.12, and finally from 1.12 to 1.13) rather than attempting a large jump between versions. Keep in mind that the upgrade process may vary depending on your cluster setup. Managed Kubernetes services (such as Google Kubernetes Engine) offer a simple upgrade interface, while clusters deployed using tools like kubeadm or manual installation require more hands-on management.
- Upgrade Process Overview
- Consider a production cluster with master and worker nodes running version 1.10. The upgrade process generally involves two major steps:
- Upgrading the master nodes.
- Upgrading the worker nodes.
- During the master node upgrade, control plane components (such as the API server, scheduler, and controller managers) experience a brief interruption. Although management functionality (like kubectl commands or scaling deployments) is paused, the worker nodes continue to run and deliver applications. However, keep in mind that if any pods fail during this period, they might not be restarted automatically. Once the master upgrade is complete, normal control plane operations resume.
- After the master nodes are upgraded (for example, moving from version 1.10 to 1.11 while the worker nodes are still at 1.10), the next step is to upgrade the worker nodes. There are several strategies for this:
- Upgrade all worker nodes simultaneously (which may result in downtime).
- Upgrade one worker node at a time, allowing workloads to be shifted and ensuring continuous service.
- Add new nodes with the updated software version, migrate workloads to these new nodes, and then decommission the older nodes.
- Upgrading with kubeadm
- Suppose you want to upgrade your cluster from version 1.11 to 1.13. The kubeadm tool simplifies planning and executing cluster upgrades. To start, run:
- This command provides useful information such as:
- The current cluster version.
- The version of the kubeadm tool.
