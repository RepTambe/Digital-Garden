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

## Quick Reminder
- `kubectl top` requires Metrics Server to be installed in the cluster.
- Use `kubectl top node` for node CPU and memory usage.
- Use `kubectl logs` when you need application output for troubleshooting.
