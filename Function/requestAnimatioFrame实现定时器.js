/**
 * @author: YuPeng Zhang
 * @date: 2019/12/19
 * @Description: 利用 requestAnimationFrame 制作一个循环定时器
 * @param callback
 * @param interval
 */

// 常用的 setTimeout 和 setInterval 因为 JS 是单线程, 因为最快执行时间大概为 4ms

// requestAnimationFrame: 告诉浏览器希望执行一个动画, 并且要求浏览器在下次重绘之前调用指定回调函数更新动画, 基本可以保证 16.6ms 执行一次

/**
 *
 * @param callback {Function}
 * @param interval
 */
function setInterval (callback, interval) {
  // 获取当前事件
  let start = +new Date();
  let timer;

  const loop = _ => {
    let now = +new Date();
    timer = window.requestAnimationFrame(loop);
    if (now - start >= interval) {
      start = now = +new Date();
      callback(timer);
    }
  }
  timer = window.requestAnimationFrame(loop);
  return timer;
}

let count = 1;
setInterval(timer => {
  console.log(1)
  count++;
  if (count > 5) cancelAnimationFrame(timer)
}, 1000)
