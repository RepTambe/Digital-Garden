# CKA - Metrics Logging

## Related Notes
- [[00 - Index|CKA Index]]
- [[CKA - Kubectl Command List]]
- [[CKA - Kubectl Exam 20 Commands]]
- [[CKA - Personal Notes]]

## Metrics Server Checks
- `kubectl top node`
- `kubectl top nodes`
- `kubectl top pod`
- `kubectl top pod -A`
- `kubectl top pod <pod-name> -n <namespace>`

## Logging Commands
- `kubectl logs <pod-name> -n <namespace>`
- `kubectl logs <pod-name> -c <container-name> -n <namespace>`
- `kubectl logs -f <pod-name> -n <namespace>`
- `kubectl logs --previous <pod-name> -n <namespace>`
- `kubectl exec webapp -- cat /log/app.log`

## Troubleshooting Order
- Good CKA habit: always run these in order.
- `kubectl get pods -n <namespace>` - spot which pods are broken
- `kubectl describe pod <pod> -n <ns>` - read the Events section
- `kubectl logs <pod> -n <ns>` - if pod is running but misbehaving

## Container Runtime Commands
- `sudo crictl ps`
- `sudo crictl ps -a`
- `sudo crictl pods`
- `sudo crictl logs <container-id>`
- `sudo crictl inspect <container-id>`

## Quick Reminder
- `kubectl top` requires Metrics Server to be installed in the cluster.
- Use `kubectl top node` for node CPU and memory usage.
- Use `kubectl logs` when you need application output for troubleshooting.
- Use `crictl` when you need to inspect the container runtime directly on a node.
