# Vertical Pod Autoscaling VPA 2025 Updates

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Vertical-Pod-Autoscaling-VPA-2025-Updates/page

Summary: This article explores optimizing Kubernetes workloads by using the Vertical Pod Autoscaler to automatically adjust resource allocations for applications.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Application Lifecycle Management Section Introduction|Section Overview]]
- [[Solution Secrets Optional|Previous: Solution Secrets Optional]]


## Key Notes
- In this article, we explore how to optimize Kubernetes workloads by scaling them vertically using the Vertical Pod Autoscaler (VPA). As a Kubernetes administrator, your goal is to ensure that applications always receive optimal resource allocations, such as CPU and memory. Let’s start by examining a typical deployment configuration for a pod that specifies a CPU request of 250 millicores and a limit of 500 millicores:
- apps/v1
- \"250m\"
- \"500m\"
- In this setup, the pod cannot use more than 500 millicores of CPU. To monitor its resource consumption, execute the following command (ensure that the metrics server is installed in your cluster):
- $
- If the pod’s CPU consumption reaches a predefined threshold, you might need to update its resource specifications manually. For example, you can increase the CPU request to “1” while keeping the limit unchanged:
- \"1\"
- To apply this change, run:
- After saving, Kubernetes will terminate the current pod and create a new one with the updated resource configuration.
- Manually updating pods can be time-consuming and error-prone. Kubernetes provides the Vertical Pod Autoscaler (VPA) to automate this process.
- Kubernetes distinguishes between scaling methods. While the Horizontal Pod Autoscaler (HPA) adds or removes pods based on demand, the VPA continuously monitors metrics and automatically adjusts the CPU and memory allocation of each pod. Since VPA is not enabled by default, you must install it manually. Start by applying the VPA definition file from the autoscaler GitHub repository:
- Verify that the VPA components are running in the kube-system namespace:
- |
- vpa-admission-controller-xxxx
- vpa-recommender-xxxx
- The VPA deployment includes three key components:
- VPA Recommender:
- VPA Updater:
- VPA Admission Controller:
- Next, create a VPA resource with a YAML definition. Unlike HPA, the VPA isn’t set up through imperative commands. The example below shows a configuration that monitors the “my-app” deployment, enforces minimum and maximum CPU limits, and uses the “Auto” update mode:
- autoscaling.k8s.io/v1
- VerticalPodAutoscaler
- \"Auto\"
