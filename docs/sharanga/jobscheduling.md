Job Scheduling using Slurm
==========================

What is Slurm?
--------------

Slurm is an open source, fault-tolerant, and highly scalable cluster
management and job scheduling system for clusters. It facilitates the
execution of parallel jobs on the cluster in an efficient manner. For
more information on Slurm, users are requested to visit [Slurm Workload
Manager - Documentation](https://slurm.schedmd.com/documentation.html).

What are the frequently used commands for Slurm?
------------------------------------------------

Here is the list of frequently used commands. For more information,
users are requested to refer [Slurm Workload Manager -
Documentation](https://slurm.schedmd.com/documentation.html).

-   **salloc** - To allocate resources to a Slurm job with a possible
    set of constraints.

-   **sbatch** - Submits a Slurm job script.

-   **scancel** - Cancels a Slurm job.

-   **scontrol** - To query information and manage jobs.

-   **sinfo** - To retrieve information about partitions and nodes.

-   **squeue** - To query the list of pending and running jobs.

-   **srun** - To run a parallel job on the cluster managed by Slurm.

How to schedule a distributed memory CPU parallel job on Slurm? 
---------------------------------------------------------------

Users can use the `sbatch` command provided by Slurm to submit a job
script. Note that, for loading the required packages one can use either
`Modulefiles` or `Spack`. In the following we have shown example job
scripts using `Modulefiles` and `Spack`.

### Example of a job script `job.sh` using Modulefiles

``` {.bash linenos=""}
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
   module load openmpi-3.1.6-gcc-9.3.0
   module load parmetis-4.0.3-gcc-9.3.0
   module load openblas-0.3.10-gcc-9.3.0
   module load hdf5-1.10.6-gcc-9.3.0
   module load petsc-3.13.1-gcc-9.3.0
   srun ./execname
```

To submit the above job script use the following command.

``` {.bash}
   $ sbatch job.sh
```

If you wish to test your job script and want to find when it is
estimated to run, please run

``` {.bash}
   $ sbatch --test-only job.sh
```

Note that this does not actually submit the job. A detailed explanation
for each code snippet of the job script `job.sh` is given below.

``` {.bash linenos=""}
   #!/bin/bash
```

This is the standard convention to let the linux shell know what
interpreter to run.

``` {.bash linenos="" startFrom="last"}
   #SBATCH -p compute
   #SBATCH -N 1
   #SBATCH -n 4
```

Configuration variables for Slurm start with `SBATCH`.

-   `-p` refers to the partition to be used by Slurm. Sharanga provides
    two partitions, namely, `compute` and `gpu`. For jobs to be executed
    exclusively on CPUs, we use the `compute` partition.

-   `-N` represents the number of nodes to be used. In the present
    example, we are using $1$ node.

-   `-n` represents the number of tasks to be executed. For codes
    employing distributed parallelism, users are requested to specify
    the number of tasks as the number of compute cores required.

``` {.bash linenos="" startFrom="last"}
   #SBATCH --mem 512M
   #SBATCH -t 4-2:23 # time (D-HH:MM)
   #SBATCH --job-name="hello_test"
```

-   `--mem` represents the maximum amount of required memory. Here, we
    are requesting $512$ Megabytes of memory. Note that Slurm
    prioritises lower memory jobs over higher memory jobs in the queue.
    This may result in delayed execution of higher memory jobs.
    Therefore, users are requested to give accurate and desirable memory
    limits.

-   `-t` represents the maximum wall clock time the job requires. Here,
    we are requesting $4$ days, $2$ hours and $23$ minutes. Slurm
    prioritises shorter time limit jobs over longer time limit jobs in
    the queue. This may result in delayed execution of longer time limit
    jobs. Therefore, users are requested to give accurate and desirable
    time limits. Note that setting values greater than $168$ hours will
    result in the termination of the job by Slurm automatically.

-   `--job-name` represents the name of the job.

``` {.bash linenos="" startFrom="last"}
   #SBATCH -o slurm.%j.out
   #SBATCH -e slurm.%j.err
```

-   `-o` represents `stdout`.

-   `-e` represents `stderr`.

We are instructing Slurm to redirect `stdout` and `stderr` of the
executed application to disk. For example, if your `jobid` is $121$,
then `slurm.121.out` would contain the normal output of the application,
while `slurm.121.err` would contain the error output of the application.
These files will be stored in the directory, where the jobs were
launched from.

``` {.bash linenos="" startFrom="last"}
   #SBATCH --mail-user=<username>@hyderabad.bits-pilani.ac.in
   #SBATCH --mail-type=ALL
```

-   `–mail-user` represents the email address to which job events are to
    be delivered.

-   `–mail-type` represents the type of events to be logged. Valid type
    values are NONE, BEGIN, END, FAIL, REQUEUE, ALL (equivalent to
    BEGIN, END, FAIL, REQUEUE, and STAGE\_OUT), STAGE\_OUT (burst buffer
    stage out and teardown completed), TIME\_LIMIT, TIME\_LIMIT\_90
    (reached 90 percent of time limit), TIME\_LIMIT\_80 (reached 80
    percent of time limit) and TIME\_LIMIT\_50 (reached 50 percent of
    time limit). Here, we have specified the event type to be `ALL`.

``` {.bash linenos="" startFrom="last"}
   module load openmpi-3.1.6-gcc-9.3.0
   module load parmetis-4.0.3-gcc-9.3.0
   module load openblas-0.3.10-gcc-9.3.0
   module load hdf5-1.10.6-gcc-9.3.0
   module load petsc-3.13.1-gcc-9.3.0
```

We are using Modulefiles to set the environment needed to run our
application. The example application depends on `PETSc` and also has
transitive dependencies `OpenMPI`, `ParMETIS`, `OpenBLAS` and `HDF5`. We
are using `GCC 9.3.0` compiled libraries for the application.

``` {.bash linenos="" startFrom="last"}
   srun ./execname
```

Finally, we are using `srun` to start the execution of the application.
This is somewhat analogous to `mpirun`. Users are requested **not** to
use `mpirun` and instead use `srun`. `srun` takes care of the allocation
and efficient management of resources via Slurm automatically.

### Example of a job script `job.sh` using Spack

``` {.bash linenos=""}
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
   spack load petsc@3.13.1%gcc@9.3.0
   srun ./execname
```

To submit the above job script use the following command.

``` {.bash}
   $ sbatch job.sh
```

If you wish to test your job script and want to find when it is
estimated to run, please run

``` {.bash}
   $ sbatch --test-only job.sh
```

Note that this does not actually submit the job. A detailed explanation
for each code snippet of the job script `job.sh` is given below.

``` {.bash linenos=""}
   #!/bin/bash
```

This is the standard convention to let the linux shell know what
interpreter to run.

``` {.bash linenos="" startFrom="last"}
   #SBATCH -p compute
   #SBATCH -N 1
   #SBATCH -n 4
```

Configuration variables for Slurm start with `SBATCH`.

-   `-p` refers to the partition to be used by Slurm. Sharanga provides
    two partitions, namely, `compute` and `gpu`. For jobs to be executed
    exclusively on CPUs, we use the `compute` partition.

-   `-N` represents the number of nodes to be used. In the present
    example, we are using $1$ node.

-   `-n` represents the number of tasks to be executed. For codes
    employing distributed parallelism, users are requested to specify
    the number of tasks as the number of compute cores required.

``` {.bash linenos="" startFrom="last"}
   #SBATCH --mem 512M
   #SBATCH -t 4-2:23 # time (D-HH:MM)
   #SBATCH --job-name="hello_test"
```

-   `--mem` represents the maximum amount of required memory. Here, we
    are requesting $512$ Megabytes of memory. Note that Slurm
    prioritises lower memory jobs over higher memory jobs in the queue.
    This may result in delayed execution of higher memory jobs.
    Therefore, users are requested to give accurate and desirable memory
    limits.

-   `-t` represents the maximum wall clock time the job requires. Here,
    we are requesting $4$ days, $2$ hours and $23$ minutes. Slurm
    prioritises shorter time limit jobs over longer time limit jobs in
    the queue. This may result in delayed execution of longer time limit
    jobs. Therefore, users are requested to give accurate and desirable
    time limits. Note that setting values greater than $168$ hours will
    result in the termination of the job by Slurm automatically.

-   `--job-name` represents the name of the job.

``` {.bash linenos="" startFrom="last"}
   #SBATCH -o slurm.%j.out
   #SBATCH -e slurm.%j.err
```

-   `-o` represents `stdout`.

-   `-e` represents `stderr`.

We are instructing Slurm to redirect `stdout` and `stderr` of the
executed application to disk. For example, if your `jobid` is $121$,
then `slurm.121.out` would contain the normal output of the application,
while `slurm.121.err` would contain the error output of the application.
These files will be stored in the directory, where the jobs were
launched from.

``` {.bash linenos="" startFrom="last"}
   #SBATCH --mail-user=<username>@hyderabad.bits-pilani.ac.in
   #SBATCH --mail-type=ALL
```

-   `–mail-user` represents the email address to which job events are to
    be delivered.

-   `–mail-type` represents the type of events to be logged. Valid type
    values are NONE, BEGIN, END, FAIL, REQUEUE, ALL (equivalent to
    BEGIN, END, FAIL, REQUEUE, and STAGE\_OUT), STAGE\_OUT (burst buffer
    stage out and teardown completed), TIME\_LIMIT, TIME\_LIMIT\_90
    (reached 90 percent of time limit), TIME\_LIMIT\_80 (reached 80
    percent of time limit) and TIME\_LIMIT\_50 (reached 50 percent of
    time limit). Here, we have specified the event type to be `ALL`.

``` {.bash linenos="" startFrom="last"}
   spack load petsc@3.13.1%gcc@9.3.0
```

We are using Spack to set the environment needed to run our application.
Our example application depends on `PetSc` and has transitive
dependencies `OpenMPI`, `ParMETIS`, `OpenBLAS` and `HDF5`. We are using
`gcc 9.3.0` compiled libraries for our application. An advantage of
Spack over Modulefiles is that Spack handles all the dependencies
automatically in one single command.

``` {.bash linenos="" startFrom="last"}
   srun ./execname
```

Finally, we are using `srun` to start the execution of the application.
This is somewhat analogous to `mpirun`. Users are requested **not** to
use `mpirun` and instead use `srun`. `srun` takes care of the allocation
and efficient management of resources via Slurm automatically.

How to schedule a shared memory CPU parallel job on Slurm? 
----------------------------------------------------------

Users can use the `sbatch` command provided by Slurm to submit a job
script. Note that, for loading the required packages one can use either
`Modulefiles` or `Spack`. In the following we have shown example job
scripts using `Modulefiles` and `Spack`.

### Example of a job script `job.sh` using Modulefiles

``` {.bash linenos=""}
   #!/bin/bash
   #SBATCH -p compute
   #SBATCH -N 1
   #SBATCH -c 4
   #SBATCH --mem 512M
   #SBATCH -t 4-2:23 # time (D-HH:MM)
   #SBATCH --job-name="hello_test"
   #SBATCH -o slurm.%j.out
   #SBATCH -e slurm.%j.err
   #SBATCH --mail-user=<username>@hyderabad.bits-pilani.ac.in
   #SBATCH --mail-type=ALL
   export OMP_NUM_THREADS=${SLURM_CPUS_PER_TASK}
   module load openmpi-3.1.6-gcc-9.3.0
   module load parmetis-4.0.3-gcc-9.3.0
   module load openblas-0.3.10-gcc-9.3.0
   module load hdf5-1.10.6-gcc-9.3.0
   module load petsc-3.13.1-gcc-9.3.0
   srun ./execname
```

To submit the above job script use the following command.

``` {.bash}
   $ sbatch job.sh
```

If you wish to test your job script and want to find when it is
estimated to run, please run

``` {.bash}
   $ sbatch --test-only job.sh
```

Note that this does not actually submit the job. A detailed explanation
for each code snippet of the job script `job.sh` is given below.

``` {.bash linenos=""}
   #!/bin/bash
```

This is the standard convention to let the linux shell know what
interpreter to run.

``` {.bash linenos="" startFrom="last"}
   #SBATCH -p compute
   #SBATCH -N 1
   #SBATCH -c 4
```

Configuration variables for Slurm start with `SBATCH`.

-   `-p` refers to the partition to be used by Slurm. Sharanga provides
    two partitions, namely, `compute` and `gpu`. For jobs to be executed
    exclusively on CPUs, we use the `compute` partition.

-   `-N` represents the number of nodes to be used. In the present
    example, we are using $1$ node. Note that in pure `OpenMP`
    implementations, the number of nodes is always set to $1$. However,
    if you are using hybrid parallel models such as `MPI+OpenMP`, then
    the number of nodes can be more than one.

-   `-c` represents the number of CPUs per task. For codes employing
    shared memory parallelism, users are requested to specify the number
    of threads as the number of compute cores required.

``` {.bash linenos="" startFrom="last"}
   #SBATCH --mem 512M
   #SBATCH -t 4-2:23 # time (D-HH:MM)
   #SBATCH --job-name="hello_test"
```

-   `--mem` represents the maximum amount of required memory. Here, we
    are requesting $512$ Megabytes of memory. Note that Slurm
    prioritises lower memory jobs over higher memory jobs in the queue.
    This may result in delayed execution of higher memory jobs.
    Therefore, users are requested to give accurate and desirable memory
    limits.

-   `-t` represents the maximum wall clock time the job requires. Here,
    we are requesting $4$ days, $2$ hours and $23$ minutes. Slurm
    prioritises shorter time limit jobs over longer time limit jobs in
    the queue. This may result in delayed execution of longer time limit
    jobs. Therefore, users are requested to give accurate and desirable
    time limits. Note that setting values greater than $168$ hours will
    result in the termination of the job by Slurm automatically.

-   `--job-name` represents the name of the job.

``` {.bash linenos="" startFrom="last"}
   #SBATCH -o slurm.%j.out
   #SBATCH -e slurm.%j.err
```

-   `-o` represents `stdout`.

-   `-e` represents `stderr`.

We are instructing Slurm to redirect `stdout` and `stderr` of the
executed application to disk. For example, if your `jobid` is $121$,
then `slurm.121.out` would contain the normal output of the application,
while `slurm.121.err` would contain the error output of the application.
These files will be stored in the directory, where the jobs were
launched from.

``` {.bash linenos="" startFrom="last"}
   #SBATCH --mail-user=<username>@hyderabad.bits-pilani.ac.in
   #SBATCH --mail-type=ALL
```

-   `–mail-user` represents the email address to which job events are to
    be delivered.

-   `–mail-type` represents the type of events to be logged. Valid type
    values are NONE, BEGIN, END, FAIL, REQUEUE, ALL (equivalent to
    BEGIN, END, FAIL, REQUEUE, and STAGE\_OUT), STAGE\_OUT (burst buffer
    stage out and teardown completed), TIME\_LIMIT, TIME\_LIMIT\_90
    (reached 90 percent of time limit), TIME\_LIMIT\_80 (reached 80
    percent of time limit) and TIME\_LIMIT\_50 (reached 50 percent of
    time limit). Here, we have specified the event type to be `ALL`.

``` {.bash linenos="" startFrom="last"}
   export OMP_NUM_THREADS=${SLURM_CPUS_PER_TASK}
```

The above command sets the environment variable `$OMP_NUM_THREADS`,
which specifies the number of threads to be used in parallel regions of
the `OPENMP` code. Here, `$SLURM_CPUS_PER_TASK` is a Slurm defined
variable that is automatically set to the value of `-c` directive.

``` {.bash linenos="" startFrom="last"}
   module load openmpi-3.1.6-gcc-9.3.0
   module load parmetis-4.0.3-gcc-9.3.0
   module load openblas-0.3.10-gcc-9.3.0
   module load hdf5-1.10.6-gcc-9.3.0
   module load petsc-3.13.1-gcc-9.3.0
```

We are using Modulefiles to set the environment needed to run our
application. The example application depends on `PETSc` and also has
transitive dependencies `OpenMPI`, `ParMETIS`, `OpenBLAS` and `HDF5`. We
are using `gcc 9.3.0` compiled libraries for the application.

``` {.bash linenos="" startFrom="last"}
   srun ./execname
```

Finally, we are using `srun` to start the execution of the application.
This is somewhat analogous to `mpirun`. Users are requested **not** to
use `mpirun` and instead use `srun`. `srun` takes care of the allocation
and efficient management of resources via Slurm automatically.

### Example of a job script `job.sh` using Spack

``` {.bash linenos=""}
   #!/bin/bash
   #SBATCH -p compute
   #SBATCH -N 1
   #SBATCH -c 4
   #SBATCH --mem 512M
   #SBATCH -t 4-2:23 # time (D-HH:MM)
   #SBATCH --job-name="hello_test"
   #SBATCH -o slurm.%j.out
   #SBATCH -e slurm.%j.err
   #SBATCH --mail-user=<username>@hyderabad.bits-pilani.ac.in
   #SBATCH --mail-type=ALL
   export OMP_NUM_THREADS=${SLURM_CPUS_PER_TASK}
   spack load petsc@3.13.1%gcc@9.3.0
   srun ./execname
```

To submit the above job script use the following command.

``` {.bash}
   $ sbatch job.sh
```

If you wish to test your job script and want to find when it is
estimated to run, please run

``` {.bash}
   $ sbatch --test-only job.sh
```

Note that this does not actually submit the job. A detailed explanation
for each code snippet of the job script `job.sh` is given below.

``` {.bash linenos=""}
   #!/bin/bash
```

This is the standard convention to let the linux shell know what
interpreter to run.

``` {.bash linenos="" startFrom="last"}
   #SBATCH -p compute
   #SBATCH -N 1
   #SBATCH -c 4
```

Configuration variables for Slurm start with `SBATCH`.

-   `-p` refers to the partition to be used by Slurm. Sharanga provides
    two partitions, namely, `compute` and `gpu`. For jobs to be executed
    exclusively on CPUs, we use the `compute` partition.

-   `-N` represents the number of nodes to be used. In the present
    example, we are using $1$ node. Note that in pure `OpenMP`
    implementations, the number of nodes is always set to $1$. However,
    if you are using hybrid parallel models such as `MPI+OpenMP`, then
    the number of nodes can be more than one.

-   `-c` represents the number of CPUs per task. For codes employing
    shared memory parallelism, users are requested to specify the number
    of threads as the number of compute cores required.

``` {.bash linenos="" startFrom="last"}
   #SBATCH --mem 512M
   #SBATCH -t 4-2:23 # time (D-HH:MM)
   #SBATCH --job-name="hello_test"
```

-   `--mem` represents the maximum amount of required memory. Here, we
    are requesting $512$ Megabytes of memory. Note that Slurm
    prioritises lower memory jobs over higher memory jobs in the queue.
    This may result in delayed execution of higher memory jobs.
    Therefore, users are requested to give accurate and desirable memory
    limits.

-   `-t` represents the maximum wall clock time the job requires. Here,
    we are requesting $4$ days, $2$ hours and $23$ minutes. Slurm
    prioritises shorter time limit jobs over longer time limit jobs in
    the queue. This may result in delayed execution of longer time limit
    jobs. Therefore, users are requested to give accurate and desirable
    time limits. Note that setting values greater than $168$ hours will
    result in the termination of the job by Slurm automatically.

-   `--job-name` represents the name of the job.

``` {.bash linenos="" startFrom="last"}
   #SBATCH -o slurm.%j.out
   #SBATCH -e slurm.%j.err
```

-   `-o` represents `stdout`.

-   `-e` represents `stderr`.

We are instructing Slurm to redirect `stdout` and `stderr` of the
executed application to disk. For example, if your `jobid` is $121$,
then `slurm.121.out` would contain the normal output of the application,
while `slurm.121.err` would contain the error output of the application.
These files will be stored in the directory, where the jobs were
launched from.

``` {.bash linenos="" startFrom="last"}
   #SBATCH --mail-user=<username>@hyderabad.bits-pilani.ac.in
   #SBATCH --mail-type=ALL
```

-   `–mail-user` represents the email address to which job events are to
    be delivered.

-   `–mail-type` represents the type of events to be logged. Valid type
    values are NONE, BEGIN, END, FAIL, REQUEUE, ALL (equivalent to
    BEGIN, END, FAIL, REQUEUE, and STAGE\_OUT), STAGE\_OUT (burst buffer
    stage out and teardown completed), TIME\_LIMIT, TIME\_LIMIT\_90
    (reached 90 percent of time limit), TIME\_LIMIT\_80 (reached 80
    percent of time limit) and TIME\_LIMIT\_50 (reached 50 percent of
    time limit). Here, we have specified the event type to be `ALL`.

``` {.bash linenos="" startFrom="last"}
   export OMP_NUM_THREADS=${SLURM_CPUS_PER_TASK}
```

The above command sets the environment variable `$OMP_NUM_THREADS`,
which specifies the number of threads to be used in parallel regions of
the `OPENMP` code. Here, `$SLURM_CPUS_PER_TASK` is a Slurm defined
variable that is automatically set to the value of `-c` directive.

``` {.bash linenos="" startFrom="last"}
   spack load petsc@3.13.1%gcc@9.3.0
```

We are using Spack to set the environment needed to run our application.
Our example application depends on `PetSc` and has transitive
dependencies `OpenMPI`, `ParMETIS`, `OpenBLAS` and `HDF5`. We are using
`gcc 9.3.0` compiled libraries for our application. An advantage of
Spack over Modulefiles is that Spack handles all the dependencies
automatically in one single command.

``` {.bash linenos="" startFrom="last"}
   srun ./execname
```

Finally, we are using `srun` to start the execution of the application.
This is somewhat analogous to `mpirun`. Users are requested **not** to
use `mpirun` and instead use `srun`. `srun` takes care of the allocation
and efficient management of resources via Slurm automatically.

How to schedule a GPU parallel job on Slurm?
--------------------------------------------

Users can use the `sbatch` command provided by Slurm to submit a job
script. Note that, for loading the required packages one can use either
`Modulefiles` or `Spack`. In the following we have shown example job
scripts using `Modulefiles` and `Spack`.

### Example of a job script using Modulefiles

``` {.bash linenos=""}
   #!/bin/bash
   #SBATCH -p gpu
   #SBATCH -N 1
   #SBATCH -n 1
   #SBATCH --mem 512M
   #SBATCH -t 0-4:51 # time (D-HH:MM)
   #SBATCH --job-name="hello_test"
   #SBATCH -o slurm.%j.out
   #SBATCH -e slurm.%j.err
   #SBATCH --gres=gpu:1
   #SBATCH --mail-user=<username>@hyderabad.bits-pilani.ac.in
   #SBATCH --mail-type=ALL
   module load cuda-11.0.2
   srun ./execname
```

To submit the above job script use the following command.

``` {.bash}
   $ sbatch job.sh
```

If you wish to test your job script and want to find when it is
estimated to run, please run

``` {.bash}
   $ sbatch --test-only job.sh
```

Note that this does not actually submit the job. A detailed explanation
for each code snippet of the job script `job.sh` is given below.

``` {.bash linenos=""}
   #!/bin/bash
```

This is the standard convention to let the linux shell know what
interpreter to run.

``` {.bash linenos="" startFrom="last"}
   #SBATCH -p gpu
   #SBATCH -N 1
   #SBATCH -n 1
```

Configuration variables for Slurm start with `SBATCH`.

-   `-p` refers to the partition to be used by Slurm. Sharanga provides
    two partitions, namely, `compute` and `gpu`. For jobs to be executed
    exclusively on GPUs, we use the `gpu` partition.

-   `-N` represents the number of nodes to be used. In the present
    example, we are using $1$ node. Note that, at present, Sharanga has
    provision for only one GPU node.

-   `-n` represents the number of tasks to be executed. For codes
    employing distributed parallelism such as GPGPUs or hybrid parallel
    models based on CPUs and GPUs, users are requested to specify the
    number of tasks as the number of compute cores required. In the
    present example, $n$ is set to $1$.

``` {.bash linenos="" startFrom="last"}
   #SBATCH --mem 512M
   #SBATCH -t 0-4:51 # time (D-HH:MM)
   #SBATCH --job-name="hello_test"
```

-   `--mem` represents the maximum amount of required memory. Here, we
    are requesting $512$ Megabytes of memory. Note that Slurm
    prioritises lower memory jobs over higher memory jobs in the queue.
    This may result in delayed execution of higher memory jobs.
    Therefore, users are requested to give accurate and desirable memory
    limits.

-   `-t` represents the maximum wall clock time the job requires. Here,
    we are requesting $0$ days, $4$ hours and $51$ minutes. Slurm
    prioritises shorter time limit jobs over longer time limit jobs in
    the queue. This may result in delayed execution of longer time limit
    jobs. Therefore, users are requested to give accurate and desirable
    time limits. Note that setting values greater than $24$ hours will
    result in the termination of the job by Slurm automatically.

-   `--job-name` represents the name of the job.

``` {.bash linenos="" startFrom="last"}
   #SBATCH -o slurm.%j.out
   #SBATCH -e slurm.%j.err
```

-   `-o` represents `stdout`.

-   `-e` represents `stderr`.

We are instructing Slurm to redirect `stdout` and `stderr` of the
executed application to disk. For example, if your `jobid` is $121$,
then `slurm.121.out` would contain the normal output of the application,
while `slurm.121.err` would contain the error output of the application.
These files will be stored in the directory, where the jobs were
launched from.

``` {.bash linenos="" startFrom="last"}
   #SBATCH --gres=gpu:1
```

-   `-gres` represents `generic resource`. Here, we are informing Slurm
    that our job requires $1$ GPU card of any type.

We are instructing Slurm to redirect `stdout` and `stderr` of the
executed application to disk. For example, if your `jobid` is $121$,
then `slurm.121.out` would contain the normal output of the application,
while `slurm.121.err` would contain the error output of the application.
These files will be stored in the directory, where the jobs were
launched from.

``` {.bash linenos="" startFrom="last"}
   #SBATCH --mail-user=<username>@hyderabad.bits-pilani.ac.in
   #SBATCH --mail-type=ALL
```

-   `–mail-user` represents the email address to which job events are to
    be delivered.

-   `–mail-type` represents the type of events to be logged. Valid type
    values are NONE, BEGIN, END, FAIL, REQUEUE, ALL (equivalent to
    BEGIN, END, FAIL, REQUEUE, and STAGE\_OUT), STAGE\_OUT (burst buffer
    stage out and teardown completed), TIME\_LIMIT, TIME\_LIMIT\_90
    (reached 90 percent of time limit), TIME\_LIMIT\_80 (reached 80
    percent of time limit) and TIME\_LIMIT\_50 (reached 50 percent of
    time limit). Here, we have specified the event type to be `ALL`.

``` {.bash linenos="" startFrom="last"}
   module load cuda-11.0.2
```

We are using Modulefiles to set the environment needed to run our
application. The example application depends on `CUDA`, which is an
Nvidia framework for allowing users to utilise GPUs.

``` {.bash linenos="" startFrom="last"}
   srun ./execname
```

Finally, we are using `srun` to start the execution of the application.
This is somewhat analogous to `mpirun`. Users are requested **not** to
use `mpirun` and instead use `srun`. `srun` takes care of the allocation
and efficient management of resources via Slurm automatically.

### Example of a job script using Spack

``` {.bash linenos=""}
   #!/bin/bash
   #SBATCH -p gpu
   #SBATCH -N 1
   #SBATCH -n 1
   #SBATCH --mem 512M
   #SBATCH -t 0-4:51 # time (D-HH:MM)
   #SBATCH --job-name="hello_test"
   #SBATCH -o slurm.%j.out
   #SBATCH -e slurm.%j.err
   #SBATCH --gres=gpu:1
   #SBATCH --mail-user=<username>@hyderabad.bits-pilani.ac.in
   #SBATCH --mail-type=ALL
   spack load cuda@11.0.2
   srun ./execname
```

To submit the above job script use the following command.

``` {.bash}
   $ sbatch job.sh
```

If you wish to test your job script and want to find when it is
estimated to run, please run

``` {.bash}
   $ sbatch --test-only job.sh
```

Note that this does not actually submit the job. A detailed explanation
for each code snippet of the job script `job.sh` is given below.

``` {.bash linenos=""}
   #!/bin/bash
```

This is the standard convention to let the linux shell know what
interpreter to run.

``` {.bash linenos="" startFrom="last"}
   #SBATCH -p gpu
   #SBATCH -N 1
   #SBATCH -n 1
```

Configuration variables for Slurm start with `SBATCH`.

-   `-p` refers to the partition to be used by Slurm. Sharanga provides
    two partitions, namely, `compute` and `gpu`. For jobs to be executed
    exclusively on GPUs, we use the `gpu` partition.

-   `-N` represents the number of nodes to be used. In the present
    example, we are using $1$ node. Note that, at present, Sharanga has
    provision for only one GPU node.

-   `-n` represents the number of tasks to be executed. For codes
    employing distributed parallelism such as GPGPUs or hybrid parallel
    models based on CPUs and GPUs, users are requested to specify the
    number of tasks as the number of compute cores required. In the
    present example, $n$ is set to $1$.

``` {.bash linenos="" startFrom="last"}
   #SBATCH --mem 512M
   #SBATCH -t 0-4:51 # time (D-HH:MM)
   #SBATCH --job-name="hello_test"
```

-   `--mem` represents the maximum amount of required memory. Here, we
    are requesting $512$ Megabytes of memory. Note that Slurm
    prioritises lower memory jobs over higher memory jobs in the queue.
    This may result in delayed execution of higher memory jobs.
    Therefore, users are requested to give accurate and desirable memory
    limits.

-   `-t` represents the maximum wall clock time the job requires. Here,
    we are requesting $0$ days, $4$ hours and $51$ minutes. Slurm
    prioritises shorter time limit jobs over longer time limit jobs in
    the queue. This may result in delayed execution of longer time limit
    jobs. Therefore, users are requested to give accurate and desirable
    time limits. Note that setting values greater than $24$ hours will
    result in the termination of the job by Slurm automatically.

-   `--job-name` represents the name of the job.

``` {.bash linenos="" startFrom="last"}
   #SBATCH -o slurm.%j.out
   #SBATCH -e slurm.%j.err
```

-   `-o` represents `stdout`.

-   `-e` represents `stderr`.

``` {.bash linenos="" startFrom="last"}
   #SBATCH --gres=gpu:1
```

-   `-gres` represents `generic resource`. Here, we are informing Slurm
    that our job requires $1$ GPU card of any type.

We are instructing Slurm to redirect `stdout` and `stderr` of the
executed application to disk. For example, if your `jobid` is $121$,
then `slurm.121.out` would contain the normal output of the application,
while `slurm.121.err` would contain the error output of the application.
These files will be stored in the directory, where the jobs were
launched from.

``` {.bash linenos="" startFrom="last"}
   #SBATCH --mail-user=<username>@hyderabad.bits-pilani.ac.in
   #SBATCH --mail-type=ALL
```

-   `–mail-user` represents the email address to which job events are to
    be delivered.

-   `–mail-type` represents the type of events to be logged. Valid type
    values are NONE, BEGIN, END, FAIL, REQUEUE, ALL (equivalent to
    BEGIN, END, FAIL, REQUEUE, and STAGE\_OUT), STAGE\_OUT (burst buffer
    stage out and teardown completed), TIME\_LIMIT, TIME\_LIMIT\_90
    (reached 90 percent of time limit), TIME\_LIMIT\_80 (reached 80
    percent of time limit) and TIME\_LIMIT\_50 (reached 50 percent of
    time limit). Here, we have specified the event type to be `ALL`.

``` {.bash linenos="" startFrom="last"}
   spack load cuda@11.0.2
```

We are using Spack to set the environment needed to run our application.
The example application depends on `CUDA`, which is an Nvidia framework
for allowing users to utilise GPUs.

``` {.bash linenos="" startFrom="last"}
   srun ./execname
```

Finally, we are using `srun` to start the execution of the application.
This is somewhat analogous to `mpirun`. Users are requested **not** to
use `mpirun` and instead use `srun`. `srun` takes care of the allocation
and efficient management of resources via Slurm automatically.

How to view the status of partitions? {#sinfo-partition}
-------------------------------------

Users can use the `sinfo` command to view the status of partitions and
nodes.

``` {.bash}
   $ sinfo
```

Alternatively, users can run `scontrol show partition` to know about
partitions and their limits.

``` {.bash}
   $ scontrol show partition
```

How to view my submitted jobs?
------------------------------

To view all the current jobs of a user, please type the following
command.

``` {.bash}
   $ squeue -u <username>
```

To view all the running jobs of a user, please type

``` {.bash}
   $ squeue -u <username> -t RUNNING
```

How to cancel my job?
---------------------

To cancel a particular job by its `jobid`, use the following command.

``` {.bash}
   $ scancel <jobid>
```

To cancel a job by its name, please type

``` {.bash}
   $ scancel --name <jobname>
```

To cancel all the jobs of a user

``` {.bash}
   $ scancel -u <username>
```

To cancel all the `PENDING` jobs of a user

``` {.bash}
   $ scancel -t PENDING -u <username>
```

How to control my job?
----------------------

To hold a job from being scheduled

``` {.bash}
   $ scontrol hold <jobid>
```

To release a job to be scheduled

``` {.bash}
   $ scontrol release <jobid>
```

To requeue (cancel or rerun) a job

``` {.bash}
   $ scontrol requeue <jobid>
```

For more information, users can use `man scontrol`, `man squeue`,
`man scancel`, etc.

Can I run my code for a few minutes on the login node?
------------------------------------------------------

Users are not authorized to run their codes on the login node. Codes
running on login nodes will be terminated automatically. Jobs **have**
to be submitted through the scheduler.

How can I monitor the output of my jobs that are running?
---------------------------------------------------------

Users can access the output and error logs generated by Slurm while
running their codes using the `tail` command. Users are strongly
recommended to use the example scripts given above as a base for their
job scripts. Job logs are written to the current directory, from which
the Slurm job was executed by `sbatch`.\
\
Please note that by default `sbatch` does not write the output logs. The
example provided above instructs Slurm to dump the output in the format
of `slurm.<jobid>.out`, where `<jobid>` is the job id of the slurm job.
Users can use the `tail` command with `-f` flag to view the output file
being written continuously by Slurm.\
\
For example, if a user has a job with the job id $121$, and would like
to view the job output, then use the following syntax.

``` {.bash}
   $ tail -f slurm.121.out
```

Alternatively, users can use `vi` or `nano` to view the output file
after the job is completed.

``` {.bash}
   $ vi slurm.121.out
   $ nano slurm.121.out
```

Can I run interactive jobs?
---------------------------

Yes, the facility provides users access to interactive job scheduling.
Users can use the `srun` command to setup an interactive session on the
nodes. Consider an example where a user wants to request 2 nodes with 64
cores per node.

``` {.bash}
   $ srun -N 2 -n 1 -c 128 -p compute --pty bash -i
```

Here, `-N` is the number of nodes to be used. `-n` is the number of
tasks (instances) to be executed. `-c` is the number of cores required
for the task. `-p` is the partition to be used. In the present example,
we chose the `compute` partition. `--pty bash` instructs Slurm to setup
a pseudo terminal in bash. `-i` tells Slurm to run this command in
interactive mode.

I have job scripts written for another job scheduler. Can I use them for Slurm?
-------------------------------------------------------------------------------

No, you cannot execute job scripts written for other job schedulers
using Slurm. But, the developers of Slurm have provided users with a
documentation containing the correspondences between the options of
several job schedulers. Users can access the documentation at this link.
[Rosetta stone of Workload
manager](https://slurm.schedmd.com/rosetta.pdf).

When is my job going to start to run?
-------------------------------------

To get an estimate of when your job is going to start, users can use the
`squeue` command.

``` {.bash}
   $ squeue --start -j <jobid>
```

Please note that your job might run before the scheduled start time as
jobs that have finished earlier than their requested walltime might free
up the queue and resources needed for your job.

Why is my job not running?
--------------------------

There are several reasons why your job is not running. Users can run the
`squeue` command to get the status and reason.

``` {.bash}
   $ squeue -j <jobid> -l
```

The `NODELIST(REASON)` section in the output of the above command will
have the reason, why Slurm is unable to run the job. Here are the most
common reasons.

### BadConstraints {#badconstraints .unnumbered}

The job's constraints can not be satisfied.

### Cleaning {#cleaning .unnumbered}

The job is being requeued and still cleaning up from its previous
execution.

### Dependency {#dependency .unnumbered}

This job is waiting for a dependent job to complete.

### JobHeldAdmin {#jobheldadmin .unnumbered}

The job is held by a system administrator. Please contact the system
administrator for more information.

### JobHeldUser {#jobhelduser .unnumbered}

The job is held by the user.

### NonZeroExitCode {#nonzeroexitcode .unnumbered}

The job terminated with a non-zero exit code.

### PartitionDown {#partitiondown .unnumbered}

The partition required by this job is in a DOWN state.

### Priority {#priority .unnumbered}

One or more higher priority jobs exist for this partition or advanced
reservation.

### QOSResourceLimit {#qosresourcelimit .unnumbered}

The job's Quality of Service (QOS) has reached some resource limit.

### ReqNodeNotAvail {#reqnodenotavail .unnumbered}

Some node specifically required by the job is not currently available.

### Resources {#resources .unnumbered}

The job is waiting for resources to become available.

### TimeLimit {#timelimit .unnumbered}

The job exhausted its time limit.
