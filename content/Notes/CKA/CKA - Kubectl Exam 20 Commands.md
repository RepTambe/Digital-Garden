# CKA - Kubectl Exam 20 Commands

## Related Notes
- [[00 - Index|CKA Index]]
- [[CKA - Kubectl Command List]]
- [[CKA - Metrics Logging]]
- [[CKA - Personal Notes]]

1. `kubectl config get-contexts`
2. `kubectl config use-context <context-name>`
3. `kubectl config set-context --current --namespace=<ns>`
4. `kubectl get nodes -o wide`
5. `kubectl get pods -A -o wide`
6. `kubectl describe pod <pod> -n <ns>`
7. `kubectl logs <pod> -n <ns>`
8. `kubectl logs <pod> -c <container> -n <ns>`
9. `kubectl exec -it <pod> -n <ns> -- sh`
10. `kubectl run <name> --image=<image> --restart=Never --dry-run=client -o yaml > pod.yaml`
11. `kubectl create deployment <name> --image=<image> --dry-run=client -o yaml > dep.yaml`
12. `kubectl expose deployment <dep> --port=80 --target-port=8080 --type=ClusterIP`
13. `kubectl apply -f <file>.yaml`
14. `kubectl edit deployment <dep> -n <ns>`
15. `kubectl scale deployment <dep> --replicas=<n>`
16. `kubectl set image deployment/<dep> <container>=<image>:<tag>`
17. `kubectl rollout status deployment/<dep>`
18. `kubectl rollout undo deployment/<dep>`
19. `kubectl get events -A --sort-by=.lastTimestamp`
20. `kubectl describe <resource> <name> -n <ns>`

## Mini Tips
- Always confirm context and namespace before changes.
- Generate YAML fast with `--dry-run=client -o yaml`.
- Debug order: `get` -> `describe` -> `logs` -> `events`.
