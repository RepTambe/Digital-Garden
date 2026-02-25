# Kubectl Apply Command

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Kubectl-Apply-Command/page

Summary: This article explores the kubectl apply command, its internal workings, and how it manages Kubernetes object configurations declaratively.

## Key Notes
- In this article, we explore how the kubectl apply command works and what happens internally during its execution. Using kubectl apply for declarative management of Kubernetes objects is common practice, and here we dive into details such as configuration comparisons and update processing.
- Basic Example
- Consider the following local YAML configuration file (nginx.yaml) that defines a Pod:
- nginx:1.18
- Apply this configuration with:
- You can also apply all configuration files within a directory:
- /path/to/config-files
- How kubectl apply Works Internally
- When you run the kubectl apply command, it compares three sources:
- The local configuration file (e.g., nginx.yaml).
- The live object configuration stored on the Kubernetes cluster.
- The last applied configuration stored as an annotation on the live object.
- If the object does not exist, Kubernetes creates it based on your local configuration. During creation, Kubernetes internally adds additional fields to monitor the object’s status. Notice that the YAML configuration is converted to JSON and stored as the “last applied configuration” in an annotation. This information is used during subsequent updates to identify any differences.
- When the local configuration is changed (for example, updating the image version), kubectl apply performs a three-way merge using the local file, live configuration, and the last applied configuration.
- For instance, if you update the image version from 1.18 to 1.19 in your local file:
- nginx:1.19
- and run:
- kubectl compares the three configurations. If differences are detected—such as the updated image version—the live object is updated and the annotation storing the last applied configuration is refreshed.
- Managing Removed Fields
- The last applied configuration annotation is crucial when fields are removed from your local configuration. For example, if you remove the “type” label:
- kubectl notices that the “type” label, which existed in the last applied configuration, is now absent locally. As a result, it removes this field from the live configuration.
- Last Applied Configuration Annotation
- kubectl.kubernetes.io/last-applied-configuration
- '{\"apiVersion\":\"v1\",\"kind\":\"Pod\",\"metadata\":{\"annotations\":{},\"labels\":{\"run\":\"myapp-pod\",\"type\":\"front-end-service\"},\"name\":\"myapp-pod\"},\"spec\":{\"containers\":[{\"image\":\"nginx:1.18\",\"name\":\"nginx-container\"}]}}'
