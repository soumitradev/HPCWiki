---
sidebar_position: 4
sidebar_label: "GPU Parallel Job"
hide_table_of_contents: true
hide_title: true
pagination_next : null
pagination_prev : null
---

## How to schedule a GPU parallel job on Slurm?

Users can use the `sbatch` command provided by Slurm to submit a job script. Note that, for loading the required packages one can use either `Modulefiles` or `Spack`. In the following we have shown example job scripts using `Modulefiles` and `Spack`.

#### Example of a job script using Modulefiles

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

If you wish to test your job script and want to find when it is estimated to run, please run

``` {.bash}
$ sbatch --test-only job.sh
```

Note that this does not actually submit the job. A detailed explanation for each code snippet of the job script `job.sh` is given below.

``` {.bash linenos=""}
   #!/bin/bash
```

This is the standard convention to let the linux shell know what interpreter to run.

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

#### Example of a job script using Spack

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

We are instructing Slurm to redirect `stdout` and `stderr` of the executed application to disk. For example, if your `jobid` is $121$, then `slurm.121.out` would contain the normal output of the application, while `slurm.121.err` would contain the error output of the application. These files will be stored in the directory where the jobs were launched from.

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

We are using Spack to set the environment needed to run our application. The example application depends on `CUDA`, which is an Nvidia framework for allowing users to utilise GPUs.

``` {.bash linenos="" startFrom="last"}
   srun ./execname
```

Finally, we are using `srun` to start the execution of the application. This is somewhat analogous to `mpirun`. Users are requested **not** to use `mpirun` and instead use `srun`. `srun` takes care of the allocation and efficient management of resources via Slurm automatically.
