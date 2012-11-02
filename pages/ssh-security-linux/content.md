You want to have quick safe access to your remote box and you want it to remember your machin and also not to die when you get a coffee or something. Here are tips for your ssh environment setup.

##SSH and Security 

    http://library.linode.com/using-linux/security-basics/#keep_systems_and_software_up_to_date

## edit sshd_config on your remote machine  

Add the following line if you want to disable the root remote access. This is recommended and you will need to have another user to access the computer. So make sure you do this when you know you can access safely from your other user.

    PermitRootLogin no

## auto authentication to 'my other' user without password prompt 

Generate your keys in your local computer — this is not the remote computer and these files need to be local and safe under your local account only. 

    ssh-keygen local key 

Now move these files ( pub and private ) into your local PC under your /home/USERACCOUNT/.ssh/. Now upload your (.pub) file (only!) to your remote computer, to the ".ssh" directory for the account you are going to use to log in — not the root right? 

## Edit remote /etc/ssh/sshd_config 

    PasswordAuthentication no

## Before you try to ssh to the remote machine you will need to ssh-add your local private key

    ssh-add ~yourUser/.ssh/your_private_key

And type your password. And now you are set to do the ssh to the remote end and not have to type passwords at all times. 

