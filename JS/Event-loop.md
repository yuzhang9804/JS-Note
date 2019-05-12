## Event-loop(事件循环)

>**JavaScript运行机制**

- 所有同步任务都在主线程上执行，形成一个[执行栈](http://www.ruanyifeng.com/blog/2013/11/stack.html)（execution context stack）。
- 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
- 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
- 主线程不断重复上面的第三步。



> **macrotask任务 和 microtask任务**

JavaScript 有两种异步任务：

- macrotask(宏任务): script（整体代码）, setTimeout, setInterval, setImmediate, I/O, UI rendering
- microtask(微任务)： process.nextTick（Nodejs）, Promises, Object.observe(已废弃), MutationObserver;



> Event Loop

主线程从”任务队列“中读取事件，这个过程是循环不断的， 所以整个这种运行机制又称为"Event Loop(事件循环)"

- 一个事件循环(Event Loop)有一个或多个任务队列， 一个任务队列是一组任务

- 任务队列是集合，而不是队列

- microtask 队列 不是一个任务队列



**在一个上下文中，总执行顺序是 同步任务 ==> microtask ==> marotask**

**在每一次事件循环中，macrotask 只会提取一个执行，而 microtask 会一直提取，直到 microtasks 队列清空**。

![å¾çæè¿°](https://segmentfault.com/img/bV6itK?w=810&h=414)

浏览器会不断从任务队列中按顺序取出任务执行， 如果没有macriotask, 就直接跳转到microtask的执行，然后执行下一次循环



> 任务流程

- 选择一个最先进入任务队列的任务，如果没有，则跳转到`microtask` 的执行步骤

- 将 事件循环 的当前运行任务设置为已选择的任务

- Run：运行选中任务

- 设置 事件循环 的当前运行任务为null

- 将运行完毕的任务从任务队列中移除

- microtask：perform a microtask checkpoint

  - 设置peroform a microtask checkpoint 的标记为 true

  - Microtask queue handing ,  如果时间循环的microtask queue 为空，则跳到Done

  - 选取最先进入任务队列的 micriotask queue 的 microtask

  - 将 事件循环 的当前运行任务设置为已选择的任务

  - Run：执行选中后的任务

  - 设置 事件循环 的当前运行任务为null

  - 将运行完成的 microtask 从 microtask queue 中删除

  - Done：

  - 清理 Index Database 的事务i

    设设置 perform a microtask checkpoint 的标记为faslse

- 更新渲染页面

- 返回第一步