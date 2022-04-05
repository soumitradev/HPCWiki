---
sidebar_position: 3
sidebar_label: "Usage Policy"
hide_table_of_contents: true
hide_title: true
pagination_next : null
pagination_prev : null
---

## Usage Policy

### Access and user accounts

-   To access the HPC facility, a valid user account and BITS email id is required.

-   The computing facility can be accessed through `ssh`. However, for secured access, at the time of account creation, users have to provide the `ssh` public key of the machine that is being used to connect.

-   User accounts are personal and therefore users are requested not to share their `ssh` keys as it may lead to unauthorised access.

-   The user accounts are subjected to institute IT policies and violation of these policies can result in termination of the account.

-   All user accounts are non-transferable.

-   Users can access the HPC facility through the public domain `hpc.bits-hyderabad.ac.in`. More details on accessing **Sharanga** are provided in the FAQs document.

-   `root` access is prohibited to the users.

### Storage and data security

-   Users are provisioned with 40GB of storage space in the `/home` directory. `/home` acts as a personal repository for the user data and is mounted across all nodes. Additional storage space may be provided upon request and valid justification, subject to availability.

-   Apart from the `/home` directory, users are given unlimited storage space in `/scratch`. `/scratch` acts as a temporary storage location and files stored in it are purged automatically after 15 days following the last modifications. Please note that this deletion process is done by the system automatically.

-   It is the responsibility of the users to secure their data by setting appropriate permissions to their files and directories.

### Backups

-   `/home` directory is backed up incrementally on a daily basis using Borg backup. Backups older than 30 days will be deleted automatically. Note that files stored in `/scratch` are not backed.

-   Although Backups are stored locally, any untoward incident that affects the HPC facility may destroy both the primary and backup copies of the user files. The HPC center cannot guarantee the safety of the files stored on HPC resources.

-   Users are advised to take backups at least once every 30 days.

### Job scheduling and resource allocation

-   Users should use the login node for interactive access and transferring files. All compilation and job scheduling should be performed on the login node. However, users are not allowed to run their codes on the login node.

-   To submit jobs on the compute nodes, the HPC facility uses a job scheduler called Slurm Workload Manager. The job scheduler is responsible for managing jobs on the compute and accelerator nodes and returning the output to the user.

-   For running any job on the HPC facility, the job has to utilise a minimum of 4 cores. Jobs using a lower number of cores including serial codes will not be allowed to run. Furthermore, submitted jobs should be in multiples of 4 up to a maximum of 512 cores.

-   To ensure fair usage of the computing resources, Slurm is configured in such a way that the maximum wall clock time based on CPU parallel codes will not exceed 168 hours. For job submissions on the GPU node, the maximum permissible wall clock time is restricted to 24 hours. Any job exceeding this limit will be terminated without notification. Therefore, it is highly recommended to store the data at regular intervals using checkpoints.

-   The HPC committee reserves the right to change the maximum allowed run time periodically.

-   While submitting jobs through Slurm, users have to specify the number of computing cores, required memory per node and run-time. Note that accurate job specifications will improve scheduling and result in jobs running sooner.

-   Users are advised not to run experimental codes that might compromise the usability of the login and compute nodes, the network fabric, and the shared storage system. Jobs that are having an adverse effect on the HPC facility will be terminated without prior notification.

-   Users who desire to perform the scalability of the indigenous codes should contact the HPC team so that necessary resources can be allotted at a convenient time.

### Software support and maintenance

-   All the relevant open source software packages are by default installed. However, if any user desires to have additional packages they are requested to contact the system administrator through <hpc@hyderabad.bits-pilani.ac.in> for the same.

-   Installation of commercial software on HPC facility must include a valid license. No software will be installed without prior proof of license eligibility.

-   Note that only the system administrator is authorised to install software or any other packages on the facility.

-   For the purpose of security, performance, and stability, software will be updated periodically. However, some updates may require temporary downtime of the facility, which will be informed via relevant mailing list.

### Account expiration and termination

-   User accounts will expire when users leave the Institute or the accounts have been inactive for more than three months.

-   Users leaving the institute will be given a period of 15 days to transfer all their files starting from the last working day at the institute.

-   During this period, users can no longer submit their jobs.

-   Users of the accounts that are inactive for more than three months will be given a period of 15 days to transfer their files.

-   Note that the user accounts are subjected to institute IT policies and violation of these policies can result in termination of the account.

### Publications

Any form of publications from the work done on the Institute HPC facility should be acknowledged. Details of the published papers acknowledging the HPC facility should be communicated to <hpc@hyderabad.bits-pilani.ac.in>. We request the users to kindly use the following text to acknowledge the HPC resources.

> *The authors gratefully acknowledge the computing time provided on the high performance computing facility, Sharanga, at the Birla Institute of Technology and Science - Pilani, Hyderabad Campus.*
