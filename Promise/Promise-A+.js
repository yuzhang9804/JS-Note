/**
 * @author: YuPeng Zhang
 * @date: 2019/11/20
 * @Description: Promise/A+ 规范版本
 */

// 定义 Promise 的三个状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const My_Promise = function (fun) {
  const that = this;  // 保存当前的 promise 实例对象
  that.state = PENDING;  // 定义初始状态
  that.value = null;  // fulfilled 状态 返回的值
  that.reason = null;  // rejected 状态 返回的错误信息
  that.onFulFilledCallbacks = [];  // 存储 fulfilled 状态时对应的 fulfilled 的函数
  that.onRejectedCallbacks = [];  // 存储 rejected 状态时对应的 rejected 的函数


  // 根据 2.2.4 规范 onFulfilled 和 onRejected 只允许在 excution context 栈仅包含平台代码时运行
  // 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。

  // 通过 setTimeOut 模拟
  function resolve (value) {
    // 如果 value 是一个 Promise 实例
    if (value instanceof  Promise) {
      return value.then(resolve, reject);
    }

    setTimeout(() => {
      that.state = FULFILLED;
      that.value = value;
      that.onFulFilledCallbacks.forEach(item => item(that.value));
    })
  }

  function reject (reason) {
    setTimeout(() => {
      that.state = REJECTED;
      that.reason = reason;
      that.onRejectedCallbacks.forEach(item => item(that.reason))
    })
  }

  // 捕获 fun 函数执行过程中的错误
  try {
    fun()
  } catch (e) {
    reject(e)
  }
}

/**
 * 对 resolve 进行改造增强, 针对resolve 中不同情况的值, 进行处理
 * @param promise2 promise.then 返回的新的 promise 对象
 * @param x promise 中 onFulfilled 的返回值
 * @param resolve promise 的 resolve 方法
 * @param reject promise 的 reject 方法
 */
const resolvePromise = function (promise2 , x , resolve, reject) {
  // 如果 onFulfilled 中返回的 x 是 promise2 就会导致循环引用
  if (promise2 === x) return reject(new TypeError('循环引用'));

  let called = false;  // 避免多次调用

  if (x instanceof My_Promise) {
    if (x.state === PENDING) {
      x.then(y => {
        resolvePromise(promise2, x, resolve, reject)
      })
    } else {

    }
  }
}

My_Promise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  // 实现 then 的参数穿刺
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
}

const resolvePromise = (promise2, x, resolve, reject) => {
  let then;
  let called = false

  // x 与 promies2 相等 ,  以 TypeError 为据因拒绝执行
  if (promise2 === x) return reject(new TypeError('循环引用'));

  // x为 promise
  if (x instanceof My_Promise) {
    // x 处于等待态
    if (x.state === PENDING) {
      x.then(value => {
        resolvePromise(promise2, value, resolve, reject)
      }, error => {
        reject(error)
      })
    } else {
      x.then(resolve, reject)
    }
  }

  // x 为对象或者函数
  if ((typeof x === 'function') || (typeof x === 'object')) {
    try {
      // x.then 很可能是一个getter
      then = x.then
      if (typeof then === 'function') {
        then.call(x, value => {
          if (called) return
          called = true
          resolvePromise(promise2, value, resolve, reject)
        }, error => {
          if (called) {}
        })
      }
    } catch (e) {
      if (called) return
      called = true
      return reject(e)

    }

  }

}
