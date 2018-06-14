class Person {
    //constructor is specific to class, it helps to intialize the class and it automatically fires

    constructor(name, age) {
        this.name = name;
        this.age = age;

    }

    getUserDescription(){
        console.log(`Hi I am ${this.name} my age is ${this.age}`);
    }
}

var me = new Person('tejas',24);
console.log(me.name);
console.log(me.age);
me.getUserDescription();