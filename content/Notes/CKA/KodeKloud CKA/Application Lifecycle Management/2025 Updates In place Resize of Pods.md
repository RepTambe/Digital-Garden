# 2025 Updates In place Resize of Pods

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/2025-Updates-In-place-Resize-of-Pods/page

Summary: This article examines in-place resizing of Pods in Kubernetes and explains how it can reduce disruptions during resource updates.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Application Lifecycle Management Section Introduction|Section Overview]]
- [[2025 Updates Horizontal Pod Autoscaler HPA|Previous: 2025 Updates Horizontal Pod Autoscaler HPA]]
- [[2025 Updates Introduction to Autoscaling|Next: 2025 Updates Introduction to Autoscaling]]


## Key Notes
- In this article, we examine the in-place resizing of Pods in Kubernetes and explain how it can reduce disruptions during resource updates.
- Understanding Resource Updates in Kubernetes
- Before discussing in-place resizing, it’s important to understand the traditional update process. In Kubernetes version 1.32, modifying a pod’s resource requirements in a Deployment causes the existing pod to be deleted and replaced with a new one that has the updated resource definitions. This approach does not perform changes in place, and the termination and replacement process can be disruptive—especially for stateful workloads.
- In-Place Pod Resource Updates
- To mitigate disruption, Kubernetes is developing an in-place update feature for pod resources. This feature is currently in alpha (as of Kubernetes 1.27) and is not enabled by default. To use it, you must explicitly enable the feature flag “in-place Pod vertical scaling.” When enabled, additional resize policy parameters become available. For example, you can specify that changing the CPU resource does not require a pod restart, while adjusting the memory allocation does.
- This in-place update feature is in alpha and requires manual activation via the feature flag. It is anticipated that the feature will eventually progress to beta and then achieve a stable release.
- Deployment Example with Resource Definitions
- Below is an example of a Deployment configuration that sets resource requests and limits for a container:
- apps/v1
- \"1\"
- \"256Mi\"
- \"500m\"
- \"512Mi\"
- When you update the CPU resource (for example, increasing the request), the pod can adjust its allocation without a restart. Conversely, changing the memory allocation will trigger a pod restart if the restart policy requires it.
- Limitations of In-Place Resizing
- While in-place resizing offers benefits, it also comes with certain limitations:
- Supported Resources:
- QoS Class:
- Container Eligibility:
- Immutable Resource Positions:
- Memory Limit Constraints:
- Platform Support:
- Future Considerations: Vertical Pod Autoscaler
- This discussion has focused on manually updating pod resource definitions. In a future lesson, we will delve into the Vertical Pod Autoscaler, which automates the process of scaling resource allocations for Pods.
