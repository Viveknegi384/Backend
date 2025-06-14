// part 4- how to return a value from async  function

const fs = require("fs");
const superagent = require("superagent");

const readfilepro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not found that file 😢");
      resolve(data);
    });
  });
};

const writefilepro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file 😢");
      resolve("Success"); //isme resolve ka koi matlab nahi h but fir bhi likh diya
    });
  });
};

const getdogpic = async () => {
  try {
    const data = await readfilepro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writefilepro("dog-img.txt", res.body.message);
    console.log("Random dog image saved to file!");
  } catch (err) {
    console.log(err);

    throw err;
  }

  return "2: Ready 🐶";
};

/*
console.log("1: Will get dog pics!");
const x=getdogpic(); 
console.log(x);
console.log("2: Done getting Dog pics!");

//this x will not return string becoz an async function always return a promise for return that we should do below if we really need to return  the value ...

*/

/* 
method 1:
1st - we uses then method in order to return a string 
2nd - now it is more diffcult to handle the error
for that it give the error but below code still get excuted which is after then , which should not be... for that it should throw the error inside catch block of code so that it can get catch by the "catch block" 
*/

/*
console.log("1: Will get dog pics!");
getdogpic().then(x=>{
    console.log(x);
    console.log("2: Done getting Dog pics!");
}).catch(err=>{
    console.log("ERROR 💥");
}) 
 */

//try building the above by async/await function

//immediately invoke Async function expression (IIAFE)
/* Jab aap async logic likhna chahte ho bina named function banaye we use IIAFE*/ 

(async () => {
  try {
    console.log("1: Will get dog pics!");
    const x = await getdogpic();
    console.log(x);
    console.log("2: Done getting Dog pics!");
  } catch (err){
    console.log("ERROR 💥");
  }
})(); //sath me hi call hojata h

