# Transformers Demo

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Transformers-Demo/page

Summary: This guide demonstrates using transformation techniques with Kustomize, including managing Kubernetes configurations and applying common labels, namespaces, and image transformations.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Patches list|Previous: Patches list]]


## Key Notes
- In this guide, we demonstrate how to use common transformation techniques with Kustomize, including the image transformer. We also review the directory structure used in this demonstration to help you manage and organize Kubernetes configurations efficiently.
- Directory Structure Overview
- Assume you have a directory named “K8s” containing two subdirectories: “API” and “database”.
- kustomization.yaml
- kustomize.config.k8s.io/v1beta1
- api/
- db/
- Applying a Common Label
- department: engineering
- Add the common label configuration.
- Save the file and run the Kustomize build command.
- When you run:
- k8s/
- Label Application in Subdirectories
- feature: api
- A snippet of the resulting output could look like:
- After building the configuration, database resources will include:
- Setting a Specific Namespace
- Adding Name Prefixes and Suffixes
- Adding a Global Name Prefix
- KodeKloud-api-deployment
- Adding Folder-Specific Name Suffixes
- For the database subdirectory, add a different name suffix:
- KodeKloud-api-deployment-web
