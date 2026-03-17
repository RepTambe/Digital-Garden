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

## Init Containers
- Init containers run before the application containers start.
- They always run to completion, and each init container must finish successfully before the next one starts.
- If an init container fails, Kubernetes restarts it until it succeeds; if the Pod `restartPolicy` is `Never`, a failed init container causes the Pod to fail.
- Regular init containers do not support `lifecycle`, `livenessProbe`, `readinessProbe`, or `startupProbe`.
- They are useful for setup work like waiting on DNS or a Service, pulling configuration, templating files, or preparing shared volumes before the app starts.
- Init container status is visible in `.status.initContainerStatuses`.
- Use `activeDeadlineSeconds` carefully because it includes init-container time and can kill an otherwise healthy Pod later.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: init-demo
spec:
  initContainers:
    - name: wait-for-service
      image: busybox:1.28
      command:
        - sh
        - -c
        - until nslookup myservice; do sleep 2; done
  containers:
    - name: app
      image: nginx
```

## Sidecar Containers
- Sidecars are helper containers that run in the same Pod as the main app to handle concerns like log shipping, monitoring, proxying, or data sync.
- In modern Kubernetes, sidecars can be defined as restartable entries in `initContainers` by setting `restartPolicy: Always`.
- Unlike regular init containers, sidecars stay running after startup and can be restarted independently of the main app container.
- A sidecar can use `readinessProbe`, and that result can affect overall Pod readiness.
- On Pod shutdown, the main application container stops first and sidecars are terminated afterward in reverse order.
- For Jobs, a sidecar defined this way does not block Job completion after the main container finishes.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app-with-sidecar
spec:
  containers:
    - name: app
      image: nginx
  initContainers:
    - name: logshipper
      image: alpine:latest
      restartPolicy: Always
      command: ["sh", "-c", "tail -F /opt/logs.txt"]
```

## Quick Reminder
- Use `create` the first time a resource does not exist.
- Use `apply` when updating declarative manifests over time.
- Use `rollout status` and `rollout history` to verify deployment changes.
- Sidecars are useful when the helper process must stay alive for the full Pod lifecycle.
