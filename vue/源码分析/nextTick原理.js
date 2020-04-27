/**
 * @author: YuPeng Zhang
 * @date: 2020/3/17
 * @Description: nextTick 原理
 */

let uid = 0;

class Watcher {
  constructor() {
    this.id = ++uid;
  }

  update() {
    console.log(`${this.id}更新`);
    queueWatcher(this);
  }

  run() {
    console.log(`${this.id}视图更新`);
  }
}

let has = new Set();
let queue = [];
let waiting = false;

function queueWatcher(watcher) {
  const id = watcher.id;
  if (!has.has(id)) {
    has.add(id);
    queue.push(watcher);

    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue)
    }
  }
}

function flushSchedulerQueue() {
  let watcher, id;
  for (let i = 0; i < queue.length; i++) {
    watcher = queue[i];
    id = watcher.id;
    has.delete(id);
    watcher.run();
  }
}


function nextTick (cb) {
  setTimeout(() => {
    waiting = false;
    cb()
  })
}

let watch1 = new Watcher();
let watch2 = new Watcher();

watch1.update();
watch1.update();
watch2.update();
