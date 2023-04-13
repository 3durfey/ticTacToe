function doSomething() {}
doSomething.prototype.foo = "bar"; // add a property onto the prototype
const doSomeInstancing = new doSomething();
doSomeInstancing.bar = "some value"; // add a property onto the object
console.log(doSomeInstancing.foo);
