# Solution Logging Optional

Source: https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Logging-Monitoring/Solution-Logging-Optional/page

Summary: This lesson covers managing application logs to diagnose real-time issues, focusing on login problems and order failures in a multi-container environment.

## Related Notes
- [[../00 - Index|KodeKloud CKA Index]]
- [[../../00 - Index|CKA Index]]
- [[Logging and Monitoring Section Introduction|Section Overview]]
- [[Monitor Cluster Components|Previous: Monitor Cluster Components]]
- [[Solution Monitor Cluster Components|Next: Solution Monitor Cluster Components]]


## Key Notes
- In this lesson, we will learn how to manage application logs to diagnose issues in real-time. By reviewing logs from deployed pods, you can quickly identify errors based on user reports, leading to more efficient troubleshooting and improved application stability.
- Inspecting Application Logs for Login Issues
- We begin with a scenario where a pod hosting an application has been deployed. To ensure the pod is running, use the following command:
- The output should resemble:
- NAME READY STATUS RESTARTS AGE
- webapp-1 1/1 Running 0 110s
- A user (user five) reported difficulties while attempting to log in. By examining the logs, we discovered that the issue is due to a locked account caused by too many failed login attempts. The log entry confirms:
- [2022-04-16 19:55:58,923] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
- [2022-04-16 19:56:14,961] INFO in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
- The output clearly indicates that subsequent failed login attempts have resulted in the account being locked. This information is crucial for troubleshooting user authentication issues.
- Diagnosing an Order Failure Issue in a Multi-Container Pod
- In this scenario, a new application deployment involves two pods, with one pod (webapp-2) hosting two containers. Start by verifying the status of the pods:
- Expected output:
- 1/1
- 2/2
- Attempting to view the logs for pod webapp-2 without specifying a container will result in an error:
- Output:
- error: a container name must be specified for pod webapp-2, choose one of: [simple_webapp db]
- Since our focus is on the web application’s logs, specify the container “simple_webapp” to examine the relevant log entries.
- A user reported an issue while purchasing an item. Investigation of the log entries (focusing on warnings) reveals that, despite several warnings, the critical error associated with the order failure is related to an out-of-stock item. Review the following log sample:
- [2022-04-16 19:57:24,773] INFO in event-simulator: USER2 logged in
- [2022-04-16 19:57:25,774] INFO in event-simulator: USER1 logged in
- [2022-04-16 19:57:26,775] WARNING in event-simulator: USER5 Failed to Login as the account is locked due to MANY FAILED ATTEMPTS.
- [2022-04-16 19:57:27,771] INFO in event-simulator: USER4 is viewing page1
