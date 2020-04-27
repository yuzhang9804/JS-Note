/**
 * @author: YuPeng Zhang
 * @date: 2020/1/9
 * @Description: call, apply 和 bind 函数
 */

/*
* call: 使用一个指定的 this 值和单独给出一个或多个参数来调用一个函数,  与 apply 方法相似, 区别是 call 接受的是一个参数列表,  而 call 接受的是一个包含多个参数的数组
* */

Function.prototype.myCall = function (content) {
  content = content || window;
  content.fn = this;
  const [head, ...args] = arguments;
  const result = args ? content.fn(...args) : content.fn();
  Reflect.deleteProperty(content, 'fn');
  return result;
};


/*
* apply: 与 call 相似, 接受的是一个包含多个参数的数组
* */
Function.prototype.myApply = function (content) {
  content = content || window;
  content.fn = this;
  const [head, args] = arguments;
  const result = args ? content.fn(...args) : content.fn();
  Reflect.deleteProperty(content, 'fn');
  return result;
};


/*
* bind: bind 方法会创建一个新函数, 当这个新函数被调用时, bind() 的第一个参数会作为它运行时的this, 之后的一序列参数将会在传递的实参前传入作为它的参数
* */
Function.prototype.myBind = function (context) {
  const _this = this;
  context = context || window;
  const [head, ...args] = arguments;
  const fBound = function () {
    // 当作为构造函数 new 时, this 指向实例
    return _this.apply(this instanceof fBound ? this : context, [...args, ...arguments]);
  };
  // 让 fBound 可以继承原型上的属性
  fBound.prototype = Object.create(this.prototype);
  return fBound;
};


const foo = {
  name: '张宇',
  age: 22
};

var name = 'window';
var age = 999;

function bar(name, age) {
  console.log(this.name);
  console.log(this.age);
}

bar.myBind(foo)();
let newBar = bar.bind(foo);
newBar = new newBar();


