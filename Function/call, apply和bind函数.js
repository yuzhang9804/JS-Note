/**
 * @author: YuPeng Zhang
 * @date: 2020/1/9
 * @Description: call, apply 和 bind 函数
 */

/*
* call: 使用一个指定的 this 值和单独给出一个或多个参数来调用一个函数,  与 apply 方法相似, 区别是 call 接受的是一个参数列表,  而 call 接受的是一个包含多个参数的数组
* */

Function.prototype.myCall = function (content) {
  content = content || window
  content.fn = this;
  const [head, ...args] = arguments
  const result =args ? content.fn(...args) : content.fn()
  Reflect.deleteProperty(content, 'fn')
  return result
}


/*
* apply: 与 call 相似, 接受的是一个包含多个参数的数组
* */
Function.prototype.myApply= function (content) {
  content = content || window
  content.fn = this
  const [head, args] = arguments
  const result = args ? content.fn(...args) : content.fn()
  Reflect.deleteProperty(content, 'fn')
  return result
}


/*
* bind: bind 方法会创建一个新函数, 当这个新函数被调用时, bind() 的第一个参数会作为它运行时的this, 之后的一序列参数将会在传递的实参前传入作为它的参数
* */
Function.prototype.myBind = function (content) {
  content = content || window
}


const newObj = {
  name: '张宇1'
}

const obj = {
  name: '张宇',
  getName (age, gender) {
    return this.name + age + gender
  }
}

console.log(obj.getName.myCall(newObj))



