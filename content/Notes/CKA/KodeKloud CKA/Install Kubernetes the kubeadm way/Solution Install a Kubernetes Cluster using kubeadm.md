# Solution Install a Kubernetes Cluster using kubeadm

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Install-Kubernetes-the-kubeadm-way/Solution-Install-a-Kubernetes-Cluster-using-kubeadm/page

Summary: Learn to install kubeadm and kubelet on control plane and worker node for setting up a Kubernetes cluster.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Introduction to Deployment with kubeadm|Previous: Introduction to Deployment with kubeadm]]


## Key Notes
- In this guide, you’ll learn how to install kubeadm along with the kubelet package on both the control plane and worker node (node1). To follow along, open two terminal sessions: one for the control plane and one via SSH connected to node1.
- Step 1: Configure Container Runtime Forwarding Rules
- Before installing the Kubernetes components, configure the necessary system forwarding rules on both nodes. Run the following command on both the control plane and node1:
- =
- net.ipv6.conf.default.use_tempaddr
- kernel.kptr_restrict
- fs.protected_symlinks
- net.ipv4.conf.default.rp_filter
- net.ipv4.conf.all.rp_filter
- net.ipv4.conf.default.promote_secondaries
- net.ipv4.ping_group_range
- net.ipv4.conf.default.qdisc
- net.bridge.bridge-nf-call-iptables
- net.bridge.bridge-nf-call-ipv4
- net.ipv4.ip_forward
- sysctl:
- \"fs.protected_fifos\",
- \"fs.protected_regular\",
- The output might also recommend installing a specific version of the Kubernetes packages. Keep this in mind as you progress through the installation.
- Step 2: Install kubeadm, kubelet, and kubectl
- Follow the steps below to install the Kubernetes components on both the control plane and node1. These instructions are based on Ubuntu; adjust as necessary for your distribution.
- 1. Update the Package Repository and Install Prerequisites
- apt-transport-https
- 2. Add the Google Cloud Public Signing Key
