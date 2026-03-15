# Kustomize Output

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Kustomize-Output/page

Summary: This article explains how to deploy and delete Kubernetes resources using Kustomize in conjunction with the kubectl command.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Kustomize ApiVersion Kind|Previous: Kustomize ApiVersion Kind]]
- [[Kustomize Problem Statement idealogy|Next: Kustomize Problem Statement idealogy]]


## Key Notes
- kubectl get pods
- kubectl get deployments
- kubectl get services
- kubectl apply
- Deploying Generated Configurations
- |
- k8s/
- $
- service/nginx-loadbalancer-service
- deployment.apps/nginx-deployment
- kustomize build k8s/
- kubectl apply -f -
- kustomization.yaml
- Deleting Resources Using Kustomize
- Using the Pipe Method
- The following command uses the pipe utility to delete the previously created resources:
- \"nginx-loadbalancer-service\"
- \"nginx-deployment\"
- Using the Native kubectl Command
- Kubernetes Documentation
