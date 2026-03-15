# Managing Directories Demo

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Managing-Directories-Demo/page

Summary: This article explores managing Kubernetes manifest directories and introduces Kustomize for simplifying resource management and deployment.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Managing Directories|Previous: Managing Directories]]
- [[Overlays|Next: Overlays]]


## Key Notes
- In this lesson, we explore how to effectively manage directories containing Kubernetes manifests. The demonstration uses a structured “K8s” directory that holds all Kubernetes configurations organized into three subdirectories: one for the API, one for the cache (acting as a readers’ database), and one for the MongoDB database.
- When you open the K8s directory, you’ll see three distinct folders. Each folder includes configuration files (YAML manifests) tailored for a specific component. For instance, the database folder contains the deployment YAML files for MongoDB, while the API and cache directories contain configurations for services such as ClusterIP or LoadBalancer services along with associated ConfigMaps.
- Below is an excerpt showcasing a typical service configuration for the cache component:
- redis-cluster-ip-service
- kubectl apply
- k8s/api
- k8s/cache
- k8s/db
- To delete all resources simultaneously, you can run:
- Simplifying Resource Management with Kustomize
- kustomization.yaml
- kustomize.config.k8s.io/v1beta1
- api/api-depl.yaml
- api/api-service.yaml
- cache/redis-config.yaml
- cache/redis-depl.yaml
- cache/redis-service.yaml
- db/db-config.yaml
- db/db-depl.yaml
- db/db-service.yaml
- You can then build the complete set of manifests using the Kustomize CLI:
- k8s/
- kustomize build
- |
