# Secrets

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Secrets/page

Summary: This article explains how to securely manage sensitive data in Kubernetes using Secrets while avoiding common security pitfalls.

## Key Notes
- Welcome to this comprehensive guide on managing Secrets in Kubernetes. In this article, we explain how to securely handle sensitive data (such as passwords and keys) in your Kubernetes deployments while avoiding common pitfalls like hardcoding credentials in your application.
- Problem with Hardcoding Sensitive Data
- Consider a simple Python web application connecting to a MySQL database. When the connection succeeds, the application displays a success message. However, the code includes hardcoded values for hostname, username, and password, which poses a serious security risk.
- Previously, configuration data like these values might have been stored in a ConfigMap. For example:
- Flask, render_template
- =
- Flask(
- @app.route
- \"/\"
- mysql.connector.connect(
- \"mysql\"
- \"root\"
- \"paswrd\"
- render_template(
- 'hello.html'
- fetchcolor())
- ==
- \"__main__\"
- app.run(
- \"0.0.0.0\"
- \"8080\"
- While storing non-sensitive details like hostnames or usernames in a ConfigMap is acceptable, placing a password in such a resource is not secure. Kubernetes Secrets provide a mechanism to safely store sensitive information by encoding the data (note: this is not encryption by default).
- Secrets encode data using Base64. Although it provides obfuscation, it is not a substitute for encryption.
- Understanding Kubernetes Secrets
