# Image Transformers

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Image-Transformers/page

Summary: Learn to use Kustomize&#x27;s image transformer for updating Kubernetes deployment images without modifying manifests directly.

## Key Notes
- In this article, you will learn how to use Kustomize’s image transformer to update the images used by your Kubernetes deployments without modifying your deployment manifests directly. This technique allows you to change either the entire image or just update its tag.
- Example Deployment
- apps/v1
- Transforming the Image
- kustomization.yaml
- Kustomize will scan all Kubernetes configuration files for containers that use the image named “nginx” and replace them with “haproxy”.
- The “name” property in the kustomization file is related to the image reference and is separate from the container name (which is “web” in the deployment manifest). This is a common point of confusion.
- After applying this transformation, the updated deployment configuration will look like:
- Updating Only the Image Tag
- After the transformation, the image reference in your deployment will update to include the new tag:
- nginx:2.4
- Combining Image Name and Tag Changes
- haproxy:2.4
- By leveraging Kustomize’s image transformer, you can manage image updates efficiently without directly altering your Kubernetes manifests. This process simplifies deployment updates and ensures consistency across your environments.
