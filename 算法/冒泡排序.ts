enum Sort {
  /** 降序 */
  DESCENDING,
  /** 升序 */
  ASCENDING,
}

/**
 * 冒泡
 * @param arr 排序数组
 * @param sort 排序
 * @returns 排序后数组
 */
const bubble = (arr: number[], sort: Sort = Sort.DESCENDING): number[] => {
  const len = arr.length;
  if (len <= 1) return arr;

  for (let i = 0; i < len; i++) {
    /** 一次冒泡没有发生交换，代表完全有序，则终止循环 */
    let flag = true;

    for (let j = 0; j < len - i - 1; j++) {
      if (sort ? arr[j] > arr[j + 1] : arr[j + 1] > arr[j]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = false;
      }
    }

    if (flag) break;
  }
  return arr;
};

const arr = [1, 5, 2, 4, 3, 5];
console.log(bubble(arr, Sort.ASCENDING));
console.log(bubble(arr, Sort.DESCENDING));
