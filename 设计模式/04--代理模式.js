/**
 * @author: YuPeng Zhang
 * @date: 2019/11/15
 * @Description: 代理模式
 */

// 定义: 为一个对象提供一个代用品或占位符, 以便控制对它的访问

// 常用的虚拟代理方式: 某一个花销很大的操作,  通过虚拟代理的方式延迟到这种需要它的的时候才创建 (例如: 通过虚拟代理实现图片的懒加载)
// 图片懒加载的方式: 先通过一张 loading 图占位, 然后通过异步的方式加载图片,  等图片加载好了再把完成的图片加载到 img 标签里面
const imgUrl = (() => {
  let imgNode = document.querySelector('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function (src) {
      imgNode.src = src;
    }
  }
})()

const proxyImage = (() => {
  let img = new Image();
  img.onload = function () {
    imgUrl.setSrc(this.src);
  }
  return {
    setSrc: src => {
      imgUrl.setSrc('./loading.gif')
      img.src = src
    }
  }
})()

proxyImage.setSrc('./image.png');
