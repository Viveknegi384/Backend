const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//1) GLOBAL MIDDLEWARES
if (process.env.NODE_ENV === 'devlopment') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100, //max requests from same IP
    windowMs: 60 * 60 * 1000, //1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter); //to apply this limiter only on routes which start with /api

app.use(express.json());
//serving static file
app.use(express.static(`${__dirname}/public`));//isme jo file specify kiya h hamne uss file li kisi bhi file ko directly url pe publish karna without going thoughout the routes done by this method


app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(x); //error in postman
    // console.log(req.headers);
    next();
});

// console.log(x); //error in console handle by uncaught exception


app.use('/api/v1/tours', tourRouter); //for this routes we want to apply this tourRouter middleware
app.use('/api/v1/users', userRouter);
//here above tourRouter and userRouter are the two middleware which are then mount through app.use


app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Cant't find ${req.originalUrl} on this server!`
    // })

    /*
    const err= new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status= 'fail';
    err.statusCode =404;

    next(err);
    */

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;