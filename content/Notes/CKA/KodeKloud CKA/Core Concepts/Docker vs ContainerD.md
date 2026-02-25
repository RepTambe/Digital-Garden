# Docker vs ContainerD

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Docker-vs-ContainerD/page

Summary: This article explores the relationship between Docker and ContainerD, detailing their differences and the CLI tools for interacting with container runtimes.

## Key Notes
- In this lesson, we explore the intricate relationship between Docker and ContainerD, as well as the various CLI tools that interact with container runtimes. If you’ve encountered references to Docker alongside Kubernetes or ContainerD in different articles, this guide will clarify their differences and explain when to use tools like CTR, CRICTL, or NodeController.
- The Evolution of Container Runtimes
- At the dawn of the container era, Docker reigned supreme thanks to its intuitive interface. Even though alternative tools like Rocket existed, Kubernetes was initially designed to orchestrate Docker-based containers, creating a strong coupling between Docker and Kubernetes. However, as Kubernetes expanded its ecosystem, other container runtimes sought integration.
- Kubernetes addressed this need by introducing the Container Runtime Interface (CRI). The CRI standardizes container runtimes by ensuring compliance with the Open Container Initiative (OCI) standards—the image specification (for building images) and the runtime specification (for container execution). This standardization paved the way for runtimes like Rocket and others to be supported by Kubernetes.
- Since Docker was developed before CRI was established, it wasn’t built with CRI compatibility in mind. To allow Docker to function with Kubernetes, a temporary solution known as the Docker Shim was implemented. Over time, native CRI-compatible runtimes such as ContainerD emerged, shifting Docker’s primary role within the Kubernetes architecture.
- ContainerD, a CRI-compatible runtime, integrates directly with Kubernetes—eliminating the need for the Docker Shim. Originally bundled with Docker, ContainerD has evolved into a standalone project under the Cloud Native Computing Foundation. This decoupling means you can install and use ContainerD without needing the entire Docker ecosystem if your goal is solely container runtime functionality.
- The diagram below illustrates the relationship between Docker, Kubernetes, and alternative container runtimes (like rkt), highlighting components such as containerd, the Docker Shim, and the Container Runtime Interface (CRI).
- Within Docker, several components work together to provide its functionality:
- Docker CLI and API
- Image build tools
- Support for volumes, authentication, and security
- The container runtime (runc) managed by containerd
- Since ContainerD is CRI-compatible, it works directly with Kubernetes, which eventually led to Kubernetes version 1.24 removing support for Docker as a runtime due to the complexity of maintaining the Docker Shim. However, Docker images remain fully OCI-compliant and continue to work seamlessly with ContainerD.
- Diving Deeper into ContainerD
- docker run
- Note: Installation Example
- $
- /usr/local
- containerd-1.6.2-linux-amd64.tar.gz
- bin/
- bin/ctr
- bin/containerd
- Once installed, CTR can pull images and execute basic container operations. However, due to its debugging focus and limited functionality, CTR is not recommended for day-to-day container management.
- Using CTR
