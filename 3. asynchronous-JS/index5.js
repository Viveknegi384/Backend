// part 5 - how to wait for multiple promises simultaneously -> we use Promise.all

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

    const res1pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1pro, res2pro, res3pro]); //storing all promises in array
    const imgs = all.map((el) => el.body.message); //use maps for getting an array of url
    console.log(imgs);

    await writefilepro("dog-img.txt", imgs.join("\n")); // join that array element all in simgle string using join
    console.log("Random dog image saved to file!");
  } catch (err) {
    console.log(err);

    throw err;
  }

  return "2: Ready 🐶";
};

(async () => {
  try {
    console.log("1: Will get dog pics!");
    const x = await getdogpic();
    console.log(x);
    console.log("2: Done getting Dog pics!");
  } catch (err) {
    console.log("ERROR 💥");
  }
})(); //sath me hi call hojata h
