# Helm charts

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Helm-Basics-2025-Updates/Helm-charts/page

Summary: This article explores Helm Charts for managing Kubernetes applications, detailing their structure, usage, and deployment processes.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Customizing chart parameters|Previous: Customizing chart parameters]]
- [[Helm Components|Next: Helm Components]]


## Key Notes
- In this lesson, we explore Helm Charts—a powerful tool for managing Kubernetes applications. Helm simplifies tasks such as installing, upgrading, rolling back, and uninstalling applications by automating the complex steps required to achieve the desired state.
- Helm Charts act as comprehensive instruction manuals for your deployments. Each chart is a structured collection of files that define an application’s configuration and behavior on Kubernetes. For example, the parameters in the values.yaml file enable operators to customize configurations without modifying the underlying templates.
- {{ .Values.replicaCount }}
- Below is a simple example of Helm template files that create two Kubernetes objects—a Deployment and a Service. The Deployment manages a set of Pods based on a specified image, and the Service exposes these Pods as a NodePort service:
- apps/v1 : {{
- .Values.replicaCount
- \"{{ .Values.image.repository }}\"
- To install this chart, run the following command:
- $
- Notice that values like the image repository and replica count are not hardcoded. Instead, they utilize Helm’s templating syntax, which references configurations defined in the values.yaml file. This approach allows you to easily adjust parameters without directly editing the template files.
- Chart Metadata
- Every Helm chart includes a Chart.yaml file that contains essential metadata, such as:
- API Version:
- App Version:
- Chart Version:
- Name and Description:
- Type:
- Dependencies:
- Additional Fields:
- Below is an example that combines Kubernetes manifest templates with chart metadata:
- \"1.16.0\"
- A web application
- Again, the chart can be installed with:
- Example: WordPress Chart
