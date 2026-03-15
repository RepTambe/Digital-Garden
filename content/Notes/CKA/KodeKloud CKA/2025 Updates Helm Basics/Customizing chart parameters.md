# Customizing chart parameters

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Helm-Basics/Customizing-chart-parameters/page

Summary: Learn how to customize chart parameters during WordPress installation using Helm, including command line overrides, custom values files, and modifying built-in configurations.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[A quick note about Helm2 vs Helm3|Previous: A quick note about Helm2 vs Helm3]]
- [[Helm charts|Next: Helm charts]]


## Key Notes
- In this guide, you’ll learn how to customize chart parameters during installation with Helm. By default, when installing WordPress using the Bitnami Helm chart, the deployment leverages the default settings provided in its values.yaml file. For example, executing the command below:
- $
- bitnami/wordpress
- will deploy WordPress with the blog name set to “User’s Blog!” since that is the value defined in the values.yaml file. The chart automatically configures these defaults as environment variables for the application.
- Using the Command Line to Override Defaults
- wordpressBlogName=\"Helm Tut\"
- 5.8.2-debian-10-r0
- \"\"
- user@example.com
- wordpressFirstName
- WordPress user first name
- User's Blog!
- The parameters passed on the command line will take precedence over the default values specified in the file.
- Using a Custom Values File
- For scenarios where multiple settings need to be overridden, it may be more efficient to create your own custom values file. Follow these steps:
- custom-values.yaml
- Helm Tutorials
- john@example.com
- Install the chart with your custom values file using the following command:
- This approach directs Helm to load your custom settings, thereby overriding those defined in the default values.yaml file.
- Modifying the Built-in values.yaml Directly
- For a more permanent configuration change, you might choose to modify the chart’s built-in values.yaml file. To do this, you first need to pull the chart locally. Begin by downloading the chart archive:
- You can then extract the files using one of two methods:
- Unarchive the file manually
