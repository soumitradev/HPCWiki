---
sidebar_position: 6
sidebar_label: "Wolfram Mathematica"
hide_table_of_contents: true
hide_title: true
pagination_next: null
pagination_prev: null
title: "Wolfram Mathematica"
draft: false
---

## Wolfram Mathematica

### What is Wolfram Mathematica?

Wolfram Mathematica is a commerical software technical computing. The software is widely used in the fields of mathematics, statistics, data manipulation and machine learning.

### Do I need a license to use Wolfram Mathematica?

Yes. Wolfram Mathematica is a commercial software and requires a license to use. We currently have a limited number of licenses available for use on the cluster. If you are interested in using Wolfram Mathematica, please contact the HPC team at hpc@hyderabad.bits-pilani.ac.in.

### How do I use Wolfram Mathematica?

Users with access to Wolfram Mathematica can find the path to the software by running the following command:

```bash
module load mathematica
```

This will load the Mathematica module, and provide the user access to the Mathematica binaries.

### Example of a single node GPU parallel job script for Wolfram Mathematica

```bash
#!/bin/bash
#SBATCH -p gpu
#SBATCH -N 1
#SBATCH -n 8
#SBATCH --mem 8G
#SBATCH -p gpu_a100_8
#SBATCH -t 0-4:51 # time (D-HH:MM)
#SBATCH --job-name="mathematica_test"
#SBATCH -o slurm.%j.out
#SBATCH -e slurm.%j.err
#SBATCH --gres=gpu:1
#SBATCH --mail-user=<username>@hyderabad.bits-pilani.ac.in
#SBATCH --mail-type=ALL

module load mathematica

math -run < mathematica_script.m
```

An example of a GPU parallel Mathematica script is given below

```
(* Get slot count and convert from string *)
Unprotect[$ProcessorCount];
$ProcessorCount = ToExpression[Environment["SLURM_CPUS_PER_TASK"]];
$ProcessorCount = $ProcessorCount - 1; (* Minus 1 for master process *)

Print["Processors: ", $ProcessorCount];

SetSystemOptions["ParallelOptions" -> "ParallelThreadNumber" -> $ProcessorCount];
SetSystemOptions["ParallelOptions" -> "MKLThreadNumber" -> $ProcessorCount];

LaunchKernels[$ProcessorCount];

Print["Kernels: ", $KernelCount];

Needs["CUDALink`"];
CUDAInformation[];

(* Generate random matrix *)
randM = RandomReal[1, {5000, 5000}];
Print["Size of Random Matrix: ", ByteCount[randM], " Bytes"];

(* Multiply Matrix (CPU) *)
Print["Multiplication Time: ", AbsoluteTiming[randM.randM;]];

(* Multiply Matrix (GPU) *)
Print["GPU Multiplication Time: ", AbsoluteTiming[CUDADot[randM, randM];]]

(* Load Matrix into GPU memory *)
randMG = CUDAMemoryLoad[randM]

(* Multiply Matrix (GPU in memory) *)
Print["GPU Multiplication Time (mem): ", AbsoluteTiming[CUDADot[randM, randM];]]
```

To submit the job, you would then run

```bash
sbatch job.sh
```

where job.sh is your job script (not the mathematica script).

For more details on submitting jobs to Sharanga, please refer to [Job Scheduling](https://sharanga.hpc.bits-hyderabad.ac.in/docs/faq/jobs/).

### How do I get assistance with Wolfram Mathematica?

We recommend that you first consult the Wolfram Mathematica documentation. There are also many other resources online with regards to using Wolfram Mathematica on a High Performance Computing Cluster. If you need further assistance, please contact the HPC team.
