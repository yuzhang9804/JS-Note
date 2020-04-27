/**
 * @author: YuPeng Zhang
 * @date: 2020/3/15
 * @Description: Compile Template 编译成 render 函数
 */

/*
* compile 分为三个阶段
* - parse: 通过正则解析 template 模板中的指令, class等, 解析成 AST 语法树
* - optimize: 标记 static 静态节点, diff 算法会跳过静态节点, 从而减少了比较过程, 提高了性能
* - generate: 将 AST 转化为 render 函数的过程
* */

// parse: 通过正则解析 template

// optimize: 标记静态节点

/**
 * 是否静态节点
 * 文档节点: 9
 * 元素节点: 1
 * 属性节点: 2
 * 文本节点: 3
 * 文档片断节点: 11
 * 文档类型节点: 10
 * 注释节点: 8
 * @param {VNode} node
 * @returns {boolean|boolean}
 */
function isStatic(node) {
  if (node.type === 2) {
    return false;
  }

  if (node.type === 3) {
    return true;
  }
  // 当节点存在 if 或者 for 时为非静态节点
  return (!node.if && !node.for);
}

/**
 * 标记静态节点
 * @param node
 */
function markStatic(node) {
  // 标记当前节点
  node.static = isStatic(node);
  if (node.type === 1) return;
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    // 递归处理子节点
    markStatic(child);
    // 当子节点为非静态节点时, 父节点也为非静态节点
    if (!isStatic(child)) {
      node.static = false;
    }
  }
}

/**
 * 标记静态根节点
 * @param node
 */
function markStaticRoots(node) {
  if (node.type === 1) {
    if (node.static && node.children.length && !(
        node.children.length === 1 && node.children[0].type === 3
    )) {
      node.staticRoot = true;
    } else {
      node.staticRoot = false;
    }
  }
}

function optimize(node) {
  markStatic(node);
  markStaticRoots(node);
}

// generate: 将 AST 转化为  render function

