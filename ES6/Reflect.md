## Reflect

`Reflect` 对象与`Proxy`对象一样， 是`ES6`为了操作对象提供的新`API`, `Reflect`对象的设计目的：

> - 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`）,放在`Reflect`对象上，现阶段， 某些方法可以同时在`Object`和`Reflect`对象上部署， 未来新方法将只在`Reflect`对象上，
> - 修改某些`Object`方法的返回结果， 让其变得更加合理
> - 让`Object`操作变成函数行为， 某些`Object`操作时命令式， 比如 `name in obj`和 `delete obj[name]`,  而`Reflect.has(obj.name)`和`Reflect.deleteProperty(obj, name)`让其变成函数行为
> - `Reflect`对象的方法与`Proxy`对象的方法一一对应， 只要是`Proxy`对象的方法， 就能正在`Reflect`对象上找到对应的方法



## 静态方法

`Reflect`对象一共有13个静态方法

>- `Reflect.apply(target, thisArg, args)`
>- `Reflect.construct(target, args)`
>- `Reflect.get(target, name, receiver)`
>- `Reflect.set(target, name, value, receiver)`
>- `Reflect.defineProperty(target, name, desc)`
>- `Reflect.deleteProperty(target, name)`
>- `Reflect.has(target, name)`
>- `Reflect.ownKeys(target)`
>- `Reflect.isExtensible(target)`
>- `Reflect.proeventExtensions(target)`
>- `Reflect.getOwnPropertyDescriptor(target, name)`
>- `Reflect.getPrototypeOf(target)`
>- `Reflcet.setPrototypeOf(target)`
>



### Reflect.get(target, name, receiver)

`Reflect.get`方法查找并返回`target`对象的`name`属性，如果没有该属性，则返回`undefined`

>**参数**
>
>- `target`:  需要取值的目标参数
>- `name`:  需要获取的值得键值
>- `receiver`:  如果遇到getter， 此值将供给目标调用  

```javascript
const person = {
    name: 'yu',
    age: 20,
    like: 'programming'
}
Reflect.get(person, 'name');			// 'yu'
Reflect.get(person, 'like');			// 'programming'
Reflect.get(person, 'hang');			// undefined
```

如果`name`属性部署了getter 函数， 则`getter`函数的`this`绑定`receiver`

```javascript
const person = {
    age1: 10,
	get age(){
        return this.age1 + 10;
	}
}
const age = {
    age1: 11
}
Reflect.get(person, `age`,age);			// 21
```



### Reflect.set(target, name, value, receiver)

静态方法`Reflect.set`方法设置`target`对象的`name`属性等于`value`

>**参数**
>
>- `target`：设置属性的目标对象
>- `name`： 设置目标对象的名称
>- `value`： 设置的值
>- `receiver`：如果遇到`setter`， this将提供给目标调用

```javascript
const person = {
    age: 10,
	set setAge(value) {
        this.age = value;
	}
}
Reflect.set(person, `age`, 100);
pesron.age			// 100
```

如果`Reflect`和`Proxy`联合使用，前者赋值，后者拦截，并且传入了`receiver`，那么`Reflect.set`还会触发`Proxy.defineProperty`拦截



###Reflect.has(target, property)

`Reflect.has`方法对应`in`运算符

```javascript
const person = {
	name: `yu`
}
Reflect.has(person, `name`);			// true
```



### Reflect.deleteProperty(target, property)

`Reflect.deleteProperty`等通过`delete`运算符， 用于删除对象的属性

```javascript
const person = {
    name: `yu`
}
Reflect.deleteProperty(person, `name`);		// true
person.name				// undefined
```



### Reflect.construct(target, args)

`Reflect.construct`等同于 `new target(...args)`， 这提供了了一种不适用 `new`， 来调用构造函数的方法

```javascript
const Person = function(name){
    this.name = name;
}		
new Person(`yu`)
// 等同于
Reflect.construct(Person, [`yu`]);		// Person {name: "yu"}
```



### Reflect.getPrototypeOf(obj)

`Reflect.getProperty(obj)`方法用于读取对象的`__proto__`属性， 对应`Object.getPrototypeOf(obj)`

```javascript
const Person = function(){
	this.name = `yu`
}
const person = new Person();
// 旧写法
Object.getPrototypeOf(person) === Person.prototype;			// true
//新写法	
Reflect.getPrototypeOf(person) === Person.prototype;		// true
```

`Reflect.getPrototypeOf`和`Object.getPrototypeOf`唯一的区别是，如果参数不是对象`Object.getPrototypeOf`会将参数转换成对象，而`Reflect.getPrototype`会报错



### Reflect.setPrototypeOf(obj, newObj)

`Reflect.setPrototypeOf`方法用于设置目标对象的原型， 对应`Object.setPrototypeOf`方法， 它返回一个布尔值，表示是否设置成功

```javascript
const _proto = {}
// 旧写法
Object.setPrototypeOf(_proto, Array.prototype);		// Array
// 新写法
Reflect.setPrototypeOf(_proto, Array.prototype);	// true
```



### Reflct.apply(target, thisArg, args)

`Reflect.apply`方法等同于`Function.prototype.apply.call()`, 用于绑定`this`对象后执行给定函数

```javascript
const arr = [1,23,34,5324,42,4234,534];

// 旧写法
Math.min.call(Math, ...arr);				// 1
Math.max.call(Math, ...arr);				// 5324

// 新写法
Reflect.apply(Math.min, Math, arr);			// 1
Reflect.apply(Math.max, Math, arr);			// 5324
```

`Reflect.apply`方法相对于传统的`call, apply`在速度上快许多

```javascript
console.time(`call`)
Math.min.call(Math, ...arr);
console.timeEnd(`call`)
// call: 0.014892578125ms

console.time(`apply`)
Reflect.apply(Math.min, Math, arr);
console.timeEnd(`apply`)
// apply: 0.005859375ms
```



###Reflect.defineProperty(target,  property, attributes)

`Reflect.defineProperty`方法基本等同于`Object.defineProperty`, 用来为对象定义属性

```javascript
const obj = {};

// 旧写法
Object.defineProperty(obj, `v`, {
    value: 10
})
//   {v: 10}

// 新写法
Reflect.defineProperty(obj, `v`, {
	value: 10
})	
// true
```

`Reflect.defineProperty`方法返回一个布尔值， 表示是否定义成功

`Reflect.defineProperty`可以和`Proxy.defineProperty`配合使用



### Reflect.getOwnPropertyDescriptor(target, property)

`Reflect.getOwnPropertyDescriptor`方法用于得到指定属性的描述对象

```javascript
const obj = { value: 10};
Reflect.getOwnPropertyDescriptor(target, `value`)
{value: 10, writable: true, enumerable: true, configurable: true}
```





### Reflect.isExtensible(target)

`Reflct.isExtensible`方法 返回一个布尔值， 表示当前对象是够可以扩展

```javascript
const obj = {};
Reflect.isExtensible(obj)
// true

```



### Reflext.preventExtensions(target)

`Reflect.preventExtensions`对应`Object.preventExtensions`方法, 用于让一个对象变得不可扩展， 返回一个布尔值， 表示是否成功

```javascript
const obj = {};
Reflect.preventExtensions(obj);
// true
Reflect.isExtensible(obj)
// false
```



### Reflect.ownKeys(target)

`Reflect.ownKeys`方法用于返回对象的所有属性

```javascript
const obj = {
    name: 'zy',
    [Symbol.for('age')]: 99
}
Reflect.ownKeys(obj)
//  ["name", Symbol(age)]
```















