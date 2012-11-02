
This technote is not for GIT advanced users and neither for beginners. Be careful if you are going to read as I will show how to erase the binary files from a git history — yes, binaries. 

## Quest for unwanted binary objects in Git History

I decided to write this page as a documentation of a kind of work I had to go through and I think some out there may need this. This may not be for git experts but perhaps for folks that decided to insert binaries thinking it was nothing much to then understand later that what you don't see is what you get — git clone will always bring the whole history to you even if your project has today a README.txt. So I did it, for years, I 'filed' binaries, PNG images, JPG, SWF files and, yes, I also checked a OGG video file with the code. And then, when I thought everything was beautiful and I was sure I had the gut clean then folks from github helped me to find additional meters and meters of the matter in the gut. Here I am to dump the bit I have learned to you. My hope is to start learning more now — digest first, dump later. 

Git will keep all the things in the .git directory that you won't see right away. So one thing I learned from github folks is the following command | script: 

```
git verify-pack -v .git/objects/pack/pack-0df407718d1dbd66bd5ccf4c0642f0757687a62f.pack |
grep -E '^[0-9a-f]{40}' |
awk '{print $4 " " $1}' |
sort -rn
```
The '0df407718d1dbd66bd5ccf4c0642f0757687a62f.pack' in your case maybe something else, so look inside the .git/objects/pack/pack- and figure the pack file name. In my case, the execution of this script gave me a listing of all the objects listed by the size. It was nasty to see this in my case.

```
426106 6bd1a7d18b6281b9db209afdb5cf17583acdcab1
40016 894c393da4f02296be75bb3127fdd3932eab6285
31948 844b3350762f63f2be9e5e0299624fe9f7d70ecc
31471 b3217b0935a8307bf05dcdd68f6fd62c343d1de2
30375 88e661eec806dc61eb5dfbd08fd0bae8343f96be
25078 aa114494a84b27c7e61a4510a37dd9595d42b3be
24721 764d9021cc82f84182fee1b024f271a36651e6da
24596 7c243080233761859937d52195b670602731a379
24041 0c7294c90a06a0df5e434e169048c198826eb25a
18462 e5a612c729aaf22a9db34a5f361df8f8b6717c48
15841 37b668e96b6c5e9f985db7530f14369b74fd574a
.
.
.

```
Yes, it is a 426K file that you see and it is there and see the others too? you thinking they are large right? so I am to tell you this is my clean repo now — I had a 8MB file in there before. Okay, past is past and we move on. 

##To identify the file name you can do

    $ git log --all --raw --no-abbrev | grep 6bd1a7d18b6281b9db209afdb5cf17583acdcab1

The command gave me some output in git language but what I wanted the file name so I can move on with the known methods to filter the file, rm for all the commits. 

    libmediarecorder.dylib

Replace the '6bd1a7d18b6281b9db209afdb5cf17583acdcab1' with your top object from the search script. Git will give you the reference with a file name sort of like the above output. Now you can do the work you see in many online materials, for example <a href='https://help.github.com/articles/remove-sensitive-data'>Github removing sensitive data</a>. 

##filter-branch against all branches and tags

    $ git filter-branch --index-filter 'git rm --cached *.dylib \
     --ignore-unmatch' --prune-empty --tag-name-filter cat -- --all

When and if removal happens it will give you a summary of the results for the above operation. Then for every branch ( and tag ) you need to take care and push those. In my case: 

```
Ref 'refs/heads/master' was rewritten
Ref 'refs/remotes/origin/master' was rewritten
Ref 'refs/remotes/origin/cleaner' was rewritten
WARNING: Ref 'refs/remotes/origin/master' is unchanged
Ref 'refs/remotes/origin/xulrunner2' was rewritten
Ref 'refs/tags/v0.1' was rewritten
```

So I had to git checkout master, git push origin master --force, git checkout cleaner then git push origin cleaner --force; also for xulrunner2 and then finally I had to go back to master and do git push tags --force. 

##Read more about git filter-branch

<a href='https://help.github.com/articles/remove-sensitive-data'>Github doc on how to remove sensititve data</a> has information that also covers how to cleanup the local space so you do not have to clone a new repo in the end of this. 

