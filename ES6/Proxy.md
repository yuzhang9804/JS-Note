## Proxy

`Proxy`用于修改某些操作的默认行为，等同于在语言层面作出修改，属于一种“ 元编程 ”， 即面向编程语言编程

`Proxy` 可以理解为。在目标对象之前设一层“拦截”， 外界对该对象的访问， 都必须先通过这层拦截， 因此提供了一种机制，可以对外界的访问进行过滤或改写。

`ES6`原生提供 `Proxy` 构造函数, 用来生成 `Proxy`实例

```javascript
const proxy = new Proxy(target, handler)
```

`target`参数表示要拦截的目标对象， `handler`参数也是一个对象，用来定制拦截行为，如果`handler`没有设置任何拦截， 那就等同于直接通向对象， 不会有任何拦截效果

```javascript
const obj ={
    name: 'zs'
};
const proxy = new Proxy(obj,{
    // get 方法接受三个参数， 目标对象，属性名 和 proxy实例本身
	get: function(target, property){
        if(property in target){
    		return target[property];
		}else{
            return 2;
        }
    }                       
})
proxy.name			// 'zs'
proxy.age			// 2
```



## Proxy 实例的方法

> - `get(target, property, receiver)`: 拦截对象属性的读取
> - `set(target, property, value, receiver)`: 拦截对象属性的设置
> - `has(target, property)`: 拦截 `property in proxy`的操作（可以看作针对`in`操作符的钩子）， 返回一个布尔值
> - `deleteProperty()`: 拦截`delete proxy[property]`的操作， 返回一个布尔值
> - `ownKeys(target)`: 拦截`Object.getOwnPropertyNames(proxy)`， `Object.getOwnPropertySymbols(proxy)`, `Object.keys(proxy)`， `for...in`的操作， 返回一个布尔值
> - `getOwnPropertyDescriptor(target, property)`:  拦截`Object.getOwnPropertyDescriptor(proxy, propkey)`, 返回属性的描述对象
> - `defineProperty(target, property, descriptor)`:  拦截`Object.defineProperty(proxt, property, descriptor)`,  `Object.defineProperty(proxy, descriptor)`， 返回一个布尔值
> - `preventExtensions(target)`： 拦截`Object.prevetnExtensions(proxy)`，返回一个布尔值
> - `isExtensible(target)`： 拦截`Object.isExtensible(proxy)`， 返回一个布尔值
> - `getPropertyOf(target)`：拦截`Object.getPrototypeOf(proxy)`， 返回一个对象
> - `setPropertyOf(target, prop)`:  拦截`Object.setPropertyOf(proxy, proto)`, 返回一个布尔值， 如果目标对象是函数， 那么还有两种额外操作可以拦截
> - `apply(target, object,args)`： 拦截`Proxy`实例作为函数调用的操作，比如`proxy(...args)`, `proxy.call(object,...args)`, `proxy(object,...args)`
> - `construct(target, args)`:  拦截`Proxy`s实例作为构造函数调用的操作， 比如`new proxy(...args)` 



### get()

***

`get(target, property, receiver)`方法用于拦截某个属性的读取操作，可以接受三个参数:

- `target`：目标对象
- `property`：属性名
- `receiver`：`Proxy`或者继承`Proxy`的对象

通过`get`方法实现数组读取负数索引

```javascript
function createArray(...elements){
    return new Proxy(...elements, {
        get(target, property, receiver){
            // property 是字符串
            let index = ~~(property);
            if (property in target){
                return target[property];
            }else{
                if(index < 0) index += target.length;
            	return target[index];
			}
        }
    })
}
const arr = [1,2,3,5];
createArray(arr)[-1];			// 5
```

如果一个属性不可配置（`configurable`）且不可写（`writable`）， 则`proxy`不能修改该属性，否则会报错



### set()

`set(target, property, value, receiver)`方法用来拦截某个属性的赋值操作， 可以接受四个参数：

- `target`：目标对象
- `property`： 属性名
- `value`： 新值
- `receiver`：`Proxy`或者继承`proxy`的对象， 可能会在原型链上或其他地方被间接调用

```javascript
const validator = {
    set(target, property, value, receiver){
        if(property === 'age' && Number.isInteger(value) && value < 200){
            target[property] = value;
        }else{
            throw new RangeError(`The ${property} is invalid`);
        }
    }
}
let person = new Proxy({}, validator);
person.age = 100;
person;
```

如果目标对象自身的某个属性是不可写且不可配置， 那个`set`方法将无效

在严格模式下， 如果`set`没有返回`true`, 就会报错



### apply()

`apply(target, thisArg, argumentsList)`方法用于拦截函数的调用，可以接受三个参数

- `thisArg`： 被调用时的上下文对象(this)
- `argumentsList`：被调用时的参数数组

返回值： `apply`方法可以返回任何值

```javascript
// 一个简单的例子
const target = _ => 'target';
const handler = {
    apply(target, thisArg, argumentsList){
        return 'proxy';
    }
}
const proxy = new Proxy(target, handler);
proxy();					//`proxy`
```



### has()

`has(target, property)`：可以看作是针对`in`的钩子，即判断对象是否具有某个属性是，返回一个布尔值

```javascript
// 利用has() 方法隐藏属性
const handler = {
    has(target, property){
        if(property[0] === '_'){
            return false;
        }
        return property in target;
    }
}
Object.prototype.age = 10;
const obj = {_pro: 'pro', name: 'Yu'};
const proxy = new Proxy(obj, handler);
`_pro` in proxy;		// false
//`age`不是 obj 自身的属性，而是继承制 Object。prototype
`age` in proxy;		// true
// has 方法拦截的是 HasProperty 操作， 即不判断属性是对象自身的还是继承的属性
```

如果一个对象禁止扩展或者不可配置， 使用`has`拦截就会报错

`for...in` 虽然用到`in`运算符， 但是 `has`拦截对`for...in`无效



### construct()

`construct(target, args, newTarget)`:    用于拦截`new`命令, 必须返回一个对象， 否则会报错

```javascript
const handler = {
    construct(target, args, newTarget){
        return {target: target,args: args, newTarget: newTarget};
    }
}
const obj = new Proxy(Object, handler);
new obj(1,2,3)
```



### `deleteProperty()`

`deleteProperty(target, property)`： 拦截对象属性`delete`操作， 返回一个布尔值

拦截

> - 删除属性：`delete proxy[prop]`和 `delete proxy.prop`
> - `Reflect.deleteProperty()`



### defineProperty()

`defineProperty(target, property, descriptor)`： 拦截`Object.defineProperty`操作

- `descriptor()`:    待定义或修改的属性描述符

拦截

>- `Object.difineProperty()`
>
>- `Reflect.defineProperty()`



### getOwnPropertyDescriptor()

`getOwnPropertyDescriotor`方法拦截`Object.getOwnPropertyDescriptor()`, 返回一个属性描述对象或者`undefined`

> - `target`：目标对象
> - `property`：返回属性名的描述



### getPrototypeOf

`getPrototypeOf()`方法主要用于拦截获取对象原型

拦截

>- `Object.prototype__proto__`
>- `Object.prototype.isPrototypeOf`
>- `Object.getPrototypeOf()`
>- `Reflect.getPrototypeOf()`
>- `instanceof`

如果目标对象不可扩展， `getPrototypeof`方法必须返回目标对象的原型对象，否则会报错



### isExtensible()

`isEtensible`方法拦截`Object.isExentsible`操作（判断对象是否可扩展）

注意，这个方法的返回值必须和目标对象的`isExtensible()`属性保持一致，否则会抛出错误



### ownKeys()

`ownKeys`方法用来拦截对象自身属性的读取操作

> - `Object.getOwnPropertyNames()`
> - `Oject.getOwnPropertySymbols()`
> - `Object.keys()`
> - `for...in循环`

`ownKeys`方法返回的数组成员， 只能是字符串或`Symbol`值, 如果有其他之，或者返回不是一个数组，则会报错

如果目标对象是不可扩展的，`ownKeys`方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性， 否则会报错



### preventExtensions()

`preventExtensions`方法拦截`Object,preventExtensions()`(让一个的对象变得不可扩展), 该方法必须返回一个布尔值， 否则会被自动转化为布尔值

注意, 只有目标对象为不可扩展时，`proxy.preventExtensions`才能返回`true`， 否则会报错



### setPrototypeOf()

`setPrototypeOf`方法主要用来拦截`Object.setPrototypeOf`方法， 该方法只能返回布尔值， 否则会被自动转化为布尔值



## Proxy.revocable()

`Proxy.revocable`方法返回一个可取消的Proxy 实例

```javascript
let target ={};
let handler = {};
Proxy.revocable(target, handler);			
// {proxy: Proxy, revoke: ƒ}
```

`Proxy.revocable`返回一个对象，其中

- `proxy`  表示新生成的代理对象本身， 和 `new Proxy(target, handler)`创建的代理对象没有什么不同，只是可以被撤销掉啊
- `revoke` 撤销方法， 调用时不需要任何参数， 可以撤销和他一起生成的那个代理对象

一旦某个代理对象被撤销掉， 它将变得几乎完全不可用， 它身上执行的任何**可代理操作**都会抛出异常, 一旦被撤销， 这个代理对象永远不可能被恢复

**应用场景**

目标对象不允许直接访问， 必须通过代理，一旦访问结束，就收回代理权， 不允许再次访问



## this

在`Proxy`代理的情况下， 目标对象内部的`this`关键字会指向`Proxy`代理



