---
sidebar_position: 4
sidebar_label: "Files and Directories"
hide_table_of_contents: true
hide_title: true
pagination_next : null
pagination_prev : null
---

## Files and Directories

### How to find the last modification date of a file?

Users can use the `stat` command to get the detailed status of a file. For example, if a user has a file called `example.txt`, then the `stat` command can be invoked as

``` {.bash}
$ stat example.txt
```

The output will be:

``` {.bash}
File: example.txt
Size: 0 Blocks: 1 IO Block: 4194304 regular empty file
Device: f96638d6h/4184226006d Inode: 144115339825778942  Links: 1
Access: (0600/-rw-------) Uid: ( 1000/ nischay) Gid: ( 1000/ nischay)
Access: 2020-08-18 23:21:06.000000000 +0530
Modify: 2020-08-18 23:21:06.000000000 +0530
Change: 2020-08-18 23:21:06.000000000 +0530
```

### How to find the deletion date of a file stored in `SCRATCH`?

#### Using `date`

The file deletion date of a file can be obtained using the command `date`. For example, if we want to know the deletion date of the file `example.txt`, please type the following command 

``` {.bash}
$ date -d "2020-08-18 23:21:06.000000000 +0530 +15days"
```

Here, `2020-08-18 23:21:06.000000000 +0530` is the access time of the file, obtained using the `stat` command as shown earlier. Since the files stores in `$SCRATCH` are automatically deleted after $15$ days from its last modification, we need to add `+15days` to the access time. The output of the above command will be:

``` {.bash}
Wed Sep  2 23:21:06 IST 2020
```

#### Using `usertools`

Alternatively, users can use the `usertools` command to get the access time and also the time left before deletion with one single command. Please note that `usertools` is **not** a standard linux command but developed by us to obtain the status of files with ease.

``` {.bash}
$ usertools file access example.txt
```

``` {.bash}
Filename: example.txt
Access Time: 2020-08-18 23:21:06.100206
Time Left: 359 hours 59 minutes 52 seconds.
```

### How to copy files or directories from my computer to the HPC cluster?

Users of Linux, Windows 10 (1803 and above) and macOS can copy files using `scp` utility. The following commands illustrate copying a file `example.txt` and a directory `test` from a user's personal machine to the HPC facility.

``` {.bash}
$ scp example.txt <user>@hpc.bits-hyderabad.ac.in:
```

Here `<user>` is the `username` of the account to access the facility. Please note the **:** (colon) after the domain name. By default, if no path is specified after the colon, the file is copied into the `$HOME` directory of the user. Similarly, to copy a directory, `-r` flag is used along with `scp`.

``` {.bash}
$ scp -r test <user>@hpc.bits-hyderabad.ac.in:
```

Alternatively, the above two commands can be merged into a single command.

``` {.bash}
$ scp -r example.txt test <user>@hpc.bits-hyderabad.ac.in:
```

Users of `macOS` and `Linux` can use the `rsync` utility, which offers faster resumable transfers.

``` {.bash}
$ rsync -avz --progress test <user>@hpc.bits-hyderabad.ac.in:
```

Here,

-   `-a` represents archival mode of transfer, which preserves metadata
    of the file.

-   `-v` represents verbose mode.

-   `-z` represents compression mode, which compresses the data during
    the transfer and thus improves the transfer rate.

-   `--progress` shows the progress of the transfer.

### How to copy files or directories from HPC cluster to my computer?

Users can copy a file or directory from the HPC cluster to their machine by using the `scp` command. For example, if a user wishes to transfer a file `example.txt` and a directory `test` stored in `\home\<user>\result` directory, then the following commands can be used.

``` {.bash}
$ scp <user>@hpc.bits-hyderabad.ac.in:\home\<user>\result\example.txt .
```

``` {.bash}
$ scp -r <user>@hpc.bits-hyderabad.ac.in:\home\<user>\result\test .
```

Here `<user>` is the `username` of the account to access the facility. Please note the **.** (dot symbol) at the end of the command. The above commands copy `example.txt` and `test` into the current directory of the user's terminal on their local machine. For more information on `scp` and `rsync`, users can refer to the `manpages` for the utilities. The manual pages of these commands can be accessed using `man scp` and `man rsync`.

### How to access my \$HOME directory? 

Users can access their `$HOME` directory by typing `cd $HOME` in a terminal on Sharanga. Note that the home directory of a user is accessible only to that particular user and cannot be viewed or accessed by others in the cluster.

### How to access my \$SCRATCH space? 

Users can access their `$SCRATCH` space by typing `cd $SCRATCH` in a terminal on Sharanga. Note that the scratch space of a user is accessible only to that particular user and cannot be viewed or accessed by others in the cluster.

### SCP file transfer is very slow. Is it possible to speed it up?

Users are advised to use `rsync` with `-avz` flags for compressible and resumable file transfers.

