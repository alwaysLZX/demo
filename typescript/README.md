# TypeScript笔记

+ [入门教程](https://ts.xcatliu.com/)
+ [文档1](https://zhongsp.gitbooks.io/typescript-handbook/)
+ [文档2](http://www.runoob.com/manual/gitbook/TypeScript/_book/index.html)

## 手册

### 1、基础类型

+ `boolean`(布尔值)
+ `number`(数字)：ts和js一样，所以的数字都是浮点数
+ `string`(字符串)：可以用双引号、单引号表示，也可以用反引号，并且以${ expr }这种形式签入表达式
+ 数组
+ 元组Tuple：元组类型允许表示一个`已知元素数量`和`类型`的`数组`，各元素的类型不必相同。
+ `enum`(枚举)
+ `any`(任意值)
+ `void`(空值)：只能为它赋予undefined和null
+ `null` 和 `undefined`：当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。
+ `never`：never类型表示的是那些永不存在的值的类型。
+ `object`:表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
+ `类型断言`：相当于C#中的强制转换，这里用尖括号<>，或是用as表示。
+ `let`：让我们愉快地用let代替var吧

### 2、变量声明

+ TypeScript是JavaScript的超集
+ let
+ const
+ 解构：解构表达式要尽量保持小而简单
  + 默认值：默认值可以让你在属性为 undefined 时使用缺省值

+ 展开：展开操作符正与解构相反。

### 3、接口

+ 索引签名：[propName: string]: any;
+ 可索引的类型：[index: number]: string;

### javascript类型

+ 原始数据类型：boolean、number、string、null、undefined、symbol
+ 对象类型

### 其他

+ 使用`type`创建类型别名：类型别名常用于联合类型。

~~~ js
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
~~~

+ 字符串字面量类型与类型别名定义一致