# [HT 文档](http://www.hightopo.com/cn-index.html)

`HT for Web`用于构建2D和3D可视化界面

## 调度

> **概念**

调度，用通俗易懂的话来说，就是定时执行的任务。

> **执行流程**

先通过`DataModel`添加调度任务，`DataModel`会在调度任务指定的时间间隔到达时， 遍历`DataModel`所有图元回调调度任务的`action`函数，可在该函数中对`传入的Data图元`做相应的属性修改以达到动画效果。
