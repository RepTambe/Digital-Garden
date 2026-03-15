# What is Helm

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Helm-Basics-2025-Updates/What-is-Helm/page

Summary: Helm is a package manager and release management tool designed for simplifying Kubernetes application management.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Lifecycle management with Helm|Previous: Lifecycle management with Helm]]
- [[Working with Helm basics|Next: Working with Helm basics]]


## Key Notes
- Helm is a package manager and release management tool designed for Kubernetes applications. While Kubernetes excels at orchestrating complex infrastructures, managing a multitude of interdependent YAML files for a single application can quickly become overwhelming. Consider a basic WordPress deployment, which might involve multiple Kubernetes objects such as:
- Deployment:
- Persistent Volume (PV) and Persistent Volume Claim (PVC):
- Service:
- Secret:
- Job:
- kubectl apply
- wordpress-admin-password
- CalksdlkeB6mxcv23kjsdkljke==
- apps/v1
- mysql:5.6
- PersistentVolumeClaim
- Managing these files individually can be tedious, especially when default configurations such as storage size need to be updated or changed. If you download YAML files from an external source, modifying each file to fit your needs can be labor-intensive. Furthermore, as your application evolves, you might have to update numerous configurations repeatedly.
- With Helm, you can treat your application as a single package rather than a collection of disparate Kubernetes objects.
- The Cumbersome Approach: Multiple YAML Files
- Imagine updating your application configuration over time. For example, you might modify several YAML files and then apply them individually:
- Update the Secret:
- CaklsdIkEeB6mxcv23kjsdIkljke==
- $
- Update the Deployment:
- Update the Service:
- Update the PersistentVolumeClaim:
- Update the PersistentVolume:
- Later, when it comes time to upgrade or delete parts of the application, the process involves updating or removing each object—a process that can be both time-consuming and error-prone.
