// 一个海鸥程序, 鸟群合则变成一个更大的鸟群, 繁殖则增加鸟群的数量, 增加的数量就是它们繁殖出来的海鸥的数量
{
  // 创建一个 Flock 对象
  const Flock = function (n) {
    this.seagulls = n
  }

  // 聚合鸟群 conjoin
  Flock.prototype.conjoin = function (other) {
    this.seagulls += other.seagulls
    return this
  }

  // 鸟群繁殖
  Flock.prototype.bread = function (other) {
    this.seagulls = this.seagulls * other.seagulls
    return this
  }

  const flock_a = new Flock(4)
  const flock_b = new Flock(2)
  const flock_c = new Flock(0)

  const result = flock_a.conjoin(flock_c).bread(flock_b).conjoin(flock_a.bread(flock_b))
  console.log(result.seagulls)
}


// 使用函数式编程的方式改写
{
  // 定义一个 鸟群聚合 函数
  const conjoin = (flock_a, flock_b) => flock_a + flock_b
  // 定义一个 鸟群繁殖 函数
  const bread = (flock_a, flock_b) => flock_a * flock_b

  const flock_a = 4
  const flock_b = 2
  const flock_c = 0

  const result = conjoin(bread(flock_b, conjoin(flock_a, flock_c)), bread(flock_a, flock_b))
  // 等价于
  const _result = bread(flock_b, conjoin(flock_c, conjoin(flock_a, flock_a)))
  console.log(result)
  console.log(_result)
}

{
  // 柯里化 curry
  const add = x => y => x + y
  const increment = add(10)

  console.log(increment(5))

  const R = require('ramda')
  // 通过局部调用移除所有参数
  const words = str => R.split('', str)

}

{
  // 代码结合
  // 函数饲养
  const compose = (f, g) => x => f(g(x))
  // f 和 g 都是函数, x 是它们之间通过 '管道' 传输的值

}


{
  const R = require('ramda')

  // (a -> Bool) -> [a] -> [a]
  const fn = R.compose(R.map(x => x + 1), R.filter(R.compose(x => x > 1, x => x + 1)))
  //  ====== 等价于
  const fn2 = R.compose(R.filter(x => x > 1), R.map(x => x + 1))

  console.log(fn([1, 2, 3]))
  console.log(fn2([1, 2, 3]))

  console.log(R.filter(R.compose(x => x > 1, x => x + 1))([0, 2, 3]))
}

{
  // 容器
  // 创建一个可以包含任意值的容器
  const Container = function (x) {
    this._value = x;
  }

  Container.of = function (x) {
    return new Container(x);
  }

  console.log(Container.of(3))
  console.log(Container.of('Yu Zhang'));
  console.log(Container.of(Container.of({name: 'Stark'})));

  // Functor
  // (a -> b) -> Container a -> Container b
  Container.prototype.map = function (f) {
    return Container.of(f(this._value));
  }

  console.log(Container.of(10).map(x => x + 1))

  // Maybe
  const Maybe = function (x) {
    this._value = x;
  }

  Maybe.of = function (x) {
    return new Maybe(x);
  }

  Maybe.prototype.isNothing = function () {
    return (this._value === null || this._value === undefined);
  }

  Maybe.prototype.map = function (f) {
    return Maybe.of(this.isNothing() ? null : f(this._value));
  }

  // 当 map 值为空时, 代码并没有报错, 这是因为每次函数调用四 Maybe 都会检查它自己的值是否为空
  console.log(Maybe.of(undefined).map(x => x + 1));
}
