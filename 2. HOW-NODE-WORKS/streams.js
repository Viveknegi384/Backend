const fs= require('fs');
const server = require('http').createServer(); // another way of  creating a server

server.on("request",(req,res)=>{

    //solution 1    //asynchrous way to read the file - "test-file"
    /*
    fs.readFile("test-file.txt",(err,data)=>{
        if(err) console.log(err);
        res.end(data);
    })

    //problem - node has to upload the file data in the memory and then only after it it can do the operation or display
*/
    //solution 2: Streams    //tukdo mai read karna data ko
    /*
    const readable=fs.createReadStream("test-file.txt");  // this line create a stream of data which further can be consumed piece by piece 
    readable.on("data",chunk=>{       //when a pieace of data is avilable a readable stream emits the data event to read that -> can be done same as event operation
        res.write(chunk);               //as response is a writable stream hence it is written
    });
    readable.on("end",()=>{
        res.end();
    });
    readable.on("error",err =>{
        console.log(err);
        res.statusCode=500;
        res.end("File not Found!")
    });
*/

    //Solution-3 //backpressure - happens when response cannot send the data nearly as fast as it is recieving the data from a file 
    const readable=fs.createReadStream("test-file.txt");
    readable.pipe(res);
    //readableSource.pipe(writabledest)  //above syntax means



})

server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening...");
})