/**
 * @author: Yu Zhang
 * @date: 2019/10/19
 * @Description: 设计模式 -- 工厂模式
 */

let createPerson = ({name, age, gender}) => {
  let obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.gender = gender;
  return obj
}

const yu = createPerson({
  name: 'yu',
  age: 21,
  gender: 'man'
})
console.log(yu)


/* 构造函数模式: 使用构造函数重写 */
function CreatePerson ({
  name,
  age,
  gender
}) {
  this.name = name;
  this.age = age;
  this.gender = gender
}

const zhang = new CreatePerson({
  name: 'zhang',
  age: 21,
  gender: 'man'
})
console.log(zhang)

// new 操作符的四个步骤
  // - 创建一个对象
  // - 将构造函数的作用域赋值给新对象 (即将 this 指向新的对象)
  // - 执行构造函数的代码
  // - 返回新的对象
