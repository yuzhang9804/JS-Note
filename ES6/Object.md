# ***ES6

## Object.is()

ES6 提出 “same-value equality”（同值相等）算法， 解决相等运算符 和 严格相等运算符的缺点

它们的不同之处只有两个：

- +0 不等于 -0
- `NaN` 等于自身

ES5可以通过 Object.defineProperty() 来部署 Object.is

Object.defineProperty() 方法会直接在对象上定义一个属性，或者修改一个对象的现有属性，并返回这个对象

Object.defineProperty(obj, prop, descriptor) 参数

> - obj:  要在其上定义的对象
> - prop:  定义或者修改的属性的名称
> - desriptor: 将被定义或修改的属性描述符
> - 返回值:  被传递给函数的对象

````javascript
Object.defineProperty(Object, 'js',{
    value: function(x,y) {
        if(x === y){
            // 针对 -0 === +0 的情况
			return x !== 0 || 1 / x === 1/ y
		}
        // 针对 NaN 不等于 NaN 的情况
        return x !== x && y !== y
    },
    configurable: true,
    enumerable: false,
    witable: true
})
````





## Object.assign()

`Object.assign()`方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象,它将返回目标对象

`Object.assign(target, ...sources)`

>参数: 
>
>- target: 目标对象
>- sources: 源对象
>
>返回值:
>
>- 目标对象

```javascript
const obj1 = {a:1};
const obj2 = {b:2};
console.log(Object.assign({}, obj1, obj2));     // {a: 1, b:2}
```

基本用途:

>- 如果目标对象于源对象有同名属性, 或多个源对象有同名属性,则后面的属性会覆盖前面的属性
>- 如果只有一个参数, `Object.assign()`会直接返回该参数, 如果参数不是对象则会直接返回这个参数, 如果该参数不是对象,则会先转成对象, 然后再返回,  由于 undefined 和 null 无法转化成对象,如果将它们作为参数,则会报错
>- 如果非对象参数出现在源对象的位置 , 即非首参数, 会先将这些参数转化成对象,如果无法转换,则会跳过, 其他类型的值,除了字符串会以数组形式拷贝如对象, 其他值都不会产生效果
>- `Object.assign` 要拷贝的对象是有限制的,只拷贝源对象自身的属性,不拷贝继承属性, 也不拷贝不可枚举的属性
>- 属性名为 Symobl 值得属性, 也会呗`Object.assign` 拷贝



注意事项:

>- 浅拷贝
>
>`Object.assign()`的方法实行的是浅拷贝, 如果源对象的某个属性值是对象,那么目标对象拷贝得到的就是这个对象引用
>
>```javascript
>const obj1 = {
>	a:1,
>b: { b1: 1 }
>};
>const obj2 = Object.assign({},obj1);
>obj1.b.b1 = 10;
>console.log(obj2);      //{a:1,b: {b1:10}}
>```
>
>- 同名属性的替换
>
>`Object.assign()`遇到同名对象，它的处理方法是替换，因此遇到嵌套对象，需要注意
>
>```javascript
>const obj1 = {a:{b:1, c:2}};
>const obj2 = {a:{d:3, e:4}};
>console.log(Object.assign(obj1, obj2));     // a:{d:3,e:4}
>```
>
>- 数组的处理
>
> `Object.assign()`可以用来处理数组，但是会把数组是为对象
>
>```javascript
>console.log(Object.assign([1, 23, 4], [5, 7]));     //  [5, 7, 4]
>```
>
>- 取值函数的处理
>
>  
>
>`Objetc.assign`只能进行值得复制, 如果要复制的是一个取值函数,会先求值再赋值
>
>```javascript
>const obj = {
>	get fn(){
>		return 10;
>    },
>    a: 10
>};
>console.log(Object.assign({}, obj));        // {fn: 10, a: 10}
>```



常用用途

>- 为对象添加属性
>- 为对象添加方法
>- 克隆对象
>- 合并多个对象
>- 为属性指定默认值





## Object.getOwnPropertyDescriptors()

ES5 的 `Object.getOwnProperttyDescriptor() `方法返回某个对象属性的描述对象, ES2017 引入了 `Object.getOwnPropertyDescriptors()`方法 , 返回指定对象所有自身属性的描述对象

Object.getOwnPropertyDescriptors() 引入的目的就是为了解决 Object.assgin() 无法正确拷贝 get 属性 和 set 属性的问题

```javascript
const source = {
	set fn(x) {
	    console.log(x);
    }
};
const target = {};
Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
```

- 克隆对象 (浅拷贝)

```javascript
const clone = function(obj) {
    return Objcet.create(obj, Objcet.getOwnDescriptors(obj))
}
```

- 继承

```javascript
const inherit = function(obj,parameter) {
    return Object.create(obj,Object.getOwnDescriptors(parameter)
}
```



## Object.keys(), Object.values(), Object.entries()

ES2017 引入了 跟`Object.keys()` 配套的 `Objcet.values()`方法和 `Objcet.entries()`方法, 作为一个遍历对象的补充手段,供`for...of`使用

- `Objcet.keys()`返回一个数组是, 成员是参数对象自身的可遍历(enumerable)属性的键名
- `Objcet.values()`返回一个数组, 成员是参数对象自身的所有可遍历的键值
- `Object.entries()`返回一个数组, 成员是参数对象自身的所有可遍历属性的键值对

`Object.entries()`方法的基本用途是遍历一个对象

```javascript
const obj = {one: 1, two: 2, three: 3};
for(let [key,value] of Object.entries(obj)){
    console.log(`${key}--${value}`)
}
// one--1
// two--2
// three--3`

// 还可以将一个对象转化为真正的 Map 结构
new Map(Object.entries({a:1,b:2}));
// Map(2) {"a" => 1, "b" => 2}
```

`	Object.entries()`的函数版本

```javascript
function entries(obj){
    const arr = [];
    for(let key of Object.keys(obj)){
        arr.push([key,obj[key]])
    }
    return arr;
}
```



## Object.fromEntries()

`Objcet,fromEntries()`方法是 `Object.entries()`方法的逆向操作, 用于将键值对的数据结构还原为数组, 因此特别适合 将Map 结构转换成对象

```javascript
Object.fromEntries(new Map().set('a',1).set('b',2));
// {a: 1, b: 2}
```

还可以配合 `UERSearchParams`对象,将查询字符串转化为数组

```javascript
Object.fromEntries(new URLSearchParams('a=1&b=2'));
// {a: "1", b: "2"}
```

























