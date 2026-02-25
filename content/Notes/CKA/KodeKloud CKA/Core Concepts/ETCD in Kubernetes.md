# ETCD in Kubernetes

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/ETCD-in-Kubernetes/page

Summary: This article explores the role of etcd in Kubernetes, covering deployment methods and high availability considerations.

## Key Notes
- Welcome to this comprehensive guide on etcd in Kubernetes. In this article, we explore the critical role of etcd in storing cluster state, detail different deployment approaches, and explain high availability considerations. Whether you’re setting up a Kubernetes cluster from scratch or using kubeadm, understanding etcd is essential.
- kubectl get
- Any changes you make to the cluster—whether adding nodes, deploying pods, or configuring ReplicaSets—are first recorded in etcd. Only after etcd is updated are these changes considered to be complete.
- --advertise-client-urls
- Deployment Methods
- Depending on your Kubernetes setup, you can deploy etcd in two primary ways: manually from scratch or automatically with kubeadm. Each method has its use cases, with manual setups providing a deeper understanding of etcd configurations and kubeadm streamlining the deployment process.
- Deploying etcd from Scratch
- When setting up your cluster manually, you’ll need to download the etcd binaries, install them, and configure etcd as a service on your master node. Manual deployment gives you more control over configuration options, particularly for setting up TLS certificates.
- Below is an example of how you might download the etcd binaries and configure the etcd service:
- \"https://github.com/coreos/etcd/releases/download/v3.3.9/etcd-v3.3.9-linux-amd64.tar.gz\"
- =
- /usr/local/bin/etcd
- ${
- --cert-file=/etc/etcd/kubernetes.pem
- --key-file=/etc/etcd/kubernetes-key.pem
- --peer-cert-file=/etc/etcd/kubernetes.pem
- --peer-key-file=/etc/etcd/kubernetes-key.pem
- --trusted-ca-file=/etc/etcd/ca.pem
- --peer-trusted-ca-file=/etc/etcd/ca.pem
- --peer-client-cert-auth
- --client-cert-auth
- --initial-advertise-peer-urls
- ${ :2380
- --listen-peer-urls
