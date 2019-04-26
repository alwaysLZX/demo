# Ionic 文档

## `ionic start yourProjectName`

新建一个项目，此命令没有指明模块，运行之后，需要选择一个模板

## `ionic generate page youPageName`

使用命令行新建一个页面

## `ionic serve`

运行项目在浏览器上运行

## `ionic cordova run android --device`

在安卓手机上运行app

## `ionic cordova build android --release`

打包

------

## 安卓apk生成签名秘钥及签名打包

1、生成签名秘钥

`keytool -genkey -v -keystore [秘钥名称].keystore -alias [秘钥名称].keystore -keyalg RSA -validity 20000`

2、签名打包

`jarsigner -verbose -keystore [秘钥名称].keystore -signedjar complete.apk app.apk [秘钥名称].keystore`

## 问题

在执行ionic cordova build android时，会出现

~~~ js
[WARN] Error occurred during command execution from a CLI plugin (@ionic/cli-plugin-cordova). Your plugins may be out of date.
TypeError: env.runcmd is not a function
~~~

解决方法，降低版本

`npm install --save-dev @ionic/cli-plugin-cordova@1.4.1`
