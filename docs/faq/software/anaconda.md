---
sidebar_position: 3
sidebar_label: "Anaconda"
hide_table_of_contents: true
hide_title: true
pagination_next : null
pagination_prev : null
title: "Anaconda"
draft: false
---

## Anaconda

### What is Anaconda? How to load it?
Anaconda is a platform for managing and deploying scientific computing environments. It is a tool for managing software packages for Python, and R.

You can load Anaconda into your environment by typing:

```bash
$ spack load anaconda3
```

You will now be able to access the `conda` command to configure your environment. For example, to create a new environment called `test` targeting Python 3.10, you can type:

```bash
$ conda create -n test python=3.10
```

You should now be able to activate this environment using the `conda activate` command:

```bash
$ conda activate test
```

If you want to have the Anaconda environment activated automatically when you start a new terminal or login to your system, you can type the `conda init` command. Your `.bashrc` file will be modified to load the Anaconda environment.

:::info
This will also ensure that whenever you submit any SLURM job to the cluster, the conda environment will be available to that job. If you have multiple environments installed, you can activate any specific environment by using the `conda activate` command.
:::