# Solution Env Variables Optional

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Solution-Env-Variables-Optional/page

Summary: Learn to manage environment variables in Kubernetes pods and update them using direct modifications and ConfigMaps for dynamic configuration.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Application Lifecycle Management Section Introduction|Section Overview]]
- [[Solution Commands and Arguments Optional|Previous: Solution Commands and Arguments Optional]]
- [[Solution Init Containers Optional|Next: Solution Init Containers Optional]]


## Key Notes
- In this lab, you’ll learn how to manage environment variables in a Kubernetes pod and update them using both direct modifications and ConfigMaps. Follow along to understand how to check running pods, update environment variables, and integrate ConfigMaps for dynamic configuration.
- Checking the Running Pod
- First, check how many pods are currently running. In this example, we’re working with a single pod named “webapp-color”:
- Output:
- 1/1
- ID:
- docker.io/kodekloud/webapp-color@sha256:99c3821ea49b89c7a22d3eebabab5c2e1ec651452e7675
- Port:
- <
- >
- State:
- Started:
- Sat,
- 22:49:49
- +0000
- Ready:
- Count:
- Environment:
- APP_COLOR:
- When you access the web application via the provided link, you’ll notice that the background color is pink.
- Updating the Pod to Change the Environment Variable
- Pods are immutable, so while you can edit a pod’s manifest, the changes cannot be applied directly. Instead, save the modified manifest locally and force replace the pod.
- \"green\"
- \"2022-04-16T22:49:43Z\"
