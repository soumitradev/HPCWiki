**Basics**

[Install Ubuntu 20.04](https://towardsdatascience.com/how-to-dual-boot-windows-10-and-linux-ubuntu-20-04-lts-in-a-few-hassle-free-steps-f0e465c3aafd)

For any commands, use Terminal. Windows key - Search "Terminal". 
https://www.git-tower.com/blog/command-line-cheat-sheet/

Optional : Install [Sublime Text Editor](https://www.sublimetext.com/docs/linux_repositories.html)

Optional : [Install chrome](https://www.google.com/intl/en_us/chrome/) 

Download and installing via .deb file - 
```
dpkg -i package.deb
```

**SSH and VSCode**

First we get SSH access into the HPC system.

Check if SSH public key is ready else [make a key](https://schh.medium.com/ssh-for-dummies-ea168e6ff547).
```
ls -l ~/.ssh/id_*.pub
ssh-keygen
```
https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/checking-for-existing-ssh-keys
https://linuxize.com/post/how-to-set-up-ssh-keys-on-ubuntu-20-04/

Get SSH Public key, and telegram it to HPC System Admin to gain access to HPC system. Also get IPAddress and username
```
cat ~/.ssh/id_rsa.pub
```

Test SSH Access, probably make an empty folder to store code
```
ssh username@IPAddress
mkdir FolderName
```

TODO :
[Ssh shortcuts](https://scotch.io/tutorials/how-to-create-an-ssh-shortcut)

[Install VSCode](https://code.visualstudio.com/)


In VSCode, install Remote SSH extension
Settings - Extensions - Search - "Remote - SSH" - Install

Connect to Remote Host in VSCode
"Open a remote window" (green button, bottom left of screen) - Connect to new host - Add new SSH host - Type ssh username@IPAddress - Select either config file - Connect

https://code.visualstudio.com/blogs/2019/07/25/remote-ssh#_connect-using-remote-ssh

Open folder in VSCode
Once you're connected to a remote host in VSCode - Open Folder - Select Folder - OK.

Now you can create files on the SSHed account directly (top right), and make changes there.

Once you make a file, enable colour highlighting by selecting a language. "Plain Text" (Bottom Right) - LanguageName (Lua if using Regent)

**Regent**
