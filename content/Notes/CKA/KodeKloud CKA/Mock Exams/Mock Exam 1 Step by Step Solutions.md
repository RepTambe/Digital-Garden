# Mock Exam 1 Step by Step Solutions

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Mock-Exams/Mock-Exam-1-Step-by-Step-Solutions/page

Summary: This article provides step-by-step solutions for tasks in Mock Exam 1 related to Kubernetes configurations and operations.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Mock Exam 2 Step by Step Solutions|Next: Mock Exam 2 Step by Step Solutions]]


## Key Notes
- In this article, we walk through the solutions for Mock Exam 1. Each section corresponds to a specific exam question and includes a technical diagram with its original description. Follow the steps carefully to complete each task.
- Question 1 – Create a Pod with Three Containers
- kubectl run
- --dry-run=client
- --image=nginx:1-alpine
- --env=NODE_NAME=$(
- --overrides=
- '
- \"apiVersion\": \"v1\",
- \"spec\": {
- \"containers\": [
- \"name\": \"mc-pod-2\",
- \"image\": \"busybox:1\",
- \"command\": [
- \"sh\",
- \"-c\",
- \"while true; do date >> /var/log/shared/date.log; sleep 1; done\"
- \"name\": \"mc-pod-3\",
- \"tail -f /var/log/shared/date.log\"
- }'
- Alternatively, you can generate a base YAML file:
- >
- After generating the file, update it as follows:
- Rename the pod
