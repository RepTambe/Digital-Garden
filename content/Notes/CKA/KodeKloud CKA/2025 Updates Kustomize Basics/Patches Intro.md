# Patches Intro

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/Patches-Intro/page

Summary: This article explores using patches with Kustomize to modify Kubernetes configurations for targeted updates to specific resource sections.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Patches Dictionary|Previous: Patches Dictionary]]
- [[Patches list|Next: Patches list]]


## Key Notes
- In this lesson, we explore how to use patches with Kustomize to modify Kubernetes configurations. Patches offer a granular approach to updating specific sections of a Kubernetes resource, which is especially useful when you want to target one or a few objects rather than applying a broad change. For instance, if you need to update the replica count in a Deployment, a tailored patch that specifically addresses that object is ideal.
- Patch Parameters
- When creating a patch, you must specify three key parameters:
- Operation Type:
- add:
- remove:
- replace:
- Target:
- Value:
- Inline Patch Example
- apps/v1
- kustomization.yaml
- metadata/name
- |
- - op: replace
- path: /metadata/name
- value: web-deployment
- After applying this patch, the rendered Deployment configuration becomes:
- Replacing the Replica Count
- Next, let’s update the number of replicas. Assume the original Deployment configuration has one replica and you want to change it to five. The starting configuration is as follows:
- path: /spec/replicas
- value: 5
- After applying this patch, the updated Deployment configuration appears as:
- Patch Strategies: JSON 6902 vs. Strategic Merge Patch
