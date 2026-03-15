# Lifecycle management with Helm

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Helm-Basics-2025-Updates/Lifecycle-management-with-Helm/page

Summary: This article explores managing Kubernetes application lifecycles using Helm, covering releases, upgrades, and rollbacks with practical examples.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Installation and configuration|Previous: Installation and configuration]]
- [[What is Helm|Next: What is Helm]]


## Key Notes
- In this article, we explore how to effectively manage the lifecycle of Kubernetes applications using Helm. Learn how Helm handles releases, upgrades, and rollbacks through real-world examples that simplify complexity and enhance application management.
- Creating and Managing Releases
- When you install a Helm chart, a release is created. Each release is like an application package—a collection of related Kubernetes objects. Since Helm tracks all objects associated with a release, it allows you to upgrade, downgrade, or uninstall a release without affecting other deployments. For instance, even if you deploy the same chart twice, each release remains independent:
- $
- bitnami/wordpress
- Installing an Older Version
- To see Helm in action, let’s create a new release by installing an older version of the NGINX chart. Use the version flag during installation:
- bitnami/nginx
- This command deploys an NGINX release named “nginx-release” using an earlier version of NGINX. After installation, verify the Pod status and details of the image:
- nginx-release-687cdd5c75-ztn2n
- 0/1
- Once the Pod is running, get detailed information about the image:
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
- In this case, the installed NGINX version is 1.19.2, which might become outdated over time.
