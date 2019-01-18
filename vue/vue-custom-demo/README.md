# 自定义配置vue项目

只有从头到尾玩过一遍，才能更深理解vue相关的知识。

## 1、添加相关依赖包

+ `webpack` 基于4.x版本，还需要安装 `webpack-cli`
+ `vue` 基于2.x版本
+ `vue-loader` 基于15.x版本

## 2、VueLoaderPlugin

使用15.x版本的 `vue-loader` 需要添加插件`VueLoaderPlugin`

## vue模板编译器`vue-template-compiler`

~~~bash
npm install --save-dev vue-template-compiler
~~~

## 合并两个webpack配置文件

需要引入 `webpack-merge` 包

## 注意

### 1、引入`vue`版本

默认引用的vue只有**运行时**，而我们在构建工具需要引入**运行时**和**编译器**，即引入**完整版**

~~~javascript
resolve: {
    alias: {
        // 加上$符号，表示精准匹配
        'vue$': 'vue/dist/vue.esm.js'
    }
}
~~~
