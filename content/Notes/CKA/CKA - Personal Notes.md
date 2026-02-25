# CKA - Personal Notes

| Command                                                                             | What It Does                                           | When I Use It                                    |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------ |
| `kubectl run nginx-pod --image=nginx --restart=Never`                               | Creates a single Pod directly (not a Deployment).      | When the task explicitly asks for a Pod quickly. |
| `kubectl get pods -o wide`                                                          | Shows extra pod details like node and pod IP.          | Quick troubleshooting and placement checks.      |
| `kubectl run test-pod --image=busybox --restart=Never -- sleep 3600`                | Creates a long-running test Pod for debug/exec checks. | Network/DNS/connectivity validation in-cluster.  |
| `kubectl run web --image=nginx --restart=Never --dry-run=client -o yaml > pod.yaml` | Generates a Pod manifest without creating it.          | Fast YAML scaffolding during exam tasks.         |
| `npx quartz sync`                                                                   | Syncs Quartz content with your configured remote flow. | When publishing or syncing vault/site updates.   |
