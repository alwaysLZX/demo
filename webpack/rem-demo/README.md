# REM移动端适配

## 安装sass

+ `node-sass`：把sass解析成css的编译工具
+ `sass-loader`：配合webpack使用的loader

## 提取CSS到公共文件

一直以来都是用`extract-text-webpack-plugin`来提取css到公共文件的，但是必须注意的是，如果是要用于webpack4，则需要注意版本问题
如果是不指定版本的安装，安装的则是支持webpack 3，不支持webpack 4，所以需要指定下版本。

~~~bash
npm install --save-dev extract-text-webpack-plugin@next
~~~

在这，使用另外一个插件`mini-css-extract-plugin`
