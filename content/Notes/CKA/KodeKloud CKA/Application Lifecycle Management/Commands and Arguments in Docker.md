# Commands and Arguments in Docker

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Commands-and-Arguments-in-Docker/page

Summary: This article explains Docker commands, arguments, and ENTRYPOINT, focusing on container processes and their relation to Kubernetes pod definitions.

## Key Notes
- Hello and welcome to this comprehensive lesson on Docker commands, arguments, and entry points. My name is Mumshad Mannambeth, and in this session, we will dive into how containers run processes and how these concepts later translate into pod definitions in Kubernetes. Although these topics are often overlooked in certification curricula, understanding them is essential for mastering containerization.
- Understanding Container Commands
- When you run a Docker container using the Ubuntu image, as shown below:
- Docker launches a container based on the Ubuntu image, which starts and immediately exits since it runs a default process that completes quickly. If you inspect the currently running containers:
- you will notice that the container is absent because it has already exited. However, viewing all containers—including those that have stopped—with:
- reveals that the container is in an “exited” state:
- CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS
- 45aacca36850 ubuntu \"/bin/bash\" 43 seconds ago Exited (0) 41 seconds ago
- This behavior is different from traditional virtual machines. Containers are optimized to run a single task or process, such as hosting a web server, application server, database, or performing a specific computation. Once the task completes, the container stops because its lifecycle is tied directly to the process running inside it.
- Default Commands in Docker Images
- Consider this Dockerfile snippet for installing and configuring nginx:
- add-apt-repository -y ppa:nginx/stable && \\
- apt-get update && \\
- apt-get install -y nginx && \\
- rm -rf /var/lib/apt/lists/* && \\
- \"
- daemon off;\"
- >> /etc/nginx/nginx.conf && \\
- chown -R www-data:www-data /var/lib/nginx
- \"/etc/nginx/sites-enabled\"
- \"/etc/nginx/certs\"
- \"/etc/nginx/conf\"
- /etc/nginx
- \"nginx\"
