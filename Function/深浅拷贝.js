/**
 * @author: YuPeng Zhang
 * @date: 2019/12/19
 * @Description: 深浅拷贝
 */

// 数组
{
  let arr1 = [1, 2, 3];
  /**
   * 数组的浅拷贝
   */
  // 利用数组的 concat 方法
  let arr2 = arr1.concat();
  // 利用数组的 slice 方法
  let arr3 = arr1.slice();
  // 利用扩展运算符
  let arr4 = [...arr1];
}

{
  /**
   * 对象的浅拷贝
   */
  let obj = { name: 'Stark'}
  // 利用 Object.assign 方法
  let newObk1 = Object.assign({}, obj);
  // 利用扩展运算符
  let newObj2 = {...obj};
}
{
  /**
   * 深拷贝
   */
  let complexArr = [1, {name: 'Stark'}];
  // 利用 Json.Stringify 方法
  //  undefined, 任意的函数和 Symbol 在序列化时会被忽略(在数组中会被转换为 null)
  // 对于包含循环引用的的对象执行此方法, 会抛出错误
  // NaN 和 Infinity 和 null 都会被当做null
  let newArr1 = JSON.parse(JSON.stringify(complexArr));
}


/**
 * 实现深拷贝
 * @param obj {Object | Array} 需要拷贝的对象
 * @returns {Object | Array} 深拷贝后返回的对象
 */
function deepCopy (obj) {
  // 判断是否是一个 Object
  if (obj === null || typeof obj !== 'object') return false;
  // 新建一个空对象或数组
  let newObj = obj instanceof Array? [] : {};
  for (let key in obj) {
    // for-in 会遍历到原型链上的属性
    if (obj.hasOwnProperty(key)) {
      // 如果子属性是引用数据类型则是用递归循环处理
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}
