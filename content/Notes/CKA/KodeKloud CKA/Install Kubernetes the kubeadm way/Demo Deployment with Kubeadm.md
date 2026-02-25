# Demo Deployment with Kubeadm

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Install-Kubernetes-the-kubeadm-way/Demo-Deployment-with-Kubeadm/page

Summary: This guide explains how to bootstrap a Kubernetes cluster using kubeadm with a master and two worker nodes.

## Key Notes
- In this guide, we’ll walk through bootstrapping a Kubernetes cluster using kubeadm. The setup involves three virtual machines (VMs): one control plane (master) node and two worker nodes. We will review the VM network configurations, install the container runtime and Kubernetes components, initialize the control plane, deploy a pod network add-on, and finally join the worker nodes to complete the cluster.
- 1. VM Overview and Network Interfaces
- ip add
- Master Node Network Configuration
- Run the following command on the master node:
- vagrant@kubemaster:~$
- 1:
- lo:
- <
- LOOPBACK,UP,LOWER_U
- >
- link/loopback
- 00:00:00:00:00:00
- 127.0.0.1/8 ::1/128
- 2:
- enp0s3:
- BROADCAST,MULTICAST,UP,LOWER_U
- link/ether
- 02:95:21:8a:38:bd
- ff:ff:ff:ff:ff:ff
- 10.0.2.15/24
- fe80::95:21ff:fe8a:38bd/64
- 3:
- enp0s8:
