# Solution Backup and Restore

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Cluster-Maintenance/Solution-Backup-and-Restore/page

Summary: Learn to back up and restore an etcd cluster in Kubernetes, including verification, snapshot creation, and restoration procedures.

## Key Notes
- In this lesson, you will learn how to back up and restore an etcd cluster running on a Kubernetes control plane. We begin by verifying the existing deployments, inspecting the etcd container setup, and then proceed with the backup and restore procedures.
- 1. Checking the Current Deployments
- Assuming a running Kubernetes cluster with two applications deployed (“red” and “blue”), first confirm that the deployments exist:
- root@controlplane
- ~
- ⟶
- 3/3
- 2/2
- 2. Verifying the ETCD Version and Pod Details
- To identify the version of etcd and verify pod details, locate the etcd pod in the kube-system namespace. Typically configured as a static pod, you can review its description to inspect container details and command-line parameters.
- For example, examining the etcd container shows:
- Status:
- IP:
- IPs:
- By:
- Node/controlplane
- Containers:
- etcd:
- ID:
- docker://5930818c18aacf4b00d3eb301cec4427e88249a2ab5291743f05bfa4f5dbf4b7
- Image:
- k8s.gcr.io/etcd:3.5.1-0
- docker-pullable://k8s.gcr.io/etcd@sha256:64b9ea357325d5db9fa723dcf503b5a449177b17ac263
- Port:
