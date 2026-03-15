# Working with Helm basics

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Helm-Basics-2025-Updates/Working-with-Helm-basics/page

Summary: This article covers basic Helm operations using the command-line interface for managing Kubernetes applications and chart repositories.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[What is Helm|Previous: What is Helm]]


## Key Notes
- This article explains basic Helm operations using the command-line interface. When you run the Helm command without any subcommands, it provides a list of common actions and available commands.
- For example, executing:
- $ helm --help
- displays:
- The Kubernetes package manager
- Common actions for Helm:
- - helm search: search for charts
- - helm pull: download a chart to your local directory to view
- - helm install: upload the chart to Kubernetes
- - helm list: list releases of charts
- Usage:
- helm [command]
- Available Commands:
- completion generate autocompletion scripts for the specified shell
- create create a new chart with the given name
- dependency manage a chart's dependencies
- env helm client environment information
- get download extended information of a named release
- help Help about any command
- history fetch release history
- helm rollback
- Managing Chart Repositories
- Exploring repository-related commands is straightforward. Running:
- $ helm repo --help
