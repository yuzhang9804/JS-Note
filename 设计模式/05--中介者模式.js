/**
 * @author: YuPeng Zhang
 * @date: 2019/11/18
 * @Description: 中介者模式
 */

/* 定义: 通过一个中介者对象, 其他所有的相关对象都通过中介者对象来通信, 而不是相互引用, 当其中一个对象发生改变时, 只需要通知中介者对象即可, 通过中介者模式可以解除对象与对象之前的相互耦合 */

// 场景: 购物车需求, 表单发生改变则会触发 change 事件
const goods = {
  'red|32g': 1,
  'blue|64g': 5,
  'blue|128g': 5
}

const colorSelect = document.querySelector('#colorSelect');
const memorySelect = document.querySelector('#memorySelect');
const numSelect = document.querySelector('#numSelect');

const mediator = (function () {
  return {
    change: function (target) {
      switch (target) {
        case colorSelect:
          // TODO
          break;
        case memorySelect:
          // TODO
          break;
        case numSelect:
          // TODO
          break;
      }
    }
  }
})();

colorSelect.addEventListener('change', function () {
  mediator.change(this)
});

memorySelect.addEventListener('change', function () {
  mediator.change(this)
});

numSelect.addEventListener('change', function () {
  mediator.change(this)
});
