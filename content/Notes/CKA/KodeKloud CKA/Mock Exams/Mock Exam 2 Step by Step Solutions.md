# Mock Exam 2 Step by Step Solutions

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Mock-Exams/Mock-Exam-2-Step-by-Step-Solutions/page

Summary: This article provides step-by-step solutions for Kubernetes cluster configuration and troubleshooting across various scenarios.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Mock Exam 1 Step by Step Solutions|Previous: Mock Exam 1 Step by Step Solutions]]
- [[Mock Exam 3 Step by Step Solutions|Next: Mock Exam 3 Step by Step Solutions]]


## Key Notes
- This article provides detailed step-by-step solutions for Mock Exam Two. Each question covers a key aspect of Kubernetes cluster configuration—from creating storage classes and deployments to configuring ingress, RBAC, network policies, HPA setups, and troubleshooting common issues. Follow the solutions below to configure your clusters and gain hands-on experience with Kubernetes.
- Question 1 – Creating a Default Local StorageClass
- SSH into your control plane:
- ssh cluster1-controlplane
- Welcome to Ubuntu 22.04.5 LTS (GNU/Linux 5.15.0-1078-gcp x86_64)
- * Documentation: https://help.ubuntu.com/
- * Management: https://landscape.canonical.com
- * Support: https://ubuntu.com/pro
- This system has been minimized by removing packages and content that are not required on a system that users do not log into.
- To restore this content, you can run the 'unminimize' command.
- Referencing the documentation, copy the example configuration and update it as follows:
- storageclass.kubernetes.io/is-default-class
- \"true\"
- kubernetes.io/no-provisioner
- allowVolumeExpansion
- volumeBindingMode: WaitForFirstConsumer
- The final YAML configuration should look like this:
- storage.k8s.io/v1
- WaitForFirstConsumer
- You should see the following confirmation:
- storageclass.storage.k8s.io/local-sc created
- Question 2 – Deployment with App and Sidecar Containers for Logging
- logging-deployment
- /var/log/app/app.log
