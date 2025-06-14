//PART 3 -: read and write file ko promises ka use karke karnenge

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

/* readfilepro basically ek type ka function h which we pass file as an argument and return a promise ,  resolve - jab data sucessfully read hokar available ho (isme data return  karte h )
reject - if some error occurs then it will return through this
*/

const writefilepro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file 😢");
      resolve("Success"); //isme resolve ka koi matlab nahi h but fir bhi likh diya
    });
  });
};

/*
readfilepro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writefilepro("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to file!");
  })
  .catch((err) => {
    console.log(err.message);  //if file not exist wala err hoga toh yaha pe err kar dena instead of err.message becoz hamne uska err.message defined nahi kiya h
  });

*/

/* in the above triangular like struct nahi dikh rha  it is better to do understand good 
this can achive by using promises as return  and use chaining of one another 
*/

//use of async/await

const getdogpic = async () => {
  //normal function h but isme ham define kardete h ki yeh function asynchronus h
  try {
    //use try and catch for error handling
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
  }
};
/* 
//in short in code simply promises ke aage await lag jata h 
Jab aap kisi Promise-returning function ke aage await lagate ho, toh JavaScript:
->Promise complete hone ka wait karti hai
->Uske baad hi next line execute hoti hai
*/
getdogpic(); // Calling  function
