const R = require('ramda')

/* ----------- 比较运算 ------------ */
// gt() 判断第一个参数是否大于第二个参数
console.log(R.gt(2)(3))  // false

// gte(): 判断第一个参数是否大于等于第二个参数

// lt: 判断第一个参数是否小于第二个参数
console.log(R.lt(2)(3))  // true

// lte: 判断第一个参数是否小于等于第二个参数
console.log(R.lte(2)(2))  // true

// equals:  比较两个值是否相等 (支持对象的比较)
console.log(R.equals({name: 'tom'})({name: 'tom'}))  // true

// eqBy: 比较两个值传入指定函数的运算结果是否相等
console.log(R.eqBy(number => ({name: ~~number}))(1)(1.1))  // true


/* ------------ 数学运算 ---------- */
// add: 返回两个值的和
console.log(R.add(1)(2))  // 3

// subtract: 返回第一个参数减第二个参数的差
console.log(R.subtract(10)(5))  // 5

// multiply:  返回两个值的乘积
console.log(R.multiply(5)(6))  // 30

// divide:  返回第一个参数除以第二个参数的商
console.log(R.divide(100)(10))  // 10

/* ------------ 逻辑运算 -------------*/
// either:  接受两个函数作为参数,  只要有一个返回 true, 就返回 true , 否则返回 false,  相当于 || 运算
console.log(R.either(flag => flag)(flag => flag)(false))  // false

// both: 接受两个函数作为参数,  只有他们都返回true 才返回true,  否则返回false, 相当于 && 运算
console.log(R.both(flag => flag)(flag => flag)(true))  // true

// allPass: 接受一个函数数组作为参数,  只有它们都返回true,  才返回 true, 否则返回 false
{
  let arr = [() => true, () => true, () => true, () => true]
  console.log(R.allPass(arr)())
}


/*  --------------- 字符串 --------------- */
// split: 按照指定分隔符将字符串拆成一个数组
console.log(R.split('.')('a.b.c.d'))  // [ 'a', 'b', 'c', 'd' ]

// test: 判断一个字符串是否匹配给定的正则表达式
console.log(R.test(/x/)('xyz'))  // true

// match:  返回一个字符串匹配的结果
console.log(R.match(/\d{5}x/)('1234x12345x'))

/* ---------------- 函数 --------------*/
// compose: 将多个函数合并成一个函数, 从右到左执行
console.log(R.compose(R.add(1), R.multiply(5))(4))  // 21

// pipe: 将多个函数合并成一个函数,  从左到右执行

// converge:  接受两个参数,  第一个参数是函数, 第二个参数是函数数组,  传入的值先用第二个参数包含的函数分别处理后,  自用第一个处理前一步生成的结果

{
  let functionArr = [
    num => num + 1,
    num => num + 3
  ]
  console.log(R.converge(R.add, functionArr)(10))  // 24
}

// curry:  将多参数的函数, 转换成单参数的形式
{
  let fun = (...rest) =>
      rest.reduce((acc, item) =>
          R.add(acc)(item), 0)
  console.log(fun(1, 2, 3, 4, 5))  // 15
}

// partial:  允许多参数接受一个数组,  指定最左边的部分参数
{
  let func = (a, b) => a * b
  console.log(R.partial(func, [4])(2))  // 8
  console.log(R.partial(func, [4, 5])(2))  // 20
}

// useWith:  接受一个函数 fn 和一个函数数组 fnList作为参数,  返回 fn 的柯里化版本,  改新函数的参数分别经过对应的 fnList 成员处理, 在传入 fn 执行
{
  let fun = (a, b) => R.add(a)(b)
  let fun1 = x => R.multiply(5)(x)
  let fun2 = x => R.subtract(100)(x)
  let newFun = R.useWith(fun, [fun1, fun2])
  console.log(newFun(1)(2))  // => fun(5,98) => 103
}

//memoizeWith: 返回一个函数,  会缓存每一次的运行结果, 接受两个函数,  第一个会将输入的参数序列化为缓存键值对的 "键值",  第二个是需要缓存的函数
{
  let count = 0
  const fun = R.curry(R.memoizeWith(x => ~~x, (a, b) => {
    count++
    return R.add(a)(b)
  }))
  console.log(fun('1')('2'))  // 3
  console.log(fun(1)(2))  // 3
  console.log(count) // 1
}

// complement:  对函数的返回值反
{
  let fun = flag => flag
  console.log(R.complement(fun)(true))  // false
  console.log(R.complement(fun)(false))  // true
}

// binary: 参数函数执行时,  只传入最前面的两个参数
{
  let fun = (...rest) =>
      rest.reduce((acc, item) =>
          R.add(acc, item), 0)
  fun = R.binary(fun)
  console.log(fun(1, 2, 3))  // 3
}

// tap: 讲一个值传入指定函数, 并返回该值
{
  let fun = x => Math.pow(x, x)
  console.log(R.tap(fun)(3))  // 3
}

// zipWith:  将两个数组对应位置的值,  一起作为参数传入某个函数
{
  let fun = (...rest) =>
      rest.reduce((acc, item) =>
          acc + item, 0)
  fun = R.curry(R.zipWith(fun))
  console.log(fun([1, 2, 3])(['a', 'b', 'c']))  // ['1a', '2b', '3c']
}

// apply:  将数组转换成参数序列,  传入指定函数
console.log(R.apply(Math.max, [1, 2, 3]))  // 3

// applySpec:  返回一个模板函数,  该函数会将参数传入模板的函数执行,  然后将执行结果填充到模板
{
  const fun = R.applySpec({
    add: R.add,
    multiply: R.multiply
  })
  console.log(fun(2)(3))  // { add: 5, multiply: 6 }
}

// ascend:  返回一个升序排列的比较函数,  主要用于排序
{
  let people = [
    { name: 'Catelyn Stark', age: 19},
    { name: 'Eddard Stark', age: 18},
    { name: 'Brandon Stark', age: 20}
  ]
  const fun = R.ascend(R.prop('age'))
  console.log(R.sort(fun)(people))
}

// descend:  返回一个降序排列的比较函数,  主要用于排序

/*  ------------- 数组 -------------- */
// includes:  如果包含某个成员,  返回 true
console.log(R.includes(1)([1, 2, 3]))  // true

// all:  所有成员都满足指定函数时,  返回 true, 否则返回 false
console.log(R.all(R.includes(3))([[3], [3, 4, 5]]))   // true

// any:  只要有一个成员满足条件,  就返回  true
console.log(R.any(R.includes('Stark'))(['Stark', 'Lannister']))

// none:  没有成员满足条件时, 返回true
console.log(R.none(R.includes('Bob'))(['Stark', 'Lannister']))  // true

// head:  返回数组的第一个成员
console.log(R.head(['Stark', 'Lannister']))  // 'Stark'

// last:  返回数组的最后一个成员
console.log(R.last(['Eddard', 'Catelyn', 'Rickard']))  // 'Rickard

// tail:  返回第一个成员以外的所有成员组成的新数组
console.log(R.tail(['Eddard', 'Catelyn', 'Rickard']))  // ['Catelyn', 'Rickard']

// nth: 取出指定位置的成员
console.log(R.nth(1)(['Eddard', 'Catelyn', 'Rickard']))   // 'Catelyn'

// take: 取出前 n 个成员
console.log(R.take(2)(['Eddard', 'Catelyn', 'Rickard']))  // ['Eddard', 'Catelyn']

// takeLast:  取出后 n 个成员

// slice: 从起始位置开始(包括), 到结束位置位置(不包括) 为止, 从原数组截取出一个新数组
R.slice(1)(3)(['Eddard', 'Catelyn', 'Rickard'])  // ['Eddard', 'Catelyn']

// remove: 移除开始为止后的  n 个成员
console.log(R.remove(1, 1)(['Eddard', 'Catelyn', 'Rickard']))  // ['Eddard', 'Rickard']

// insert:  在指定位置插入给定值
console.log(R.insert(1)('Sansa')(['Eddard', 'Catelyn', 'Rickard']))  // ['Eddard', 'Sansa', 'Catelyn', 'Rickard']

// insertAll: 在指定位置插入另一个数组的所有成员
console.log(R.insertAll(1)(['Snow, Brandon'])(['Eddard', 'Catelyn', 'Rickard']))  // ['Eddard', 'Snow', 'Brandon', 'Catelyn', 'Ricjard']

// prepend:  在数组的头部插入一个成员
console.log(R.prepend('Sansa')(['Eddard', 'Catelyn', 'Rickard']))  // ['Sansa', 'Eddard', 'Catelyn', 'Catelyn', 'Rickard']

// append:  在数组尾部追加新成员
console.log(R.append('Sansa')(['Eddard', 'Catelyn', 'Rickard']))  // ['Eddard', 'Catelyn', 'Rickard', 'Sansa']

// intersperse: 在数组成员之间插入表示分隔的成员
console.log(R.intersperse('-')(['Eddard', 'Catelyn', 'Rickard']))  // ['Eddard', '-', 'Catelyn', 'Rickard']

// join:  将数组合并成一个字符串,  并在成员之间插入分隔符

// filter: 过滤符合条件的成员


// reject: 过滤所有不符合条件的成员
// takeWhile:  一旦条件满足, 后面的成员都会被过滤
console.log(R.takeWhile(Boolean)([true, 1, 0, '', '被过滤的数据']))  // [ true, 1 ]
// dropWhile:  一旦不满足条件,  取出剩余的所有成员

// without:  返回指定值以外的成员
console.log(R.without(['Eddard'])(['Eddard', 'Catelyn', 'Rickard'])) // ['Catelyn', 'Rickard']
console.log(R.without('Eddard')(['Eddard', 'Catelyn', 'Rickard'])) // ['Catelyn', 'Rickard']

// countBy:  对每个成员执行指定函数以后,  返回一个对象,  表示各种执行结果分别包含多少成员
console.log(R.countBy(x => x)(['Eddard', 'Catelyn', 'Rickard']))  // { Eddard: 1, Catelyn: 1, Rickard: 1 }

// splitAt:  在给定位置, 将原数组分成两个部分
console.log(R.splitAt(1)(['Eddard', 'Catelyn', 'Rickard']))  // [ ['Eddard'], ['Catelyn', 'Rickard'] ]

// splitEvery:  按照指定的个数,  将原数组分成多个部分
console.log(R.splitEvery(2)(['Eddard', 'Catelyn', 'Rickard']))  // [ ['Eddard', 'Catelyn'], ['Rickard'] ]

// splitWhen:  以第一个满足指定函数的成员为界,  将数组拆分成两个部分
console.log(R.splitWhen(x => x === 'Catelyn')(['Eddard', 'Catelyn', 'Rickard']))  // [ ['Eddard'], ['Catelyn', 'Rickard'] ]

// aperture:  每个成员与其后给定数量的成员分成一组, 这些组构成一个全新的数组
console.log(R.aperture(2)(['Eddard', 'Catelyn', 'Rickard'])) // [ ['Eddard', 'Catelyn'], ['Catelyn', 'Rickard'] ]

// partition:  根据是否满足指定函数,  将成员分区
console.log(R.partition(R.includes('ard'))(['Eddard', 'Catelyn', 'Rickard']))  // [ ['Eddard', 'Rickard'], ['Catelyn'] ]

// indexOf: 某个值在数组中第一次出现的位置, 不存在则返回 -1
console.log(R.indexOf('Rickard')(['Rddard', 'Catelyn', 'Rickard']))  // 2
// lastIndexOf:  某个值在数组中最后一次出现的位置
// map: 数组的每个成员依次执行某个函数
// mapIndexed:  与 map 类似, 区别是遍历函数可以获得两个额外参数,  索引位置和原数组
// forEach: 数组的每个成员一次执行某个函数,  总是返回原数组
// reduce: 数组成员一次执行指定函数,  每一次的运算结果都会进入一个累计变量
// reduceRight:  与 reduce 类似, 区别是数组成员从右到左
// reduceWhile: 与 reduce 类似,  区别是有一个判断函数,  一旦数组成员不符合条件, 就停止累积
// sort: 按照给定函数, 对数组进行排序
// sortWith:  按照给定的一组函数, 进行多重排序

// adjust:  对指定位置的成员执行给定的函数
console.log(R.adjust(1)(R.add(10))([1, 2, 3])) // [1, 12, 3]

// ap:  数组成员分别执行一组函数,  将结果合成为一个新数组
console.log(R.ap([R.add(1), R.multiply(2)])([2, 3, 4]))  // [2, 4, 5, 4, 6, 8]

// flatten: 将嵌套数组铺平
console.log(R.flatten([['Eddard'], ['Catelyn'], ['Rickard']]))  // ['Eddard', 'Catelyn', 'Rickard' ]

// groupBy:  将列表根据一定规则拆分成多组子列表,  并存储在一个对象中
console.log(R.groupBy(x => R.includes('Stark')(x) ? 'Stark' : 'Lannister')(['Eddard Stark', 'Catelyn Stark', 'Rickard Stark', 'Jaime Lannister']))
// // { Stark: ['Eddard Stark', 'Catelyn Stark', 'Rickard Stark'], Lannister: ['Jaime Lannister'] }

// concat: 将两个数组合并成一个数组
// zip:  将两个数组指定位置的成员放在一起,  生成一个新的数组
console.log(R.zip([1, 2, 3])([4, 5, 6]))  // [ [1, 4], [2, 5], [3, 6]]

// zipObj:  将两个数组指定位置的成员分别作为键名和键值, 生成一个新的对象
console.log(R.zipObj(['Eddard', 'Jaime'])(['Stark', 'Lannister']))  // { Eddard: 'Stark',  Jamie: 'Lannister' }

// xprod: 将两个数组的成员亮亮混合,  生成一个新的数组
console.log(R.xprod([1, 2])([4, 5]))  // [ [1, 4], [1, 5], [2, 4], [2, 5] ]

// intersection:  返回两个数组相同成员组成的新数组
console.log(R.intersection([1, 2, 3])([2, 3, 4]))  // [ 2, 3 ]

// difference:  返回第一个数组不包含在第二个数组里面的成员
console.log(R.difference([1, 2, 3])([3, 4, 5]))  // [1, 2]

// differenceWith:  返回执行函数后,  第一个数组里面不符合条件的所有成员
console.log(R.differenceWith((x, y) => x === y)([1, 2, 3])([3, 4, 5]))  // [ 1, 2]

// symmetricDifference:  返回两个数组的非共有成员组成的一个新数组
console.log(R.symmetricDifference([1, 2, 3])([2, 3, 4]))  // [1 , 4]

// symmetricDifferenceWith: 根据指定条件,  返回两个数组所有运算结果不相等的成员所组成的新数组
console.log(R.symmetricDifferenceWith((x, y) => x === y)([1, 2, 3])([3, 4, 5]))   // [1, 2, 4, 5]

// find: 返回符合指定条件的成员
// findIndex: 返回符合指定条件的成员的位置
// findLast:  返回最后一个符合指定条件的成员
// findLastIndex:  返回最后一个符合指定条件的成员的位置
// pluck: 取出数组成员的某个属性, 组成一个新数组
console.log(R.pluck('name')([{name: 'Eddard'}, {name: 'Catelyn'}]))  // ['Eddard', 'Catelyn' ]

// project:  取出数组成员的多个的多个属性, 组成一个新数组
{
  let stark = [
    { firstName: 'Eddard', lastName: 'Stark' , name: 'Eddard Stark', gender: 'man'},
    { firstName: 'Catelyn', lastName: 'Stark', name: 'Catelyn Stark', gender: 'name' },
    { firstName: 'Rickard', lastName: 'Stark', name: 'Rickard Stark', gender: 'man' },
    { name: 'Jon Snow', gender: 'man'},
  ]
  console.log(R.project(['name', 'gender'])(stark))  // [   { name: 'Eddard Stark', gender: 'man' },{ name: 'Catelyn Stark', gender: 'name' },{ name: 'Rickard Stark', gender: 'man' },{ name: 'Jon Snow', gender: 'man' } ]
}

// transpose: 将每个成员相同位置的值,  组成一个新数组
console.log(R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]))  // [ [1, 2, 3], ['a', 'b', 'c'] ]

// mergeAll:  将对象类型的数组的成员合并成一个对象
console.log(R.mergeAll([{name: 'Eddard Stark', firstName: 'Eddard'}, {lastName: 'Eddard'}]))  // { name: 'Eddard Stark', firstName: 'Eddard', lastName: 'Stark`}

// fromPairs: 由一些列 "键值对"创建一个对象,  如果某个键出现多次, 选取最右侧的键值对
console.log(R.fromPairs([['a', 1], ['b', 2], ['b', 3]]))  // { a: 1, b: 3}

// sortBy: 根据给定的函数队列表进行排序
console.log(R.sortBy(R.prop('age'))([{name: 'Eddard', age: 50}, {name: 'Catelyn', age: 45}]))  // [ {name: 'Catelyn', age: 45 }, { name: 'Eddard', age: 50 } ]


/* ---------- 对象 --------------*/
// has: 返回一个布尔值,  表示对象自身是否具有该属性
// hasIn: 返回一个布尔值, 表示对象自身或原型链上是否具有某个属性
// propEq: 如果指定对象属性与给定的值相等,  则返回 true
console.log(R.propEq('name', 'Eddard Stark')({name: 'Eddard Stark'}))  // true
// whereEq:  接受一个测试规范对象和一个待检测对象,  如果测试对象满足规范, 则返回 true
console.log(R.whereEq({name: 'Eddard Stark', gender: 'man'})({name: 'Eddard Stark', gender: 'man', daugter: 'Sansa Stark'}))  // true

// omit:  删除对象中给定的 keys 对应的属性。
console.log(R.omit(['firstName'])({firstName: 'Eddard', lastName: 'Stark'}))

  // filter:  返回满足所有条件的属性
// reject: 返回所有不满足条件的属性

// dissoc:  删除对象中指定的 prop 属性
console.log(
    R.dissoc('firstName')({firstName: 'Eddard', lastName: 'Stark'})
)

// assoc: 浅复制对象, 然后设置或覆盖对象的指定属性
console.log(
    R.assoc('name', 'Eddard Stark')({gender: 'man'})
)

// partition: 根据属性值是否满足给定条件, 将属性分区
console.log(
    R.partition(R.gt(10))({a: 1, b: 11})
)

// pick:  返回指定属性组成的新对象
console.log(
    R.pick(['a', 'b'])({a: 1, b: 2, c: 3})
)

// pickAll: 与 pick 类似,  但会包括不存在的属性, 以 key: undefined 的方式返回
console.log(
    R.pickAll(['a', 'b', 'c'])({a: 1, b: 2, d: 4})
)

// pickBy: 返回对象的部分拷贝,  其中仅包含 key 满足 predicate 的属性
console.log(
    R.pickBy((val, key) => R.gt(10)(val))({a: 1, b: 2, c: 11})
)

// keys: 返回给定对象所有可枚举的、自身属性的属性名组成的列表
console.log(
    R.keys({a: 1, b: 2, c: 3})
)

// keysIn: 返回对象所有属性 (包括 prototype属性 ) 的属性名组成的列表
// values: 返回对象所有自身可枚举的属性的值
// valuesIn:  返回对象所有属性的值,  包括原型链上的属性

// invertObj:  将属性值和属性名互换, 如果多个属性的属性值相同, 只返回最后一个属性
console.log(
    R.invertObj({a: 'a1', b: 'b1', c: 'a1'})
)

// invert:  将属性值和属性名互换. 每个属性值对应一个数组
console.log(
    R.invert({a: 1, b: 1, c: 2, d: 2})
)

// prop: 返回对象的指定属性
// map: 对象的所有属性依次执行某个函数
// mapObjIndexed: 与 map 类似, 但是会额外传入属性名和整个对象
// forEachObjIndexed: 每个属性依次执行给定函数, 给定函数的参数分别是属性值和属性名, 返回原对象
// mergeWith: 使用给定的两个对象自身属性来创建一个新对象, 如果某个 key 在两个对象都存在, 则使用给定的函数进行处理
console.log(
    R.mergeWith(R.concat)({a: true, value: [1]})({b: true, value: [2]})
)

// eqProps:  判断两个对象的指定的属性值是否相等, 通过 R.equals 函数进行相等性判断
console.log
  (R.eqProps('value')({value: 1})({value: 1})
)

// evolve: 对象的属性分别经过一组函数处理, 返回一个新对象
{
  let obj = {
    lastName: ' Eddard ',
    name: 'Stark',
    gender: 'man'
  }
  const transformations = {
    name: R.concat(obj.lastName),
    lastName: R.trim
  }
  console.log(
      R.evolve(transformations, obj)
  )
}

// path: 取出数组中指定路径的值
console.log(
    R.path(['a', 'b', 'c'])({a: { b: {c: 1} }})
)

// pathEq: 判断对象的嵌套路径上是否为给定的值,  通过 R.equals 函数进行相等性判断, 常用于列表过滤
{
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
  console.log(isStark(stark))
  console.log(
      R.filter(isStark)(([stark, lannister]))
  )
}


// assocPath: 浅复制对象, 设置或覆盖即将创建的给定路径所需的节点, 并将特定值放在该路径的末端
console.log(
    R.assocPath(['a', 'b', 'c'], 10, {})
)

