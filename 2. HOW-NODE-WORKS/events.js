//this shows how to listen events by the server and what's it act in response to the event

const http=require('http');
const EventEmitter= require('events');

//const myEmitter= new EventEmitter();

class Sales extends EventEmitter{
    constructor(){
        super(); //cals EventEmitter's constructor
    }
}

//ques - why we make object of Eventemiiter like that - first by inheriting the classand then msking its object

const myEmitter= new Sales();


myEmitter.on('newsale',()=>{          //these are call when "newsale" events get emitted (it can also have a parameter pass though it)
    console.log("There was a new sale");
});

myEmitter.on('newsale',()=>{
    console.log("Costomer Name:Jonas");
});

myEmitter.on('newsale',stock=>{
    console.log(`there are now ${stock} left in stock`)
});


myEmitter.emit('newsale',9);  //this emits the "newsale" event

/////////////
//creating a server
const server=http.createServer();

server.on('request', (req,res)=>{
    console.log("Request Received!");
    res.end("Request hello");  //this appear on a webpagewhere a url is called (and only one response we can make a time)
});

server.on('request', (req,res)=>{
    console.log("Another Request😊")
});

server.on('close',()=>{
    console.log("Server Closed!")
});


server.listen(8000,'127.0.0.1',()=>{
    console.log("Waiting for a request!")
});

