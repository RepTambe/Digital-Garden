# Mock Exam 3 Step by Step Solutions

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Mock-Exams/Mock-Exam-3-Step-by-Step-Solutions/page

Summary: This lesson provides detailed solutions for each question in Mock Exam Three, focusing on specific Kubernetes tasks with clear instructions and code examples.

## Key Notes
- This lesson presents detailed solutions for each question in Mock Exam Three. Each solution focuses on a specific Kubernetes task and provides clear instructions, configuration code blocks, and diagram references. All image links and descriptions remain exactly as provided.
- Question 1 – Adjusting Network Parameters for Kubernetes
- To deploy a Kubernetes cluster using kubeadm, you must enable IPv4 packet forwarding and ensure the settings persist across reboots. Refer to the kubeadm documentation for guidance when provisioning a new cluster.
- Searching for “kubeadm” in the docs will help you locate the bootstrapping guide.
- The first step is to set up a container runtime and enable IPv4 packet forwarding using these commands:
- <<
- |
- /etc/sysctl.d/k8s.conf
- net.ipv4.ip_forward = 1
- net.ipv4.ip_forward
- For additional persistence, use this command if provided:
- net.ipv4.ip.forward = 1
- Always copy the exact command names from the exam instructions to avoid errors.
- This completes Question 1.
- Question 2 – Creating a Service Account and Granting PVC Listing Permissions
- In this question you will:
- pvviewer-role-binding
- Step 1: Create the Service Account
- Expected output:
- NAME SECRETS AGE
- default 0 6m55s
- pvviewer 0 5s
- Step 2: Create the Cluster Role
- Create the role with the required permission:
