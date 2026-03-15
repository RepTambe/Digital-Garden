# Overlays

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Overlays/page

Summary: Overlays in Kustomize allow customization of base Kubernetes configurations for different environments like development, staging, and production.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Managing Directories Demo|Previous: Managing Directories Demo]]
- [[Patches Dictionary|Next: Patches Dictionary]]


## Key Notes
- Overlays in Kustomize allow you to customize a base Kubernetes configuration on a per-environment basis. This method is particularly useful for environments such as development, staging, and production, where you need to apply environment-specific adjustments to shared configurations.
- Kustomize projects are typically organized into two main sections:
- Base Configuration:
- Overlay Directories:
- Below is a diagram illustrating a common directory structure for managing these configurations:
- kustomization.yaml
- Base Configuration Example
- nginx-deployment.yaml
- apps/v1
- Creating Overlays
- Development Overlay
- ../../base
- |
- - op: replace
- path: /spec/replicas
- value: 2
- Production Overlay
- Similarly, to tailor the configuration for production, the overlay can reference the same base while applying a different patch:
- value: 3
- This overlay increases the replica count to 3 for production.
- Adding New Resources in Overlays
- Overlays can also introduce new resources that don’t exist in the base configuration. For instance, if you want to add a production-specific Grafana deployment, you can include its YAML file in the production overlay:
- In this configuration, the overlay imports the base resources, applies a patch to change the replica count for the existing deployment, and adds a new Grafana deployment.
- Below is another diagram that provides a more detailed look at the directory structure using Kustomize, showing both the base and overlay directories across different environments:
