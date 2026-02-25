# Solution Multi Container Pods Optional

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Solution-Multi-Container-Pods-Optional/page

Summary: This guide explores creating and managing multi-container pods in Kubernetes, including log shipping to Elasticsearch using a sidecar container.

## Key Notes
- In this guide, we explore a lab exercise on multi-container pods in Kubernetes. We will inspect pods to determine the number of containers contained, create a multi-container pod, and update an existing pod by adding a sidecar container that ships logs to Elasticsearch. All diagrams have been retained in their original placements.
- Identifying Containers in Pods
- Understanding the container composition within each pod is a critical first step.
- Red Pod
- Begin by inspecting the red pod to determine the total number of containers. In the cluster, observe that the “READY” column displays the number of containers versus those that are ready. In this example, there are three containers. You can verify this by running the command:
- In the output, under “Containers”, you will see entries for “apple”, “wine”, and “scarlet” that confirm the existence of three distinct containers. Below is an excerpt of the container details for the red pod:
- Container ID
- Image ID
- <none>
- Host Port
- \"4500\"
- Restart Count
- /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-7sggv (ro)
- Blue Pod
- For the blue pod, inspect the container details similarly. This pod includes two containers, “teal” and “navy”. The command below confirms their configuration:
- The output will include details similar to:
- controlplane/10.40.119.6
- Start Time
- Sun, 17 Apr 2022 18:16:47 +0000
- /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-6qm72 (ro)
- Creating a Multi-Container Pod
- The next task involves creating a multi-container pod with two containers that conform to the following specifications:
- Pod Name:
- Container 1:
