# Helm charts

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/2025-Updates-Helm-Basics/Helm-charts/page

Summary: Helm Charts simplify application deployment on Kubernetes by managing complex configurations through reusable instruction manuals.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Customizing chart parameters|Previous: Customizing chart parameters]]
- [[Helm Components|Next: Helm Components]]


## Key Notes
- Helm is a command-line automation tool that simplifies the deployment, upgrade, and rollback of applications on Kubernetes. Instead of manually executing numerous individual operations, Helm accepts high-level commands like “install this application” and manages all the necessary steps behind the scenes. It achieves this by reading a set of instructions defined in Helm Charts.
- This example demonstrates the power of using Helm Charts to abstract complex Kubernetes configurations into a reusable package.
- Hello-World Helm Chart Example
- Service Definition
- Deployment Definition
- apps/v1 : {{
- .Values.replicaCount
- \"{{ .Values.image.repository }}\"
- Default Configuration Values
- $
- Chart Metadata with Chart.yaml
- \"1.16.0\"
- A web application
- The API version is particularly important. While Helm 2 did not include the API version field, Helm 3 introduced it along with other features like chart dependencies and type fields. Charts built for Helm 3 must have the API version set to v2. Using a Helm 3 chart with API version v2 in Helm 2 may lead to unexpected results. Therefore, always set the API version to v2 when developing a chart for Helm 3.
- If you encounter a chart that lacks an API version field, it is likely built for Helm 2. Attempting to deploy such charts with Helm 3 might result in unexpected behavior. Always verify the chart version before installation.
- Comprehensive Example: Deploying WordPress
- Web publishing platform for building blogs and websites.
- containers@bitnami.com
- Chart Directory Structure
- Helm charts are organized in a standard directory structure. At a minimum, a chart directory includes:
- Installing the WordPress Chart
- To install the WordPress chart from the Bitnami repository, execute the following commands:
- bitnami/wordpress
- In the next lesson, we will dive deeper into chart dependencies and provide additional details on customizing your Helm charts.
