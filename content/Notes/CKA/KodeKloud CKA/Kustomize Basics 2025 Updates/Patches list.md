# Patches list

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Patches-list/page

Summary: This lesson demonstrates modifying list items in Kubernetes Deployment configurations using JSON 6902 patches and strategic merge patches.

## Key Notes
- In this lesson, we demonstrate how to modify list items in a Kubernetes Deployment configuration using both JSON 6902 patches and strategic merge patches. You can update, add, or remove containers in the deployment’s container list. The examples below illustrate how to work with list indices and container names effectively.
- Below is the base deployment configuration defining a single container named “nginx” using the “nginx” image. Notice that the containers section is a list, indicated by the dash (-) before the container definition.
- apps/v1
- Replacing a Container in the List Using a JSON 6902 Patch
- kustomization.yaml
- kustomization.yaml:
- |
- - op: replace
- path: /spec/template/spec/containers/0
- value:
- name: haproxy
- image: haproxy
- /spec/template/spec/containers/0
- Remember that list indices in YAML start at zero. Always check the index to target the correct container.
- Replacing a Container Using a Strategic Merge Patch
- label-patch.yaml:
- This patch finds the container named “nginx” in the list and updates its image to “haproxy.”
- Adding a Container to the List Using a JSON 6902 Patch
- If you want to add a second container to your deployment, you can achieve this using a JSON 6902 patch. In the example below, a new container with the name and image “haproxy” is appended to the containers list. The dash (-) at the end of the path indicates that the container should be added at the end of the list.
- - op: add
- path: /spec/template/spec/containers/-
- If the order of containers is important, you can specify an exact index; however, appending to the end is sufficient for many cases.
- After applying this patch, the deployment configuration will include both the original “nginx” container and the newly added “haproxy” container:
- Adding a Container Using a Strategic Merge Patch
