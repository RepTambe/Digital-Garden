# Patches list

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Kustomize-Basics/Patches-list/page

Summary: Learn to modify Kubernetes Deployment containers by replacing, adding, and deleting items using JSON 6902 and strategic merge patches while maintaining YAML hierarchy.

## Key Notes
- In this article, you’ll learn how to modify containers within a Kubernetes Deployment by performing operations on list items. We cover how to replace, add, and delete items from the container list using both JSON 6902 patches and strategic merge patches. Every example maintains the correct YAML hierarchy and list indexing to ensure a seamless configuration update.
- Below is the base deployment configuration used in all examples:
- apps/v1
- ──────────────────────────────
- 1. Replacing a Container Using a JSON 6902 Patch
- In this first example, we update the container’s name and image from “nginx” to “haproxy”. Since the container section is defined as a list, we specifically target the first container (index 0) in the patch path. Remember that list indexes start at zero.
- The following JSON 6902 patch replaces the container at index 0:
- |
- - op: replace
- path: /spec/template/spec/containers/0
- value:
- name: haproxy
- image: haproxy
- Kustomize will apply this patch to update the first (and only) container of the Deployment.
- Ensure you use the correct index when working with lists in your YAML configurations.
- 2. Replacing a Container Using a Strategic Merge Patch
- An alternative approach is to update the container using a strategic merge patch. In this example, we update the image of an existing container. Verify that the Deployment configuration and the patch file refer to the same container name. Note that a minor typo (“ngin” instead of “nginx”) has been corrected for clarity.
- The base deployment remains as:
- kustomization.yaml
- When merged, this patch updates the container named “nginx”, changing its image to “haproxy”.
- 3. Adding an Item to a List Using a JSON 6902 Patch
- To add another container to your Deployment, use the JSON patch with an “add” operation. The patch path ends with a dash (-) to signal that the new container should be appended to the end of the list. Although indexing (e.g., 0 for the beginning) is possible, appending is achieved easily using the dash notation.
- The base deployment configuration is as follows:
- The JSON 6902 patch to add a new container is:
