# Demo Pods with YAML

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Demo-Pods-with-YAML/page

Summary: This article demonstrates how to create a Kubernetes Pod using a YAML definition file for better control over pod specifications.

## Key Notes
- In this lesson, we will create a Kubernetes Pod using a YAML definition file instead of the “kubectl run” command. This method offers more control by allowing you to define pod specifications explicitly in a file. You can choose any text editor for this task; for instance, Windows users may prefer Notepad++ over Notepad, while Linux users might opt for vim. In future sections, we will explore additional IDEs and tools to streamline YAML editing, but we will stick with the basics for now.
- Step 1: Creating the YAML File
- Open your terminal and use vim to create a file named pod.yaml:
- Inside the file, define the following key elements:
- apiVersion:
- kind:
- metadata:
- spec:
- Be sure to follow proper indentation rules. Use two spaces per level (avoid tabs), as misalignment can lead to errors.
- To add additional containers, insert another block within the containers list with the appropriate name and image.
- Step 2: Saving and Verifying the YAML File
- After editing the file, exit vim and save your changes by typing: :wq
- Verify the contents of your YAML file with:
- The output should match the YAML configuration shown above.
- Step 3: Creating the Pod in the Cluster
- kubectl create
- kubectl apply
- To check the status of your Pod, run:
- Initially, you might see an output similar to this:
- 0/1
- After a short while, re-running the command should show the Pod in a running state:
- Example output:
- 1/1
- Step 4: Inspecting the Pod Details
