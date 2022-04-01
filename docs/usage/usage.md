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

Access to the machine through ssh keys. 


### Storage and data security

Users are provisioned with 40GB of storage space in the /home directory. /home acts as a personal repository for the user data and is mounted across all nodes. Additional storage space may be provided upon request and valid justification.

Apart from the home directory, users are given unlimited storage space in scratch. Please note that scratch acts as a temporary storage location and files stored in it are purged automatically after 15 days following the last modifications.

It is the responsibility of the users to secure their data by setting appropriate permissions to their files and directories.

### Backups
Users’ home directories are backed up incrementally on a daily basis using Borg backup. Backups older than 30 days will be deleted automatically. Note that files stored in the scratch space are not backed. 

Although Backups are stored locally, any untoward incident that affects the HPC facility may destroy both the primary and backup copies of the user files. Therefore, users are advised to take periodic backups of their files on their local machines. The HPC center cannot guarantee the safety of files stored on HPC resources.

### Account expiration and termination

User accounts will expire when users leave the Institute or the accounts have been inactive for more than six months. Users leaving the institute will be given a period of 15 days to transfer all their files. Users of the accounts that are inactive for more than six months will be given a period of 15 days to transfer their files. Note that the user accounts are subjected to institute IT policies and violation of these policies can result in termination of the account. Furthermore, all user accounts are non-transferable. 


### Job scheduling and resource allocation
Users should use the login node for interactive access and transferring files. All compilation and job scheduling should be performed on the login node. However, users are not allowed to run their codes on the login node. 

To submit jobs on the compute nodes, the HPC facility uses a job scheduler called Slurm Workload Manager. The job scheduler is responsible for managing jobs on the compute and accelerator nodes and returning job output to the user.

For running any job on the HPC facility, the job has to utilise a minimum of 4 cores. Jobs using a lower number of cores will not be accepted. Furthermore, submitted jobs should be in multiples of 4 up to a maximum of 640 cores.

To ensure fair usage of the computing resources, Slurm is configured in such a way 	that the maximum run time for any job on the HPC facility will not exceed 168 hours. 	Any job exceeding this limit will be terminated. Therefore, it is highly recommended to 	store the data at regular intervals using checkpoints.

While submitting jobs through Slurm, users have to specify the number of computing cores, required memory per node and run-time. Note that accurate job specifications will improve scheduling and result in jobs running sooner.

Users are advised not to run experimental codes that might compromise the usability of the login and compute nodes, the network fabric, and the shared storage system. Jobs that are having an adverse effect on the HPC facility may be terminated with no prior notification.

Users who desire to perform the scalability of the indigenous codes should contact the HPC team so that necessary resources can be allotted at a convenient time. 

### Software support and maintenance

All the relevant open source software packages are by default installed. However, if any user desires to have additional packages they are requested to contact the system administrator for the same.

Installation of commercial software on HPC facility must include a valid license. No software will be installed without prior proof of license eligibility.

For the purpose of security, performance, and stability, software will be updated periodically. However, some updates may require temporary downtime of the facility, which will be informed via relevant mailing list.

### Publications
Any form of publications from the work done on the Institute HPC facility should be acknowledged. Details of the published papers acknowledging the HPC facility should be submitted.