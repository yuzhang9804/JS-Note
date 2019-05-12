##   Generator 函数

`Generator` 函数是`ES6` 提供的一种异步编程的解决方案,  可以把`Generator` 函数是一个状态机, 封装了多个内部状态

指向`Generator` 函数会返回一个遍历器对象, 可以依次遍历`Generator` 函数内部的每一个状态

`Generator`函数 是一个普通函数, 但是有两个特征

- `function`关键字与函数名之前有一个星号

- 函数体内部使用`yield`表达式, 定义不同的内部状态

  ```javascript
  function* generator() {
      yield `a`;
      yield `b`;
      return `c`;
      yield `d`;
  }
  const gen = generator();
  gen.next();
  // {value: "a", done: false}
  gen,next();
  // {value: "b", done: false}
  gen,next();
  // {value: "c", done: true}
  gen,next();
  // {value: undefined, done: true}
  ```

  



### yield 表达式

`Generator` 函数返回的遍历器对象, 只有调用`next`方法 才会遍历下一个内部状态, 所以`ES6`提供了一种可以暂停指向的 函数, `yield`表达式就是暂停标志

`next`方法的运行逻辑

> -  遇到`yield` 表达式 ,  暂停并将紧跟在`yield` 表达式后面的值作为返回对象的`value`值
> - 下一次调用`next`方法时, 再继续执行
> - 如果没有在遇到`yield`表达式,就一直运行到函数结束, 直到`return`语句为止, 并将`return` 后面的值, 作为返回对象的`value` 属性值
> - 如果函数没有`return`语句, 则返回对象的 `value` 属性值为`undefined`

`yield`后面的表达式, 只有当调用`next`方法, 内部指针指向该语句时才会执行



### for...of 循环'

`for...of`循环可以自动遍历`Generator`函数运行时生成的对象

```javascript
function* fn(){
    yield `a`;
    yield `b`;
    yield `c`;
    return `d`;
}
for(let v of fn()){
    console.log(v);
}
// a
// b
// c
```

```javascript
// 利用 Generator 和 for...of 实现斐波那契数列
function* fb(){
    let [a, b] = [0,1];
    while(true){
        yield b;
        [a,b]=[b, a + b];
        if (b > 1000) break;
    }
}
for(let v of fb()){
    console.log(v);
}
```

