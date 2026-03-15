# Common Transformers

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/Common-Transformers/page

Summary: This article explores efficient modifications of Kubernetes configurations using Kustomize&#x27;s built-in transformers for common configuration changes across multiple YAML files.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Components|Next: Components]]


## Key Notes
- In this article, we explore how to efficiently modify your Kubernetes configurations using Kustomize’s built-in transformers. Kustomize allows you to apply common configuration changes across multiple YAML files—whether by adding labels, modifying resource names, setting namespaces, or applying annotations—without editing each file manually.
- Below, we outline the challenges these transformers solve and provide detailed examples of several common transformations.
- The Problem
- Imagine working with multiple Kubernetes resource files, such as a Deployment and a Service. Consider the following initial configuration files:
- apps/v1
- \"TCP\"
- org: KodeKloud
- Transformations with Kustomize
- 1. Common Label Transformation
- Rather than updating every file individually, add the following to your kustomization file:
- This change automatically appends the label to all imported resources.
- 2. Name Prefix/Suffix Transformation
- api-deployment-dev
- Instead of manually updating each resource name, you can let Kustomize handle it with the following configuration:
- Kustomize will automatically modify the names of all imported resources to include the specified prefix and suffix.
- 3. Namespace Transformation
- The namespace transformer enables you to group all your Kubernetes resources under a designated namespace. Instead of individually editing each file, simply modify the metadata within your YAML. For example:
- 4. Common Annotations Transformation
- branch: master
- Then declare it in your kustomization file:
- With this setup, every resource managed by this kustomization automatically receives the annotation.
- Kustomize’s common transformers significantly streamline the process of updating and maintaining your Kubernetes configurations. By centrally managing transformations—such as adding labels, modifying resource names with prefixes or suffixes, setting namespaces, or applying annotations—you not only reduce manual effort but also minimize the possibility of errors in your production deployments.
- Leveraging Kustomize transformers ensures consistent and scalable configuration management, which is essential in dynamic environments with multiple resources.
- For more detailed information on Kubernetes and configuration management tools, make sure to explore the following resources:
