# A quick note about Helm2 vs Helm3

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Helm-Basics/A-quick-note-about-Helm2-vs-Helm3/page

Summary: This article reviews the differences between Helm 2 and Helm 3, focusing on architectural changes and new features in Helm 3.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Customizing chart parameters|Next: Customizing chart parameters]]


## Key Notes
- Helm has evolved significantly over the years. Understanding the differences between Helm 2 and Helm 3 is essential for anyone working with Kubernetes charts and infrastructure. In this guide, we review Helm’s evolution, detail the architectural changes between Helm 2 and Helm 3, and explain an important new feature introduced in Helm 3.
- A Brief History of Helm
- Helm’s journey began with the release of Helm 1.0 in February 2016. It was soon followed by Helm 2.0 in November 2016, and later by Helm 3.0 in November 2019. As Kubernetes matured, Helm evolved to take full advantage of new features and best practices within the ecosystem.
- Architectural Changes: Tiller vs. Direct Kubernetes Integration
- Helm uses a CLI client installed on your local machine to manage applications on your Kubernetes cluster. In Helm 2, a component called Tiller was necessary because early Kubernetes versions lacked role-based access control (RBAC) and custom resource definitions (CRDs). The CLI communicated with Tiller, which then executed the required operations on the cluster.
- Tiller ran with high privileges (“God mode”) by default. This increased the risk of unrestricted actions within the cluster from any user having access to Tiller.
- With advancements in Kubernetes—especially the introduction of RBAC and improved CRDs—the extra layer provided by Tiller became unnecessary. Helm 3 eliminates Tiller entirely, enabling the CLI to interact directly with Kubernetes, simplifying the architecture and enhancing security through native RBAC controls.
- Three-Way Strategic Merge Patch in Helm 3
- One of the most significant improvements in Helm 3 is the integration of a three-way strategic merge patch mechanism. Think of this as a snapshot feature for your deployments. When you install a chart—say, a full-blown WordPress website—Helm creates revision 1. Upgrading the release with a new chart version creates an additional revision.
- For example, consider the following sequence:
- $
- Suppose the initial installation specifies the container image as:
- wordpress:4.8-apache
- After upgrading, the container image might be updated to:
- wordpress:5.8-apache
- Each significant action (installation, upgrade, or rollback) creates a new revision. This revision acts as a snapshot of your deployment’s state. If a rollback is needed, Helm compares the live configuration with the targeted revision and reverts the changes:
- kubectl set image
- Consider this scenario:
- A WordPress deployment is installed with Helm, creating revision 1.
- A user manually updates the application image using:
- wordpress=5.8-apache
- Since this manual change wasn’t made via Helm, no new revision is recorded.
- When a rollback command is issued, Helm 3 compares the live state with the configuration from revision 1. Unlike Helm 2, which would ignore such manual modifications, Helm 3 detects the discrepancies and reverts the application to the previous configuration.
- Upgrades and Preserving Manual Changes
