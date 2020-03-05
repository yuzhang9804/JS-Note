// flatten: 将二维数组转换成一位数组
const flatten = arr => arr.reduce((flat, next) => flat.concat(next), []);

// ap 函数
const ap = fn => xs => flatten(fn.map(fn => xs.map(fn)))

// lift: 讲一个柯里化函数提神到 ap , 然后再将这个 ap 函数作用于其他的 Functor
const lift = fn => (head, ...tail) => tail.reduce((fn, xs) => ap(fn)(xs), head.map(fn))

// chunk: 将一个一维数组转换为二维数组, 且二维数数组的子数组长度可定制
const chunk = (arr, size) => arr.reduce((chunked, item) => {
  const last = chunked[chunked.length - 1];
  if (!last || last.length === size ) {
    chunked.push([item]);
    return chunked;
  }
  last.push(item);
  return chunked
}, [])

// partial: 给一个参数部分参数, 这个函数会返回一个新的函数, 等待你传给它剩余的参数
const partial = (fn, ...arg) => (...rest) => fn.apply(null, [...arg, ...rest])

// pipe: 传入多个函数, 他会把传入的函数依次执行, 把第一个函数返回的结果当成第二个函数的参数

const pipe = (...fns) => args => fns.reduce((fn, next) => next(fn), args)


const asyncPipe = (...fns) => args => fns.reduce(async (fn, next) => next(await fn), args)

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const itemArr = [...document.querySelectorAll('#list > li')];
const colorArr = ['green', '#ff6700', 'pink', '#007fff'];
const timeArr = [[0, 1000], [1, 1500], [2, 2000], [3, 2500]];

const setColor = async (node, color, time) => {
  await wait(time[1]);
  node.style.backgroundColor = color;
}

const combine = node => color => time => colorArr.indexOf(color) === time[0] && [node, color, time];

const tasks = lift(combine)(itemArr, colorArr, timeArr).filter(Boolean).map(item => partial(setColor, ...item));

const chunkedTask = chunk(tasks, 4);

const run = async (pause) => {
  let tempKey = 0;
  for (let task of chunkedTask) {
    await asyncPipe(...task)();
    await wait(pause[tempKey++]);
  }
  return run(pause);
}

run([100, 100, 100, 2000, 2000, 2000])









