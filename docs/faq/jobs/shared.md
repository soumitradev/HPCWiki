---
sidebar_position: 3
sidebar_label: "Shared CPU"
hide_table_of_contents: true
hide_title: true
pagination_next : null
pagination_prev : null
title: "Shared CPU"
---

## Job Scheduling for shared memory CPU
### How to schedule a shared memory CPU parallel job on Slurm? 

Users can use the `sbatch` command provided by Slurm to submit a job script. Note that, for loading the required packages one can use either `Modulefiles` or `Spack`. In the following we have shown example job scripts using `Modulefiles` and `Spack`.

#### Example of a job script `job.sh` using Modulefiles

```bash
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

```bash
$ sbatch job.sh
```

If you wish to test your job script and want to find when it is estimated to run, please run

```bash
$ sbatch --test-only job.sh
```

Note that this does not actually submit the job. A detailed explanation for each code snippet of the job script `job.sh` is given below.

```bash
#!/bin/bash
```

This is the standard convention to let the linux shell know what interpreter to run.

```bash
#SBATCH -p compute
#SBATCH -N 1
#SBATCH -c 4
```

Configuration variables for Slurm start with `SBATCH`.

-   `-p` refers to the partition to be used by Slurm. Sharanga provides
    two partitions, namely, `compute` and `gpu`. For jobs to be executed
    exclusively on CPUs, we use the `compute` partition.

-   `-N` represents the number of nodes to be used. In the present
    example, we are using 1 node. Note that in pure `OpenMP`
    implementations, the number of nodes is always set to 1. However,
    if you are using hybrid parallel models such as `MPI+OpenMP`, then
    the number of nodes can be more than one.

-   `-c` represents the number of CPUs per task. For codes employing
    shared memory parallelism, users are requested to specify the number
    of threads as the number of compute cores required.

```bash
#SBATCH --mem 512M
#SBATCH -t 4-2:23 # time (D-HH:MM)
#SBATCH --job-name="hello_test"
```

-   `--mem` represents the maximum amount of required memory. Here, we
    are requesting 512 Megabytes of memory. Note that Slurm
    prioritises lower memory jobs over higher memory jobs in the queue.
    This may result in delayed execution of higher memory jobs.
    Therefore, users are requested to give accurate and desirable memory
    limits.

-   `-t` represents the maximum wall clock time the job requires. Here,
    we are requesting 4 days, 2 hours and 23 minutes. Slurm
    prioritises shorter time limit jobs over longer time limit jobs in
    the queue. This may result in delayed execution of longer time limit
    jobs. Therefore, users are requested to give accurate and desirable
    time limits. Note that setting values greater than 168 hours will
    result in the termination of the job by Slurm automatically.

-   `--job-name` represents the name of the job.

```bash
#SBATCH -o slurm.%j.out
#SBATCH -e slurm.%j.err
```

-   `-o` represents `stdout`.

-   `-e` represents `stderr`.

We are instructing Slurm to redirect `stdout` and `stderr` of the executed application to disk. For example, if your `jobid` is 121, then `slurm.121.out` would contain the normal output of the application, while `slurm.121.err` would contain the error output of the application. These files will be stored in the directory, where the jobs were launched from.

```bash
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

```bash
export OMP_NUM_THREADS=${SLURM_CPUS_PER_TASK}
```

The above command sets the environment variable `$OMP_NUM_THREADS`, which specifies the number of threads to be used in parallel regions of the `OPENMP` code. Here, `$SLURM_CPUS_PER_TASK` is a Slurm defined variable that is automatically set to the value of `-c` directive.

```bash
module load openmpi-3.1.6-gcc-9.3.0
module load parmetis-4.0.3-gcc-9.3.0
module load openblas-0.3.10-gcc-9.3.0
module load hdf5-1.10.6-gcc-9.3.0
module load petsc-3.13.1-gcc-9.3.0
```

We are using Modulefiles to set the environment needed to run our application. The example application depends on `PETSc` and also has transitive dependencies `OpenMPI`, `ParMETIS`, `OpenBLAS` and `HDF5`. We are using `gcc 9.3.0` compiled libraries for the application.

```bash
srun ./execname
```

Finally, we are using `srun` to start the execution of the application. This is somewhat analogous to `mpirun`. Users are requested **not** to use `mpirun` and instead use `srun`. `srun` takes care of the allocation and efficient management of resources via Slurm automatically.

#### Example of a job script `job.sh` using Spack

```bash
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

```bash
$ sbatch job.sh
```

If you wish to test your job script and want to find when it is estimated to run, please run

```bash
$ sbatch --test-only job.sh
```

Note that this does not actually submit the job. A detailed explanation for each code snippet of the job script `job.sh` is given below.

```bash
#!/bin/bash
```

This is the standard convention to let the linux shell know what interpreter to run.

```bash
#SBATCH -p compute
#SBATCH -N 1
#SBATCH -c 4
```

Configuration variables for Slurm start with `SBATCH`.

-   `-p` refers to the partition to be used by Slurm. Sharanga provides
    two partitions, namely, `compute` and `gpu`. For jobs to be executed
    exclusively on CPUs, we use the `compute` partition.

-   `-N` represents the number of nodes to be used. In the present
    example, we are using 1 node. Note that in pure `OpenMP`
    implementations, the number of nodes is always set to 1. However,
    if you are using hybrid parallel models such as `MPI+OpenMP`, then
    the number of nodes can be more than one.

-   `-c` represents the number of CPUs per task. For codes employing
    shared memory parallelism, users are requested to specify the number
    of threads as the number of compute cores required.

```bash
#SBATCH --mem 512M
#SBATCH -t 4-2:23 # time (D-HH:MM)
#SBATCH --job-name="hello_test"
```

-   `--mem` represents the maximum amount of required memory. Here, we
    are requesting 512 Megabytes of memory. Note that Slurm
    prioritises lower memory jobs over higher memory jobs in the queue.
    This may result in delayed execution of higher memory jobs.
    Therefore, users are requested to give accurate and desirable memory
    limits.

-   `-t` represents the maximum wall clock time the job requires. Here,
    we are requesting 4 days, 2 hours and 23 minutes. Slurm
    prioritises shorter time limit jobs over longer time limit jobs in
    the queue. This may result in delayed execution of longer time limit
    jobs. Therefore, users are requested to give accurate and desirable
    time limits. Note that setting values greater than 168 hours will
    result in the termination of the job by Slurm automatically.

-   `--job-name` represents the name of the job.

```bash
#SBATCH -o slurm.%j.out
#SBATCH -e slurm.%j.err
```

-   `-o` represents `stdout`.

-   `-e` represents `stderr`.

We are instructing Slurm to redirect `stdout` and `stderr` of the executed application to disk. For example, if your `jobid` is 121, then `slurm.121.out` would contain the normal output of the application, while `slurm.121.err` would contain the error output of the application. These files will be stored in the directory, where the jobs were launched from.

```bash
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

```bash
export OMP_NUM_THREADS=${SLURM_CPUS_PER_TASK}
```

The above command sets the environment variable `$OMP_NUM_THREADS`, which specifies the number of threads to be used in parallel regions of the `OPENMP` code. Here, `$SLURM_CPUS_PER_TASK` is a Slurm defined variable that is automatically set to the value of `-c` directive.

```bash
spack load petsc@3.13.1%gcc@9.3.0
```

We are using Spack to set the environment needed to run our application. Our example application depends on `PetSc` and has transitive dependencies `OpenMPI`, `ParMETIS`, `OpenBLAS` and `HDF5`. We are using `gcc 9.3.0` compiled libraries for our application. An advantage of Spack over Modulefiles is that Spack handles all the dependencies automatically in one single command.

```bash
srun ./execname
```

Finally, we are using `srun` to start the execution of the application. This is somewhat analogous to `mpirun`. Users are requested **not** to use `mpirun` and instead use `srun`. `srun` takes care of the allocation and efficient management of resources via Slurm automatically.
