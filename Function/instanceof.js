/**
 * @author: YuPeng Zhang
 * @date: 2020/06/15
 * @Description: 实现 instanceof
 */

/**
 * 实现 instanceof
 * @param left 需要检测的值
 * @param right 对应的数据类型
 * @returns {boolean}
 */
function myInstanceof(left, right) {
  // 获取 right 的 prototype
  const prototype = right.prototype;
  while (true) {
    // 如果为 null 或者 undefined 这返回 false
    if (left === null || left === undefined) return false;
    if (left !== prototype) {
      // 不等则通过原型链向上级查找
      left = left.__proto__;
    } else {
      return true;
    }
  }
}
