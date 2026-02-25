# Kustomize ApiVersion Kind

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Kustomize-ApiVersion-Kind/page

Summary: This article discusses the importance of ApiVersion and Kind in Kustomize for managing Kubernetes resources effectively.

## Key Notes
- When managing Kubernetes resources with Kustomize, your configuration is defined in a kustomization.yaml file. While the ApiVersion and Kind properties are technically optional—since Kustomize assigns default values—they are essential for maintaining stability, especially when updates might introduce breaking changes.
- Below is an example of a properly configured kustomization.yaml file:
- kustomize.config.k8s.io/v1beta1
- nginx-service.yaml
- Hardcoding the ApiVersion and Kind values is a best practice that helps ensure compatibility and prevents unexpected behavior as new versions of Kustomize are released.
- Kubernetes Documentation
