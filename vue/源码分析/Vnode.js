/**
 * @author: YuPeng Zhang
 * @date: 2020/3/15
 * @Description: Vnode
 */

class VNode {
  constructor(tag, data, children, text, element) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.element = element;
  }
}

/*
<template>
  <span class="demo" v-show="isShow">
    This is a span.
  </span>
</template>
* */

// 转化为 js 对象
const vNode = {
  tag: 'span',
  data: {
    // 指令集合数组
    directives: [
      {
        rawName: 'v-show',
        express: 'isShow',
        name: 'show',
        value: true
      }
    ],
    // 静态 css
    staticClass: 'demo'
  },
  children: [
    {
      text: 'This is a span.'
    }
  ]
};
