---
sidebar_position: 3
---

Login and Accounts
==================

How to login to the HPC facility? 
---------------------------------

Users can securely access the HPC facility using the `ssh` protocol.

### On Windows: Using PuTTY

-   To launch PuTTY, go to `Start Menu -> All Programs -> PuTTY`.

-   When the program starts, a window titled **PuTTY configuration**
    should open.

-   Under **Connection** please expand **SSH**.

-   Select **Auth** and a new configuration pane should open on the
    left.

-   Under `Authentication Parameters`, you will find a **Browser**
    button. Click on it and select the file path of the Private SSH Key
    you generated.

-   Once the above process is completed, users can go back to
    **Session** Category. This window has a configuration pane on the
    right containing **Hostname (or IP address)** field.

-   Enter `hpc.bits-hyderabad.ac.in` in the **Hostname** field and click
    **Open**.

-   If this is the first time you are trying to login you might get a
    Security Alert. This is normal, and you should click **Yes**.

-   After the security alert, you should get a terminal window asking
    for username. Type the `username` provided to you by the HPC team to
    access the facility. If you have entered a `passphrase` for your ssh
    key pair, please type the password and press ENTER.

-   You should now be connected to the login node of the HPC facility.

Alternatively, users can click on the **Save** button in the Session
category to save the SSH configuration. Users can then quickly connect
to the login node by simply loading their saved configuration.

### On Windows: Using Windows 10 OpenSSH Client

If you have already generated an SSH key pair using the OpenSSH Client,
you can then directly access the login node by using the
`Command Prompt`.

-   Press `Windows Key + R` to open the Windows Run Prompt.

-   Type `cmd` and press ENTER.

-   Type `ssh <username>@hpc.bits-hyderabad.ac.in` in the console and
    press ENTER. Here, `<username>` is the `username` provided to you by
    the HPC team to access the facility. If you have entered a
    `passphrase` for your ssh key pair please type the password and
    press ENTER.

-   You should now be connected to the login node of the HPC facility.

### On macOS

Users are recommended to use the `Terminal` application to login using
`ssh`. It is located in the utilities, which can be accessed using the
Finder.

-   Open Terminal.

-   Type `ssh <username>@hpc.bits-hyderabad.ac.in` in the console and
    press ENTER. Here, `<username>` is the `username` provided to you by
    the HPC team to access the facility. If you have entered a
    `passphrase` for your ssh key pair please type the password and
    press ENTER.

-   You should now be connected to the login node of the HPC facility.

### On Linux

-   Open a Terminal or Console.

-   Type `ssh <username>@hpc.bits-hyderabad.ac.in` in the console and
    press ENTER. Here, `<username>` is the `username` provided to you by
    the HPC team to access the facility. If you have entered a
    `passphrase` for your ssh key pair please type the password and
    press ENTER.

-   You should now be connected to the login node of the HPC facility.

How do I add another SSH key to my account for remote acccess?
--------------------------------------------------------------

Users can add multiple SSH keys into their `authorized_keys` file of the
HPC facility.

-   Open a terminal in the HPC facility.

-   Using `nano` or `vi` open `~/.ssh/authorized_keys`.

-   Append the contents of the new public key at the end of the file.
    Please ensure that the entire content of the public key fits in one
    single line with no additional spaces in between. Note that, each
    line in this file represents $1$ ssh key pair.

-   Save the file and exit. You should now be able to connect from the
    newly added machine.

Note: You are requested to copy the **public** key of the key pair and
not the **private** key. Public key can be identified easily with the
**.pub** file extension at the end of the the filename. For example
`id_rsa.pub` refers to the public key and `id_rsa` refers to the private
key.

My ssh connection disconnects with "Write failed: Broken pipe\".
----------------------------------------------------------------

By default `ssh` enforces a maximum idle time after last input from
user. This is a security precaution to protect the account from
unauthorized access. A user can override this setting by configuring the
`KeepAlive` directive, as explained below.

### On Windows: Using PuTTY

-   Launch `PuTTY` from `Start Menu -> All Programs -> PuTTY`.

-   Select **Connection**.

-   In the configuration pane on the left you should find an option
    called `Seconds between keepalive`.

-   Enter in **seconds** the amount of time you would want as maximum
    idle time.

### On Windows: Using Windows 10 OpenSSH Client

-   Open a file editor, preferably `Notepad`.

-   Type the following text without the `$` symbol. Example shown is for
    300 seconds and users can change this value accordingly.

    ``` {.bash}
       $ Host *
          ServerAliveInterval 300
    ```

-   Save this file as **config** under
    `C:\Users\<your username>\.ssh\config`.

### Linux and macOS

-   Open a `Terminal`.

-   Using a file editor of your choice, type the following lines without
    the `$` symbol. Example shown is for 300 seconds and users can
    change this value accordingly.

    ``` {.bash}
       $ Host *
          ServerAliveInterval 300
    ```

-   Save this file as **config** under `~/.ssh/config`.

-   Make sure the file has **644** set as file system permission. If
    not, users can run `chmod 644 ~/.ssh/config` to set the file
    permissions.
