# In place Resize of Pods 2025 Updates

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/In-place-Resize-of-Pods-2025-Updates/page

Summary: This guide explores in-place resizing of Pod resources to streamline updates and reduce downtime for stateful workloads without recreating the entire Pod.

## Key Notes
- In this guide, we explore how to perform in-place resizing of Pod resources—a feature that streamlines updates to resource changes without recreating the entire Pod. This innovative approach reduces downtime, especially for stateful workloads, by updating resource requirements directly on the running Pods.
- Understanding the Default Behavior
- By default, Kubernetes (v1.32 and later) replaces the existing Pod when you modify resource requests or limits in a Deployment. Consider the following deployment configuration:
- apps/v1
- \"250m\"
- \"256Mi\"
- \"500m\"
- \"512Mi\"
- When you update the resource requirements, Kubernetes terminates the existing Pod and creates a new one with the updated resource specifications. This behavior may lead to temporary service disruption.
- The In-Place Update Mechanism
- To address the disruption from full Pod recreation, Kubernetes is developing an in-place update mechanism for Pod resources. This feature has been available in alpha since Kubernetes 1.27 and is not enabled by default. It is expected to transition to beta—and eventually be enabled by default—as it matures.
- Example of In-Place Update Manifest
- Below is an example where the CPU resource is increased from “250m” to “1”. Thanks to the in-place update feature, this change can be applied without deleting the Pod:
- \"1\"
- To activate this feature, enable the in-place Pod vertical scaling feature flag with the following command:
- $
- FEATURE_GATES=InPlacePodVerticalScaling=
- Once enabled, you can specify additional resize policy parameters to control restart behavior for each resource. For instance, a policy can ensure that updating CPU resources does not trigger a Pod restart, while memory updates might still require one.
- Configuring Resize Policies
- The following manifest demonstrates a resize policy for the CPU resource, allowing an update without restarting the Pod:
- When the in-place update feature is active, increasing the CPU resource value (for example, from “250m” to “1”) updates the running Pod directly without termination, ensuring smooth scalability and minimal service interruption.
- The in-place resizing feature currently supports only CPU and memory resources. Familiarize yourself with these constraints before implementation.
- Limitations of In-Place Pod Resizing
- It is important to note the following limitations with the current implementation of in-place resizing:
