# Solution Imperative Commands optional

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Solution-Imperative-Commands-optional/page

Summary: This article provides an overview of imperative commands in Kubernetes for creating and managing pods, services, deployments, and namespaces.

## Key Notes
- In this lesson, we guide you through imperative commands in Kubernetes. Gain practical experience creating pods, services, deployments, and namespaces imperatively—an invaluable exercise for exam preparation and day-to-day operations.
- ─────────────────────────────
- Deploying Pods Imperatively
- Deploying an Nginx Pod
- nginx:alpine
- --image=nginx:alpine
- You should see output similar to:
- pod/nginx-pod
- Deploying a Redis Pod with Labels
- redis:alpine
- tier=db
- Execute this command:
- --image=redis:alpine
- --labels=
- \"tier=db\"
- Creating Services
- Exposing the Redis Application
- kubectl create service clusterip
- kubectl expose
- For example, run:
- --port=6379
- --name=redis-service
- Afterwards, verify the service with:
- Expected output:
