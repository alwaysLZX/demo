# vue 服务器端渲染

## 革命尚未成功，同志仍需努力

## 犯了一个错，`webpack.extensions` 问题

在 `entry.client.js` 和 `entry.client.js` 这两个入口文件中，引入 app 构造器（即 `app.js` 文件）的时候，我是这样子写的：

```javascript
import createApp from "./app";
```

然而在编译运行的时候，一直报错：

```javascript
Object(...) is not a function
```

这个问题还是困扰了几天，最后查了下 webpack 编译之后的文件，发现引入的不是 `app.js` 文件，而是 `App.vue` 文件，我的天，怎么会这样。

看了下我引入 `app.js` 的时候，只是写了 `app` ，而没写文件后缀。

无奈我的 `webpack` 配置配了`.vue` 的优先级先于`.js`，即

```javascript
module.exports = {
    ...
    extensions: [".vue", ".js", ".json"]
    ...
}
```

无奈同目录下还有个 `App.vue` 文件，所以引入的东西不是我想要的，报错了。

没办法，锅还是自己的，自己扛。

## 注意

`mini-css-extract-plugin` 提取公共 `css` 的插件无法在 server 端运行。
