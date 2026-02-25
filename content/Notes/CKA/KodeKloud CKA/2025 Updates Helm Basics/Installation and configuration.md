# Installation and configuration

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Helm-Basics/Installation-and-configuration/page

Summary: This article provides an overview of installing Helm, the package manager for Kubernetes, specifically on Linux systems.

## Key Notes
- In this lesson, we provide an overview of installing Helm, the package manager for Kubernetes. Helm simplifies the deployment and management of applications on Kubernetes. Before you begin, ensure that you have a fully functional Kubernetes cluster and that the kubectl command-line tool is properly configured on your local machine. Also, verify that your kubeconfig file contains the correct credentials to interact with your Kubernetes cluster.
- Helm is compatible with Linux, Windows, and macOS. This guide focuses on installing Helm on Linux systems.
- Ensure your Kubernetes cluster is up and running, and that you have installed and properly configured kubectl on your system.
- Installing Helm on Linux
- Using Snap
- If your Linux system supports Snap, you can install Helm using the following command:
- For apt-based Systems (Debian/Ubuntu)
- Follow these steps to add the Helm repository and install Helm on systems that use apt:
- Add the Helm GPG key:
- |
- Install HTTPS support for apt:
- apt-transport-https
- Add the Helm repository:
- \"deb https://baltocdn.com/helm/stable/debian/ all main\"
- /etc/apt/sources.list.d/helm-stable-debian.list
- Update the package index:
- Install Helm:
- For PKG-Supported Systems
- If your system uses the PKG package manager, install Helm with this command:
- Always refer to the official Helm documentation for the most up-to-date installation instructions.
- Helm documentation
