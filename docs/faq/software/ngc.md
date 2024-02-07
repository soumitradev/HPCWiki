---
sidebar_position: 5
sidebar_label: "NVIDIA GPU Cloud (NGC)"
hide_table_of_contents: true
hide_title: true
pagination_next: null
pagination_prev: null
title: "NVIDIA GPU Cloud (NGC)"
draft: false
---

## NVIDIA GPU Cloud

### What is the NVIDIA GPU Cloud (NGC) CLI?

The NVIDIA GPU Cloud (NGC) CLI is a command-line interface for managing NVIDIA GPU Cloud resources. It allows you to manage your NGC resources from the command line. It offers functionalities to search, pull, and push AI and HPC application containers and models.

### Do I Need an NVIDIA Account to Use NGC CLI?

Yes. You need an NVIDIA account to use NGC CLI. If you do not have an NVIDIA account, you can create one at https://ngc.nvidia.com/signup.

### How Can I Authenticate with NGC Using the CLI?

To authenticate with NGC using the CLI, run the following command:

```bash
$ ngc config set
```

### What Types of Resources Can I Access Through NGC CLI?

You can access a variety of resources, including Docker containers optimized for NVIDIA GPUs, pre-trained models, SDKs, and HPC applications.

### How Do I Search for Containers or Models in NGC Using the CLI?

To search for containers or models in NGC using the CLI, run the following command:

For searching models:

```bash
$ ngc catalog search model <search term>
```

For searching containers:

```bash
$ ngc catalog search container <search term>
```

This will display a list of available models or containers that match your query.

### Can I Pull a Specific Version of a Container Using NGC CLI?

Yes. To pull a specific version of a container, run the following command:

```bash
$ ngc container pull <container name>:<version>
```

### Is There a Way to Download Pre-Trained Models Directly via NGC CLI?

Yes. To download pre-trained models directly via NGC CLI, run the following command:

```bash
$ ngc model download <model name>:<version>
```

### Are There Any Costs Associated with Using NGC and the NGC CLI?

Accessing NGC and using the NGC CLI is generally free, but some resources, especially certain enterprise-grade containers or models, may require a subscription or purchase.

### What Kind of Support is Available for NGC CLI Users?

NVIDIA offers a variety of support options for NGC CLI users, including a community forum, a knowledge base, and a support portal. For more information, please visit https://ngc.nvidia.com/support.

### Why should I use NGC containers?

NGC containers are optimized for NVIDIA GPUs and provide a consistent, reliable, and secure environment for running AI and HPC applications. They are also easy to use and can be deployed in minutes.

We recommend using NGC containers for all AI and HPC applications that require NVIDIA GPUs.

### How do I run an NGC containers?

To run an NGC container using Apptainer, use the following command in your Slurm script:

```bash
$ apptainer run --image <container name>:<version> --gpu <number of GPUs> -- <command>
```

Ensure that you replace `<container name>` and `<version>` with the name and version of the container you want to run. You can find the name and version of the container on the NGC website.

### Can I Access Private Registries Through NGC CLI?

Yes. To access private registries through NGC CLI, run the following command:

```bash
$ ngc registry login
```
