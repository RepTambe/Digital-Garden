# Solution CKA Mock Exam 3 Optional

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Mock-Exams/Solution-CKA-Mock-Exam-3-Optional/page

Summary: This article provides solutions and tasks for a Kubernetes mock exam, covering service accounts, pods, network policies, and kubeconfig adjustments.

## Key Notes
- Task 1: Create a Service Account, Cluster Role, and Pod
- In this task, you will create a service account, a cluster role (with permissions to list persistent volumes), a cluster role binding, and finally, deploy a pod using the Redis image with the created service account.
- Step 1.1: Create the Service Account
- Step 1.2: Create the Cluster Role
- Check the available options for creating a cluster role:
- --verb=list
- --resource=persistentvolumes
- Step 1.3: Bind the Role to the Service Account
- clusterrolebinding
- pvviewer-role-binding
- --clusterrole=pvviewer-role
- --serviceaccount=default:pvviewer
- Step 1.4: Create the Pod
- kubectl run
- Generate the YAML file:
- --image=redis
- --dry-run=client
- >
- serviceAccountName
- Apply the configuration:
- Verify that the pod is running with the correct service account.
- Task 2: List Internal IPs of All Nodes
- /root/CKA/node_ips
- InternalIP of controlplane
