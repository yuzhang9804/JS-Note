/**
 * @author: YuPeng Zhang
 * @date: 2019/11/15
 * @Description: 单例模式
 */

// 定义 :  保证一个类仅有一个实例,  并提供一个访问它的全局访问点,  实现的方法为先判断实力是否存在,  如果存在则直接返回,  如果不存在则创建了再返回, 这就确保了一个类仅有一个实例对象

/* 使用场景: 一个单一对象, 比如弹窗, 无论点击多少次, 弹窗只应该被创建一次 */
class CreatePerson {
  constructor (name) {
    this.name = name;
    this.getName();
  }
  getName () {
    return this.name
  }
}

// 实现单例模式
const ProxyMode = (() => {
  let instance;
  return function (name) {
    instance = instance ? instance : new CreatePerson(name);
    return instance
  }
})();

// 测试单例模式
const cersei = new ProxyMode('Cersei');
console.log(cersei.getName());
const jaime = new ProxyMode('Jaime');
console.log(jaime.getName())

console.log(cersei === jaime)

