# Configure ConfigMaps in Applications

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Configure-ConfigMaps-in-Applications/page

Summary: This article explores managing configuration data in Kubernetes using ConfigMaps for easier maintenance and scalability.

## Key Notes
- In this article, we’ll explore how to externalize and manage configuration data in Kubernetes using ConfigMaps. Instead of hard-coding environment variables in each pod definition, ConfigMaps allow you to centrally manage key–value pairs, making your Kubernetes configurations easier to maintain and scale.
- By leveraging ConfigMaps, you can separate configuration details from container images, reducing duplication and simplifying updates across multiple pods.
- Using Environment Variables in a Pod
- Traditionally, environment variables are set directly within the pod specification. For example:
- simple-webapp-color
- In this configuration, the environment variables are hard-coded into the pod definition, which can become cumbersome when managing multiple pods.
- Centralizing Configuration with ConfigMaps
- To simplify the management of environment configurations, you can externalize the data using a ConfigMap. With this approach, Kubernetes injects centrally stored key–value pairs into your pods during creation.
- Creating ConfigMaps
- There are two main approaches to create ConfigMaps in Kubernetes: the imperative method and the declarative method.
- Imperative Approach
- --from-literal=APP_COLOR=blue
- --from-literal=APP_MOD=prod
- app_config.properties
- --from-file=app_config.properties
- Declarative Approach
- With a declarative approach, you define your ConfigMap in a YAML file and apply it with kubectl. Here is an example ConfigMap definition:
- Create the ConfigMap in your cluster with:
- For larger deployments, consider organizing multiple ConfigMaps by logical grouping, such as for your application, MySQL, and Redis:
- ConfigMap Name
- Sample Data
- Application configuration
- APP_COLOR: blue, APP_MODE: prod
- MySQL database configuration
