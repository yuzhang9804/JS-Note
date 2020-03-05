/**
 * @author: YuPeng Zhang
 * @date: 2019/11/15
 * @Description: 策略模式
 */

// 定义: 定义一系列算法,  把他们一个个封装起来, 并使他们相互替换

/* 目的: 将算法的使用算法的实现分离开来 */

// 一个基于策略模式的程序至少由两部分组成,  第一个部分是一组策略类 (可变), 策略类封装了具体的算法, 并负责具体的计算过程, 第二个部分是环境类 Content (不变), Content 接受客户的请求, 随后将请求委托给一个策略类, 要做到这一点

/* 策略类 */
const fruitPrices = {
  apple: money => money * 4,
  banana: money => money * 5,
  watermelon: money => money * 6
}

/* 环境类 */
const calculatePrice = (fruit, price) => fruitPrices[fruit](price)

console.log(calculatePrice('apple', 10))
