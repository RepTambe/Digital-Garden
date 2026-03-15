# Rolling Updates and Rollbacks

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Rolling-Updates-and-Rollbacks/page

Summary: This guide covers managing updates and rollbacks in Kubernetes deployments, including rollouts, versioning, deployment strategies, and practical commands for minimal downtime.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Application Lifecycle Management Section Introduction|Section Overview]]
- [[Multi Container Pods|Previous: Multi Container Pods]]
- [[Secrets|Next: Secrets]]


## Key Notes
- Welcome to this guide on managing updates and rollbacks in Kubernetes deployments. In this article, we explore key concepts such as rollouts, versioning, and various deployment strategies. We also provide practical commands to update your deployments with minimal downtime and to revert changes when necessary.
- This article covers the process of monitoring deployment rollouts, updating container images, and performing rollbacks using Kubernetes commands.
- Understanding Rollouts and Versioning
- When you create a deployment, Kubernetes initiates a rollout that establishes the first deployment revision (revision one). Later, when you update your application—say by changing the container image version—Kubernetes triggers another rollout, creating a new revision (revision two). These revisions help you track changes and enable rollbacks to previous versions if issues arise.
- To monitor and review these rollouts, you can use the following commands:
- Check the rollout status:
- deployment/myapp-deployment
- View the history of rollouts:
- Deployment Strategies
- There are different strategies to update your applications. For example, consider a scenario where your web application is running five replicas.
- One approach is the “recreate” strategy, which involves shutting down all existing instances before deploying new ones. However, this method results in temporary downtime as the application becomes inaccessible during the update.
- A more seamless approach is the “rolling update” strategy. Here, instances are updated one at a time, ensuring continuous application availability throughout the process.
- If no strategy is specified when creating a deployment, Kubernetes uses the rolling update strategy by default.
- Updating a Deployment
- There are several methods to update your deployment, such as adjusting the container image version, modifying labels, or changing the replica count. A common practice is to update your deployment definition file and then apply the changes.
- For example, consider the following deployment definition:
- apps/v1
- nginx:1.7.1
- After updating the file, apply the changes:
- deployment-definition.yml
- This action triggers a new rollout and creates a new deployment revision.
- Alternatively, you can update the container image directly using the following command:
- nginx-container=nginx:1.9.1
- kubectl set image
