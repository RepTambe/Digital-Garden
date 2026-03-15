# Demo Encrypting Secret Data at Rest

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Demo-Encrypting-Secret-Data-at-Rest/page

Summary: This guide explains how to secure secret data in Kubernetes by enabling encryption at rest.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Application Lifecycle Management Section Introduction|Section Overview]]
- [[Configure Environment Variables in Applications|Previous: Configure Environment Variables in Applications]]
- [[Horizontal Pod Autoscaler HPA 2025 Updates|Next: Horizontal Pod Autoscaler HPA 2025 Updates]]


## Key Notes
- In this guide, we explain how to secure secret data in your Kubernetes cluster by enabling encryption at rest. We start by creating secret objects, examine how Kubernetes encodes them in etcd, and then show you how to configure the API server to encrypt these secrets.
- Creating a Secret Object
- Begin by launching your Kubernetes playground—a single-node cluster running Kubernetes with ContainerD. Kubernetes makes it easy to create secrets from files, literal values, or environment files. Below are some example commands:
- --from-file=path/to/bar
- --from-file=ssh-privatekey=path/to/id_rsa
- --from-file=ssh-publickey=path/to/id_rsa.pub
- --from-literal=key1=supersecret
- --from-literal=key2=topsecret
- --from-literal=passphrase=topsecret
- --from-env-file=path/to/foo.env
- --from-env-file=path/to/bar.env
- --allow-missing-template-keys
- After the command executes, verify the secret:
- Secret values are base64-encoded by default; they are not encrypted. Avoid pushing secret configuration files containing base64 values to public repositories.
- Viewing the Encoded Secret
- Kubernetes stores secret values in base64‑encoded format. Retrieve the secret as YAML to inspect its contents:
- The output might look like:
- c3VwZXJzWmNyZVQ=
- \"2022-10-24T05:34:13Z\"
- \"2111\"
- dfe97c62-5aa1-46a8-b71c-ffa0cd4c08ec
- To decode the secret value:
- \"c3VwZXJzWmNyZVQ=\"
- |
