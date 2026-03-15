# Managing Directories Demo

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/Managing-Directories-Demo/page

Summary: This guide covers managing Kubernetes configuration directories and using Kustomize for efficient deployments.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Managing Directories|Previous: Managing Directories]]
- [[Overlays|Next: Overlays]]


## Key Notes
- In this demo, we review how to efficiently manage your Kubernetes configuration directories. The example uses a structured “k8s” directory containing three subdirectories, each dedicated to a distinct application component:
- api/
- cache/
- db/
- Within each subdirectory, YAML files define deployments, services, config maps, and other Kubernetes resources. This guide describes the setup, key commands, and benefits of using Kustomize to streamline deployments.
- MongoDB Deployment Example
- MONGO_INITDB_ROOT_USERNAME
- MONGO_INITDB_ROOT_PASSWORD
- Service and ConfigMap Example
- redis-cluster-ip-service
- Additionally, before introducing Kustomize, the demo deploys resources using the standard method. Here is a sample ConfigMap for Redis credentials:
- \"redis\"
- \"password123\"
- Kubernetes Documentation
- Deploying the Configurations Without Kustomize
- kubectl apply
- k8s/
- This command deploys all configurations within the “k8s” folder. Alternatively, you can apply each subdirectory individually:
- k8s/api
- k8s/cache
- k8s/db
- To remove these resources from your cluster, run:
- Introducing Kustomize
- kustomization.yaml
