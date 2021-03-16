## Promise/A+ 规范

#### 术语

---

Promise

- `Promise`是一个拥有 `then`方法的对象或函数,  其行为符合本规范

Thenable

- 是一个定义了`then`方法的对象或函数

值 (Value)

- 指任何 `JavaScript`的合法值

异常 (exception)

- 是使用 `therow`语句抛出的一个值

据因 (reason)

- 表示一个`Promise`的拒绝原因



#### 要求

---

##### Promise的状态

> 一个 `Promise` 的当前状态必须为以下三种状态中的一种:  **等待态(Pending)**,  **执行态(Fulfilled)**和**拒绝态(Rejected)**

###### 等待态 (Pending)

处于等待态时, `Promse` 需满足以下条件

- 可以迁移至执行态或拒绝态

###### 执行态 (Fulfilled)

处于拒执行态时, `Promise` 需满足以下条件

- 不能迁移至其他任何状态
- 必须拥有一个**不可变**的终值

###### 拒绝态 (Rejected)

处于拒绝态时, `Promise`必须满足以下条件

- 不能迁移至其他任何状态
- 必须拥有一个**不可变**的原因



#### Then 方法

---

一个 `Promise`必须提供一个 `then`方法以访问其当前值, 终值和据因

Promise 的 then 方法接受两个参数 `onFulfilled` 和 `onReject`

- 如果`onFulfilled` 不是函数,  其必须被忽略
  - 当 Promise 执行结束后其必须被调用, 其第一个参数为 `promies`的终值
  - 在 Promise 执行结束前其不可被调用
  - 其调用次数不可超过一次
- 如果`onReject`不是函数, 其必须被忽略
  - 当 Promise 被拒绝执行后其必须被调用,  其第一个参数为 `promies`  的据因
  - 在 Promise 被拒绝执行前其不可被调用
  - 其调用次数不可超过一次



##### 返回

then 方法必须返回一个 Promise 对象

- 如果 `onFulfilled`或者`onReject`返回一个值 x, 则运行下面的 **Promise** 解决过程

  ```javascript
  [[Resolve]](promise, x)
  ```

- 如果 `onFulfilled`或者`onRejected`抛出一个异常`e`,  则`promies`必须拒绝执行, 并返回执行原因 e

- 如果`onFulfilled`不是函数且`then`成功执行, 则`promise`必须成功执行并返回相同的值
- 如果`onRejected`不是函数且`then`拒绝执行,  则`promise` 必须拒绝执行并返回相同的据因

> 不论 promise 被 reject 还是 resolve 都会被resolve,  只有出线异常的时候才会被 reject

