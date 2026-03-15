# Image Transformers

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/Image-Transformers/page

Summary: Learn to modify container images in Kubernetes deployments using Kustomize&#x27;s image transformer feature for consistent updates across manifests.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Different Types of Patches|Previous: Different Types of Patches]]
- [[kustomization|Next: kustomization]]


## Key Notes
- In this lesson, you’ll learn how to modify container images in Kubernetes deployments using Kustomize. The image transformer feature enables you to update an image’s name or tag across your deployment manifests without manually editing each file.
- Using Kustomize’s image transformer simplifies the process of updating container images. This method ensures that all instances of the image in your manifests are consistently updated.
- Below is an example deployment that initially uses the default NGINX image:
- apps/v1
- Changing the Image Name
- kustomization.yaml
- Changing the Image Tag
- Start with the same original deployment:
- nginx:2.4
- Combining Image Name and Tag Updates
- haproxy:2.4
- Leveraging Kustomize’s image transformer provides a flexible and efficient method to manage container images in your Kubernetes deployments. Whether you need to update the image name, tag, or both, this approach eliminates the need for manual edits across multiple files, ensuring consistency and reducing potential errors in your configuration.
- For more details on Kubernetes deployments and best practices, check out the following resources:
- Kubernetes Documentation
- Kubernetes Basics
- Docker Hub
- Always test your kustomization changes in a development environment before applying them to production. This helps prevent accidental misconfigurations.
