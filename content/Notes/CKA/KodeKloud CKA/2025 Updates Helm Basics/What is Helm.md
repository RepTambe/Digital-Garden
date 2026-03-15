# What is Helm

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Helm-Basics/What-is-Helm/page

Summary: Helm is a package manager for Kubernetes that simplifies application deployment and management by treating related resources as a single application package.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Lifecycle management with Helm|Previous: Lifecycle management with Helm]]
- [[Working with Helm basics|Next: Working with Helm basics]]


## Key Notes
- Helm is a package manager for Kubernetes designed to simplify application deployment and management. While Kubernetes is highly effective at orchestrating complex infrastructures, managing individual resources for complex applications can quickly become tedious.
- Consider a WordPress site that may require multiple interconnected Kubernetes objects, such as:
- A Deployment to run Pods (e.g., MySQL database servers or web servers)
- A PersistentVolume (PV) to store data
- A PersistentVolumeClaim (PVC) to access the storage
- A Service to expose the web server to the internet
- A Secret to store credentials like admin passwords
- Additional components like Jobs for periodic backups
- wordpress-admin-password
- CalksdIkeBgmxcv23kjsdIkjr==
- apps/v1
- mysql:5.6
- PersistentVolumeClaim
- Managing numerous YAML files individually can lead to operational errors, especially when updating configurations, such as increasing storage sizes from 20Gi to 2200Gi, across several files.
- Even if all declarations are combined into a single file, the complexity increases as the file grows, making troubleshooting more challenging.
- Enter Helm
- Helm treats related resources as a single application package, enabling you to deploy and manage your entire Kubernetes application with a single command. For instance, to install a WordPress package, simply run:
- $
- user@example.com
- wordpressFirstName
- User's Blog!
- Helm also streamlines the upgrade process:
- If issues occur during an upgrade, Helm’s rollback feature allows you to revert to a previous, stable release:
- When it’s time to remove the application, Helm ensures that all associated Kubernetes objects are tracked and deleted automatically:
