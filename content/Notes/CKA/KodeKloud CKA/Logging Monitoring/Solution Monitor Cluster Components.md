# Solution Monitor Cluster Components

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Logging-Monitoring/Solution-Monitor-Cluster-Components/page

Summary: This guide explores monitoring Kubernetes cluster components using the Metrics Server, including inspecting pods, deploying the server, and analyzing resource consumption.

## Key Notes
- In this guide, we will explore how to monitor Kubernetes cluster components using the Metrics Server. We’ll walk through inspecting running pods, deploying the Metrics Server, and examining resource consumption on both nodes and pods.
- Inspecting Running Pods
- Before setting up monitoring, verify that your workloads are running correctly by listing the pods:
- You should see output similar to this:
- root@controlplane:~#
- 1/1
- 0/1
- Deploying the Metrics Server
- To monitor resource consumption, you need to deploy the Kubernetes Metrics Server. In this lab, we use a preconfigured repository with the required settings.
- Metrics Server documentation
- Step 1: Clone the Repository
- Clone the repository that includes the metrics server configuration:
- The output should be similar to:
- 'kubernetes-metrics-server'...
- remote:
- objects:
- 24,
- 100%
- (12/12), done.
- (delta
- ), reused 0 (
- ), pack-reused 12
- (24/24), done.
- Step 2: Examine the Configuration Files
