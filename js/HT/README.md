# [HT 文档](http://www.hightopo.com/cn-index.html)

`HT for Web`用于构建2D和3D可视化界面

## 调度

> **概念**

调度，用通俗易懂的话来说，就是定时执行的任务。

> **执行流程**

先通过`DataModel`添加调度任务，`DataModel`会在调度任务指定的时间间隔到达时， 遍历`DataModel`所有图元回调调度任务的`action`函数，可在该函数中对`传入的Data图元`做相应的属性修改以达到动画效果。

> **增加调度任务**

通过`DataModel.addScheduleTask(task)`添加调度任务

`task`为`json`对象，可指定属性如下：

+ `interval`：间隔毫秒数，默认值为`10`
+ `enabled`：是否启用开关，默认为`true`
+ `action`：间隔动作函数，该函数必须设置

~~~ javascript
// 添加闪烁效果
blinkTask = {
    interval: 500,
    action: function(data){
        if(data !== mac){
            return;
        }
        if(data.a('screen.color') === 'red'){
            data.a('screen.color', undefined);
        }else{
            data.a('screen.color', 'red');
        }
    }
};
dataModel.addScheduleTask(blinkTask);
~~~

> **删除调度任务和停用调度任务**

通过`DataModel.removeScheduleTask(task)`删除调度任务，其中`task`为以前添加过的调度任务对象。

~~~ javascript
// 删除闪烁效果
dataModel.removeScheduleTask(blinkTask);
~~~

> **启停调度任务**

调度任务的`json`参数对象上的`enabled`属性可控制调度任务的启停。

~~~ javascript
// 停止闪烁效果
blinkTask.enabled = false;

// 启用闪烁效果
blinkTask.enabled = true;
~~~
