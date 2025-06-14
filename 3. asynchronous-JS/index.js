/*
const fs = require("fs");
const superagent = require("superagent");
/* Superagent -
You import the superagent HTTP client library to make API calls.
Like fetch in the browser but for Node.js.
*/

/*
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);
    
    superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
        if (err) return console.log("error hai") ;
      console.log(res.body.message);
      
      fs.writeFile('dog-img.txt',res.body.message,err=>{
          if (err) return console.log(err.message);
            console.log("random dog image saved to file")
        });
        
    });
});


*/

//PART 2 -: how to consumes promises
/*
superagent.get() actually ek Promise return karta hai, isliye aap isse .then() aur .catch() ke saath use kar sakte ho — jo ki Promises ka modern aur clean tareeka hai.

.then() - 	Jab kaam successful ho jaata hai, tab yeh call hota hai
.catch() -	Jab koi error/failure ho jaata hai, yeh usse handle karta hai
*/

const fs = require("fs");
const superagent = require("superagent");
/* Superagent -
You import the superagent HTTP client library to make API calls.
Like fetch in the browser but for Node.js.
*/

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);
      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log("random dog image saved to file");
      });
    })
    .catch((err) => {
      console.log("error hai");
    });
});
