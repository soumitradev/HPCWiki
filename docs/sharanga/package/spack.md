---
sidebar_position: 3
sidebar_label: "With Spack"
hide_table_of_contents: true
hide_title: true
pagination_next : null
pagination_prev : null
---

## Package Management with Spack

### How to view the list of available packages installed in the facility?

Users can use the `spack` command to view the list of installed packages.

``` {.bash}
  $ spack find
  ==> 45 installed packages
-- linux-centos8-broadwell / gcc@7.4.0 --------------------------
armadillo@9.800.3  cmake@3.17.3   libpciaccess@0.13.5  m4@1.4.18        openmpi@3.1.6   
arpack-ng@3.7.0    gdbm@1.18.1    libsigsegv@2.12      ncurses@6.2      openssl@1.1.1g  
autoconf@2.69      hwloc@1.11.11  libtool@2.4.6        numactl@2.0.12   perl@5.30.3     
automake@1.16.2    libiconv@1.16  libxml2@2.9.10       openblas@0.3.10  pkgconf@1.7.3 

-- linux-centos8-broadwell / gcc@8.3.1 --------------------------
autoconf@2.69    expat@2.2.9     isl@0.20              libsigsegv@2.12  mpfr@3.1.6      
automake@1.16.2  gcc@9.3.0       libbsd@0.10.0         libtool@2.4.6    mpfr@3.1.6     
bzip2@1.0.8      gdbm@1.18.1     libedit@3.1-20170329  m4@1.4.18        ncurses@6.1     
cmake@3.16.2     gettext@0.20.1  libffi@3.2.1          mpc@1.1.0        ncurses@6.2     
diffutils@3.7    gmp@6.1.2       libiconv@1.16         mpc@1.1.0        openssl@1.1.1d  
```

Note that the above list is for representational purpose and differs from the actual output on Sharanga.

### How to load and unload a package(s)?

Users can use the `spack load` command to load the package into their current environment. For example a user who wishes to use `PETSc` library can use the following syntax.

``` {.bash}
  $ spack load petsc
```

If a user wishes to unload the `PETSc` library from their environment, they can use the `spack unload` command.

``` {.bash}
  $ spack unload petsc
```

If a user wishes to unload all the loaded libraries from their user environment, please use the following command.

``` {.bash}
  $ spack unload
```

### How to view the list of loaded packages?

Users can use the following command to find the list of currently loaded packages.

``` {.bash}
  $ spack find --loaded
```

### How do I check the version of the package installed?

Users can type `spack find <package name>` to find the version of the package installed. Note that the package version is shown after `@` in the output.

### After submitting a job, I am getting messages like "spack: command not found". Why am I getting this message? 

Spack is sourced by the default shell `/bin/bash`. You may get this message if you have changed the shell to something other than `bash`. We request you to change the shell back to `bash` for optimal functioning. Users can use the `chsh` shell command to change their user shell environment back to `bash`. Another reason could be due to the unavailability of the desired package.
