## Ramda 函数库
特点: 
- Function first, Data last 数据统一放在最后一个参数
- 所有方法支持柯里化

---



### 比较运算

`gt`:  判断一个参数是否大于第二个参数

```javascript
console.log(R.gt(2)(3))  // false
```

`gte`:  判断第一个参数是否大于等于第二个参数

```javascript
console.log(R.gte(1)(1))  // true
```

`lt`:  判断第一个参数是否小于第二个参数

```javascript
console.log(R.lt(2)(3))  // true
```

`lte`:  判断第一个参数是否小于等于第二个参数

```javascript
console.log(R.lte(2)(2))  // true
```

`equals`:  比较两个值是否相等 (支持对象的比较)

```javascript
console.log(R.equals({name: 'tom'})({name: 'tom'}))  // true
```

`eqBy`:  比较两个值传入指定函数的运算结果是否相等

```javascript
console.log(R.eqBy(number => ({name: ~~number}))(1)(1.1))  // true
```

---



### 数学运算

`add`:  返回两个值的和

```javascript
console.log(R.add(1)(2))  // 3
```

`subtract`:  返回第一个参数减去第二个参数的差

```javascript
console.log(R.subtract(10)(5))  // 5
```

`multiply`:  返回两个值的乘积

```javascript
console.log(R.multiply(5)(6))  // 30
```

`divide`:  返回第一个参数除以第二个参数的商

```javascript
console.log(R.divide(100)(10))  // 10
```

---



### 逻辑运算

`either`: 接受两个函数作为参数,  只要有一个返回 `true`,  就返回 `true`, 否则返回 `false`,  相当于 || 运算

```javascript
console.log(R.either(flag => flag)(flag => flag)(false))  // false
```

`both`;  接受两个函数作为参数,  只有他们都返回 `true`, 才返回 `true`,  否则返回 `false`,  相当于 `&&`运算

```javascript
console.log(R.both(flag => flag)(flag => flag)(true))  // true
```

`allPass`:  接受一个函数数组作为参数,  只有它们都返回 `true`,  才返回 `true`,  否则返回 `false`

```javascript
  let arr = [() => true, () => true, () => true, () => true]
  console.log(R.allPass(arr)())
```

----



### 字符串

`split`:  按指定分割符将字符串拆成一个数组

```javascript
console.log(R.split('.')('a.b.c.d'))  // [ 'a', 'b', 'c', 'd' ]
```

`test`:  判断一个字符串是否匹配给定的正则表达式

```javascript
console.log(R.test(/x/)('xyz'))  // true
```

---



### 函数

---

#### 函数的合成

`compose`:  将多个函数合并成一个函数,  从右到左执行

```javascript
console.log(R.compose(R.add(1), R.multiply(5))(4))  // 21
```

`pipe`:  将多个函数合并成一个函数,  从右到左执行

```javascript
  let functionArr = [
    num => num + 1,
    num => num + 3
  ]
  console.log(R.converge(R.add, functionArr)(10))  // 24
```



#### 柯里化

`curry`:  将多参数的函数,  转换成单参数的形式

```javascript
  let fun = (...rest) =>
      rest.reduce((acc, item) =>
          R.add(acc)(item), 0)
  console.log(fun(1, 2, 3, 4, 5))  // 15
```

`partial`:  允许多参数的函数接受一个数组,  指定最左边的部分参数

```javascript
  let func = (a, b) => a * b
  console.log(R.partial(func, [4])(2))  // 8
  console.log(R.partial(func, [4, 5])(2))  // 20
```

`partialRight`:  与 `partial`类似,  但数组指定的参数为最右边的参数



`useWith`:  接受一个函数 `fn`和一个函数数组 `fnList`作为参数,  返回  `fn` 的的柯里化版本,  该新函数的参数,  分别经过对应下标的 `fnList` 成员处理,  在传入 `fn`执行

```javascript
  let fun = (a, b) => R.add(a)(b)
  let fun1 = x => R.multiply(5)(x)
  let fun2 = x => R.subtract(100)(x)
  let newFun = R.useWith(fun, [fun1, fun2])
  console.log(newFun(1)(2))  // => fun(5,98) => 103
```



`memoizeWith`:  返回一个函数,  会缓存每一次的运行结果, 接受两个函数,  第一个会将输入的参数序列化为缓存键值对的 "键值",  第二个是需要缓存的函数

```javascript
  let count = 0
  const fun = R.curry(R.memoizeWith(x => ~~x, (a, b) => {
    count ++
    return R.add(a)(b)
  }))
  console.log(fun('1')('2'))  // 3
  console.log(fun(1)(2))  // 3
  console.log(count) // 1
```



`complement`:  对函数的返回值去翻

```javascript
  let fun = flag => flag
  console.log(R.complement(fun)(true))  // false
  console.log(R.complement(fun)(false))  // true
```



#### 函数的执行

`binary`:  参数函数执行时,  只传入最前面两个参数

```javascript
  let fun = (...rest) =>
      rest.reduce((acc, item) =>
          R.add(acc, item), 0)
  fun = R.binary(fun)
  console.log(fun(1, 2, 3))  // 3
```

`tap`:  讲一个值传入指定函数,  并返回该值

```javascript
  let fun = x => Math.pow(x, x)
  console.log(R.tap(fun)(3))  // 3
```

`zipWith`:   将两个数组对应位置的值,  一起作为参数传入某个函数

```javascript
  let fun = (...rest) =>
      rest.reduce((acc, item) =>
          acc + item, 0)
  fun = R.curry(R.zipWith(fun))
  console.log(fun([1, 2, 3])(['a', 'b', 'c']))  // ['1a', '2b', '3c']
```

`apply`:  将数组转换成参数序列,  传入指定函数

```javascript
console.log(R.apply(Math.max, [1, 2, 3]))  // 3
```

`applySpec`:  返回一个模板函数,  该函数会将参数传入模板内的函数执行,  然后将执行结果填充到模板

```javascript
  const fun = R.applySpec({
    add: R.add,
    multiply: R.multiply
  })
  console.log(fun(2)(3))  // { add: 5, multiply: 6 }
```

`ascend`:  返回一个升序的比较函数,  主要用于排序

`descend`:  返回一个降序排序的比较函数,  主要用于排序

---



### 数组

#### 数组的特征判断

`includes`:  如果包含某个成员.  返回 true

```javascript
console.log(R.includes(1)([1, 2, 3]))  // true
```

`all`:   所有成员都满足指定函数时,  返回 `true`,  否则返回`false`

```javascript
console.log(R.all(R.includes(3))([[3], [3, 4, 5]]))   // true
```

`any`:  只要有一个成员满足条件,  就返回 `true`

```javascript
console.log(R.any(R.includes('Stark'))(['Stark', 'Lannister']))
```

`none`:  没有成员满足条件时,  返回 true

```javascript
console.log(R.none(R.includes('Bob'))(['Stark', 'Lannister']))  // true
```



#### 数组的截取和添加

`head`:   返回数组的第一个成员

```javascript
console.log(R.head(['Stark', 'Lannister']))  // 'Stark'
```

`last`:  返回数组的最后一个成员

```javascript
console.log(R.last(['Eddard', 'Catelyn', 'Rickard']))  // 'Rickard
```

`tail`:  返回第一个成员以外 的所有成员组成的新数组

```javascript
console.log(R.tail(['Eddard', 'Catelyn', 'Rickard']))  // ['Catelyn', 'Rickard']
```

`nth`:  取出指定位置的成员

```javascript
console.log(R.nth(1)(['Eddard', 'Catelyn', 'Rickard']))   // 'Catelyn'
```

`take`:  取出前 n 个成员

```javascript
console.log(R.take(2)(['Eddard', 'Catelyn', 'Rickard']))  // ['Eddard', 'Catelyn']
```

`takeLast`:  取出后 n 个成员

`slice`:   从起始位置(包括)开始,  到结束位置(不包括) 为止, 从原数组截取出一个新数组

```javascript
R.slice(1)(3)(['Eddard', 'Catelyn', 'Rickard'])  // ['Eddard', 'Catelyn']
```

`remove`:  移除开始位置的后 n 个成员

```javascript
console.log(R.remove(1, 1)(['Eddard', 'Catelyn', 'Rickard']))  // ['Eddard', 'Rickard']
```

`insert`:  在指定位置插入值

```javascript
console.log(R.insert(1)('Sansa')(['Eddard', 'Catelyn', 'Rickard']))  // ['Eddard', 'Sansa', 'Catelyn', 'Rickard']
```

`insertAll`:  在指定位置插入另一个数组的所有成员

`prepend`:  在数组头部插入一个成员

```javascript
console.log(R.prepend('Sansa')(['Eddard', 'Catelyn', 'Rickard']))  // ['Sansa', 'Eddard', 'Catelyn', 'Catelyn', 'Rickard']
```

`append`:  在数组尾部追加新成员

```javascript
console.log(R.append('Sansa')(['Eddard', 'Catelyn', 'Rickard']))  // ['Eddard', 'Catelyn', 'Rickard', 'Sansa']
```

`intersperse`:  在数组成员之间插入表示分隔的成员

```javascript
console.log(R.intersperse('-')(['Eddard', 'Catelyn', 'Rickard']))  // ['Eddard', '-', 'Catelyn', 'Rickard']
```



#### 数组的过滤

`filter`:  过滤符合条件的成员

`reject`:  过滤所有不符合条件的成员

`takeWhile`:  一旦满足条件,  后面的成员都会被过滤

```javascript
console.log(R.takeWhile(Boolean)([true, 1, 0, '', '被过滤的数据']))  // [ true, 1 ]
```

`dropWhile`:   一旦不满足条件,  取出剩余的所有成员

`without`: 返回指定值以外的成员

```javascript
console.log(R.without(['Eddard'])(['Eddard', 'Catelyn', 'Rickard'])) // ['Catelyn', 'Rickard']
console.log(R.without('Eddard')(['Eddard', 'Catelyn', 'Rickard'])) // ['Catelyn', 'Rickard']
```



 #### 单数组运算

`countBy`:  对每个成员执行指定函数以后,  返回一个对象,  表示各种执行结果分别包含多少成员

```javascript
console.log(R.countBy(x => x)(['Eddard', 'Catelyn', 'Rickard']))  // { Eddard: 1, Catelyn: 1, Rickard: 1 }
```

`splitAt`:  在给定位置,  将原数组分成两个部分

```javascript
console.log(R.splitAt(1)(['Eddard', 'Catelyn', 'Rickard']))  // [ ['Eddard'], ['Catelyn', 'Rickard'] ]
```

`splitEvery`:  按照指定的个数,  将原数组分成多个部分

```javascript
console.log(R.splitEvery(2)(['Eddard', 'Catelyn', 'Rickard']))  // [ ['Eddard', 'Catelyn'], ['Rickard'] ]
```

`splitWhen`: 以第一个满足指定函数的成员为界,  将数组分成两个部分

```javascript
console.log(R.splitWhen(x => x === 'Catelyn')(['Eddard', 'Catelyn', 'Rickard']))  // [ ['Eddard'], ['Catelyn', 'Rickard'] ]
```

`arpeture`:  每个成员与其后台给定数量的成员分成一组,  这些组构成一个新的数组

```javascript
console.log(R.aperture(2)(['Eddard', 'Catelyn', 'Rickard'])) // [ ['Eddard', 'Catelyn'], ['Catelyn', 'Rickard'] ]
```

`partiton`:  根据是否满足指定函数,  将成员分区

````javascript
console.log(R.partition(R.includes('ard'))(['Eddard', 'Catelyn', 'Rickard']))  // [ ['Eddard', 'Rickard'], ['Catelyn'] ]
````

`indexOf`:  某个值在数组中第一次出现的位置,  不存在则返回 - 1

```javascript
console.log(R.indexOf('Rickard')(['Rddard', 'Catelyn', 'Rickard']))  // 2
```

`lastIndexOf`:  某个值在数组中最后一次出现的位置,  不存在则返回 - 1

`map`:  数组的每个成员依次执行某个函数

`mapIndex`:  与 `map`类似, 区别是遍历函数可以获得两个额外参数,  索引位置和原数组

`forEach`:  数组的每个成员依次执行某个函数,  总是返回原数组

`reduce`:  数组成员一次执行指定函数,  每一次的运算结果都会进入一个累计变量

`reduceRight`:  与 `reduce`类似,  区别是数组成员从左到右执行

`reduceWhile`:  与`reduce`类似,  区别是有一个判断函数,  一旦数组成员不符合条件, 就停止累计

`sort`:  按照给定函数,  对数组进行排序

`sort`:  按照给定的一组函数,  进行多长排序

`adjust`:  对指定位置的成员执行给定的函数

```javascript
console.log(R.adjust(1)(R.add(10))([1, 2, 3])) // [1, 12, 3]
```

`ap`:  将数组成员分别执行一组函数,  将结果合成为一个新数组

```javascript
console.log(R.ap([R.add(1), R.multiply(2)])([2, 3, 4]))  // [2, 4, 5, 4, 6, 8]
```

`flatten`:  将嵌套数组铺平

```javascript
console.log(R.flatten([['Eddard'], ['Catelyn'], ['Rickard']]))  // ['Eddard', 'Catelyn', 'Rickard' ]
```

`groupBy`:  将列表根据一定规则分成多个子列表, 并存垂在一个对象中国

```javascript
console.log(R.groupBy(x => R.includes('Stark')(x) ? 'Stark' : 'Lannister')(['Eddard Stark', 'Catelyn Stark', 'Rickard Stark', 'Jaime Lannister']))
// { Stark: ['Eddard Stark', 'Catelyn Stark', 'Rickard Stark'], Lannister: ['Jaime Lannister'] }
```



#### 双数组运算

`concat`:  将两个数组合并成一个数组

`zip`:  将两个数组指定位置的成员放在一起.  生成一个新数组

```javascript
console.log(R.zip([1, 2, 3])([4, 5, 6]))  // [ [1, 4], [2, 5], [3, 6]]
```

`zipObj`:  将两个数组指定位置的成员分别作为键名和键值,  生成一个新的对象

```javascript
console.log(R.zipObj(['Eddard', 'Jaime'])(['Stark', 'Lannister']))  // { Eddard: 'Stark',  Jamie: 'Lannister' }
```

`xpord`:  将两个数组的成员两两混合,  生成一个新的数组

```javascript
console.log(R.xprod([1, 2])([4, 5]))  // [ [1, 4], [1, 5], [2, 4], [2, 5] ]
```

`intersection`:  返回两个数组相同成员组成的新数组

```javascript
console.log(R.intersection([1, 2, 3])([2, 3, 4]))  // [ 2, 3 ]
```

`difference`:  返回第一个数组不包含在第二个数组里面的成员

```javascript
console.log(R.difference([1, 2, 3])([3, 4, 5]))  // [1, 2]
```

`differenceWith`:  返回执行函数后, 第一个数组里面不符合条件的所有成员

```javascript
console.log(R.differenceWith((x, y) => x === y)([1, 2, 3])([3, 4, 5]))  // [ 1, 2]
```

`symmetericDifference`:  返回两个数组的非共有成员组成的一个新数组

```javascript
console.log(R.symmetricDifference([1, 2, 3])([2, 3, 4]))  // [1 , 4]
```

`symmetricDifferenceWith`:  根据指定条件,  返回两个数组运算结果不相等的成员组成的新数组

```javascript
console.log(R.symmetricDifferenceWith((x, y) => x === y)([1, 2, 3])([3, 4, 5]))   // [1, 2, 4, 5]

==== 等于
R.concat(R.differenceWith((x, y) => x === y)([1, 2, 3])([3, 4, 5]), R.differenceWith((x, y) => x === y)([3, 4, 5])([1, 2, 3]))
```



#### 复合数组

`find`:  返回指定条件的成员

`findIndex`:  返回符合指定条件的成员的位置

`findLast`:  返回最后一个符合指定条件的成员

`findLastIndex`:  返回最后一个符合指定条件成员的位置

`pluck`:  取出数组成员的某个属性, 组成一个新数组

```javascript
console.log(R.pluck('name')([{name: 'Eddard'}, {name: 'Catelyn'}]))  // ['Eddard', 'Catelyn' ]
```

`project`:  取出数组成员的多个属性, 组成一个新数组

```javascript
  let stark = [
    { firstName: 'Eddard', lastName: 'Stark' , name: 'Eddard Stark', gender: 'man'},
    { firstName: 'Catelyn', lastName: 'Stark', name: 'Catelyn Stark', gender: 'name' },
    { firstName: 'Rickard', lastName: 'Stark', name: 'Rickard Stark', gender: 'man' },
    { name: 'Jon Snow', gender: 'man'},
  ]
  console.log(R.project(['name', 'gender'])(stark))  // [   { name: 'Eddard Stark', gender: 'man' },{ name: 'Catelyn Stark', gender: 'name' },{ name: 'Rickard Stark', gender: 'man' },{ name: 'Jon Snow', gender: 'man' } ]
```

`transpose`:  将每个成员相同位置的值,  组成一个新数组

```javascript
console.log(R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]))  // [ [1, 2, 3], ['a', 'b', 'c'] ]
```

`mergeAll`:  将对象类型数组合并为一个对象

```javascript
console.log(R.mergeAll([{name: 'Eddard Stark', firstName: 'Eddard'}, {lastName: 'Eddard'}]))  // { name: 'Eddard Stark', firstName: 'Eddard', lastName: 'Stark`}
```

`fromPairs`:  有一系列 `键值对`创建一个对象, 如果某个键出现多次,  选取最右边的键值对

```javascript
console.log(R.fromPairs([['a', 1], ['b', 2], ['b', 3]]))  // { a: 1, b: 3}
```

`sortBy`:  根据给定的函数进行排序

```javascript
console.log(R.sortBy(R.prop('age'))([{name: 'Eddard', age: 50}, {name: 'Catelyn', age: 45}]))  // [ {name: 'Catelyn', age: 45 }, { name: 'Eddard', age: 50 } ]
```



### 对象

---

#### 对象的特征

`has`:  返回一个布尔值,  表示对象自身是否具有该属性

`hasIn`:  返回一个布尔值, 表示对象自身或者原型链上是否具有某个属性

`propEq`:  如果指定对象属性与给定值相等, 则返回 true	

`whereEq`:  接受一个测试规范对象和一个待检测对象,  如果测试对象满足规范. 则返回`true`

```javascript
console.log(R.whereEq({name: 'Eddard Stark', gender: 'man'})({name: 'Eddard Stark', gender: 'man', daugter: 'Sansa Stark'}))  // true
```



#### 对象的过滤

`omit`:  删除对象中给定的 keys 对应的熟悉

```javascript
console.log(R.omit(['firstName'])({firstName: 'Eddard', lastName: 'Stark'}))  // { lastName: 'Stark'}
```

`filter`:  返回满足所有条件的属性

`reject`:   返回所有不满足条件的熟悉



#### 对象的截取

`dissoc`:  删除对象中指定的  prop 属性

```javascript
console.log(R.dissoc('firstName')({firstName: 'Eddard', lastName: 'Stark'}))  // {lastName: 'Stark'}
```

`assoc`:  浅复制对象,  然后设置或覆盖对象中的指定属性

```javascript
R.assoc('name', 'Eddard Stark')({gender: 'man'})  // {gender: 'man' name: 'Eddard Stark'}
```

`partition`:  根据属性值是否满足给定条件,  将属性分区

```javascript
R.partition(R.gt(10))({a: 1, b: 11})  // [ {a:1}, {b:11} ]
```

`pick`:  返回指定属性组成的新对象

```javascript
R.pick(['a', 'b'])({a: 1, b: 2, c: 3})  // {a: 1, b: 2}
```

`piackAll`:  与 pick 类似,  但会包括不存在的属性,  以 key: undefined 的方式返回

```javascript
R.pickAll(['a', 'b', 'c'])({a: 1, b: 2, d: 4})  // { a: 1, b: 2, c: undefined}
```

`pickBy`:  返回对象的部分拷贝,  其中仅包含 key 满足 predicate 的属性

```javascript
R.pickBy((val, key) => R.gt(10)(val))({a: 1, b: 2, c: 11})  // {a: 1, b: 2}
```

`keys`:  返回给定对象所有可枚举, 自身属性的属性名组成的列表

`keysIn`:  返回对象所有属性 ( 包括 prototype 属性) 的属性名组成的列表

`invertObj`:  将属性值和属性名互换, 如果多个属性的属性值相同, 只返回最后一个的属性

```javascript
R.invertObj({a: 'a1', b: 'b1', c: 'a1'}) // {a1: 'c', b1: 'b'}
```

`invert`:  将属性值和属性名互换,  每个属性值对应一个数组

```javascript
R.invert({a: 1, b: 1, c: 2, d: 2})  // { 1: ['a', 'b'], 2: ['c', 'd']}
```



#### 对象的运算

`prop`: 返回对象的指定属性

`map`:  对象的所有属性依次执行一次某个函数

`mapObjIndexed`: 与 `map` 类似, 但是会额外传入属性名和整个对象

`forEachObjIndexed`:  每个属性依次执行给定函数, 返回原对象

`mergeWith`:  使用给定的两个对象自身属性来创建一个新对象, 如果某个 key 在两个对象都存在, 则使用给定的函数进行处理

```javascript
R.mergeWith(R.concat)({a: true, value: [1]})({b: true, value: [2]})
// { a: true, value: [1, 2], b: true}
```

`eqProps`:  判断两个对象的指定属性值是否相等

```javascript
R.eqProps('value')({value: 1})({value: 1})  // true
```

`evolve`:  对象的属性分别经过一组函数处理, 返回一个新对象

```javascript
  let obj = {
    name: ' Eddard ',
    lastName: 'Stark',
    gender: 'man'
  }
  const transformations = {
    name: R.trim,
    lastName: R.concat(obj.name)
  }
  R.evolve(transformations, obj)  
// { lastName: 'Eddard', name: 'Eddard Stark', gender: 'man'}
```



#### 复合对象

`path`:  取出数组中指定路径的值

```javascript
R.path(['a', 'b', 'c'])({a: { b: {c: 1} }})  // 1
```

`pathEq`:  判断对象的嵌套路径是否为给定的值,  通过 `R.qeuals` 函数进行相等性判断, 常用于列表过滤

```javascript
const stark = {
  name: {
    lastName: 'Stark'
  }
}
const lannister = {
  name: {
    lastName: 'Lnnister'
  }
}
const isStark = R.pathEq(['name', 'lastName'], 'Stark')
isStark(stark) // true
R.filter(isStark)(([stark, lannister]))  
// [{name: {firstName: 'Stark'}}]
```

`assocPath`:  浅复制对象,  设置或覆盖即将创建的给定路径所需的节点,  并将特定值放在该路径的末端

```javascript
R.assocPath(['a', 'b', 'c'], 10, {})  // {a: {b: {c: 10}}}
```

