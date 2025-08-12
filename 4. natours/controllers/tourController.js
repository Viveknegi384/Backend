//in this we handling of req will be done , saare exports.___ called as handlerfunction

//const fs = require('fs');
const Tour = require('../models/tourModel');
const APIfeatures = require('../utils/apiFeatures')
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

exports.aliasTopTour = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};


exports.getAllTour = async (req, res) => {
  try {

    //EXECUTE QUERY
    const features = new APIfeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    //console.log(req.requestTime); //Middleware ne req.requestTime me jo time store kiya tha, wo print karega.

    //SEND RESPONSE
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
      message: err,
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
      message: err,
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTourStats = async (req,res) => {
  try{
    const stats = await Tour.aggregate([
      {
        $match: {ratingsAverage:{ $gte: 4.5} }
      },
      {
        $group:{

          // _id:'$ratingsAverage',
          _id:{$toUpper:  '$difficulty'},
          numTours:{$sum: 1},
          numRatings:{$sum: '$ratingsQuantity'},
          avgRating:{$avg : '$ratingsAverage'},
          avgPrice:{$avg: '$price'},
          minPrice:{$min: '$price'},
          maxPrice:{$max: '$price'}
        }
      },
      {
        $sort: { avgPrice: 1}
      },
      // {     //this is to show that we can repeat the stages
      //   $match:{ _id : {$ne: 'EASY'}}
      // }
    ]);
    
    res.status(200).json({
      status: 'success',
      data: {
        stats
      },
    });
  }catch (err){
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getMonthlyPlan =async(req,res)=>{
  try{
    const year=req.params.year *1;

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
          _id: {$month: '$startDates'},
          numTourStarts:{$sum:1},
          tours: {$push : '$name'}
        }
      },
      {
        $addFields:{month: '$id'}
      },
      {
        $project:{
          _id:0
        }
      },
      {
        $sort:{ numTourStarts:-1}
      },
      {
        $limit:12
      }
    ]);

    res.status(200).json({
      status:'success',
      data:{
        plan
      }
    })

  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err,
    }); 
  }
}
