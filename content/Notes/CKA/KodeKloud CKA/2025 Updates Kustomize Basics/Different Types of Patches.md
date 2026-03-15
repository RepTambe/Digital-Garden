# Different Types of Patches

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/Different-Types-of-Patches/page

Summary: This guide explores methods to define patches in kustomization configurations using JSON 6902 or strategic merge patches.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Components|Previous: Components]]
- [[Image Transformers|Next: Image Transformers]]


## Key Notes
- In this guide, we explore two methods to define patches within your kustomization configuration. By using either JSON 6902 patches or strategic merge patches, you can choose to embed your patches inline in your kustomization.yaml file or reference an external file that contains the patch definitions.
- Inline Patching
- The inline method involves embedding the patch directly into the kustomization.yaml file. This approach is ideal when you have a small number of patches, keeping your configuration straightforward. For instance, an inline patch to modify the replica count for a Deployment might look like this:
- |
- - op: replace
- path: /spec/replicas
- value: 5
- Inline patching is best suited for simple and minimal modifications, ensuring quick adjustments without the need for managing multiple files.
- Separate File Patching
- If your kustomization.yaml file becomes overly cluttered with many patch definitions, consider storing your patches in a separate file. This approach enhances maintainability and keeps your main configuration file clean. In your primary kustomization.yaml file, reference the external patch file as shown below:
- replica-patch.yaml
- Within the external file (replica-patch.yaml), you can list all the necessary modifications for your deployment. This method is especially useful for larger projects where organizing patches into dedicated files improves clarity.
- Strategic Merge Patch Example
- Strategic merge patches are an alternative to JSON 6902 patches and can also be defined inline or referenced via an external file. Below are examples demonstrating both methods.
- Inline Strategic Merge Patch
- - patch: |-
- apiVersion: apps/v1
- kind: Deployment
- metadata:
- name: api-deployment
- spec:
- replicas: 5
- Separate File Reference for Strategic Merge Patch
- For both patching methods, choose inline patches when dealing with a few simple modifications. For extensive configurations, using separate files can greatly enhance manageability and reduce complexity.
