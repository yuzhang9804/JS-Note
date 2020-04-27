/**
 * @author: YuPeng Zhang
 * @date: 2020/3/15
 * @Description: 响应式系统依赖收集
 */

// 订阅者 Dep, 用来存放观察者 Weather
class Dep {
  constructor() {
    this.subs = [];
  }

  // 添加 Weather 到队列
  addSub(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach(sub => sub.update());
  }
}

// 观察者 Weather
class Watcher {
  constructor() {
    // 将当前 Weather 绑定到 Dep 上
    Dep.target = this;
  }

  update() {
    console.log('视图更新!');
  }
}

/**
 * 依赖收集
 * @param { Object } obj
 * @param key
 * @param value
 * @returns {*}
 */
function defineReactive(obj, key, value) {
  // 实例化一个 Dep
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      dep.addSub(Dep.target);
      return value;
    },
    set(v) {
      if (v === value) return;
      dep.notify();
    }
  });
}

/**
 * 将一个对象的所有属性进行依赖收集
 * @param { Object } object
 */
function observer(object) {
  if (!object && (typeof object !== 'object')) return;

  Object.keys(object).forEach(key => defineReactive(object, key, object[key]));
}

class Vue {
  constructor(option) {
    this._data = option.data;
    /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
    new Watcher();
    observer(this._data);
    console.log('render', this._data.test);
  }
}

const vue = new Vue({
  data: {
    test: {
      name: 'test'
    },
    arr: []
  }
});
vue._data.test = 'newName';
// 深层次对象无法监听
vue._data.test.name = 'newName';
// 数据无法监听
vue._data.arr.push(1);
