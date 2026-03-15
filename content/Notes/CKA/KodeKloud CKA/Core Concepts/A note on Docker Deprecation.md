# A note on Docker Deprecation

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/A-note-on-Docker-Deprecation/page

Summary: The article clarifies Dockers deprecation in Kubernetes while highlighting its continued relevance in development and container management.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Core Concepts Section Introduction|Section Overview]]
- [[A Quick Reminder|Next: A Quick Reminder]]


## Key Notes
- In this lesson, we address common questions regarding Docker’s deprecation and clarify why Docker remains relevant despite its deprecated status in Kubernetes. This explanation aims to resolve the confusion many students experience.
- Originally, Docker was the sole supported container runtime for Kubernetes. To enable compatibility with other container runtimes, the Container Runtime Interface (CRI) was introduced. Docker, as a complete platform, bundled several tools together, including:
- The Docker CLI
- The API
- Build tools for creating images
- Volume support
- Security configurations
- The container runtime (runc)
- The daemon (containerd) that managed the runtime
- Containerd is now CRI-compatible and functions as a standalone component that interacts directly with Kubernetes. Thanks to this change, Kubernetes no longer depends on Docker’s additional tools since it manages container operations natively.
- Docker’s Role in Modern Development
- While Kubernetes has officially deprecated Docker as its runtime, Docker remains the most popular container solution for day-to-day development and build processes. Kubernetes simply leverages containerd for orchestration but many development practices still benefit from Docker’s extensive toolset.
- Even though Kubernetes doesn’t require Docker for container orchestration, using Docker to understand container fundamentals remains beneficial. Once these basics are mastered, shifting focus to Kubernetes and containerd becomes more intuitive.
- This clarification sets the context for the remainder of the course and ensures a smooth transition from understanding container concepts with Docker to applying them within Kubernetes environments.
