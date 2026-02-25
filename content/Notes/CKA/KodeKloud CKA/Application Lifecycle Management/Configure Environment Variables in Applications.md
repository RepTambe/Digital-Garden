# Configure Environment Variables in Applications

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Configure-Environment-Variables-in-Applications/page

Summary: This article explores configuring environment variables for applications in Kubernetes, including Docker examples and using ConfigMaps and Secrets for better management.

## Key Notes
- In this article, we’ll explore how to configure environment variables for applications deployed with Kubernetes. First, we review a basic Docker example that establishes an environment variable, then we demonstrate how to specify environment variables directly within a Kubernetes pod manifest. This guide is essential for developers looking to streamline container configuration and deployment.
- Setting Environment Variables Using Docker
- APP_COLOR=pink
- simple-webapp-color
- Configuring Environment Variables in Kubernetes Pods
- Below is an example pod definition that explicitly sets the environment variable:
- Leveraging ConfigMaps and Secrets for Environment Variables
- Instead of hardcoding values into your pod manifest, you can enhance flexibility and security by referencing external configuration sources such as ConfigMaps or Secrets. This approach simplifies maintenance and helps protect sensitive information.
- To define an environment variable directly, use:
- To reference a ConfigMap for the environment variable, update the definition as follows:
- Similarly, to source the environment variable from a Secret, configure it like this:
- Using ConfigMaps and Secrets promotes better security practices and easier management of configuration drift. Ensure these objects are updated consistently with your application requirements.
- Avoid hardcoding sensitive data directly into your manifests. Always use Secrets when dealing with sensitive information such as passwords or API keys.
- In this article, we covered:
- How to set environment variables using a Docker command.
- Defining environment variables within Kubernetes pod definitions.
- The benefits of leveraging ConfigMaps and Secrets for managing environment configurations.
- Kubernetes Basics
- That concludes this guide. In our next article, we will explore more advanced Kubernetes configuration techniques, further enhancing your container orchestration capabilities.
