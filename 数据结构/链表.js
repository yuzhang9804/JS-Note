/**
 * @author: Yu Zhang
 * @date: 2021/04/19
 * @Description:  链表
 */


class Node {
  constructor(node) {
    this.node = node;
    this.next = null;
  }
}

/** 单链表 */
class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }
  
  append(element) {
    const node = new Node(element);
    if (this.head) {
      let current = this.head;
      while (current.next) {
        current = current.next;
      } 
      current.next = element;
    } else {
      /** 链表为空 */
      this.head = element;
    }
    this.length++;
  }
  
  insert(element, pointer) {
    const node = new Node(element);
    if (!this.head) {}
  }
}
