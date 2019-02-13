# 自定义配置vue项目

只有从头到尾玩过一遍，才能更深理解vue相关的知识。

## 相关依赖包

+ `webpack` 基于4.x版本，还需要安装 `webpack-cli`
+ `vue` 基于2.x版本
+ `vue-loader` 基于15.x版本
+ `vue-template-compiler`
+ `sass` 相关依赖：`sass-loader`和`node-sass`

## 注意

### 1、引入`vue`版本

默认引用的vue是**运行时**，而我们在构建工具需要引入**运行时**和**编译器**，即引入**完整版**，所以还需加入如下配置：

~~~javascript
resolve: {
    alias: {
        // 加上$符号，表示精准匹配
        'vue$': 'vue/dist/vue.esm.js'
    }
}
~~~

### 2、VueLoaderPlugin插件

使用15.x版本的 `vue-loader` 需要添加插件`VueLoaderPlugin`，该插件会根据配置，把规则应用到 `*.vue` 文件之中。

### 3、Sass预处理器

Sass有两种语法，大括号语法（与Css语法类型）和缩进语法，默认Sass不处理缩进语法，如需处理缩进语法，则需做如下配置：

~~~javascript
{
    loader: 'sass-loader',
    options: {
        indentedSyntax: true
    }
}
~~~

配置Sass的全局变量

~~~javascript
{
    loader: 'sass-loader',
    options: {
        data: `$color: red;$fontSize: 16px;`
    }
}
~~~

### 4、父组件影响子组件样式

在 `scoped` 样式中，如若要影响得更深，即影响子组件的样式，则可以使用`>>>`操作符，在某些css预处理器中，可用 `/deep/` 别名代替。

~~~css
/* 有添加深度作用选择器 */
.a .b { /* 前 */ }
.a[data-v-f3f3eg9] .b { /* 后 */ }

/* 未添加深度作用选择器 */
.a >>> .b { /* 前 */ }
.a[data-v-f3f3eg9] .b[data-v-f3f3eg9] { /* 后 */ }
~~~
