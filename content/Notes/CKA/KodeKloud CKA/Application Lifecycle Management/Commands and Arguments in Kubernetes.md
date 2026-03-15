# Commands and Arguments in Kubernetes

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Commands-and-Arguments-in-Kubernetes/page

Summary: This lesson covers configuring commands and arguments in Kubernetes pods to adjust container behaviors by overriding default settings from the Dockerfile.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Application Lifecycle Management Section Introduction|Section Overview]]
- [[Commands and Arguments in Docker|Previous: Commands and Arguments in Docker]]
- [[Configure ConfigMaps in Applications|Next: Configure ConfigMaps in Applications]]


## Key Notes
- Welcome to this lesson on configuring commands and arguments in Kubernetes pods. In this session, we’ll learn how to adjust container behaviors by overriding default settings defined in the Dockerfile via the pod definition.
- Previously, we built a simple Docker image—named “ubuntu-sleeper”—that executes a sleep command for a specified number of seconds. By default, running a container with this image makes it sleep for five seconds. However, you can easily change this behavior by passing a command-line argument.
- Overriding Default Behavior with Arguments
- When you append an argument to the Docker run command, it overrides the default parameters defined by the CMD instruction in the Dockerfile.
- Consider the following examples:
- Docker commands:
- Pod definition YAML:
- ubuntu-sleeper-pod : [
- \"10\"
- Dockerfile Instructions and Their Mappings
- The Dockerfile for the “ubuntu-sleeper” image is defined with both an ENTRYPOINT and a CMD:
- \"sleep\"
- \"5\"
- Overriding the ENTRYPOINT
- docker run
- Docker command example with overridden ENTRYPOINT:
- Pod definition YAML with overridden ENTRYPOINT:
- \"sleep2.0\" : [
- Deployment of the Pod
- Once your pod definition is ready, deploy the pod using the following command:
- pod-definition.yml
- Key Fields Summary
- Below is a table summarizing the Kubernetes pod definition fields that map to Dockerfile instructions:
- Pod Definition Field
