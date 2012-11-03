Este artigo tem alguns 'snapshots' do meu terminal no momento que fiz testes com Phonegap 1.5 via terminal shell, ou seja, sem o Eclipse.

## Phonegap 1.5 SDK sem Eclipse

    wget https://github.com/phonegap/phonegap/zipball/1.5.0
    unzip 1.5.0
    cd phonegap/lib/android

```
taboca:android usuariocoder$ ls -l
total 640
-rw-r--r--@  1 usuariocoder  staff     162 Mar  5 15:12 NOTICE
-rwxr-xr-x@  1 usuariocoder  staff    2913 Mar  5 15:12 README.md
-rw-r--r--@  1 usuariocoder  staff  160098 Mar  5 15:12 cordova-1.5.0.jar
-rw-r--r--@  1 usuariocoder  staff  153359 Mar  5 15:12 cordova-1.5.0.js
drwxr-xr-x  17 usuariocoder  staff     578 Mar 10 20:02 example
drwxr-xr-x   4 usuariocoder  staff     136 Mar  5 15:12 xml
taboca:android usuariocoder$ 
```

```
taboca:android usuariocoder$ ~usuariocoder/Desktop/android/android-sdk-mac_x86/tools/android list targets

Available Android targets:
----------
id: 1 or "android-8"
     Name: Android 2.2
     Type: Platform
     API level: 8
     Revision: 2
     Skins: HVGA, QVGA, WQVGA400, WQVGA432, WVGA800 (default), WVGA854
     ABIs : armeabi
----------
id: 2 or "android-10"
     Name: Android 2.3.3
     Type: Platform
     API level: 10
     Revision: 2
     Skins: HVGA, QVGA, WQVGA400, WQVGA432, WVGA800 (default), WVGA854
     ABIs : armeabi
taboca:android usuariocoder$ 
taboca:android usuariocoder$ 
```

## Utilizando o target 2

```
taboca:android usuariocoder$ cd example/
taboca:example usuariocoder$ ls -l
total 56
-rw-r--r--@  1 usuariocoder  staff  2529 Mar  5 15:12 AndroidManifest.xml
-rw-r--r--@  1 usuariocoder  staff  2514 Mar  5 15:12 AndroidManifest.xml-e
-rw-r--r--@  1 usuariocoder  staff   696 Mar  5 15:12 ant.properties
drwxr-xr-x   3 usuariocoder  staff   102 Mar  5 15:12 assets
drwxr-xr-x  12 usuariocoder  staff   408 Mar 10 20:14 bin
-rw-r--r--@  1 usuariocoder  staff  3363 Mar  5 15:12 build.xml
drwxr-xr-x   7 usuariocoder  staff   238 Mar  5 15:12 cordova
drwxr-xr-x   4 usuariocoder  staff   136 Mar 10 20:02 gen
drwxr-xr-x   3 usuariocoder  staff   102 Mar  5 15:12 libs
-rw-r--r--   1 usuariocoder  staff   446 Mar 10 20:02 local.properties
-rw-r--r--@  1 usuariocoder  staff  1248 Mar 10 20:02 proguard.cfg
-rw-r--r--@  1 usuariocoder  staff   361 Mar 10 20:02 project.properties
drwxr-xr-x   9 usuariocoder  staff   306 Mar  5 15:12 res
drwxr-xr-x   3 usuariocoder  staff   102 Mar  5 15:12 src
taboca:example usuariocoder$ ~usuariocoder/Desktop/android/android-sdk-mac_x86/tools/android update project -p . -t 2
Updated project.properties
Updated local.properties
Updated file ./proguard.cfg
```

Listando Android Devices não informa nada pois não meu dispositivo não está conectado. 

```
~usuariocoder/Desktop/android/android-sdk-mac_x86/platform-tools/adb devices
List of devices attached 
```

Conectando-se o dispositivo, e rodando o comando novamente:

```
taboca:example usuariocoder$ ~usuariocoder/Desktop/android/android-sdk-mac_x86/platform-tools/adb devices
List of devices attached 
01469B951101700B	device
```

E finalmente ant debug install que forá a instalação no device:

```
taboca:example usuariocoder$ !689
ant debug install
Buildfile: /Users/usuariocoder/Desktop/android/phonegap-2012-manual-tests-for-audio/phonegap-phonegap-de1960d/lib/android/example/build.xml

-set-mode-check:

-set-debug-files:

-set-debug-mode:

-debug-obfuscation-check:

-setup:
     [echo] Gathering info for cordovaExample...
    [setup] Android SDK Tools Revision 15
    [setup] Project Target: Android 2.3.3
    [setup] API level: 10
    [setup] 
    [setup] ------------------
    [setup] Resolving library dependencies:
    [setup] No library dependencies.
    [setup] 
    [setup] ------------------
    [setup] 
    [setup] WARNING: Attribute minSdkVersion in AndroidManifest.xml (5) is lower than the project target API level (10)

-build-setup:
     [echo] Creating output directories if needed...

-pre-build:

-code-gen:
     [echo] ----------
     [echo] Handling aidl files...
     [aidl] No aidl files to compile.
     [echo] ----------
     [echo] Handling RenderScript files...
[renderscript] No renderscript files to compile.
     [echo] ----------
     [echo] Handling Resources...
     [aapt] No changed resources. R.java and Manifest.java untouched.

-pre-compile:

-compile:
    [javac] /Users/usuariocoder/Desktop/android/android-sdk-mac_x86/tools/ant/build.xml:600: warning: 'includeantruntime' was not set, defaulting to build.sysclasspath=last; set to false for repeatable builds

-post-compile:

-obfuscate:

-dex:
      [dex] No new compiled code. No need to convert bytecode to dalvik format.

-crunch:
   [crunch] Crunching PNG Files in source dir: /Users/usuariocoder/Desktop/android/phonegap-2012-manual-tests-for-audio/phonegap-phonegap-de1960d/lib/android/example/res
   [crunch] To destination dir: /Users/usuariocoder/Desktop/android/phonegap-2012-manual-tests-for-audio/phonegap-phonegap-de1960d/lib/android/example/bin/res
   [crunch] Crunched 0 PNG files to update cache

-package-resources:
     [aapt] Found modified input file
     [aapt] Creating full resource package...
     [aapt] Warning: AndroidManifest.xml already defines debuggable (in http://schemas.android.com/apk/res/android); using existing value in manifest.

-package:
[apkbuilder] Found modified input file
[apkbuilder] Creating cordovaExample-debug-unaligned.apk and signing it with a debug key...

-do-debug:
 [zipalign] Running zip align on final apk...
     [echo] Debug Package: /Users/usuariocoder/Desktop/android/phonegap-2012-manual-tests-for-audio/phonegap-phonegap-de1960d/lib/android/example/bin/cordovaExample-debug.apk

debug:
[propertyfile] Updating property file: /Users/usuariocoder/Desktop/android/phonegap-2012-manual-tests-for-audio/phonegap-phonegap-de1960d/lib/android/example/bin/build.prop
[propertyfile] Updating property file: /Users/usuariocoder/Desktop/android/phonegap-2012-manual-tests-for-audio/phonegap-phonegap-de1960d/lib/android/example/bin/build.prop
[propertyfile] Updating property file: /Users/usuariocoder/Desktop/android/phonegap-2012-manual-tests-for-audio/phonegap-phonegap-de1960d/lib/android/example/bin/build.prop
[propertyfile] Updating property file: /Users/usuariocoder/Desktop/android/phonegap-2012-manual-tests-for-audio/phonegap-phonegap-de1960d/lib/android/example/bin/build.prop

install:
     [echo] Installing /Users/usuariocoder/Desktop/android/phonegap-2012-manual-tests-for-audio/phonegap-phonegap-de1960d/lib/android/example/bin/cordovaExample-debug.apk onto default emulator or device...
     [exec] 2561 KB/s (137346 bytes in 0.052s)
     [exec] 	pkg: /data/local/tmp/cordovaExample-debug.apk
     [exec] Success

BUILD SUCCESSFUL
Total time: 18 seconds
```

## Referências

[Phonegap Android Terminal](http://wiki.phonegap.com/w/page/30864168/phonegap-android-terminal-quickstart)


