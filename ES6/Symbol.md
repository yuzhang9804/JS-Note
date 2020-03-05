## Symbol

`ES6` 引入了一种新的元素数据类型`symbol`. 表示独一无二的值， 它是JavaScript 语言的第七种数据类型

`Symbol`值通过 `Symbol`函数生成 , 凡是对象属性名属于`Symbol`类型,就是独一无二的的, 可以保证不会和其他属性,名发生冲突

常用的内置API
- Symbol.hasInstance 当其他对象调用 instanceof 运算符, 判断是否为对象实例时, 会调用这个方法
```javascript
class Stark {
  constructor (name) {
    this.name = name;
  }

  [Symbol.hasInstance]() {
    return true;
  }
}

[1] instanceof new Stark('Eddard')  // true
```
- Symbol.isConcatSpreadable  等于一个布尔值, 表示该对象用于 Array.prototype.concat()时, 是否可展开
```javascript
const arr = [1, 2, 3]
arr[Symbol.isConcatSpreadable] = false;
const newArr = arr.concat([4]);
newArr  // [[1, 2, 3], 4]
```
- Symbol.species 指向一个构造函数, 创建衍生对象时,  会使用该属性
```javascript
class MyArray extends Array{
}

const a = new MyArray();
const b = a.filter(x => x);
b instanceof MyArray // true
b instanceof Array  // true
```
上述代码中, `MyArray` 继承了父类 `Array`, `a`是 `MyArray` 的实例, `b`是`a`的衍生对象, 因此, `JavaScript`认为 `b`是`MyAray`的实例
```javascript
class MyArray extends Array{
  static get [Symbol.species] () {
    return Array;
  }
}

const a = new MyArray();
const b = a.filter(x => x);
b instanceof MyArray  // false
b instanceof Array  // true
```
- Symbol.match 指向一个函数, 当执行`String.match(myObject)`时, 如果该属性存在, 则会调用它, 返回该方法的返回值
- Symbol.replace
- Symbol.search 
- Symbol.split
- Symbol.iterator 指向对象的默认遍历器方法
- Symbol.toPrimitive  指向一个方法, 该对象被转换为原始类型值时, 会调用这个方法, 返回对象对应的原始类型的值
- Symbol.toStringTag 指向一个方法, 在该对象上面调用 `Object.prototype.toSting`方法时, 如果这个属性存在, 它的返回值会出现在 `toString`方法返回的字符串中
```javascript
 class Collection {
   get [Symbol.toStringTag] () {
     return 'xxx';
   }
 }
 const x = new Collection();
 x.toString();  // [Object xxx]
```
- Symbol.unscopables 指向一个对象, 该对象使用 `with` 关键字时, 那些属性会被 `with`环境排除
