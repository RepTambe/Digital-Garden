# Transformers Demo

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/Transformers-Demo/page

Summary: This article explores using Kustomize transformations for managing Kubernetes configurations, including adding labels, namespaces, and modifying container images.

## Key Notes
- In this lesson, we explore how to use several common transformations in Kustomize, including the image transformer. The demo utilizes a structured Kubernetes (K8s) directory setup containing two folders—one for API components and one for database components.
- At the API level, you will find:
- An API deployment YAML file
- An API service YAML file
- A kustomization.yaml file that imports these resources
- Similarly, the database folder contains:
- A Database deployment YAML file
- A Database service YAML file
- A dedicated kustomization.yaml file that imports the database-related Kubernetes configurations
- At the root level, the main kustomization.yaml brings together both the API and database directories:
- kustomize.config.k8s.io/v1beta1
- api/
- db/
- Adding a Common Label
- department: engineering
- After saving the file, execute the following command in your terminal to build the configurations:
- The output confirms that every resource (such as ConfigMap, Service, and Deployment) now has the new label applied. Here is a snippet of the generated output:
- Applying Labels in Subdirectory kustomization.yaml Files
- feature: api
- Similarly, to add a label for the database folder, include the following in its kustomization.yaml:
- feature: db
- Adding a Namespace
- kustomize build
- Setting Name Prefixes and Suffixes
