# Kubernetes Software Versions

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Cluster-Maintenance/Kubernetes-Software-Versions/page

Summary: This article explores Kubernetes releases, versioning schemes, and software release management to help understand version nuances and upgrade processes.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Cluster Maintenance Section Introduction|Section Overview]]
- [[Demo Cluster upgrade|Previous: Demo Cluster upgrade]]
- [[OS Upgrades|Next: OS Upgrades]]


## Key Notes
- Welcome to this lesson on Kubernetes Software Versions. In this article, we’ll explore the various Kubernetes releases, explain their versioning scheme, and detail how the Kubernetes project manages its software releases. This content is designed to help you understand the nuances of different versions and upgrade processes.
- Viewing Your Cluster Version
- When you install a Kubernetes cluster, you install a specific version of Kubernetes. To check which version is running on your cluster, execute the following command:
- For example, the output might resemble:
- <
- >
- Understanding Semantic Versioning
- Kubernetes release versions follow a three-part semantic versioning scheme: major, minor, and patch.
- Major versions
- Minor versions
- Patch versions
- Semantic versioning helps ensure backward compatibility while introducing new features incrementally.
- The Evolution of Kubernetes
- The first major release, version 1.0, was introduced in July 2015. At the time of recording, the latest stable version is 1.13.0. Kubernetes releases follow a lifecycle that includes alpha, beta, and stable phases:
- Alpha releases:
- Beta releases:
- Stable releases:
- Always review the release notes before upgrading to ensure compatibility with your existing Kubernetes environment.
- Accessing Release Artifacts
- Kubernetes GitHub releases page
- What’s Next?
- This overview provides insight into the versioning and lifecycle of Kubernetes releases. In our next lesson, we will cover the upgrade process, detailing how to transition safely from one Kubernetes version to another.
- Kubernetes Documentation
- Happy learning!
