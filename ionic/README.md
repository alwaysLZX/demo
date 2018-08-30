# Ionic 文档

### `ionic start yourProjectName`

新建一个项目，此命令没有指明模块，运行之后，需要选择一个模板

### `ionic serve`

运行项目在浏览器上运行

### `ionic cordova run android --device`

在安卓手机上运行app

### `ionic cordova build android --release`

打包

------

### 安卓apk生成签名秘钥及签名打包

1、生成签名秘钥

`keytool -genkey -v -keystore [姓名].keystore -alias [姓名].keystore -keyalg RSA -validity 20000`

2、签名打包

`jarsigner -verbose -keystore [姓名].keystore -signedjar complete.apk app.apk [姓名].keystore`