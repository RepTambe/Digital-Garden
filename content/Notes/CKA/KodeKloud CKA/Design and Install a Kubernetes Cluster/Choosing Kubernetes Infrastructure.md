# Choosing Kubernetes Infrastructure

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Design-and-Install-a-Kubernetes-Cluster/Choosing-Kubernetes-Infrastructure/page

Summary: This guide helps you select the right Kubernetes infrastructure by exploring various hosting options and deployment strategies for local and production environments.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Configure High Availability|Next: Configure High Availability]]


## Key Notes
- Welcome to this informative guide on selecting the right Kubernetes infrastructure for your needs. In this article, we explore various hosting options for Kubernetes clusters, examine their unique characteristics, and provide insights into both local and production deployments. Whether you’re new to Kubernetes or looking to expand your production environment, this guide will help you make an informed decision.
- Kubernetes can be deployed on numerous platforms—from your local machine or laptop to both physical and virtual servers hosted on-premises or in the cloud. Your choice will depend on your technical requirements, cloud ecosystem compatibility, and the type of applications you plan to run.
- Deploying Kubernetes on a Local Machine
- For local development or testing purposes, several setup strategies are available. On a supported Linux system, you can install the Kubernetes binaries manually to configure a local cluster. However, for beginners, this process may be challenging, and a more automated solution is generally preferred to simplify cluster setup.
- On Windows, since native Kubernetes binaries are not available, you need to rely on virtualization platforms such as Hyper-V, VMware Workstation, or VirtualBox. Windows users typically create Linux virtual machines (VMs) to host Kubernetes. Although Kubernetes components can run as Docker containers on these VMs, they operate on minimal Linux operating systems provided by Hyper-V.
- Local Deployment Solutions
- Two popular local deployment methods include:
- Minikube:
- Kubeadm:
- Local Kubernetes deployments on laptops are ideal for learning, development, and testing scenarios.
- Production Deployment Options
- In production environments, Kubernetes clusters are typically deployed in private or public clouds. Production solutions fall into two main categories: turnkey solutions and hosted (or managed) solutions.
- Turnkey Solutions
- Turnkey solutions enable you to provision and configure Kubernetes clusters with automated tools or scripts. While these solutions automate the deployment process, you remain responsible for maintaining, patching, and upgrading the underlying VMs. For example, deploying a Kubernetes cluster on AWS using the KOPS tool automates much of the setup.
- Turnkey solutions require careful management of the underlying infrastructure, so ensure you monitor and update your VMs regularly.
- Hosted Solutions
- Hosted solutions provide Kubernetes as a service, where the provider manages the entire cluster infrastructure, including VM provisioning, maintenance, and configuration. This approach greatly simplifies the deployment process. For instance, Google Container Engine (GKE) lets you deploy a Kubernetes cluster in minutes with minimal manual intervention.
- Turnkey Solutions: On-Premises Options
- For on-premises deployments, several turnkey solutions are available:
- OpenShift:
- OpenShift for Beginners
- Cloud Foundry Container Runtime:
- VMware Cloud PKS:
- Vagrant:
