﻿# rollup.js

## 配置

`format`

- `amd` – 异步模块定义，用于像 RequireJS 这样的模块加载器
- `cjs` – CommonJS，适用于 Node 和 Browserify/Webpack
- `es` – 将软件包保存为 ES 模块文件
- `iife` – 一个自动执行的功能，适合作为`<script>`标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
- `umd` – 通用模块定义，以 amd，cjs 和 iife 为一体
