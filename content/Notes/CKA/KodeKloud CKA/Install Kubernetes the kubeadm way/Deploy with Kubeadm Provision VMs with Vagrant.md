# Deploy with Kubeadm Provision VMs with Vagrant

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Install-Kubernetes-the-kubeadm-way/Deploy-with-Kubeadm-Provision-VMs-with-Vagrant/page

Summary: This guide explains how to provision virtual machines for a Kubernetes cluster using Vagrant and VirtualBox.

## Key Notes
- In this guide, you’ll learn how to provision virtual machines for a Kubernetes cluster using Vagrant and VirtualBox. The Kubernetes environment will include one master node and two worker nodes. We use two essential tools:
- Before you begin, ensure that both VirtualBox and Vagrant are installed on your system.
- Vagrant documentation
- A preconfigured Vagrantfile is provided in the course repository. This file contains all the configuration details necessary to spin up the VMs. To get started, follow these steps:
- Copy the repository URL from the code dropdown.
- Open a terminal and execute the command below to clone the repository:
- <
- >
- After cloning the repository, change into the directory:
- certified-kubernetes-administrator-course/
- Vagrantfile Configuration
- The provided Vagrantfile is set up to provision one master node and two worker nodes. It assigns specific IP addresses within the 192.168.56.x network, although Kubernetes configuration will be added later. Below is an excerpt from the Vagrantfile demonstrating the basic configuration:
- =
- \"192.168.56.\"
- \"2\"
- |
- \"base\"
- \"ubuntu/bionic64\"
- \"public_network\"
- The Vagrantfile further defines the provisioning of the master node as follows:
- \"kubemaster\"
- \"virtualbox\"
- \"private_network\"
- ip:
