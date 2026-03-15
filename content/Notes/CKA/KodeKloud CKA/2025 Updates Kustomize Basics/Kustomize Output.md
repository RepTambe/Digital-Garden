# Kustomize Output

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/Kustomize-Output/page

Summary: This article explains how to deploy and delete configurations using Kustomize and kubectl in Kubernetes.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Kustomize ApiVersion Kind|Previous: Kustomize ApiVersion Kind]]
- [[Kustomize Problem Statement idealogy|Next: Kustomize Problem Statement idealogy]]


## Key Notes
- kubectl get pods
- kubectl get deployments
- kubectl get services
- Even though Kustomize outputs the final configuration, you must still deploy it to activate the resources on your cluster.
- Deploying Configurations Using Pipes
- kubectl apply
- $
- k8s/
- |
- service/nginx-loadbalancer-service
- deployment.apps/nginx-deployment
- kustomize build k8s/
- kubectl apply -f -
- Deploying Configurations Natively with kubectl
- kustomization.yaml
- Both methods will effectively deploy your generated configurations to your Kubernetes cluster.
- Deleting Configurations
- Using the Pipe Method
- Delete the resources using the pipe method by running:
- \"nginx-loadbalancer-service\"
- \"nginx-deployment\"
- Using kubectl with the -k Flag
- Or, delete the resources natively with kubectl:
