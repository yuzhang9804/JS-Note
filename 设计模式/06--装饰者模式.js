/**
 * @author: YuPeng Zhang
 * @date: 2019/11/18
 * @Description: 装饰者模式
 */

/* 定义: 在不改变对象自身的基础上, 在程序允许期间给对象动态添加方法 */

Function.prototype.before = function(beforefn) {
  var self = this;    //保存原函数引用
  return function(){  //返回包含了原函数和新函数的 '代理函数'
    beforefn.apply(this, arguments);    //执行新函数，修正this
    return self.apply(this,arguments);  //执行原函数
  }
}
Function.prototype.after = function(afterfn) {
  var self = this;
  return function(){
    var ret = self.apply(this,arguments);
    afterfn.apply(this, arguments);
    return ret;
  }
}
var func = function() {
  debugger
  console.log('2');
}
//func1和func3为挂载函数
var func1 = function() {
  debugger
  console.log('1');
}
var func3 = function() {
  debugger
  console.log('3');
}
func = func.before(func1).after(func3);
func();
