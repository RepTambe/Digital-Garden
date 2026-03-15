# Whats Next

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Mock-Exams/Whats-Next/page

Summary: This course offers comprehensive mock exams for realistic CKA exam practice in a simulated environment.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Solution CKA Mock Exam 3 Optional|Previous: Solution CKA Mock Exam 3 Optional]]


## Key Notes
- Hello everyone, and welcome to the Ultimate CKA Mock Exam Series presented by Vijen Palazi from KodeKloud.
- Before diving in, please ensure that you have completed all the prerequisite materials, including multiple mock exams and hands-on labs. If your CKA exam is approaching soon, it’s essential to review all the background content first.
- This course is designed as a series of comprehensive and challenging mock exams, offering you realistic, hands-on practice in a simulated exam environment. Unlike our regular labs, each mock exam uniquely mimics the actual test conditions.
- The CKA exam assesses your practical knowledge in five key areas:
- Architecture, Installation, and Maintenance: 25%
- Workload Scheduling: 15%
- Service Networking: 20%
- Storage: 10%
- Troubleshooting: 30%
- Each mock exam respects the weight of these areas, ensuring you receive a realistic testing experience. The series uses four Kubernetes clusters, with some clusters dedicated to specific knowledge areas. By default, you will be logged into the student node, giving you access to all other clusters and allowing SSH access to individual nodes.
- This introduction marks the beginning of your journey through the Ultimate CKA Mock Exam Series.
- Let’s dive into one of these tests.
- Starting the Mock Exam
- Click on a lab corresponding to one of the mock exams (for example, “CKA Mock Exam One”). The lab should load within 30 seconds—often in just one to two minutes.
- Once loaded, you will see that the exam consists of 20 questions. The first question is from the Architecture, Installation, and Maintenance category, representing 25% of the exam. This question requires you to set the context to cluster three.
- Before proceeding, verify all the configured clusters. Switch to cluster three with the following command:
- You are now logged into the student node. To view all configured clusters, run:
- By default, without an explicitly set context, you connect to cluster one, which contains two worker nodes (node01 and node02). For this task, you must switch to cluster three. On the student node, execute:
- The student node serves as your client login node. If you open a new terminal session, it will also start in the student node. To access any specific control plane, use the SSH command.
- When your context is correctly set to cluster three, executing:
- will display a single-node cluster consisting of the control plane (e.g., “cluster3-controlplane”) running Kubernetes version 1.24.1. It is highly recommended to set the appropriate context for each question so you interact with the correct cluster.
- For example, verify the nodes in cluster three with:
- This command should return:
- cluster3-controlplane
