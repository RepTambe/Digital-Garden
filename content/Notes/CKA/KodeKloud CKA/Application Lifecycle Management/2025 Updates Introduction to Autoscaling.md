# 2025 Updates Introduction to Autoscaling

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/2025-Updates-Introduction-to-Autoscaling/page

Summary: This lesson explores autoscaling in Kubernetes, focusing on Horizontal and Vertical Pod Autoscaling for the CKA exam.

## Key Notes
- In this lesson, we explore autoscaling in Kubernetes with a focus on exam-relevant scenarios for the CKA exam. We will cover Horizontal Pod Autoscaling (HPA) and Vertical Pod Autoscaling (VPA) while also providing the fundamental concepts necessary for a deeper understanding.
- Kubernetes Autoscaling
- Before diving into autoscaling in Kubernetes, it’s beneficial to understand the basic concepts of scaling using traditional physical servers.
- Traditional Scaling Concepts
- Historically, applications were deployed on physical servers with fixed CPU and memory capacities. When demand increased and resources were exhausted, the only option was to perform vertical scaling. This involved:
- Shutting down the application.
- Upgrading the CPU or memory.
- Restarting the server.
- This process is referred to as vertical scaling since it focuses on enhancing the capacity of an existing server.
- Conversely, if an application supported multiple instances, additional servers could be added to handle increased loads without any downtime. This method, known as horizontal scaling, distributes the workload by creating more instances of the application.
- Key Points:
- Vertical Scaling:
- Horizontal Scaling:
- Scaling in Kubernetes
- Kubernetes is specifically designed for hosting containerized applications and incorporates scaling based on current demands. It supports two main scaling types:
- Workload Scaling:
- Cluster (Infrastructure) Scaling:
- When scaling in a Kubernetes cluster, consider the following:
- Cluster Infrastructure Scaling:
- Approaches to Scaling in Kubernetes
- Kubernetes supports both manual and automated scaling methods.
- Manual Scaling
- Manual scaling requires intervention from the user:
- Infrastructure Scaling (Horizontal):
