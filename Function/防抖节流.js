/**
 * @author: YuPeng Zhang
 * @date: 2020/4/16
 * @Description: 防抖节流
 */

// - 防抖是将多次执行变为最后一次执行
// - 节流是将多次执行变为每隔一段时间执行
/**
 * 防抖函数
 *
 * @param {function}    fun
 * @param {number}      [wait=50]       表示时间窗口间隔时间
 * @param {boolean}     [immediate=true]    是否立即调用函数
 * @returns     返沪客户端调用函数
 */
const debounce = function(fun, wait = 500, immediate = true) {
  let timer, context, args;
  // 延迟执行函数
  const later = _ =>
      setTimeout( _ => {
        timer = null;
        if(!immediate){
          fun.call(context, ...args);
          context = args = null;
        }
      }, wait);

  return function(...params){
    if(!timer){
      timer = later();
      if(immediate){
        fun.call(this, ...params);
      }else {
        context = this;
        args = params;
      }
    }else{
      clearTimeout(timer);
      timer = later();
    }
  }
}
