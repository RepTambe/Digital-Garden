# Kustomize vs Helm

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/Kustomize-vs-Helm/page

Summary: This guide offers an overview of Helms functionality to customize Kubernetes manifests for various environments while adding advanced features.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Kustomize Problem Statement idealogy|Previous: Kustomize Problem Statement idealogy]]
- [[Managing Directories|Next: Managing Directories]]


## Key Notes
- Before diving into the next section, let’s take a closer look at an alternative tool to Kustomize: Helm. This guide offers a high-level overview of Helm’s functionality to customize Kubernetes manifests for various environments while adding several advanced features.
- Helm leverages Go templating syntax to dynamically assign values to properties within your Kubernetes manifests. Consider the following basic deployment configuration as an example:
- apps/v1 : {{ : {{
- .Values.replicaCount : {{ : {{ : {{
- \"nginx:{{ .Values.image.tag }}\"
- {{ }}
- \"2.4.4\"
- When you deploy your application, Helm seamlessly injects the defined values into your templates. In the example above, the replica count becomes 1, and the image tag is set to “2.4.4”.
- Helm Project Structure
- A well-organized Helm project typically separates configuration files based on the target environment. Below is an example directory structure that demonstrates how to arrange your Helm charts and values files:
- k8s/
- └── Deployment.yaml
- └── environments/
- ├── values.dev.yaml
- ├── values.stg.yaml
- └── values.prod.yaml
- └── templates/
- ├── nginx-deployment.yaml
- ├── nginx-service.yaml
- ├── db-deployment.yaml
- └── db-service.yaml
- When deploying your application, you select the appropriate values file based on the target environment, and Helm injects these values into the templates accordingly.
- Additional Helm Features
- Helm is more than just a templating tool—it is a powerful package manager for Kubernetes applications, offering capabilities similar to those found in Linux package managers like yum or apt. Key advanced features include:
