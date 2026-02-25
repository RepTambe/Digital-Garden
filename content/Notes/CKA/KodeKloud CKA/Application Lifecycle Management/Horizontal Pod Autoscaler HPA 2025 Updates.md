# Horizontal Pod Autoscaler HPA 2025 Updates

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Horizontal-Pod-Autoscaler-HPA-2025-Updates/page

Summary: This article explores the Horizontal Pod Autoscaler in Kubernetes and how it automates workload scaling, improving efficiency over manual scaling methods.

## Key Notes
- In this article, we explore the Horizontal Pod Autoscaler (HPA) feature in Kubernetes and explain how it automates the scaling of workloads. We’ll begin by examining the manual approach to scaling an application and then show how HPA streamlines this process.
- Manual Horizontal Scaling
- As a Kubernetes administrator, you might manually scale your application to ensure it has enough resources during traffic spikes. Consider the following deployment configuration:
- apps/v1
- \"250m\"
- \"500m\"
- In this configuration, each pod requests 250 millicores (mCPU) and is limited to 500 mCPU. To monitor the resource usage of a pod, you might run:
- $
- The output would be similar to:
- Once you observe the pod’s CPU usage nearing the threshold (for example, at 450 mCPU), you would manually execute a scale command to add more pods:
- --replicas=3
- Manual scaling requires continuous monitoring and timely intervention, which may not be ideal during unexpected surges in traffic.
- Introducing the Horizontal Pod Autoscaler (HPA)
- To address the shortcomings of manual scaling, Kubernetes offers the Horizontal Pod Autoscaler (HPA). HPA continuously monitors pod metrics—such as CPU, memory, or custom metrics—using the metrics-server. Based on these metrics, HPA automatically adjusts the number of pod replicas in a deployment, stateful set, or replica set. When resource usage exceeds a preset threshold, HPA increases the pod count; when usage declines, it scales down to conserve resources.
- For example, with the nginx deployment above, you can create an HPA by running the command below. This command configures the “my-app” deployment to maintain 50% CPU utilization, scaling the number of pods between 1 and 10:
- --cpu-percent=50
- --min=1
- --max=10
- Kubernetes will then create an HPA that monitors the CPU metrics (using the pod’s 500 mCPU limit) via the metrics-server. If the average CPU utilization exceeds 50%, HPA adjusts the replica count to meet demand without manual input.
- To review the status of your HPA, use:
- This command shows the current CPU usage, threshold set, and the number of replicas—ensuring that pod counts remain within the defined limits. When the HPA is no longer needed, you can remove it with:
- Declarative Configuration for HPA
- autoscaling/v2
- HorizontalPodAutoscaler
