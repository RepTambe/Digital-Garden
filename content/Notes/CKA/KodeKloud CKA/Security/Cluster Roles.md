# Cluster Roles

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/Cluster-Roles/page

Summary: This article introduces cluster roles and bindings for managing permissions across a Kubernetes cluster, distinguishing between namespaced and cluster-scoped resources.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Security Section Introduction|Section Overview]]
- [[Certificates API|Previous: Certificates API]]
- [[Custom Controllers 2025 Updates|Next: Custom Controllers 2025 Updates]]


## Key Notes
- `Role` and `RoleBinding` are namespace-scoped.
- `ClusterRole` and `ClusterRoleBinding` are cluster-scoped.
- A `ClusterRole` can still be used for namespaced resources if it is attached with a `RoleBinding` inside a namespace.
- Common cluster-scoped resources include `nodes`, `persistentvolumes`, `clusterroles`, and `clusterrolebindings`.
- Common namespaced resources include `pods`, `deployments`, `services`, and `configmaps`.

## Example: Shared Pipeline Access Across Two Namespaces

This example creates a `pipeline` service account in `ns1` and `ns2`, grants both accounts read-only access with the default `view` `ClusterRole`, and then grants create/delete access for `deployments` in each namespace.

```bash
# create service accounts
k -n ns1 create sa pipeline
k -n ns2 create sa pipeline

# use the default ClusterRole named view
k get clusterrole view
k create clusterrolebinding pipeline-view \
  --clusterrole=view \
  --serviceaccount=ns1:pipeline \
  --serviceaccount=ns2:pipeline

# create a ClusterRole for managing Deployments
k create clusterrole pipeline-deployment-manager \
  --verb=create,delete \
  --resource=deployments

# bind that ClusterRole inside each namespace
k -n ns1 create rolebinding pipeline-deployment-manager \
  --clusterrole=pipeline-deployment-manager \
  --serviceaccount=ns1:pipeline

k -n ns2 create rolebinding pipeline-deployment-manager \
  --clusterrole=pipeline-deployment-manager \
  --serviceaccount=ns2:pipeline
```

## Why This Works
- The `pipeline-view` `ClusterRoleBinding` grants both service accounts the `view` `ClusterRole` across the cluster.
- The `pipeline-deployment-manager` `ClusterRole` defines the allowed actions for `deployments`.
- Each namespace gets its own `RoleBinding`, which limits the deployment management permission to that namespace.
- Instead of one shared `ClusterRole`, you could create separate `Role` objects in `ns1` and `ns2` with the same rules.
