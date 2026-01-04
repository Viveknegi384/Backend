//in this we handling of req will be done , saare exports.___ called as handlerfunction

//const fs = require('fs');
const Tour = require('../models/tourModel');
const APIfeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.aliasTopTour = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};


exports.getAllTour = catchAsync(async (req, res, next) => {

  //EXECUTE QUERY
  const features = new APIfeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;


  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    //requestedAt: req.requestTime, // exact time jab request aayi thi
    results: tours.length,
    data: {
      tours,
    },
  });

});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate('reviews');

  if (!tour) { //as NULL value ko false ki hi tarah consider karte h 
    return next(new AppError('No tour found with ID', 404));
  }


  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });

});



exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tours: newTour,
    },
  });

  /*
  try {
    
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
  */
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) { //as NULL value ko false ki hi tarah consider karte h 
    return next(new AppError('No tour found with ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });

});

exports.deleteTour = factory.deleteOne(Tour);

// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);

//   if (!tour) { //as NULL value ko false ki hi tarah consider karte h 
//     return next(new AppError('No tour found with ID', 404));
//   }

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });

// });

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {

        // _id:'$ratingsAverage',
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {

  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$id' }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: { numTourStarts: -1 }
    },
    {
      $limit: 12
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan
    }
  })


});
