# Solution Commands and Arguments Optional

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Solution-Commands-and-Arguments-Optional/page

Summary: This article reviews a lab exercise on Kubernetes container commands and arguments, including pod inspection, YAML modifications, and Dockerfile interactions.

## Key Notes
- In this lesson, we review a lab exercise focused on Kubernetes container commands and arguments. We will examine existing pods, modify YAML configurations to change container commands and arguments, and explore how Dockerfiles and Kubernetes manifests interact to determine container startup behavior.
- Reviewing an Existing Pod
- Begin by checking the number of pods running on the system. In this example, one pod is active. Next, inspect the pod named “ubuntu-sleeper” to determine the command used to run it:
- The output reveals:
- Command:
- $
- sleep 4800
- Creating and Modifying a Pod to Sleep for 5000 Seconds
- The next task is to create a pod using the Ubuntu image that executes a container with a 5000-second sleep duration. Start by modifying an existing pod definition file named “ubuntu-sleeper-2”. The basic YAML structure is:
- To define a startup command for sleeping 5000 seconds, you can use one of two methods:
- Define the entire command (including its argument) as a single array: : [
- \"sleep\"
- \"5000\"
- Specify separate fields for the command and its arguments: : [
- \"sleep\" : [
- Both methods are valid because the first element (i.e., “sleep”) specifies the command and the remaining elements act as arguments. For simplicity, the first approach is recommended. After saving the file, create the pod and verify that it runs with the proper command and argument.
- Correcting a YAML Error with Command Arguments
- Next, consider the file “ubuntu-sleeper-3.yaml”. The original file defines the pod as follows:
- This configuration produces an error:
- All elements in the command array must be provided as strings.
- To correct this, enclose the number in quotes:
- \"1200\"
- After making these changes, create the pod with:
- ubuntu-sleeper-3.yaml
