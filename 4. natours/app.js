const fs = require('fs');
const express = require('express'); //basically it is a type of function which give access to many method

const app = express(); //here it is called

// app.get('/', (req, res) => {
//   //res.send("Hello from the server side"); //basically it direct send the string we can also send json data
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Natours' });
// });

// app.post('/',(req,res)=>{  //agar hamm post pe click karte h in postman then it show this otherwise it show error 404 html
//     res.send("You can post to this endpoint...")
// });

//now making api for natours
app.use(express.json()); //middleware

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length, //as it is not as imp to write but it give basic idea that how many res. are there
    data: {
      tours, //actually it should be tours:tours(yeh wala upar wlae varible ka h ) but in es6 we make it single
    },
  });
});

//Responding to URL pramaters
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params); //print all the parameters define on the URL after tours i.e id (we define also defines it multiple parameters)

  const id = req.params.id * 1; //by multipling any string to 1(i.e. no.) it convert it to no.
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  //now to actually make change in api too we do below
  const newId = tours[tours.length - 1].id + 1; // give the newid of upcoming tour
  const newTour = Object.assign({ id: newId }, req.body);
  /*
  req.body contains the new tour data (like name, price, etc.) sent from Postman/frontend.
  But we also want to add a unique id to that data.
  So Object.assign() merges the { id: newId } object with whatever is inside req.body.
  */

  tours.push(newTour); //This line adds the new tour to the in-memory array tours.

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        //201-> means created
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
