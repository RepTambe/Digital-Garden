# kustomization

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/kustomization/page

Summary: This article explains the kustomization.yaml file used by Kustomize to manage and transform Kubernetes configuration files.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[InstallationSetup|Previous: InstallationSetup]]
- [[Kustomize ApiVersion Kind|Next: Kustomize ApiVersion Kind]]


## Key Notes
- Now that you have the Kustomize tool installed and configured, let’s explore the kustomization.yaml file in detail. This file is crucial for directing Kustomize on which Kubernetes configuration files to process and how to transform them.
- Understanding the kustomization.yaml File
- Imagine you have a Kubernetes directory (K8s) containing several configuration files, such as one for the nginx deployment and another for the nginx service. Instead of processing every YAML file in the directory, Kustomize looks for a specifically named file: kustomization.yaml. This file must be manually created, and its presence is essential for Kustomize to function properly.
- Within the kustomization.yaml file, there are two primary sections:
- A list of Kubernetes resource files to be managed.
- Custom transformations to be applied across those resources.
- For instance, consider the following example of a kustomization.yaml file:
- nginx-deployment.yaml
- nginx-service.yaml
- In this configuration:
- This is just one example of the many transformations available in Kustomize. There are several other customization techniques that you can apply to tailor your deployments.
- Building the Final Configuration
- After configuring your kustomization.yaml file, you can generate the final configuration by running the following command:
- $
- k8s/
- When you execute this command, Kustomize performs the following steps:
- It locates the kustomization.yaml file in the specified K8s directory.
- It reads the list of resources defined within the file.
- It applies all configured transformations (in this case, adding the common label).
- The output generated from this process might resemble the following:
- nginx-loadbalancer-service
- apps/v1
- kustomize build
- Deploying the Final Configuration
