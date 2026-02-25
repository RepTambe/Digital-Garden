# Managing Directories

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/Managing-Directories/page

Summary: This article explores efficient management of Kubernetes manifests across multiple directories using Kustomize for better organization and deployment.

## Key Notes
- In this article, we explore how to efficiently manage Kubernetes manifests spread across multiple directories using Kustomize. Up to now, you have seen only a basic example with a simple kustomization.yaml file. However, even with limited knowledge, you can leverage powerful features in Kustomize to better organize your configurations.
- Consider a scenario where you have a directory named “k8s” containing four YAML files:
- API deployment
- API service
- Database deployment
- Database service
- Initially, you might deploy these configurations with the standard Kubernetes command:
- k8s/
- As your project grows and the number of YAML files increases to 20, 30, or even 50, you might decide to organize them into subdirectories. For example, you could move the API deployment and service YAML files into an “api” subdirectory and the database configurations into a “db” subdirectory. After reorganizing, you would deploy each set of configurations separately:
- k8s/api/
- k8s/db/
- With multiple subdirectories, managing deployments can become cumbersome. Every change might require separate commands for each subdirectory and even adjustments to your CI/CD pipeline.
- This is where Kustomize proves its worth. You can create a root kustomization.yaml file in your “k8s” directory that lists every resource by its relative path:
- kustomize.config.k8s.io/v1beta1
- api/api-depl.yaml
- api/api-service.yaml
- db/db-depl.yaml
- db/db-service.yaml
- With this configuration, you can deploy all resources with a single command:
- |
- Alternatively, you can leverage kubectl’s native support for Kustomize:
- The output will indicate that your API and database services and deployments have been successfully created:
- $
- service/api-service
