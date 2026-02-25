# Lifecycle management with Helm

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Helm-Basics/Lifecycle-management-with-Helm/page

Summary: This article explores how Helm simplifies lifecycle management in Kubernetes by packaging objects into releases for easy installation, upgrades, and rollbacks.

## Key Notes
- In this article, we explore how Helm simplifies lifecycle management in Kubernetes. Helm packages Kubernetes objects into releases, allowing you to install, upgrade, and roll back configurations with ease. Every time you install a chart, Helm creates a release that tracks all associated Kubernetes objects. This tracking enables seamless upgrades, downgrades, or uninstallations without interfering with other releases—all even if multiple releases are based on the same chart.
- For instance, you can deploy two independent releases from the same WordPress chart:
- $
- bitnami/wordpress
- Creating a New Release
- bitnami/nginx
- nginx-release-687cdd5c75-ztn2n
- 0/1
- After installation, you might see that the running NGINX pod uses version 1.19.2—a version that, at this point, is considered outdated. Later on, if security vulnerabilities emerge or improvements are required, Helm can update your application without manually modifying each object.
- Upgrading a Release
- Before upgrading, you can verify the current version by describing the pod:
- Containers:
- nginx:
- ID:
- docker://81bb5ad6b5...
- Image:
- docker.io/bitnami/nginx:1.19.2-debian-10-r28
- docker-pullable://bitnami/nginx@sha256:2fcaf026b8acb7a...
- Port:
- 8080/TCP
- 0/TCP
- State:
- To upgrade the release, execute the following command. In doing so, Helm replaces the old pod with a new one running the updated version:
- \"nginx-release\"
