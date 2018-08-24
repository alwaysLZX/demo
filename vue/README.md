# vue个人风格指南
[vue官方风格指南](https://cn.vuejs.org/v2/style-guide/)

### 为组件样式设置作用域 <sup data-p="a">必要</sup>
**对于应用来说，顶级 `App` 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的。**

这条规则只和`单文件组件`有关。你*不一定*要使用 [`scoped` 特性](https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html)。设置作用域也可以通过 [CSS Modules](https://vue-loader.vuejs.org/zh-cn/features/css-modules.html)，那是一个基于 class 的类似 [BEM](http://getbem.com/) 的策略，当然你也可以使用其它的库或约定。

**不管怎样，对于组件库，我们应该更倾向于选用基于 class 的策略而不是 `scoped` 特性。**

这让覆写内部样式更容易：使用了常人可理解的 class 名称且没有太高的选择器优先级，而且不太会导致冲突。

<details>
<summary>
  <h4>详解</h4>
</summary>
如果你和其他开发者一起开发一个大型工程，或有时引入三方 HTML/CSS (比如来自 Auth0)，设置一致的作用域会确保你的样式只会运用在它们想要作用的组件上。

不止要使用 `scoped` 特性，使用唯一的 class 名可以帮你确保那些三方库的 CSS 不会运用在你自己的 HTML 上。比如许多工程都使用了 `button`、`btn` 或 `icon` class 名，所以即便你不使用类似 BEM 的策略，添加一个 app 专属或组件专属的前缀 (比如 `ButtonClose-icon`) 也可以提供很多保护。
</details>

#### 反例
``` html
<template>
  <button class="btn btn-close">X</button>
</template>

<style>
.btn-close {
  background-color: red;
}
</style>
```
#### 好例子
``` html
<template>
  <button class="button button-close">X</button>
</template>

<!-- 使用 `scoped` 特性 -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```
``` html
<template>
  <button :class="[$style.button, $style.buttonClose]">X</button>
</template>

<!-- 使用 CSS Modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```
``` html
<template>
  <button class="c-Button c-Button--close">X</button>
</template>

<!-- 使用 BEM 约定 -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```


--------- --------- --------- --------- --------- ---------


### Prop 名大小写 <sup data-p="b">强烈推荐</sup>
**在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和JSX中应该始终使用 kebab-case。**

我们单纯的遵循每个语言的约定。在 JavaScript 中更自然的是 camelCase。而在 HTML 中则是 kebab-case。
#### 反例
``` js
props: {
  'greeting-text': String
}
```
``` html
<WelcomeMessage greetingText="hi"/>
```
#### 好例子
``` js
props: {
  greetingText: String
}
```
``` html
<WelcomeMessage greeting-text="hi"/>
```


--------- --------- --------- --------- --------- ---------


### 组件/实例的选项的顺序 <sup data-p="c">推荐</sup>

**组件/实例的选项应该有统一的顺序。**

这是我们推荐的组件选项默认顺序。它们被划分为几大类，所以你也能知道从插件里添加的新属性应该放到哪里。

1. **副作用** (触发组件外的影响)
  - `el`

2. **全局感知** (要求组件以外的知识)
  - `name`
  - `parent`

3. **组件类型** (更改组件的类型)
  - `functional`

4. **模板修改器** (改变模板的编译方式)
  - `delimiters`
  - `comments`

5. **模板依赖** (模板内使用的资源)
  - `components`
  - `directives`
  - `filters`

6. **组合** (向选项里合并属性)
  - `extends`
  - `mixins`

7. **接口** (组件的接口)
  - `inheritAttrs`
  - `model`
  - `props`/`propsData`

8. **本地状态** (本地的响应式属性)
  - `data`
  - `computed`

9. **事件** (通过响应式事件触发的回调)
  - `watch`
  - 生命周期钩子 (按照它们被调用的顺序)
    - `beforeCreate`
    - `created`
    - `beforeMount`
    - `mounted`
    - `beforeUpdate`
    - `updated`
    - `activated`
    - `deactivated`
    - `beforeDestroy`
    - `destroyed`

10. **非响应式的属性** (不依赖响应系统的实例属性)
  - `methods`

11. **渲染** (组件输出的声明式描述)
  - `template`/`render`
  - `renderError`


--------- --------- --------- --------- --------- ---------


### 元素特性的顺序 <sup data-p="c">推荐</sup>

**元素 (包括组件) 的特性应该有统一的顺序。**

这是我们为组件选项推荐的默认顺序。它们被划分为几大类，所以你也能知道新添加的自定义特性和指令应该放到哪里。

1. **定义** (提供组件的选项)
  - `is`

2. **列表渲染** (创建多个变化的相同元素)
  - `v-for`

3. **条件渲染** (元素是否渲染/显示)
  - `v-if`
  - `v-else-if`
  - `v-else`
  - `v-show`
  - `v-cloak`

4. **渲染方式** (改变元素的渲染方式)
  - `v-pre`
  - `v-once`

5. **全局感知** (需要超越组件的知识)
  - `id`

6. **唯一的特性** (需要唯一值的特性)
  - `ref`
  - `key`
  - `slot`

7. **双向绑定** (把绑定和事件结合起来)
  - `v-model`

8. **其它特性** (所有普通的绑定或未绑定的特性)

9. **事件** (组件事件监听器)
  - `v-on`

10. **内容** (覆写元素的内容)
  - `v-html`
  - `v-text`


--------- --------- --------- --------- --------- ---------


### 单文件组件的顶级元素的顺序 <sup data-p="c">推荐</sup>
**单文件组件应该总是让 `<script>`、`<template>` 和 `<style>` 标签的顺序保持一致。且 `<style>` 要放在最后，因为另外两个标签至少要有一个。**

#### 反例
``` html
<style>/* ... */</style>
<script>/* ... */</script>
<template>...</template>
```
``` html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```
#### 好例子
``` html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>
```
``` html
<!-- ComponentA.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```