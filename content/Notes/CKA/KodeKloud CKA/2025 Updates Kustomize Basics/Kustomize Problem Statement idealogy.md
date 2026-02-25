# Kustomize Problem Statement idealogy

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/Kustomize-Problem-Statement-idealogy/page

Summary: This article examines the challenges Kustomize addresses and explains the motivation behind its creation for managing Kubernetes configurations.

## Key Notes
- Before exploring what Kustomize is and how to use it, this article examines the challenges it addresses and explains the motivation behind its creation.
- The Traditional Approach
- Consider a simple example of a single NGINX deployment defined in a YAML file. This deployment creates one NGINX pod:
- apps/v1
- Imagine you have multiple environments like development, staging, and production. You might require the same deployment to behave differently in each environment. For example, on a local development machine you need only one replica, staging might require two or three, and production could need five or more.
- A common solution is to duplicate the YAML file into individual directories for each environment and then modify environment-specific parameters (such as replica counts). For instance:
- To apply these configurations, you would run a command like:
- $
- dev/
- deployment.apps/nginx-deployment
- To maintain consistency and reduce redundancy, it is essential to preserve a single source of truth for configurations, modifying only what is needed per environment.
- The Need for a Better Approach
- The key challenge is to reuse Kubernetes configurations while only modifying what differs by environment. Instead of duplicating elaborate configuration files for each environment, a solution is needed to treat configurations like code—with a central base configuration and specific layers of changes applied on top.
- Enter Kustomize
- Kustomize provides an elegant solution by introducing two key components: Base configuration and Overlays.
- Base Configuration
- The Base configuration contains resources common to all environments. It represents default values that every environment uses unless explicitly overridden. For example, consider the following base NGINX deployment with one replica by default:
- Overlays allow customization of the base configuration for each environment. Each overlay—whether for development, staging, or production—defines changes specific to that environment. In a development overlay, the default configuration might remain unchanged, while staging and production overlays could modify the replica count to suit their requirements.
- Recommended Folder Structure
- Kustomize recommends the following folder structure to organize configurations:
- k8s/
- ├── base/
- │ ├── kustomization.yaml
- │ ├── nginx-depl.yaml
