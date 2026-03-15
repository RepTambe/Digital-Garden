# Overlays

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/Overlays/page

Summary: This article explains how to use Kustomize for environment-specific customizations in Kubernetes configurations through overlays.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Managing Directories Demo|Previous: Managing Directories Demo]]
- [[Patches Dictionary|Next: Patches Dictionary]]


## Key Notes
- Now that we’ve explored kustomization.yaml files and their various functionalities, let’s see how Kustomize can be used to tailor a base Kubernetes configuration for different environments such as development, staging, and production. In this guide, we’ll walk through the primary use case of Kustomize and illustrate how to implement environment-specific customizations using overlays.
- A typical Kustomize project is organized into two main sections:
- Base Configuration
- Consider the following directory structure:
- k8s/
- ├── base/
- │ ├── kustomization.yaml
- │ ├── nginx-depl.yaml
- │ ├── service.yaml
- │ └── redis-depl.yaml
- └── overlays/
- ├── dev/
- │ └── config-map.yaml
- ├── stg/
- └── prod/
- ├── kustomization.yaml
- └── config-map.yaml
- In this example, the base folder holds all the default Kubernetes configurations, while each overlay folder (dev, stg, prod) includes custom configurations specific to their respective environments.
- How Overlays Work
- ../../base
- |
- - op: replace
- path: /spec/replicas
- value: 2
