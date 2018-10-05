webpack v4 相关配置

[最好的学习是看官方文档](https://webpack.docschina.org/concepts/)

### 1、关于mode

选项                  | 描述
--------------------- | -----------------------
`development`         | 会将 `process.env.NODE_ENV` 的值设为 `development`。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`。
`production`          | 会将 `process.env.NODE_ENV` 的值设为 `production`。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `UglifyJsPlugin`.


### 2、关于开发服务器及热更新

>启动开发服务器
+ 通过webpack-dev-server命令行的方式
+ 通过Node.js API的方式

>开启热更新
+ 此demo是以命令行的形式添加--hot的方式开启热更新，以这种方式会自动添加webpack.HotModuleReplacementPlugin插件，而不需要额外配置。