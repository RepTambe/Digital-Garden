# Installation and configuration

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Helm-Basics-2025-Updates/Installation-and-configuration/page

Summary: This lesson explains the steps required to install Helm, a package manager for Kubernetes, on Linux systems.

## Key Notes
- This lesson explains the steps required to install Helm, a package manager for Kubernetes. Before starting, ensure you have a functioning Kubernetes cluster and that kubectl is properly configured. Verify that your kubeconfig file contains the correct credentials to access your Kubernetes cluster.
- Helm is compatible with Linux, Windows, and macOS. This guide focuses on installing Helm on Linux systems.
- Installing Helm on Linux
- Using Snap
- Using APT (Debian/Ubuntu)
- For apt-based systems such as Debian or Ubuntu, follow these steps to add the Helm package repository and its signing key, then install Helm:
- |
- apt-transport-https
- \"deb https://baltocdn.com/helm/stable/debian/ all main\"
- /etc/apt/sources.list.d/helm-stable-debian.list
- Using PKG
- On systems that support PKG, you can install Helm with the following command:
- For the most current installation procedures, always refer to the official Helm documentation.
- With Helm installed, you are now ready to explore its capabilities in your lab environment. This guide provided step-by-step instructions for various Linux distributions to help streamline your Helm installation process.
- Happy Helming!
