# kustomization

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/kustomization/page

Summary: This article explores the Kustomize tool and the kustomization.yaml file for customizing Kubernetes resource files.

## Key Notes
- In this lesson, we explore the Kustomize tool and the essential kustomization.yaml file. Kustomize streamlines the customization of Kubernetes resource files without modifying the original YAML manifests. The kustomization.yaml file acts as the entry point, directing Kustomize to your Kubernetes configurations and specifying the required customizations.
- Directory Structure and File Overview
- Assume you have a directory named “K8s” that contains two YAML files: one for an nginx deployment and another for an nginx service. Kustomize does not process every file by default; it only considers files listed in the kustomization.yaml, which you must create manually.
- Structure of kustomization.yaml
- The kustomization.yaml file has two main sections:
- Kubernetes Resources
- Customizations/Transformations
- Below is an example configuration for the kustomization.yaml file:
- nginx-deployment.yaml
- nginx-service.yaml
- The “resources” section tells Kustomize which YAML files to include, while the “commonLabels” section adds a consistent label (key: company, value: KodeKloud) to all the resources. Kustomize supports various other complex transformations beyond adding labels.
- Generating the Final Configuration
- After creating your kustomization.yaml, you can generate the final Kubernetes configuration by navigating to your “K8s” directory and running:
- $
- k8s/
- This command processes the specified resources and applies the defined customizations, outputting the final configuration to your terminal. An example output may look like this:
- nginx-loadbalancer-service
- apps/v1
- The transformation process integrates the “company: KodeKloud” label into both the nginx service and deployment configurations.
- Deployment Considerations
- While Kustomize outputs the fully rendered configurations to the terminal, it does not deploy the resources directly. To deploy the rendered configuration to your Kubernetes cluster, you can pipe the output to the kubectl apply command. For example:
- |
- Remember that this command only outputs and then applies the configurations to your Kubernetes cluster. Always review the generated YAML before deployment to ensure all customizations are correctly applied.
- The kustomization.yaml file is critical for Kustomize as it lists the Kubernetes resource manifests and the customizations to apply.
