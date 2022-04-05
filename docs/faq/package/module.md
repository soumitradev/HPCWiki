---
sidebar_position: 2
sidebar_label: "With ModuleFiles"
hide_table_of_contents: true
hide_title: true
pagination_next : null
pagination_prev : null
title: "Package Management"
---

## Package Management with ModuleFiles

### How to view the list of available packages in the facility?

On Sharanga, users can use the following command to view the list of installed packages (with the versions).

```bash
$ module avail
--------------------------------- /share/module-------------------------------
   2brad_denovo/2019-01-22_giteec5016            meshclust2/2.1.0
   2brad_gatk/2019-01-22_git1fcc9e8              metal/2010-02-08
   admixture/1.3.0                               metal/2011-03-25
   angsd/0.923                                   metalge/2010-02-08
   annovar/2018apr                               minimac2/2014-09-15
   artemis/18.0.3                                minimac3/2.0.1
   augustus/3.3.2                                minimac4/1.0.0
   bamtools/2.5.1                                mirdeep2/0.1.0
   bamutil/1.0.14                                mixcr/3.0.3
   basemount/0.15.103.3011                       mmap/2018-04-07
   basespace-cli/0.8.12.590                      morgan/3.2
   basespace-cli/0.9.17                          morgan/3.4
   basespace-cli/0.10.8                          mosdepth/0.2.6
   bayescan/2.1                                  mothur/1.35.0
   bbmap/38.16                                   multiqc/1.6
   bcbio/1.1.1                                   mummer/3.23
```

### How to load and unload a package(s)?

Users can use the `module load` command to load a package into their current environment. For example, a user who wishes to use `PETSc` library can use the following syntax.

```bash
$ module load petsc
```

If a user wishes to unload the `PETSc` library from their user environment, they can use the `module rm` command.

```bash
$ module rm petsc
```

If a user wishes to unload all the loaded libraries from their user environment, then they can use the following command.

```bash
$ module purge
```

### How to view the list of loaded packages?

Users can use the following command to find the list of currently loaded modules.

```bash
$ module list
```

### How do I check the version of the package installed?

Users can type the following command to find the version of the installed package.

```bash
$ module spider <package name>
```

Note that the user may get additional information about the package by using the following command

```bash
$ module help <package name>
```

### After submitting a job, I am getting messages like "module: command not found". Why am I getting this message?

Modulefiles are by default sourced by the default shell `/bin/bash`. You may get this message if you have changed the shell to something other than `bash`. We request you to change the shell back to `bash` for optimal functioning. Users can use the `chsh` shell command to change their user shell environment back to `bash`. Another reason could be due to the unavailability of the desired package.