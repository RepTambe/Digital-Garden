# Solution Pods optional

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Solution-Pods-optional/page

Summary: This article provides a hands-on lab for understanding Kubernetes pods, including creation, inspection, and configuration using YAML.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Core Concepts Section Introduction|Section Overview]]
- [[Solution Imperative Commands optional|Previous: Solution Imperative Commands optional]]
- [[Solution ReplicaSets optional|Next: Solution ReplicaSets optional]]


## Key Notes
- In this lesson, you’ll explore a hands-on lab that deepens your understanding of Kubernetes pods. We’ll start by checking existing pods, create new ones with various images, inspect pod details, and adjust a pod configuration using YAML.
- 1. Verify Existing Pods
- First, examine the current pods running in your Kubernetes cluster by executing:
- You might see an output similar to this:
- This command checks pods in the default namespace. In future lessons, we’ll dive deeper into namespaces and how they manage resources.
- 2. Creating a Pod with the Nginx Image
- To create a new pod using the Nginx image, use the following command:
- --image=nginx
- The pod creation is confirmed in the output:
- pod/nginx
- After creating the pod, run the command again to see all current pods:
- You might see a list similar to this:
- 0/1
- Here, several pods have been created and will be examined further.
- 3. Inspecting Pod Details
- This command outputs extensive information such as start time, node assignment, labels, and container details. In the section under “Containers,” you should see an entry like:
- Containers:
- busybox:
- Container ID: containerd://b05cd692af1f3b433883f9a8ece19ec2e8c4fcf861aa97ae6a82857ed6037a6d
- Image: busybox
- Determine Node Placement
- To see which nodes are hosting your pods, run:
- Sample output:
- 1/1
