// Functor: 如果一个数据类型知道怎么把它的子元素映射到其他值, 它就是个 Functor

// Applicative  Functor: 就是由映射函数组成的 Functor

// 定义一些常量
const FN = x => y => x + y
const ARR1 = [1, 2, 3]
const ARR2 = [3, 4, 5]

// 定义一个函数可以将二维数组转换为一维数组
const flatten = arr => arr.reduce((flat, next) => flat.concat(next), [])

// 定义一个 ap 函数, 将 Applicative  Functor 作用于其他 Functor 的函数
const ap = fns => xs => flatten(fns.map(fn => xs.map(fn)))

console.log(ap([x => x + 1, x => x + 2])(ARR1, ARR2))

// lift 函数: 把一个柯里化函数提升到 Applicative Functor, 然后再将这个 Applicative Functor 作用到其他 Functor
const lift = fn =>
    (head, ...tail) =>
        tail.reduce((fns, xs) => ap(fns)(xs), head.map(fn))

console.log(lift(x => y => x + y)(ARR1, ARR2))

// 实现一些辅助函数
// partial: 给一个函数部分参数, 这个函数会返回一个新的函数, 等待你传给它剩下的参数
const partial =
    (fn, ...arg) =>
        (...restArg) =>
            fn.apply(null, [...arg, ...restArg])

const fn = (a, b, c) => a + b + c
console.log(partial(fn, 1)(2, 3))

// pipe: 传入多个函数, 他会把传入的函数从左至右依次执行, 并把前一个函数的执行结果传给下一个函数
const asyncPipe = (...fns) => x => fns.reduce(async (y, f) => f(await y), x);

const pipe = (...fns) => args => fns.reduce(async (fn, next) => next(await fn), args)

console.log(pipe(x => null, x => x + 2)(1))

// wait: 让函数暂停指定毫秒时间
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

// 开始写逻辑
// 定义一个函数, 等待指定时间后, 改变其颜色
const setColor = async (node, color, ms) => {
  await wait(ms)
  node.style.backgroundColor = color
}

// 获取我们需要变色的节点
const lists = [...document.querySelectorAll('#list li')]

// 指定我们需要变的颜色
const colors = ['green', '#ff6700', '#007fff', 'yellow']

// 提供我们想要的属性组合
const combine = node => color => [node, color]

// 提供我们想要的行为组合
const tasks = lift(combine)(lists, colors).map(comb => partial(setColor, ...comb, 1000))

async function run (pause) {
  await pipe(...tasks)()
  return run(pause)
}

run(1000)

