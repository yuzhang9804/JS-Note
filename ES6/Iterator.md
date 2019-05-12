## Iterator

`Iterator`遍历器 ， 它是一种接口，为不同的数据结构提供统一的访问机制， 任何数据结构只要部署`Iterator`接口，就可以完成遍历操作

`Iterator`有三个作用:

> - 为各种数据结构,提供统一的, 简便的访问接口
> - 是数据结构的成员能够按某种次序排列
> - `ES6`创造了一种新的遍历命令`for...of`循环, `Iterator`接口主要供`for...of`消费



>`Iterator`的遍历过程
>
>- 创建一个指针对象, 指向当前数据结构的起始位置, 也就说,本质上, 遍历器就是一个指针对象
>- 第一次调用指针对象的`next`方法,  可以将指针指向数据结构的第一个成员
>- 第二次调用指针对象的`next`方法,  指针指向数据结构的第二个成员
>- 不断调用指针对象的`next`方法,直到它指向数据结构的结束位置
>
>每一次调用`next`方法, 都会返回数据结构的当前成员信息,  返回一个包含`value`和`done`两个属性的对象, `value`属性是当前属性的值, `done`属性是布尔值, 表示遍历是否结束



`ES6`规定,  默认的`Iterator`   接口部署在数据结构的`Symbol.iterator`属性,  也就是说, 一个数据结构只要具有`Symbol.iterator`属性,  就可以认为是`可遍历的`



原生具有`Iterator` 接口的数据结构

> - Array
> - Map
> - Set
> - String
> - TypedArray
> - 函数的`arguments`对象
> - `NodeList` 对象

```javascript
const arr = [1,2,3];
const iter = arr[Symbol.iterator]();

iter.next();
// {value: 1, done: false}
iter.next();\
// {value: 2, done: false}
iter.next();
// {value: 3, done: false}
iter.next();
// {value: undefined, done: true}

```



## for...of 循环

一个数据结构只要部署了`Symbol.iterator`属性,  就被视为具有`iterator`接口,  就可以使用`for...of`循环遍历它的成员

```javascript
// 通过数组的 entries 方法 获取数组的索引和值
const arr = [`a`, `b`, `c`];
for(let [value, key] of arr.entries()){
    console.log(`${value}+${key}`)
}
// 0+a
// 1+b
// 2+c
```

