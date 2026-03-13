# CKA - Personal Notes

Reference: Official kubectl command conventions – https://kubernetes.io/docs/reference/kubectl/conventions/

| Command                                                                             | What It Does                                           | When I Use It                                    |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------ |
| `kubectl run nginx-pod --image=nginx --restart=Never`                               | Creates a single Pod directly (not a Deployment).      | When the task explicitly asks for a Pod quickly. |
| `kubectl describe pod nginx-pod`                                                    | Prints the resource details, status conditions, and recent events so I can diagnose issues. | When pods, services, or other objects misbehave and I need the full state and events in one view. |
| `kubectl explain pod.spec`                                                          | Shows the schema, required fields, and field descriptions for core API objects. | When I need to recall the exact field names, types, or nested structure while editing manifests in a hurry. |
| `kubectl get pods -o wide`                                                          | Shows extra pod details like node and pod IP.          | Quick troubleshooting and placement checks.      |
| `kubectl expose deployment nginx --port=80 --target-port=8080 --type=ClusterIP`     | Wraps an existing Deployment with a Service so its pods are reachable inside/outside the cluster depending on `type`. | When I need to quickly expose HTTP workloads to other pods or create an exam service with minimal YAML. |
| `kubectl explain pod --recursive \u2502 less`                                          | Dumps the entire pod schema and subfields so you can page through the hierarchy without re-running the command. | When I need to explore every nested field of pods or study the schema without my terminal scrolling away. |
| `kubectl run test-pod --image=busybox --restart=Never -- sleep 3600`                | Creates a long-running test Pod for debug/exec checks. | Network/DNS/connectivity validation in-cluster.  |
| `kubectl run web --image=nginx --restart=Never --dry-run=client -o yaml > pod.yaml` | Generates a Pod manifest without creating it.          | Fast YAML scaffolding during exam tasks.         |
| `kubectl create deployment httpd-frontend --image=httpd:2.4-alpine --dry-run=client -o yaml > httpd-frontend.yaml` | Emits the Deployment YAML without applying it so I can review or hand-edit before creation. | When I need create deployment manifests quickly but control the exact spec before handing it to the cluster. |
| `kubectl replace -f my-replicaset.yaml` | Replaces the ReplicaSet manifest atomically so the existing object updates in place. | When I need to shift the pod template, labels, or container spec without tearing the ReplicaSet down. |
| `kubectl scale rs my-app --replicas=5` | Changes the desired replica count of the ReplicaSet so the controller adjusts pods immediately. | During load spikes, debugging sessions, or when pods drop below the expected count and need a quick restore. |
