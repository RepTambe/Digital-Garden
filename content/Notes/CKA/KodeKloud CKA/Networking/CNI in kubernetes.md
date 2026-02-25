# CNI in kubernetes

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/CNI-in-kubernetes/page

Summary: This lesson explores how Kubernetes uses the Container Network Interface to manage container networking and configure network plugins.

## Key Notes
- In this lesson, we explore how Kubernetes leverages the Container Network Interface (CNI) to manage container networking. You will gain an understanding of how network plugins are configured and used in a Kubernetes environment.
- Earlier, we reviewed:
- The basics of networking and namespaces
- Docker networking fundamentals
- The evolution and rationale behind CNI
- A list of supported CNI plugins
- Now, we focus on how Kubernetes configures the use of these network plugins.
- As discussed in previous lessons, the CNI specifies the responsibilities of the container runtime. In Kubernetes, container runtimes such as Containerd or CRI-O create the container network namespaces and attach them to the correct network by invoking the appropriate network plugin. Although Docker was initially the primary container runtime, it has largely been replaced by Containerd as an abstraction layer.
- Configuring CNI Plugins in Kubernetes
- When a container is created, the container runtime invokes the necessary CNI plugin to attach the container to the network. Two common runtimes that demonstrate how this process works are Containerd and CRI-O.
- /opt/cni/bin
- /etc/cni/net.d
- Directory Structure for CNI Plugins and Configuration
- For example, you might see the following directories:
- weave-plugin-2.2.1
- 10-bridge.conflist
- In this case, the container runtime chooses the “bridge” configuration file.
- Understanding a CNI Bridge Configuration File
- A typical CNI bridge configuration file, adhering to the CNI standard, might look like this:
- /etc/cni/net.d/10-bridge.conf
- \"cniVersion\"
- \"0.2.0\"
- \"name\"
- \"mynet\"
