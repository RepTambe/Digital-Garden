# Helm Components

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Helm-Basics/Helm-Components/page

Summary: Explore Helms essential components, including the CLI, charts, releases, and metadata management within a Kubernetes cluster.

## Key Notes
- In this lesson, you will explore the essential components of Helm and learn how they interact with a Kubernetes cluster. We’ll dive into the Helm CLI, charts, releases, and metadata management, providing a detailed look at each aspect.
- Helm CLI and Overall Structure
- The Helm CLI is the command-line tool installed on your local machine. It enables you to perform actions such as installing, upgrading, and rolling back applications. A Helm chart is a collection of files that contains all the instructions needed to create the Kubernetes objects required by your application. When you deploy a chart, Helm creates a release. Each installation becomes a release, and updating the application (by modifying configurations like image versions or replica counts) results in a new revision of that release.
- Helm stores metadata not on your local system but within your Kubernetes cluster as Kubernetes secrets. This ensures that metadata stays accessible to anyone working with the cluster and persists through cluster restarts.
- Charts and Templating
- Helm charts are packages that include several resource definition files, such as templates for Deployments, Services, and more. The templating mechanism allows you to separate configuration values (for example, those provided in a values.yaml file) from the resource definitions.
- Consider the following basic example for a simple HelloWorld application deploying an Nginx-based web server:
- apps/v1 : {{
- .Values.replicaCount
- \"{{ .Values.image.repository }}\"
- In this example, templating substitutes values from the values.yaml file into the resource definitions. This strategy makes it simple to customize your application without modifying the underlying templates.
- Many public repositories offer Helm charts, but you might need to adjust the values.yaml file to tailor the installation to your specific requirements. In this lesson, we use two applications to illustrate these concepts: a simple HelloWorld application and a more complex WordPress site.
- Below is an example of an advanced templating approach in a Helm chart: : {{
- include \"common.capabilities.deployment.apiVersion\" . : {{
- include \"common.names.fullname\" . : {{
- .Release.Namespace | quote
- include \"common.labels.standard\" . | nindent 4
- if .Values.commonLabels
- include \"common.tplvalues.render\" (dict \"value\" .Values.commonLabels \"context\" $) | nindent 4
- if .Values.commonAnnotations : {{-
- include \"common.tplvalues.render\" (dict \"value\" .Values.commonAnnotations \"context\" $) | nindent 6 : {{-
- include \"common.labels.matchLabels\" . | nindent 6
- if .Values.updateStrategy : {{-
- toYaml .Values.updateStrategy | nindent 4
