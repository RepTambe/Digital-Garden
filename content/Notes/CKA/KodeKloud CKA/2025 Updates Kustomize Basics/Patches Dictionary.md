# Patches Dictionary

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/Patches-Dictionary/page

Summary: Learn to update, add, and remove keys in Kubernetes deployment configurations using JSON 6902 and strategic merge patches with step-by-step examples.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Overlays|Previous: Overlays]]
- [[Patches Intro|Next: Patches Intro]]


## Key Notes
- In this lesson, you’ll learn how to update, add, and remove keys in a Kubernetes deployment configuration using both JSON 6902 patches and strategic merge patches. The step-by-step examples provided below will help you understand the process and decide which patching method best fits your configuration management needs.
- ──────────────────────────────────────────────
- Updating a Key with a JSON 6902 Patch
- component: api
- component: web
- apps/v1
- kustomization.yaml
- |
- - op: replace
- path: /spec/template/metadata/labels/component
- value: web
- /spec/template/metadata/labels/component
- Updating a Key with a Strategic Merge Patch
- Adding a New Key Using a JSON 6902 Patch
- org: KodeKloud
- - op: add
- path: /spec/template/metadata/labels/org
- value: KodeKloud
- In this patch:
- /spec/template/metadata/labels/org
- Adding a New Key with a Strategic Merge Patch
- Removing a Key Using a JSON 6902 Patch
- - op: remove
- Removing a Key with a Strategic Merge Patch
