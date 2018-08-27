# 笔记

### `ng new heroes`

使用 Angular CLI 生成一个新项目以及默认的应用代码。

### `ng generate component heroes`

使用 Angular CLI 创建一个名为 heroes 的新组件。

### `ng generate service hero`

使用 Angular CLI 创建一个名叫 hero 的服务。

### `ng generate service hero --module=app`

通过附加 --module=app 参数来告诉 CLI 要自动在模块级提供该服务。

### `ng generate module app-routing --flat --module=app`

添加路由功能

+ --flat 把这个文件放进了 src/app 中，而不是单独的目录中。
+ --module=app 告诉 CLI 把它注册到 AppModule 的 imports 数组中。

### `npm install angular-in-memory-web-api --save`

--------- --------- --------- --------- --------- ---------

# AngularDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
