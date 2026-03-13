# CKA - Kubectl Command List

## Fast Habits
- `alias k=kubectl`
- `export do="--dry-run=client -o yaml"`
- `export now="--force --grace-period 0"`

## Context and Namespace
- `k config get-contexts`
- `k config use-context <context-name>`
- `k config set-context --current --namespace=<ns>`
- `k get ns`

## Cluster and Node Checks
- `k cluster-info`
- `k get nodes -o wide`
- `k describe node <node-name>`
- `k top nodes`

## Pod Operations
- `k get pods -A -o wide`
- `k describe pod <pod> -n <ns>`
- `k logs <pod> -n <ns>`
- `k logs <pod> -c <container> -n <ns>`
- `k logs -f <pod> -n <ns>`
- `k exec -it <pod> -n <ns> -- sh`
- `k delete pod <pod> -n <ns> $now`
- `kubectl get pods --show-labels`
- `kubectl get pods -l <key>=<value>`

## Create Resources Imperatively
- `k create deployment <name> --image=<image>`
- `k create deployment <name> --image=<image> --replicas=3`
- `k run <name> --image=<image> --restart=Never`
- `k run <name> --image=<image> --restart=Never $do > pod.yaml`
- `k create service clusterip <svc> --tcp=80:8080`
- `k create service nodeport <svc> --tcp=80:8080 --node-port=30080`
- `k expose deployment <dep> --port=80 --target-port=8080 --type=ClusterIP`

## YAML and Apply Flow
- `k create deployment <name> --image=<image> $do > dep.yaml`
- `k apply -f <file>.yaml`
- `k apply -f <dir>/`
- `k replace -f <file>.yaml`
- `k diff -f <file>.yaml`
- `k edit <resource> <name>`

## Rollouts and Scaling
- `k get deploy`
- `k scale deployment <dep> --replicas=5`
- `k rollout status deployment/<dep>`
- `k rollout history deployment/<dep>`
- `k rollout undo deployment/<dep>`
- `k set image deployment/<dep> <container>=<image>:<tag>`

## Labels, Selectors, Annotations
- `k label pod <pod> env=prod --overwrite`
- `k get pods -l env=prod`
- `k annotate pod <pod> owner=cka --overwrite`
- `k get pods --show-labels`

## ConfigMaps and Secrets
- `k create configmap <name> --from-literal=key=value`
- `k create configmap <name> --from-file=<file>`
- `k create secret generic <name> --from-literal=password=abc123`
- `k create secret generic <name> --from-file=<file>`
- `k get secret <name> -o yaml`

## Scheduling and Placement
- `k taint nodes <node> key=value:NoSchedule`
- `k taint nodes <node> key=value:NoSchedule-`
- `k label nodes <node> disktype=ssd`
- `k cordon <node>`
- `k drain <node> --ignore-daemonsets --delete-emptydir-data`
- `k uncordon <node>`

## Services and Networking
- `k get svc -A`
- `k get svc <svc> -o yaml`
- `k describe svc <svc> -n <ns>`
- `k get endpoints -n <ns>`
- `k run tmp --rm -it --image=busybox:1.35 -- sh`
- `k run curl --rm -it --image=curlimages/curl -- sh`

## Storage
- `k get pv`
- `k get pvc -A`
- `k describe pvc <pvc> -n <ns>`
- `k get sc`

## Troubleshooting
- `k get events -A --sort-by=.lastTimestamp`
- `k describe <resource> <name> -n <ns>`
- `k auth can-i create pods --as system:serviceaccount:<ns>:<sa> -n <ns>`
- `k api-resources`
- `k api-versions`
- `k explain pod.spec.containers --recursive | less`

## JSONPath and Custom Output
- `k get pods -A -o custom-columns=NS:.metadata.namespace,NAME:.metadata.name,NODE:.spec.nodeName`
- `k get nodes -o jsonpath='{.items[*].metadata.name}'`
- `k get pod <pod> -o jsonpath='{.status.podIP}'`

## Exam Speed Snippets
- `k get po -A`
- `k get deploy,svc -A`
- `k -n <ns> get po`
- `k -n <ns> describe po <pod>`
- `k -n <ns> logs <pod>`
- `k -n <ns> edit deploy <dep>`

## Quick Reminder
- Prefer `describe` + `events` first when debugging.
- Use `--dry-run=client -o yaml` to generate manifests quickly.
- Confirm namespace/context before every task.
