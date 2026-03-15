# Pods

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Pods/page

Summary: This article provides an in-depth guide on Kubernetes Pods, covering their deployment, scaling, and management within a Kubernetes cluster.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Core Concepts Section Introduction|Section Overview]]
- [[Namespaces|Previous: Namespaces]]
- [[Pods with YAML|Next: Pods with YAML]]


## Key Notes
- Docker Hub
- In the simplest scenario, a single-node Kubernetes cluster may run one instance of your application inside a Docker container encapsulated by a pod.
- When user load increases, you can scale your application by spinning up additional instances—each running in its own pod. This approach isolates each instance, allowing Kubernetes to distribute the pods across available nodes as needed.
- Instead of adding more containers to the same pod, additional pods are created. For instance, running two instances in separate pods allows the load to be shared across the node or even across multiple nodes if the demand escalates and additional cluster capacity is required.
- Remember, scaling an application in Kubernetes involves increasing or decreasing the number of pods, not the number of containers within a single pod.
- Typically, each pod hosts a single container running your main application. However, a pod can also contain multiple containers, which are usually complementary rather than redundant. For example, you might include a helper container alongside your main application container to support tasks like data processing or file uploads. Both containers in the pod share the same network namespace (allowing direct communication via localhost), storage volumes, and lifecycle events, ensuring they start and stop together.
- To better understand the concept, consider a basic Docker example. Suppose you initially deploy your application with a simple command:
- When the load increases, you may launch additional instances manually:
- Now, if your application needs a helper container that communicates with each instance, managing links, custom networks, and shared volumes manually becomes complex. You’d have to run commands like:
- With Kubernetes pods, these challenges are resolved automatically. When a pod is defined with multiple containers, they share storage, the network namespace, and lifecycle events—ensuring seamless coordination and simplifying management.
- Even if your current application design uses one container per pod, Kubernetes enforces the pod abstraction. This design prepares your application for future scaling and architectural changes, even though multi-container pods remain less common. This article primarily focuses on single-container pods for clarity.
- Deploying Pods
- kubectl run
- kubectl get pods
- At this stage, note that external access to the nginx web server has not been configured. The service is accessible only within the node. In a future article, we will explore configuring external access through Kubernetes networking and services.
- After mastering pod deployment, advance to networking and service configuration to expose your applications to end users.
- That concludes our discussion on Kubernetes Pods. Proceed to the demo section to see these concepts in action, and stay tuned for the next article!
