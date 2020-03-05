### 替换数组中对象或对象中的key值

```javascript
/*
* 替换对象中的key值
*
* @param   {Array / Object}    arr     需要替换的对象或数组
* @param   {String}            arr     第一个为原key值， 第二个为修改的key值，长度必须为偶数
*
* @return   {Array / Object}    JSON.parse(str)     修改后的数组或字符串
* */
const modifyKey = (arr, ...rest) => {
	let str = JSON.stringify(arr);
	let param = [...rest];
	param.length % 2 !== 0 ? param.pop() : null;
	for (let index = 0; index < param.length; index = index + 2) {
		while (str.includes(param[index])) {
			str = str.replace(param[index], param[index + 1]);
		}
	}
	return JSON.parse(str);
};
```

