# Solution Services optional

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Solution-Services-optional/page

Summary: This lesson covers inspecting and creating services in a Kubernetes cluster to expose a web application.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Core Concepts Section Introduction|Section Overview]]
- [[Solution ReplicaSets optional|Previous: Solution ReplicaSets optional]]


## Key Notes
- In this lesson, we will walk through the solution for the lab on Services. You will learn how to inspect different aspects of services in a Kubernetes cluster and create a service to expose a web application. This guide is designed to help you understand Kubernetes Services, their types, endpoints, and best practices for deployment.
- Listing Kubernetes Services
- To start, list the services in your cluster. You can use either of the following commands:
- For example, running:
- produces the output:
- <
- >
- 443/TCP
- This output indicates that only the default Kubernetes service is present.
- Below is an extended example using both commands:
- ~
- ⟪
- The default Kubernetes service is automatically created and managed by the system.
- Inspecting the Default Kubernetes Service
- Next, inspect the default Kubernetes service to review its type and configuration. Running the following commands reveals that the service type is ClusterIP:
- ➜
- kubectl describe
- ⇨
- Name:
- Namespace:
- Labels:
- component=apiserver
- =
- Annotations:
