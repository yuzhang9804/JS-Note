/**
 * @author: YuPeng Zhang
 * @date: 2020/4/13
 * @Description: new 操作符
 */

/**
 * new 操作符
 * @param {Function} fun
 * @param { any } params 参数
 */
function myNew(fun, ...params) {
  const obj = {};
  // 将 obj 的原型指向 fun.prototype
  obj.__proto__ = fun.prototype;
  // 使用 apply 改变 this 的指向
  const ret = fun.apply(obj, params);
  // 如果构造函数返回一个对象 则返回这个对象
  return typeof ret === 'object' && ret !== null ? ret : obj;
}
