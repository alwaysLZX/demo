# TypeScript

1. 如果引用的js库或是模块在@types上没有，可以在当前项目自己写声明文件`.d.ts`（规范：放到`typings`文件夹下），编译器会自动去搜索引用。实测VS Core可行。