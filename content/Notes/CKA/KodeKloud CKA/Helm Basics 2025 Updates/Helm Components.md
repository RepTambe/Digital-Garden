# Helm Components

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Helm-Basics-2025-Updates/Helm-Components/page

Summary: This article provides an in-depth look at Helm components, including its structure, concepts, and key elements for managing Kubernetes applications effectively.

## Key Notes
- In this article, we dive into the components of Helm, providing an in-depth look at its structure, concepts, and key elements essential for managing Kubernetes applications effectively.
- Helm is primarily composed of a command-line tool installed locally, which you can use to install, upgrade, or roll back releases. Charts—collections of files containing instructions for creating Kubernetes objects—are used by Helm to deploy applications. When you deploy a chart to your Kubernetes cluster, Helm creates a release, representing a specific installation of the application. Each release may have multiple revisions, capturing changes like image upgrades, replica adjustments, or configuration updates.
- Docker Hub
- Vagrant Cloud
- Helm stores metadata—including information about installed releases, used charts, and revision history—directly into your Kubernetes cluster as secrets. This ensures that metadata is persistent and accessible to all team members, facilitating seamless upgrades and maintenance operations.
- Helm maintains a comprehensive record of every action performed within the cluster, enabling precise tracking and management.
- Charts and Templating
- Charts are collections of files that contain the instructions for creating Kubernetes objects, making them the backbone of Helm deployments. This article uses two application examples to illustrate various concepts:
- HelloWorld Application
- WordPress Site
- Below is an example of a simple HelloWorld chart:
- apps/v1 : {{
- .Values.replicaCount : {{
- .Values.image.repository
- For more complex applications like WordPress, charts can include multiple files and advanced templating features. More detailed explorations of templating and chart structures will be discussed in future lessons. For now, grasping these simple examples will provide you with a solid foundation.
- A more advanced templating snippet within a Deployment might look like this: : {{
- include \"common.capabilities.deployment.apiVersion\" . : {{
- include \"common.names.fullname\" . : {{
- .Release.Namespace | quote
- include \"common.labels.standard\" . | nindent 4
- if .Values.commonLabels
- include \"common.tplvalues.render\" (dict \"value\" .Values.commonLabels \"context\" $) | nindent 4
- if .Values.commonAnnotations
- include \"common.tplvalues.render\" (dict \"value\" .Values.commonAnnotations \"context\" $) | nindent 4 : {{-
