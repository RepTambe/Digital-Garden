# Working with Helm basics

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Helm-Basics/Working-with-Helm-basics/page

Summary: This guide highlights key operations and commands available with Helm for managing deployments on Kubernetes efficiently.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[What is Helm|Previous: What is Helm]]


## Key Notes
- With Helm installed, you can easily manage deployments on Kubernetes using the Helm command-line interface (CLI). This guide highlights key operations and commands available with Helm, ensuring you get started quickly and efficiently.
- When you run the Helm command without parameters, it displays a comprehensive help menu that provides a quick reference for common actions. For example:
- $
- Helm:
- search:
- pull:
- install:
- list:
- Usage:
- [command]
- Commands:
- chart's dependencies
- env helm client environment information
- get download extended information of a named release
- help help about any command
- history fetch release history
- helm restore
- helm rollback
- Exploring Subcommands
- Helm provides a variety of subcommands to manage tasks, including repository-related functions. To see all commands related to chart repositories—such as adding, listing, or removing repositories—execute:
- add,
- remove,
- list,
- For more detailed information on a specific operation, such as updating your local cache of chart repository data, you can view its help instructions:
