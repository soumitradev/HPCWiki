---
sidebar_position: 4
sidebar_label: "Apptainer (Singularity)"
hide_table_of_contents: true
hide_title: true
pagination_next : null
pagination_prev : null
title: "Apptainer (Singularity)"
draft: false
---

## Apptainer (Singularity)

### What is Apptainer?

Apptainer (formerly known as Singularity) is a container technology that allows you to run complex scientific applications. It is an alternative to Docker, but built and optimised for running on a HPC cluster.

### Why should I use Apptainer?
Apptainer provides several advantages over Docker and other container technologies:
- It provides verifiable reproducibility of your scientific applications. In many HPC conferences such as Supercomputing Conference (SC), users are required to provide reproducible results. This can be achieved by using Apptainer.
- It readily integrates with HPC infrastructure, such as SLURM, GPUs, high speed Mellanox IB, parallel file system Lustre, etc.
- The container image format SIF is designed to be portable across different HPC systems.

### I have scripts written for `singularity`. Can I use them with `apptainer`?
Yes, you can use the same scripts written for `singularity` with `apptainer`. However, we recommend you to slowly migrate to `apptainer`.

### How do I pull an Apptainer image?
To pull an Apptainer image, you can use the `apptainer pull` command. For example, to pull the latest version of Alpine Linux, type:

```bash
$ apptainer pull docker://alpine
```

You should see output like this:

```bash
INFO:    Converting OCI blobs to SIF format
INFO:    Starting build...
Getting image source signatures
Copying blob 2408cc74d12b done  
Copying config a366738a18 done  
Writing manifest to image destination
Storing signatures
2022/05/24 14:20:38  info unpack layer: sha256:2408cc74d12b6cd092bb8b516ba7d5e290f485d3eb9672efc00f0583730179e8
INFO:    Creating SIF file...
```

A file called `alpine_latest.sif` should now be in your current directory.

### How do I open a shell in an Apptainer container?

If you have a `.sif` file in your current directory, you can open a shell in the container using `apptainer shell`.

For example, if you have a `alpine_latest.sif` file in your current directory, you can open a shell in the container using:

```bash
$ apptainer shell alpine_latest.sif
```

### How can I run `apptainer` in my SLURM job script?

Please find a sample SLURM job script running a container called `gromacs_latest.sif`.
```bash
#!/bin/bash
#SBATCH -p compute
#SBATCH -N 1
#SBATCH -n 4
#SBATCH --mem 512M
#SBATCH -t 4-2:23 # time (D-HH:MM)
#SBATCH --job-name="hello_test"
#SBATCH -o slurm.%j.out
#SBATCH -e slurm.%j.err
#SBATCH --mail-user=<username>@hyderabad.bits-pilani.ac.in
#SBATCH --mail-type=ALL
srun apptainer exec gromacs_latest.sif sample.sh
```

### How can I use a GPU in an Apptainer container?
If you want to use a GPU in an Apptainer container, pass the `--nv` flag to your `apptainer` command.

For example, a typical `exec` command on a GPU container would be something like:

```bash
$ apptainer exec --nv cuda_latest.sif my_scipt.py
```

:::info
The `--nv` flag can be passed to `exec`, `run`, and `shell`.
:::

### What are some recommended registry websites supporting Apptainer?
We recommend the following registry websites:
- [Docker Hub](https://hub.docker.com/)
- [Sylabs.io](https://cloud.sylabs.io/)
- [BioContainers](https://biocontainers.pro/registry)
- [NVIDIA GPU Cloud (NGC)](https://catalog.ngc.nvidia.com/)
- [Github Container Registry](https://ghcr.io)
- [Redhat Quay](https://quay.io/)