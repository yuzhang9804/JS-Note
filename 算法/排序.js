/**
 * @author: Yu Zhang
 * @date: 2020/12/10
 * @Description: 插入排序
 */

const arr = (length = 10) => [...Array(length)].map(_ => Math.floor(Math.random() * 100))

/* 插入排序 */
const insertSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const j = i - 1;

    while (arr[j] > arr[i]) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }

    arr[j + 1] = arr[i];
  }
  
  return arr;
}

insertSort(arr())


