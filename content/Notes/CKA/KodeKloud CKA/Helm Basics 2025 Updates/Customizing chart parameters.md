# Customizing chart parameters

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Helm-Basics-2025-Updates/Customizing-chart-parameters/page

Summary: Learn to customize chart parameters during a Helm chart installation, including overriding default values for WordPress using command-line options or custom values files.

## Key Notes
- In this guide, you’ll learn how to customize chart parameters during a Helm chart installation. When you deploy WordPress using the Bitnami chart, it uses the default values defined in the chart’s values.yaml file. For example, the default blog name is set as “User’s Blog!” in the values file. This article explains how this value is configured and outlines the various methods available for overriding it.
- Understanding the Default Configuration
- bitnami/wordpress
- 5.8.2-debian-10-r0
- \"\"
- user@example.com
- User's Blog!
- WORDPRESS_BLOG_NAME : {{
- include \"apiVersion\" : {{
- include \"common.names.fullname\" : {{
- .Release.Namespace | quote : {{-
- include \"common.labels.standard\" | nindent 4 : {{-
- include \"common.labels.matchLabels\" : {{
- .Values.replicaCount : {{
- template \"wordpress.images\" .
- WORDPRESS_DATABASE_NAME : {{
- include \"wordpress.databaseName\" | quote
- WORDPRESS_DATABASE_USER : {{
- include \"wordpress.databaseUser\" | quote
- WORDPRESS_USERNAME : {{
- .Values.wordpressUsername | quote
- WORDPRESS_PASSWORD : {{
- include \"wordpress.secretName\"
- wordpress-password
