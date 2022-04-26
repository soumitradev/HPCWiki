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
We currently use RockyLinux 8, a community enterprise OS based on Red Hat Enterprise Linux (RHEL).

### What software is available on the cluster?
You may kindly refer to the [Software section](./../misc_docs/software/software.mdx) for the list of softwares available on the cluster.

### Can I install a package on my own?
We encourage you to use the software packages installed on the cluster as they are specifically built and optimised. However, if you wish to install a package on your own, we have configured the cluster to provide various build tools and libraries to help you compile your softwares locally.

### How hard is it to port my code to run on the facility?
If your code implements parallel programming standards such as OpenMP, MPI, or CUDA, then porting the code would not be a problem. While, the compilation steps might have minimal to no change, the execution of the codes requires you to write SLURM scripts to launch on the cluster.

### Can I run my docker applications on the HPC facility?
No. We do not provide docker support on the cluster. However, we do provide Apptainer (formerly Singularity) which is a container technology built to be run on HPC platforms.

### How often are the software packages updated?
We update packages regularly to ensure the latest features and bug fixes are available. This also includes updating the Operating System and any other software packages that are required for the cluster to function properly.

### While executing a command, I am getting the error "undefined symbol: EVP\_KDF\_ctrl, version OPENSSL\_1\_1\_1b".
To resolve this issue, please type, `spack unload openssl` in the terminal.

### After launching nano or vi, the application throws a segmentation fault. 
To resolve this error, please type `spack unload openssl` in the terminal.