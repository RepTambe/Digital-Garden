# Solution Deploymentoptional

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Solution-Deploymentoptional/page

Summary: This guide introduces Kubernetes deployments and explains how to verify the environment and troubleshoot deployment issues.

## Key Notes
- In this guide, we introduce Kubernetes deployments by first examining the current environment state before any deployment is created.
- Environment Verification
- Start by checking how many pods exist on the system with the command:
- Output:
- No resources found in default namespace.
- Next, verify the number of ReplicaSets:
- Finally, check the existing deployments:
- At this point, the environment is clean—no pods, ReplicaSets, or deployments are present.
- Some changes are then applied. Rechecking the deployments now shows that one deployment has been created:
- NAME READY UP-TO-DATE AVAILABLE AGE
- frontend-deployment 0/4 4 0 10s
- Next, inspect the ReplicaSets:
- NAME DESIRED CURRENT READY AGE
- frontend-deployment-7f8dcd896 4 4 0 35s
- And finally, list the pods:
- NAME READY STATUS RESTARTS AGE
- frontend-deployment-7f8dcd896-stmbx 0/1 ImagePullBackOff 0 59s
- frontend-deployment-7f8dcd896-zc6wc 0/1 ErrImagePull 0 59s
- frontend-deployment-7f8dcd896-jgcbx 0/1 ErrImagePull 0 59s
- frontend-deployment-7f8dcd896-jbr44 0/1 ErrImagePull 0 59s
- None of the four pods are ready. To investigate further, inspect one of the pods in detail:
- frontend-deployment-7f8dcd896-stmbx
- State: Waiting
- Reason: ErrImagePull
