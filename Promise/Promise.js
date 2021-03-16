/**
 * @author: YuPeng Zhang
 * @date: 2019/11/18
 * @Description: Promise
 */

// 定义三个常量表示 promise 的状态
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise (fun) {
  const that = this
  that.state = PENDING
  that.value = null
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []

  /**
   * resolve 方法
   * @param value
   */
  function resolve (value) {
    if (that.state === PENDING) {
     that.state = RESOLVED
     that.value = value
      that.resolvedCallbacks.forEach(item => item(that.value))
    }
  }

  /**
   * reject 方法
   * @param value
   */
  function reject (value) {
    if (that.state === REJECTED) {
      that.state = REJECTED
      that.value = value
      that.rejectedCallbacks.forEach(item => item(that.value))
    }
  }

  // Promise 传入的函数
  try {
    fun(resolve, reject)
  } catch (e) {
    reject(e)
  }

}

// then 方法
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e}

  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }

  if (that.state === RESOLVED) onFulfilled(that.value)

  if (that.state === REJECTED) onRejected(that.value)
}

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    throw new Error('测试')
  }, 0)
})

promise.then(res => {
  console.log(res)
}, rej => {
  console.log(rej)
})
