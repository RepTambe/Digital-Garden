# 2025 Updates Vertical Pod Autoscaling VPA

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/2025-Updates-Vertical-Pod-Autoscaling-VPA/page

Summary: This article explores the Vertical Pod Autoscaler in Kubernetes, detailing its automated resource management and comparison with manual scaling methods.

## Key Notes
- In this lesson, we explore the workings of the Vertical Pod Autoscaler (VPA) in Kubernetes and how it automatically manages resource allocation. We begin by reviewing manual vertical scaling and then compare it with the VPA’s automated approach.
- Manual Vertical Scaling
- kubectl top pod
- apps/v1
- \"250m\"
- \"500m\"
- $
- kubectl edit deployment
- Introducing the Vertical Pod Autoscaler (VPA)
- Manually updating resources can be error-prone and time-consuming. The VPA automates this process, continuously monitoring metrics and adjusting CPU and memory allocations for pods. Unlike the Horizontal Pod Autoscaler (HPA), which scales the number of pods based on demand, the VPA fine-tunes resource specifications for existing pods.
- Note that the VPA is not included by default in Kubernetes clusters. You must deploy it separately from its GitHub repository. After deployment, verify its three components—the recommender, updater, and admission controller—using the commands below:
- |
- vpa-admission-controller-xxxx
- vpa-recommender-xxxx
- The components work as follows:
- VPA Recommender:
- VPA Updater:
- VPA Admission Controller:
- Configuring the VPA
- autoscaling.k8s.io/v1
- VerticalPodAutoscaler
- \"Auto\"
- \"my-app\"
- \"2\"
