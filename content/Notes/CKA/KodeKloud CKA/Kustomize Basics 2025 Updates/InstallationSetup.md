# InstallationSetup

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/InstallationSetup/page

Summary: This guide explains how to install and set up Kustomize for customizing Kubernetes resource configurations.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Image Transformers|Previous: Image Transformers]]
- [[kustomization|Next: kustomization]]


## Key Notes
- Installation Steps
- The Kustomize team provides a convenient installation script that automatically detects your operating system and installs the appropriate version. To download and run this script, execute the following command in your terminal:
- \"https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh\"
- |
- After the script completes, verify the installation by checking the version of Kustomize with:
- You should see an output resembling the following:
- {kustomize/v4.4.1 2021-11-11T23:36:27Z }
- If you do not see the expected version output, it may indicate an installation issue or that your current terminal session has not updated the necessary environment variables.
- If you encounter any issues during installation, try the following steps:
- Close your current terminal session and reopen it.
- Rerun the installation script to ensure that all components are set up correctly.
- Kustomize Documentation
- With Kustomize properly installed, you are now ready to explore its powerful features for managing Kubernetes configurations. Enjoy customizing your Kubernetes deployments!
