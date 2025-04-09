const http=require('http');
const fs=require("fs"); 
const url=require("url"); 
//calling the fs module  "file system module"so that we can read,write etc from the file system  -> require(" ") ->this the the function used for calling the module in node js


// const hello="Hello World";
// console.log(hello);

//Blocking,synchronus way
/*
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8'); 
//fs.readFileSync(path, encoding): This synchronously reads the contents of the file at the specified path.'utf-8': Encoding format. Tells Node to return a string instead of a buffer.
console.log(textIn)

const textout= `This is what we know about avacado: ${textIn}.\n Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textout);
//fs.writeFileSync(path, data):This synchronously writes the content of textout to './txt/output.txt'.If the file does not exist, it will be created.If it already exists, it will be overwritten.
console.log("File Written!");
*/

//Non Blocking, Aynchronous way

/* 
fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
    if(err) return console.log('ERROR!!')

    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
        console.log(data2);
        fs.readFile(`./txt/append.txt`,'utf-8',(err,data3)=>{
            console.log(data3);
            fs.writeFile('./txt/final.txt',  `${data2}\n${data3}`,'utf-8', (err)=>{
                console.log("Your file has been written.")
            })
        })
    })
})

console.log("Will read the file");

*/

/////////////////////////////////////////////////////////////////////////////
//SERVER
const server =http.createServer((req,res)=>{
    //console.log(req.url);   //routing -> alg page pe jakar url change karna or "User kis page pe gaya hai, aur uske according hum kya response bhejenge."
    const pathName=req.url;
    if(pathName==='/' || pathName==='/overview') {
        res.end("This is the overview");
    }
    else if(pathName==='/product'){
     res.end("This is the product");
    }
    else{
        res.writeHead(404,{
            'Content-type' : 'text/html',
            'my-own-header': 'Hello World'
        })
     res.end("<h1>Page not found</h1>");
    }
    
});

server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening to request on port 8000");
});

