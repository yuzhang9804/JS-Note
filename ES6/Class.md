## Class

`ES6` 引入了 `Class`(类) 这个概念, 作为对象的模板 , 通过`class`关键字, 可以定义类,  `ES6`的`class` 可以看作是一个语法糖, 它的绝大多数功能,  `ES5`都可以做到

```javascript
class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    shout(){
        console.log(this.name);
    }
}

new Person(`yuzhang`, 18).shout();		// yuzhang
```



#### constructor 方法

==constructor==方法是类的默认方法， 通过==new==命令生成实例对象时， 会自动调用该方法， 一个类必须拥有 ==constructor==方法， 如果没有显式定义， 则会添加一个空的 ==constructor==

```javascript
class Person {}

// 等同于

class Person {
    constructor() {}
}
```

==constructor==方法默认返回实例对象（this）



#### 类的实例

类生成实例的方法， 与`ES5`一致， 使用==new==命令，不过类必须用==new==调用， 否则会报错

与`ES5`一样， 实力的属性除非显式定义在其本身， 否则都是定义在原型对象上面 （即定义在class上)

所有的实例共享同一个原型对象



>注意点：
>
>- 类个模块的内部， 默认就是严格模式
>- 类不存在变量替身
>- 类拥有name 属性
>- 类方法内部如果有this ， 默认指向实例， 因此单独使用该方法会报错



#### 静态方法

类相当于实例的原型， 所有在类中定义的方法， 都会被实例继承， 如果在一个方法前加上==static==关键字， 就表示该方法不会被实例继承， 而是直接通过类调用

```javascript
class Person {
    static say(){
        return `hello`;
    }
}
Person.say()			// hello
new Person.say();		// 报错
```

**如果某个静态方法包含==this==关键字，这个==this==指向的是==类==，不是实例**

**父类的静态方法可以被子类继承**



#### 实例属性的新写法

实例属性除了定义在==constructor()==方法里面的this 上面， 也可以定义在类的最顶层



#### 静态属性

静态属性指的是==Class==本身的属性

```javascript
class Person{}
Person.name = `zs`
```

上述代码为==Person==类定义了一个静态属性`name`

`ES6`明确规定，`class`内部只有静态方法，没有静态属性， 现在有一个新提案提供类的静态属性， 就是在实例属性前面加上==static==关键字

```javascript
class Person {
	static name = `zs`;
	constructor(){}
}

Person.name				// "zs"
(new Person).name		// undefined
```



## Class 继承

==Class==可以通过==extends==关键字实现继承，这比 `ES5`的通过修改原型链实现继承，要清晰和方便许多

```javascript
class Person {}

// 继承

class yuzhang extends Person {}
```

如果子类没有添加==constructor==方法, 这个方法会被默认添加



#### super关键字

==super==这个关键字, 既可以当作函数使用,也可以当作对象使用,  两种情况,它的用法完全不同

- ==super== 作为函数调用时, 代表父类的构造函数,  `ES6`要求, 子类的构造函数必须执行一次==super==函数

  ```javascript
  class Person {
      constructor(){
          console.log(new.target.name);
      }
  }
  
  class Yuzhang extends Person {
      constructor(){
          super()
      }
  }
  new Person()	// Person
  new Yuzhang()	// Yuzhang
  ```

- ==super==作为对象时, 在普通方法中, 指向父类的原型对象, 在静态方法中,指向父类

  ```javascript
  class Person {
      shout(){
          console.log(`Hello`);
      }
  }
  
  class Yuzhang extends Person {
      constructor() {
     		super();
          super.shout();
      }
  }
  new Yuzhang()			// `Hello`
  ```

  上述代码的==super.shout()==等同于==Person.prototype.shout()==

  

`ES6`规定, 在子类的普通方法中通过==super==调用父类方法时, 方法内部的==this==指向当前的子类实例

