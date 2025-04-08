const { isUtf8 } = require("buffer");
const fs=require("fs"); 
//calling the fs module  "file system module"so that we can read,write etc from the file system  -> require(" ") ->this the the function used for calling the module in node js


// const hello="Hello World";
// console.log(hello);

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8'); 
//fs.readFileSync(path, encoding): This synchronously reads the contents of the file at the specified path.'utf-8': Encoding format. Tells Node to return a string instead of a buffer.
console.log(textIn)

const textout= `This is what we know about avacado: ${textIn}.\n Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textout);
//fs.writeFileSync(path, data):This synchronously writes the content of textout to './txt/output.txt'.If the file does not exist, it will be created.If it already exists, it will be overwritten.
console.log("File Written!");
