# 2025 Updates Horizontal Pod Autoscaler HPA

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/2025-Updates-Horizontal-Pod-Autoscaler-HPA/page

Summary: This article explores the Horizontal Pod Autoscaler in Kubernetes, detailing its automated scaling capabilities based on resource usage.

## Key Notes
- In this article, we explore the Horizontal Pod Autoscaler (HPA) in Kubernetes. HPA is a key feature that automates scaling of workloads based on resource usage, reducing the manual monitoring overhead for administrators.
- Manual Horizontal Scaling
- Imagine you are managing a Kubernetes cluster and need to ensure your application can handle traffic spikes. Consider an application where each pod requests 250 millicores (mCPU) and has a limit of 500 mCPU. Even under heavy load, a single pod will never exceed 500 mCPU.
- To monitor the pod’s resource consumption manually, you might run:
- $
- When resource usage reaches a predefined threshold (e.g., 450 mCPU), you must manually scale the deployment:
- --replicas=3
- Below is a sample deployment configuration for this scenario:
- apps/v1
- \"250m\"
- \"500m\"
- Manually scaling pods requires continuous monitoring, which can be resource-intensive and error-prone during traffic surges.
- Automated Scaling with Horizontal Pod Autoscaler
- Kubernetes simplifies scaling with the Horizontal Pod Autoscaler. HPA monitors resource metrics—including CPU, memory, and custom metrics—using the metrics server. When usage exceeds a defined threshold, it automatically adjusts the number of pod replicas in deployments, stateful sets, or replica sets.
- When CPU or memory usage is high, HPA scales up the number of pods; when usage drops, it scales them down to conserve system resources. HPA can even track multiple metrics concurrently.
- Imperative Creation of an HPA
- For an existing Nginx deployment, you can configure an HPA with the following command. This command sets the autoscaler to maintain CPU utilization at 50% with a replica count that can vary between 1 and 10:
- --cpu-percent=50
- --min=1
- --max=10
- Once executed, Kubernetes creates an HPA that continuously polls the metrics server based on the pod’s CPU limit (500 mCPU in this case). If CPU usage exceeds 50% of this limit, HPA automatically scales the deployment up or down. To check the status of your HPA, run:
- This command displays details such as current CPU utilization against the threshold and the current number of running pods. If you need to remove the autoscaler later, simply run:
- Declarative HPA Configuration
- Alternatively, you can define the HPA using a declarative configuration file. The example below uses the autoscaling/v2 API:
