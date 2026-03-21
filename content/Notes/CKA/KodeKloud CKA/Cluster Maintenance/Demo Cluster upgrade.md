# Demo Cluster upgrade

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Cluster-Maintenance/Demo-Cluster-upgrade/page

Summary: This guide demonstrates upgrading a Kubernetes cluster from version 1.28 to 1.29 using kubeadm following official instructions.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Cluster Maintenance Section Introduction|Section Overview]]
- [[Cluster Upgrade Introduction|Previous: Cluster Upgrade Introduction]]
- [[Kubernetes Software Versions|Next: Kubernetes Software Versions]]


## Key Notes
- Kubernetes Documentation
- The documentation provides dedicated instructions for each upgrade path. In this case, we are upgrading from 1.28 to 1.29 (the latest release). Similar procedures exist for other upgrade paths (e.g., 1.27 to 1.28, 1.26 to 1.27, etc.). Simply select the correct upgrade path and follow the detailed steps accordingly.
- Updating Package Repositories
- Before proceeding, confirm that you are using the new package repositories. Check the documentation and click the provided link for the latest instructions.
- Verify Your Node OS and Repository Setup
- First, determine your node distribution because the commands differ slightly by operating system. For example, on a two-node cluster, run:
- An example output may be:
- NAME STATUS ROLES AGE VERSION
- controlplane Ready control-plane 98m v1.28.0
- node01 Ready <none> 98m v1.28.0
- To check your OS distribution, use:
- /etc/
- *
- Example output for Ubuntu 20.04.6 LTS (Debian-based):
- DISTRIB_ID=Ubuntu
- DISTRIB_RELEASE=20.04
- DISTRIB_CODENAME=focal
- DISTRIB_DESCRIPTION=\"Ubuntu 20.04.6 LTS\"
- NAME=\"Ubuntu\"
- VERSION=\"20.04.6 LTS (Focal Fossa)\"
- ID=ubuntu
- ID_LIKE=debian
- PRETTY_NAME=\"Ubuntu 20.04\"
- VERSION_ID=\"20.04\"
- Check the upgrade path before applying changes with `kubeadm upgrade plan`.
- This verifies cluster health, current versions, and the target versions available for upgrade.
