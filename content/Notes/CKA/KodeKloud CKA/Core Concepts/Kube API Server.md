# Kube API Server

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Kube-API-Server/page

Summary: This article provides a comprehensive guide on the Kube API Servers role in managing requests and coordinating components in a Kubernetes cluster.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Core Concepts Section Introduction|Section Overview]]
- [[ETCD in Kubernetes|Previous: ETCD in Kubernetes]]
- [[Kube Controller Manager|Next: Kube Controller Manager]]


## Key Notes
- Welcome to this comprehensive guide on the Kube API Server in Kubernetes. In this article, we explore how the Kube API Server acts as the central management component in a Kubernetes cluster by handling requests from kubectl, validating and authenticating them, interfacing with the etcd datastore, and coordinating with other system components.
- When you execute a command like:
- the utility sends a request to the API Server. The server processes this request by authenticating the user, validating the request, fetching data from the etcd cluster, and replying with the desired information. For example, the output of the command might be:
- NAME STATUS ROLES AGE VERSION
- master Ready master 20m v1.11.3
- node01 Ready <none> 20m v1.11.3
- API Server Request Lifecycle
- When a direct API POST request is made to create a pod, the API Server:
- Authenticates and validates the request.
- Constructs a pod object (initially without a node assignment) and updates the etcd store.
- Notifies the requester that the pod has been created.
- For instance, using a curl command:
- /api/v1/namespaces/default/pods
- ...[other]
- created!
- The scheduler continuously monitors the API Server for pods that need node assignments. Once a new pod is detected, the scheduler selects an appropriate node and informs the API Server. The API Server then updates the etcd datastore with the new assignment and passes this information to the Kubelet on the worker node. The Kubelet deploys the pod via the container runtime and later updates the pod status back to the API Server for synchronization with etcd.
- At the heart of these operations is the Kube API Server, ensuring secure and validated communication between the cluster components.
- Deployment and Setup
- Kubernetes release page
- Typical Service Configuration
- The Kube API Server is launched with a variety of parameters to secure communication and manage the cluster effectively. Below is an example of a typical service configuration file:
- =
- /usr/local/bin/kube-apiserver
- --advertise-address
