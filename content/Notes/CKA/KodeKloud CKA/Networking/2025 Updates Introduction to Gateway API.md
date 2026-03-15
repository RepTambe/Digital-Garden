# 2025 Updates Introduction to Gateway API

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/2025-Updates-Introduction-to-Gateway-API/page

Summary: This article introduces the Gateway API, a flexible approach to managing network routing in Kubernetes, addressing limitations of Ingress.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Cluster Networking|Next: Cluster Networking]]


## Key Notes
- In this lesson, we introduce the Gateway API, a modern, more flexible approach to managing network routing in Kubernetes. In previous discussions on Ingress, we saw a scenario where two services shared the same Ingress resource:
- Imagine a scenario where independent teams or even separate organizations manage different services. For example, one team could be responsible for the web service while another oversees the video service. In such multi-tenant environments, a single Ingress resource — which can be controlled by only one team at a time — may lead to coordination challenges and potential conflicts. In addition, Ingress has limited support for multi-tenancy and parameterized rules.
- For basic routing, consider this simple Ingress configuration:
- extensions/v1beta1
- ingress-wear-watch
- wear.my-online-store.com
- watch.my-online-store.com
- Another limitation of Ingress is its narrow rule configuration. Ingress only supports HTTP-based requests by matching hosts or paths. It does not natively support protocols such as TCP or UDP, nor does it offer advanced features like traffic splitting, header manipulation, authentication, or rate limiting. These behaviors are usually implemented using controller-specific annotations. For example:
- nginx.ingress.kubernetes.io/ssl-redirect
- \"true\"
- nginx.ingress.kubernetes.io/force-ssl-redirect
- /foo
- The use of annotations, however, creates challenges. Different Ingress implementations (such as NGINX and Traefik) require their own annotation syntax. For instance, configuring CORS might look like this:
- networking.k8s.io/v1
- nginx.ingress.kubernetes.io/enable-cors
- nginx.ingress.kubernetes.io/cors-allow-methods
- \"GET, PUT, POST\"
- nginx.ingress.kubernetes.io/cors-allow-origin
- \"https://allowed-origin.com\"
- nginx.ingress.kubernetes.io/cors-allow-credentials
- traefik.ingress.kubernetes.io/headers.customresponseheaders
- |
- Access-Control-Allow-Origin: '*'
- Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
