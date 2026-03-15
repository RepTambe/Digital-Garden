# Common Transformers

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Common-Transformers/page

Summary: Learn to use Kustomize transformers for modifying Kubernetes configurations, focusing on common transformations for consistent resource management.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Components|Next: Components]]


## Key Notes
- In this lesson, you will learn how to use Kustomize transformers to modify Kubernetes configurations. Kustomize supports several built-in transformers, and you can also create custom ones. Here, we focus on a subgroup known as Common Transformers.
- Imagine you have multiple YAML files such as deployment.yaml and service.yaml. You might want to apply a common configuration—for example, adding a label like “org: KodeKloud” or appending “-dev” to resource names—across all these files. Manually updating each file in a production environment isn’t scalable or efficient. Kustomize transformers offer a systematic way to make consistent changes across all resources.
- Below are the original Kubernetes resource examples:
- apps/v1
- \"TCP\"
- After applying Kustomize transformations, the resources might look like this:
- api-deployment-dev
- Kustomize transformers are essential for ensuring that your Kubernetes configurations remain consistent and manageable across various environments.
- Common Transformation Methods
- Below is an overview of common transformations available in Kustomize for managing Kubernetes resources:
- 1. Common Label Transformation
- kustomization.yaml
- For example, a transformed Service resource would appear as:
- 2. Namespace Transformation
- After this transformation, a Service resource might look like:
- When applying namespace transformations, ensure that the specified namespace exists in your cluster to avoid deployment issues.
- 3. Name Prefix and Suffix Transformation
- After applying this configuration, a Service resource would be renamed to “KodeKloud-api-service-dev”:
- KodeKloud-api-service-dev
- 4. Common Annotation Transformation
- This transformation results in a Service resource similar to:
- The common transformations available in Kustomize include:
- Transformation Type
- Common Label Transformation
