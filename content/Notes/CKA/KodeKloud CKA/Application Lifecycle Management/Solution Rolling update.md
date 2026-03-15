# Solution Rolling update

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Solution-Rolling-update/page

Summary: This article covers rolling updates and rollbacks in Kubernetes, focusing on deployment strategies and application upgrades.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Application Lifecycle Management Section Introduction|Section Overview]]
- [[Solution Multi Container Pods Optional|Previous: Solution Multi Container Pods Optional]]
- [[Solution Secrets Optional|Next: Solution Secrets Optional]]


## Key Notes
- In this lab, we dive into rolling updates and rollbacks in Kubernetes, with a primary focus on rolling updates. For brevity, the alias “k” is used to represent “kubectl” throughout this guide.
- An alias has been set for kubectl:
- =
- 'kubectl'
- 'k3s kubectl'
- 'vim'
- Deploying and Inspecting the Application
- We have deployed a simple web application. Begin by inspecting the pods and services to verify the deployment status.
- When running:
- You should see an output similar to:
- NAME READY STATUS RESTARTS AGE
- frontend-5c74c57d95-mkgjh 1/1 Running 0 48s
- frontend-5c74c57d95-dkbbj 1/1 Running 0 48s
- frontend-5c74c57d95-gk60xp 1/1 Running 0 48s
- frontend-5c74c57d95-xpwbt 1/1 Running 0 48s
- Similarly, check the deployment status:
- Expected output:
- NAME READY UP-TO-DATE AVAILABLE AGE
- frontend 4/4 4 4 55s
- Once fully deployed, open your browser and access the application. It should display “hello, front end” on the landing page.
- Validating Application Color and Running Tests
- By default, the application is set to blue. Validate this by checking the pods:
- Output example:
- frontend-5c74c57d95-nkgjh 1/1 Running 0 48s
