// console.log(arguments);
// console.log(require("module").wrapper);

//module.exports   // -> use of this by using test-module-1
const C = require('./test-module-1');
const calc1=new C();
console.log(calc1.add(2,5)); 

//exports   // ->use of this by using test-module-2 
// const calc2= require("./test-module-2");
// console.log(calc2.add(7,8)); 
// console.log(calc2.multiply(7,8));

//can also do above same as below

const { add, multiply}= require("./test-module-2");
console.log(add(5,5));


// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
