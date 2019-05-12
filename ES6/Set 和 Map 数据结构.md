## Set

`ES6`提供了新的数据结构 `Set`, 它类似于数组,但是成员的值都是唯一的, 没有重复的值

`Set`本身是一个构造函数,用来生成 `Set`数据结构

```javascript
const set = new Set();
console.log(set instanceof Set);        // true
```

`Set`函数可以接受一个数字作为参数，用来初始化

因此可以利用`Set`函数的参数来去除数组中重复的成员，或字符串中重复字符 

```javascript
console.log([...new Set([1, 2, 3, 4, 3, 2, 1])]);           
//  [1, 2, 3, 4]
console.log([...new Set('abcba')].join(''));                
// 'abc'
```

向`Set`函数中添加值时， 不会发生类型转换， `Set`内部判断两个值是否不同，使用的算法叫`Same-value-zero equality`（零值相等） ，它与严格相等运算符（===）的主要区别在于`NaN`, 它认为`NaN`等于自身



## Set 实例的属性方法

>`Set`实例属性：
>
>- `Set.prototype.constructor`： 构造函数，默认值就是`Set`函数
>- `Set.prototype.size`: 返回`Set`实例的成员总数

>`Set`实例方法：操作方法 和 遍历方法
>
>---- 操作方法
>
>- `add(value)`： 添加某个值，返回Set 结构本身
>- `delete(value)`： 删除某个值，返回一个布尔值，表示是否删除成功
>- `has(value)`：返回一个布尔值，表示该值是否为`Set`成员
>- `clear()`: 清除所有成员，没有返回值
>
>使用`Array.from(new Set(arr))`可以快速去除数组重复成员
>
>
>
>---- 遍历方法
>
>- `key()`：返回键名的遍历器
>- `values()`： 返回键值的遍历器
>- `entries()`：返回键值对的遍历器
>- `forEach()`：使用回调函数遍历每个成员
>
>需要注意的是， `Set`的遍历顺序就是插入排序， 因此使用`Set`保存一个回调函数列表，调用时就能保证按照添加顺序调用

遍历的应用

- 数组去重
- 将`map`和`filter`作用于`Set`

```javascript
const set = new Set([1,2,3]);
new Set([...set].map(x => x * 2))				// Set(3) {2, 4, 6}
new Set([...set].filter(x => x > 2))			// Set(1) {3}
```

- 使用`Set`实现并集， 交集和差集

```javascript
const set1 = new Set([1,2,3,4]);
const set2 = new Set([3,4,5,6]);
// 交集
new Set([...set1],[...set2])					// Set(4) {1, 2, 3, 4}
// 并集
new Set([...set1].filter(x => set2.has(x)))		// Set(2) {3, 4}
// 差集
new Set([...set1].filter(x => !set2.has(x)))	// Set(2) {1, 2}
```



## Map

`ES6`提供`Map`数据结构， 它类似于对象，也是键值对的集合， 但·键· 的范围不限于字符串， 各种类型的值（包括对象）都可以当作键

```javascript
const map = new Map([[1,2],[3,4]]);
map			// Map(2) {1 => 2, 3 => 4}
```

任何具有`Iterator`接口的，且每个成员是一个双元素的数组的数据结构， 都可以当作`Map`构造函数的参数，`Set`和`Map`也可以用来生成新的`Map`

--- 注意， 只有对同一个对象的引用， `Map`结构才将其视为同一个键， 如果`Map`的键是一个简单类型的值， `Map`内部采用的算法和 `Set`类型，与严格相等运算符的唯一区别是，它认为`NaN`等于自身

>`Map`的属性和操作方法
>
>属性
>
>- `Set.prototype.constructor`： 构造函数，默认值就是`Set`函数
>- `Set.prototype.set`：返回`Map`结构的成员数
>

操作方法

>- `set(key, value)`： `set`方法设置键名`key`对应的键值为`value`, 然后返回整个`Map`结构， 如果`key`已有值， 则会覆盖
>- `get(key)`：`get`方法读取`key`对应的键值， 如果找不到`key`，则返回`undefined`
>- `has(key)`： `has`方法返回一个布尔值, 表示某个键是否在当前`Map`对象之中
>- `delete(key)`:   `delete`方法删除某个键, 返回一个布尔值, 表示是否删除成功
>- `clear()`:   清除所有成员, 没有返回值

遍历方法
>- `key()`：返回键名的遍历器
>- `values()`： 返回键值的遍历器
>- `entries()`：返回键值对的遍历器
>- `forEach()`：使用回调函数遍历每个成员

遍历顺序和`set`一样,  是插入排序 (默认遍历接口时 `entries`)

