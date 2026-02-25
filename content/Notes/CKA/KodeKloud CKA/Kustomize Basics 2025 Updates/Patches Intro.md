# Patches Intro

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Patches-Intro/page

Summary: This lesson explains how patches enable targeted modifications of Kubernetes configurations, allowing precise updates to specific objects rather than applying global changes.

## Key Notes
- In this lesson, we explain how patches offer a surgical approach for modifying Kubernetes configurations. Unlike common transformers that are efficient for applying global configuration changes—such as adding labels or setting namespaces—patches allow you to target one or a few specific objects. For example, if you need to update the replica count in a particular deployment, a customized patch permits you to precisely match and change the targeted object.
- Understanding Patch Components
- To create a patch, you need to provide three essential parameters:
- Operation Type:
- add:
- remove:
- replace:
- Target:
- label selector
- annotation selector
- These criteria can be combined to narrow down your selection.
- Value:
- When updating configurations, ensure that your patch accurately targets the intended resource to prevent unintended changes.
- Example 1: Changing the Deployment Name
- apps/v1
- kustomization.yaml
- |
- - op: replace
- path: /metadata/name
- value: web-deployment
- After applying this patch, the updated deployment configuration becomes:
- Example 2: Updating the Replica Count
- Let’s review another scenario. Suppose the original deployment has one replica, and you want to increase it to five. The initial configuration remains:
- path: /spec/replicas
