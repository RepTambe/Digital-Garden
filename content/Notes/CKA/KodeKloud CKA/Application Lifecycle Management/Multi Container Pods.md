# Multi Container Pods

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Multi-Container-Pods/page

Summary: This article explores multi-container pods in Kubernetes, highlighting their benefits for deploying and managing closely linked services together.

## Key Notes
- In this article, we explore the concept and benefits of multi-container pods in Kubernetes. By breaking down a monolithic application into smaller, independent microservices, you can deploy, manage, and scale each service individually. However, certain scenarios require two closely linked services to run together. For example, a web server might need to be paired with a dedicated logging agent. In this configuration, each web server instance is automatically associated with its own logging service, allowing both services to scale concurrently while keeping their codebases distinct.
- Multi-container pods are designed to group containers that share the same lifecycle. This means they are created and terminated together, share a common network namespace (allowing seamless communication via localhost), and have access to shared storage volumes. This design simplifies configurations by eliminating the complexities of volume sharing and networking between separate pods.
- This configuration ensures that both containers share the same lifecycle, network, and storage resources, allowing them to work together seamlessly.
- That concludes our discussion on multi-container pods. Next, proceed to the coding exercises section to practice configuring multi-container pods and reinforce your understanding of the concepts discussed here. Happy coding, and see you in the next article!
