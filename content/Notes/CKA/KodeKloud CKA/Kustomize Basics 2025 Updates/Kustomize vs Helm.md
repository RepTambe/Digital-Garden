# Kustomize vs Helm

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Kustomize-vs-Helm/page

Summary: This guide compares Helm and Kustomize for modifying Kubernetes manifests, highlighting their features, advantages, and trade-offs to help choose the best solution for projects.

## Key Notes
- Before moving forward, it’s important to examine an alternative tool to Kustomize: Helm. This guide provides a high-level overview of how Helm addresses the need to modify Kubernetes manifests on a per-environment basis. By understanding both tools and their trade-offs, you can choose the best solution for your project.
- Helm Templating Fundamentals
- Helm utilizes Go templating syntax to define variables within your Kubernetes manifests. For example, consider the template snippet below, which outlines a standard Deployment configuration. Notice the use of double curly braces to denote template variables:
- apps/v1 : {{ : {{
- .Values.replicaCount : {{ : {{ : {{
- \"nginx:{{ .Values.image.tag }}\"
- \"2.4.4\"
- When deploying your application, Helm merges the specified values into the template, replacing placeholders with concrete values.
- Project Structure in a Traditional Helm Setup
- Below is an example of how the directory structure may be organized:
- k8s/
- environments/
- templates/
- nginx-deployment.yaml
- nginx-service.yaml
- db-deployment.yaml
- When deploying your application, you select the relevant environment file to inject the proper values into your templates.
- Advantages and Trade-offs of Helm
- Helm is more than just a templating tool for environment-specific configurations—it serves as a complete package manager for Kubernetes applications. Similar to package managers like yum or apt in Linux, Helm provides additional features such as:
- Conditionals and loops
- Functions and hooks
- While Helm’s rich feature set offers significant flexibility, it also introduces complexity. The templates, which include Go templating syntax, are not strictly valid YAML and can be challenging to read and maintain initially.
- A comparison between the two tools highlights that while Helm offers advanced capabilities like package management and flexible templating constructs, these benefits come with increased complexity. In contrast, Kustomize relies on plain YAML for base configurations and overlays for environment modifications, which makes it simpler to read and maintain.
- Choosing the Right Tool
