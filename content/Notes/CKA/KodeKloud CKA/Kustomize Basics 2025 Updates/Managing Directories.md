# Managing Directories

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Managing-Directories/page

Summary: This guide explains how to structure Kubernetes YAML files effectively using Kustomize for streamlined management and deployment workflows.

## Key Notes
- Organizing and managing your Kubernetes manifests across multiple directories can be streamlined with Kustomize. This guide explains how to structure your YAML files effectively, simplify deployment workflows, and maintain a clean configuration hierarchy for your clusters.
- Basic Directory Structure Without Kustomize
- Initially, you might store all your Kubernetes YAML files in a single directory (e.g., a directory named “k8s”). In this simple setup, you could have files such as:
- API deployment YAML file
- API service YAML file
- Database deployment YAML file
- Database service YAML file
- To deploy these configurations, navigate to your “k8s” directory and run:
- This method works well for a small number of files. However, as your application scales, you’ll likely end up with dozens of manifests, which can clutter your directory and complicate maintenance.
- Organizing YAML Files into Subdirectories
- A more structured approach is to organize your manifests into subdirectories. For instance, you can place API-related configurations in an “api” subdirectory and database-related configurations in a “db” subdirectory. Deployment commands for each subdirectory would look like this:
- k8s/api/
- k8s/db/
- While this method is functional, it may become cumbersome when dealing with numerous subdirectories, especially when managing repetitive commands in CI/CD pipelines.
- Simplifying Deployment with Kustomize
- kustomization.yaml
- kustomize.config.k8s.io/v1beta1
- api/api-depl.yaml
- api/api-service.yaml
- db/db-depl.yaml
- db/db-service.yaml
- With this configuration, deploy all resources from the root directory using one of the following commands:
- k8s/
- |
