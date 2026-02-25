# Patches Dictionary

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Patches-Dictionary/page

Summary: Learn to update, add, and remove keys in Kubernetes Deployment configurations using JSON 6902 patches and strategic merge patches with practical examples.

## Key Notes
- In this article, you’ll learn how to update, add, and remove keys in a Kubernetes Deployment configuration using both JSON 6902 patches and strategic merge patches. Each example starts with a Deployment that contains a label with the key “component” set to “api”. The goal is to modify or update these labels as needed in each scenario.
- Updating a Key in a Dictionary
- Using a JSON 6902 Patch
- Consider the following Deployment configuration:
- apps/v1
- \"component: api\"
- \"component: web\"
- kustomization.yaml
- |
- - op: replace
- path: /spec/template/metadata/labels/component
- value: web
- /spec/template/metadata/labels/component
- The JSON 6902 patch method provides precise control when updating complex configurations. Choose the patch type that best fits your needs.
- Using a Strategic Merge Patch
- Kustomize will merge this patch with the original Deployment configuration, resulting in an updated “component” label.
- Adding a New Key to a Dictionary
- \"org\"
- \"KodeKloud\"
- - op: add
- path: /spec/template/metadata/labels/org
- value: KodeKloud
- \"org: KodeKloud\"
- When adding new keys, always verify that the target dictionary exists to avoid runtime errors.
