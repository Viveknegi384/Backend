//in this we handling of req will be done

//const fs = require('fs');
const Tour = require('../models/tourModel');

/*
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
); //as Now we we work with actual db
*/
// as there is repeating code which checks id is valid or not hence we can replaceit with middleware
/*
exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    if (req.params.id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    next();
// }  //this Function only tells the use of middleware so we have commet out this
*/

/*
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: "Missing name or price"
        });
    }
    next();
};
*/
exports.getAllTour = async (req, res) => {
    try {

        const tours = await Tour.find();


        //console.log(req.requestTime); //Middleware ne req.requestTime me jo time store kiya tha, wo print karega.
        res.status(200).json({
            status: 'success',
            //requestedAt: req.requestTime, // exact time jab request aayi thi
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        //Tour.findOne({_id: req.params.id}) work same as above

        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
    /* 
    console.log(req.params);

    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);
    res.status(200).json({
            status: 'success',
            data: {
                    tour,
                },
            });
            */
};

exports.createTour = async (req, res) => {
    try {

        //old method of creating Tour
        // const newTour= newTour({})
        // newTour.save()

        //New method and it return prosime as same as save method return
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tours: newTour,
            },
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!'
        });
    }
};

exports.updateTour = (req, res) => {

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>',
        },
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null,
    });
};