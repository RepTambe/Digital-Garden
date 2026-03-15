# Pods with YAML

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Pods-with-YAML/page

Summary: This lesson covers creating a Kubernetes Pod using a YAML file, including structure, creation, and status verification.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Core Concepts Section Introduction|Section Overview]]
- [[Pods|Previous: Pods]]
- [[Practice Test Introduction|Next: Practice Test Introduction]]


## Key Notes
- Welcome to this lesson on creating a Pod in Kubernetes using a YAML configuration file. In this guide, you’ll learn how to structure your YAML file, create the Pod with kubectl, and verify its status. Kubernetes leverages YAML files to define objects such as Pods, ReplicaSets, Deployments, and Services. These definitions adhere to a consistent structure, with four essential top-level properties: apiVersion, kind, metadata, and spec.
- Top-Level Fields in a Kubernetes YAML File
- Every Kubernetes definition file must include the following four fields:
- apiVersion: v1
- kind: Pod
- Make sure that the properties under metadata (like name and labels) are indented to the same level. This is crucial for correct YAML parsing.
- Below is the complete YAML configuration for our Pod:
- Creating and Verifying the Pod
- pod-definition.yaml
- Once the Pod is created, you can verify its status by listing all Pods:
- You should see output similar to this:
- NAME READY STATUS RESTARTS AGE
- myapp-pod 1/1 Running 0 20s
- To view detailed information about the Pod, run:
- This command provides extensive details, including metadata, node assignment, container specifics, and event history such as scheduling, volume mounting, and container start-up. Here is an example output:
- Name: myapp-pod
- Namespace: default
- Node: minikube/192.168.99.100
- Start Time: Sat, 03 Mar 2018 14:26:14 +0800
- Labels: app=myapp
- Annotations: <none>
- Status: Running
- IP: 172.17.0.24
- Containers:
