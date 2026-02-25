# Solution Secrets Optional

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Solution-Secrets-Optional/page

Summary: Learn to work with Kubernetes Secrets by inspecting existing ones, creating a custom secret, and configuring a web application pod to use it.

## Key Notes
- In this lab, you’ll learn how to work with Kubernetes Secrets. We’ll start by inspecting the default Namespace’s secrets, then create a custom secret for database credentials and configure a web application pod to use it.
- Inspecting Existing Secrets
- Question 1: How many Secrets exist in the default Namespace?
- Run the following command:
- You’ll see output similar to:
- NAME TYPE DATA AGE
- default-token-cr4sr kubernetes.io/service-account-token 3 7m50s
- This indicates that only one secret exists in the default Namespace.
- Question 2: How many pieces of secret data are defined in the default token secret?
- Inspect the details by running:
- default-token-cr4sr
- The output shows:
- Name: default-token-cr4sr
- Namespace: default
- Labels: <none>
- Annotations: kubernetes.io/service-account.name: default
- kubernetes.io/service-account.uid: 2751dc84-936d-4b41-865d-847a99a2b2b
- Type: kubernetes.io/service-account-token
- ====
- ca.crt: 570 bytes
- namespace: 7 bytes
- token: eyJhbGciOiJUUzI1NiIsImtpZCI6ImEyREFqZBTXdsZ2lL...k0pIHRhS
- This secret contains three key data fields:
- Thus, there are three pieces of secret data defined.
