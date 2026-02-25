# ReplicaSets

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/ReplicaSets/page

Summary: This article explains Kubernetes replication controllers and ReplicaSets, focusing on their roles in maintaining high availability and load balancing in clusters.

## Key Notes
- Hello, and welcome to this lesson on Kubernetes controllers. I’m Mumshad Mannambeth, and today we’ll dive into the essential components that drive Kubernetes operations. Kubernetes controllers continuously monitor objects and take necessary actions, and in this lesson, we focus on the replication controller—an essential building block for maintaining high availability in your cluster.
- Imagine a scenario where a single pod runs your application. If that pod crashes or fails, users lose access. To prevent this risk, running multiple pod instances is key. A replication controller ensures high availability by creating and maintaining the desired number of pod replicas. Even if you intend to run a single pod, a replication controller adds redundancy by automatically creating a replacement if the pod fails.
- If one pod serving your application crashes, the replication controller immediately deploys a new one to keep the service available.
- For example, if you need to maintain a constant service level, the controller ensures the desired number of pods—whether one or one hundred—are always running.
- Beyond availability, replication controllers also help distribute load. When user demand increases, additional pods can better balance that load. If resources on a particular node become scarce, new pods can be scheduled across other nodes in your cluster.
- While both replication controllers and replica sets serve similar purposes, the replication controller is the older technology being gradually replaced by the replica set. In this lesson, we will focus on replica sets for our demos and implementations.
- Creating a Replication Controller
- rc-definition.yaml
- ReplicationController
- Once your YAML file is ready, create the replication controller using the following command:
- Below is a complete example of a replication controller definition:
- When you run the following command, Kubernetes creates three pods according to the provided template:
- To view the replication controller and its pods, run these commands:
- A sample output might look like:
- >
- kubectl get replicationcontroller
- kubectl get pods
- 1/1
- Introducing ReplicaSet
- A ReplicaSet is a modern alternative to the replication controller, using an updated API version and some improvements. Here are the key differences:
- API Version
- apps/v1
- Below is an example ReplicaSet definition:
- Create the ReplicaSet with:
