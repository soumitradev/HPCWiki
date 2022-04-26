---
sidebar_position: 8
sidebar_label: "Software"
hide_table_of_contents: true
hide_title: true
pagination_next : null
pagination_prev : null
title: "Software"
---

## Software

### What is the Operating System used on the cluster?
We currently use RockyLinux 8 a community enterprise operating system designed to be 100% bug-for-bug compatible with Red Hat Enterprise Linux (RHEL).

### What software is available on the cluster?
You can refer to the [Software page](./../misc_docs/software/software.mdx) for the list of softwares available on the cluster.

### Can I install a package on my own?
We encourage you to use the software packages provided by the cluster as they are built optimised for running on the cluster. However, if you wish to install a package on your own, we have configured the cluster to provide various build tools and libraries to help you compile your softwares locally.

### How hard is it to port my code to run on the facility?
If your code implements parallel programming standards such as OpenMP, MPI, or CUDA, then porting the code would not be a problem. While, the compilation steps might have minimal to no change, the execution of the codes requires you to write SLURM scripts to launch the codes on the cluster.

### Can I run my docker applications on the HPC facility?
No. We do not provide docker support on the cluster. However, we do provide Apptainer (formerly Singularity) which is a container technology built to be run on HPC platforms.

### How often are the software packages updated?
We update packages fairly regularly to ensure the latest features and bug fixes are available. This also includes updating the Operating System and any other software packages that are required for the cluster to function properly.