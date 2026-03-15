# Different Types of Patches

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Different-Types-of-Patches/page

Summary: This guide explains how to define patches using JSON 6902 and strategic merge patch methods with inline and separate file approaches.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Components|Previous: Components]]
- [[Image Transformers|Next: Image Transformers]]


## Key Notes
- In this guide, we explain how to define patches using both JSON 6902 and strategic merge patch methods. There are two primary approaches to defining a patch:
- Inline—where the patch is embedded directly within the kustomization.yaml file.
- Separate File—where the patch is stored in an external YAML file, keeping the kustomization.yaml file clean and uncluttered.
- Below are detailed examples for both methods.
- Inline Patch Definition
- In the inline approach, the patch is directly embedded in your kustomization.yaml file. This method is ideal for simple or singular modifications. For example:
- |
- - op: replace
- path: /spec/replicas
- value: 5
- Use inline patches for quick adjustments when you have only a few changes to manage.
- Separate File Patch Definition
- Alternatively, you can store your patch in an external YAML file and reference it in your kustomization.yaml file. This approach is beneficial when dealing with multiple patches or when you want to keep your main configuration file streamlined.
- In your kustomization.yaml file, reference the external patch file:
- replica-patch.yaml
- And here is how the external file named replica-patch.yaml might look:
- /spec/replicas
- Using a separate file for patches enhances readability and maintainability when working with complex configurations.
- Strategic Merge Patches
- You can apply the same methodologies when working with strategic merge patches. Below are examples for both inline and separate file approaches.
- Inline Approach for Strategic Merge Patch
- Embed the strategic merge patch directly into your configuration:
- Separate File Approach for Strategic Merge Patch
- Reference an external patch file in your kustomization.yaml:
