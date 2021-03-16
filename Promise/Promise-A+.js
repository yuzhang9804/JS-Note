// 定义三个常量
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise (fun) {
  // 定义一个常量保存 this
  const _this = this;
  // promise 状态
  _this.state = PENDING;
  // promise 的 value 和 reason
  _this.value = null;
  _this.reason = null;
  // 保存 then 中的回调函数
  _this.onFulFilledCallbacks = [];
  _this.onRejectedCallbacks = [];
  // resolve 函数
  function resolve (value) {
    // 如果 value 是一个 Promise 对象, 则直接执行
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    // 通过 queueMicrotask() 使用微任务，保证代码执行顺序
    queueMicrotask(() => {
      // 改变 Promise 的状态
      _this.state = FULFILLED;
      // 改变 Promise 的 value
      _this.value = value;
      // 执行 onFulfilledCallbacks 中的回调函数
      _this.onFulFilledCallbacks.map(cb => cb(value));
    }, 0)
  }
  // reject 函数
  function reject (reason) {
    queueMicrotask(() => {
      _this.state = REJECTED;
      _this.reason = reason;
      _this.onRejectedCallbacks.map(cb => cb(reason));
    } , 0)
  }
  try {
    fun(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// Promise then 函数 始终返回一个 promise 对象
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // 定义一个常量保存this
  const _this = this;
  let promise2;
  // 保证参数为一个函数, 实现then 函数值的穿刺
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
  // 如果 Promise 状态为 PENDING
  if (_this.state === PENDING) {
    // then 方法始终返回一个 promise 值
    return promise2 = new MyPromise((resolve, reject) => {
      // 往回调函数中 push 函数, 等待 Promise 状态改变
      _this.onFulFilledCallbacks.push(() => {
        try {
          const x = onFulfilled(_this.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e)
        }
      })
      _this.onRejectedCallbacks.push(() => {
        try {
          const x = onRejected(_this.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  // 如果 Promise 状态为 FULFILLED
  if (_this.state === FULFILLED) {
    // then 方法始终返回一个 promise 值
    return promise2 = new MyPromise((resolve, reject) => {
      // 保证代码执行顺序, 必须处于异步
      queueMicrotask(() => {
        try {
          const x = onFulfilled(_this.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0)
    })
  }
  // 如果 Promise 状态为 REJECTED
  if (_this.state === REJECTED) {
    // then 方法始终返回一个 promise 值
    return promise2 = new MyPromise((resolve, reject) => {
      // 保证代码执行顺序, 必须处于异步
      queueMicrotask(() => {
        try {
          const x = onRejected(_this.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0)
    })
  }
}

/**
 * Promise 的执行过程
 * @param promise2 返回的 promise
 * @param x  promise 中的返回值
 * @param resolve
 * @param reject
 */
function resolvePromise (promise2, x, resolve, reject) {
  // 防止代码多次执行
  let called = false;
  // 如果 x 与 promise2 相等
  if (Object.is(x, promise2)) {
    // 则以 TypeError 为据因拒绝执行
    reject(new TypeError('循环引用'));
  }
  // x 为 Promise
  if (x instanceof MyPromise) {
    // x 的状态处于等待态
    if (x.state === PENDING) {
      // 等待直至 x 被执行或被拒绝
      x.then(
        value => resolvePromise(promise2, value, resolve, reject),
        reason => reject(reason)
      )
    } else {
      // x 处于其他状态, 则以相同的值执行 promise
      x.then(resolve, reject);
    }
  }
  // x 为对象或函数
  if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
    try {
      // 将 x.then 的值赋给 then
      let then = x.then(resolve, reject);
      // 如果 then 是一个函数
      if (typeof then === 'function') {
        // 将 x 作为函数的作用域调用
        then.call(x,
          value => {
            // 防止多次调用
            if (called) return;
            called = true;
            resolvePromise(promise2, value, resolve, reject)
          },
          reason => {
            // 防止多次调用
            if (called) return;
            called = true;
            reject(reason);
          }
        )
      } else {
        // 如果 then 不是一个函数, 则以 x 为参数执行 promise
        resolve(x);
      }
    } catch (e) {
      // 报错则以 e 为据因拒绝 promise
      if (called) return;
      called = true;
      reject(e)
    }
  } else {
    // 如果 x 不为对象或函数, 则以 x 为参数执行 promise
    resolve(x);
  }
}
