const express = require('express');
const morgan = require('morgan');

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(morgan('dev'));

app.use(express.json());
//serving static file
app.use(express.static(`${__dirname}/public`));//isme jo file specify kiya h hamne uss file li kisi bhi file ko directly url pe publish karna without going thoughout the routes done by this method
 

app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


app.use('/api/v1/tours', tourRouter); //for this routes we want to apply this tourRouter middleware
app.use('/api/v1/users', userRouter);
//here above tourRouter and userRouter are the two middleware which are then mount through app.use

module.exports = app;