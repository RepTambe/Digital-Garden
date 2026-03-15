# CKA - Application Lifecycle Management

## Related Notes
- [[00 - Index|CKA Index]]
- [[CKA - Kubectl Command List]]
- [[CKA - Kubectl Exam 20 Commands]]
- [[CKA - Personal Notes]]

## Deployment Commands
- `kubectl get deployments`
- `kubectl create -f deployment-definition.yml`
- `kubectl apply -f deployment-definition.yml`

## Rollout Commands
- `kubectl rollout status deployment/myapp-deployment`
- `kubectl rollout history deployment/myapp-deployment`
- `kubectl rollout undo deployment/myapp-deploy`

## Update Image
- `kubectl set image deployment/myapp-deployment nginx=nginx:1.9.1`

## Quick Reminder
- Use `create` the first time a resource does not exist.
- Use `apply` when updating declarative manifests over time.
- Use `rollout status` and `rollout history` to verify deployment changes.
