# Components

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Components/page

Summary: This article explains Kustomize components for defining reusable configuration logic to minimize duplication and manage optional features across multiple overlays.

## Key Notes
- In this lesson, you will learn about a powerful Kustomize feature called components. Components allow you to define reusable configuration logic that can be seamlessly integrated into multiple overlays. This approach is especially beneficial for applications that support optional features activated only in selected overlays.
- For instance, if you have common configurations that apply to every overlay, you would include them in your Base configuration. However, if specific features need to be enabled only in particular overlays, duplicating the configurations in each overlay quickly becomes unscalable and error-prone. Components address this challenge by letting you define the configuration once and reuse it where needed, minimizing duplication and preventing configuration drift.
- Visual Example
- Imagine deploying an application in three variations: Development, Premium (for premium customers), and Self-Hosted (for customers who manage their own hosting). These variations correspond to three overlay folders, which all reference a shared Base configuration folder.
- Suppose the application offers two optional features: caching and an external Postgres database. The caching feature, which includes configuration details for a Redis database, should only be applied to the Premium and Self-Hosted overlays. In contrast, the external database is only relevant for the Development and Premium overlays.
- Placing the caching configuration in the Base folder would inadvertently activate it across all overlays, while copying it individually into the Premium and Self-Hosted overlays risks inconsistencies during future updates. Components solve this problem by encapsulating the caching configuration in a reusable block that is imported only by the overlays that require it.
- The overall project hierarchy is structured so that the Base configuration is common to all overlays, while each overlay selectively includes components for features like caching or an external database.
- Organizing Your Project Structure
- To effectively implement components, consider adding a dedicated folder for components in your project structure. A typical folder layout may resemble the following structure:
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
- ├── dev/
- │ └── kustomization.yaml
