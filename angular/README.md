# Angular 文档
[官方文档](https://www.angular.cn/guide/architecture-modules)

### 1、NgModule
`NgModule` 是Angular 的基本构造块，它为组件提供了编译的上下文环境。

每个 Angular 应用都至少有一个 NgModule 类，也就是根模块，它习惯上命名为 AppModule，并位于一个名叫 `app.module.ts` 的文件中。引导这个根模块就可以启动你的应用。

> @NgModule 元数据

NgModule 是一个带有 `@NgModule` 装饰器的类。@NgModule 装饰器是一个函数，它接受一个元数据对象，该对象的属性用来描述这个模块。其中最重要的属性如下。

+ `declarations`（可声明对象表） —— 那些属于本 NgModule 的组件、指令、管道。
+ `exports`（导出表） —— 那些能在其它模块的组件模板中使用的可声明对象的子集。
+ `imports`（导入表） —— 那些导出了本模块中的组件模板所需的类的其它模块。
+ `providers` —— 本模块向全局服务中贡献的那些服务的创建器。 这些服务能被本应用中的任何部分使用。（你也可以在组件级别指定服务提供商，这通常是首选方式。）
+ `bootstrap` —— 应用的主视图，称为根组件。它是应用中所有其它视图的宿主。只有根模块才应该设置这个 bootstrap 属性。