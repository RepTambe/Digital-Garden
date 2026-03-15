# Components

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/Components/page

Summary: This article explores Kustomize components for defining reusable configuration blocks to manage feature-specific settings across multiple overlays efficiently.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Common Transformers|Previous: Common Transformers]]
- [[Different Types of Patches|Next: Different Types of Patches]]


## Key Notes
- In this lesson, we will explore a powerful feature in Kustomize called components. Components allow you to define a reusable block of configuration logic that can be included in multiple overlays. This approach is particularly beneficial when an application supports optional features that should only be enabled in certain overlays instead of globally. By centralizing feature-specific configurations—such as Kubernetes resources, patches, config maps, and secrets—you reduce duplication and prevent configuration drift.
- Using components provides a single source of truth for your features, ensuring that updates or changes propagate consistently across all overlays where the feature is enabled.
- When to Use Components
- Imagine a scenario where you have a set of configurations to enable a specific feature. If this feature were meant for all overlays, including the configuration in the Base might be appropriate. However, when the feature should only be activated in a subset of overlays, manually duplicating the configuration leads to scalability issues and potential errors. Components solve this problem efficiently by maintaining a centralized configuration that you can import wherever necessary.
- Visual Example
- Consider an application that can be deployed in three variations: development, premium, and self-hosted. The Base configuration holds common settings, while each variation is represented by its own overlay folder. Suppose the application has two optional features:
- External Database
- Including the caching configuration directly in the Base would apply it to all overlays unintentionally, and duplicating the configuration across multiple overlays is error-prone. Components allow you to write the configuration once and reuse it across the specific overlays where it’s needed.
- Below is an image that illustrates the relationships between the Base, overlays, and components (caching and external databases):
- Organizing Components
- A well-organized project structure simplifies management. Consider the following directory layout:
- k8s/
- ├── base/
- │ ├── kustomization.yaml
- │ └── api-depl.yaml
- ├── components/
- │ ├── caching/
- │ │ ├── kustomization.yaml
- │ │ ├── deployment-patch.yaml
- │ │ └── redis-depl.yaml
- │ └── db/
- │ ├── deployment-patch.yaml
- │ └── postgres-depl.yaml
- └── overlays/
