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


exports.aliasTopTour=(req,res,next) =>{
  req.query.limit='5';
  req.query.sort='-ratingsAverage,price';
  req.query.fields= 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTour = async (req, res) => {
  try {
    // console.log(req.query);
    //BUILD QUERY
    // 1A) Filtering
    const queryObj = {...req.query};
    const excludedFields =['page','sort','limit','fields'];
    excludedFields.forEach(el=> delete queryObj[el]);

    //1B) Advanced Filtering
    let queryStr =JSON.stringify(queryObj);
    queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=> `$${match}`);
    console.log(JSON.parse(queryStr));

    /*
     {difficulty: 'easy',duration:{$gte:5}}
     {difficulty: 'easy',duration:{gte:'5'}}
     gte,gt,lte,lt
     */

    let query = Tour.find(JSON.parse(queryStr));
    //2) Sorting 
    if(req.query.sort){
      const sortBy =req.query.sort.split(',').join(' ');
      // console.log(sortBy);
      query=query.sort(sortBy);
      //sort(price ratingsAverage)
    }else{
      query = query.sort('-createdAt'); //so that newest wale tour top pe ho 
    }

    //3) Field Limiting
    if(req.query.fields){
      const fields =req.query.fields.split(',').join(' ');
      query =query.select(fields); //inculde karna result mai
    }else{
      query=query.select('-__v');  // "-" means exclude karna result se
    }
    
    // //4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1|| 100;
    const skip = (page-1) * limit;
    // page=3& limit =10 ,  1-10 page1, 11-20 page2, 21-30 page3
    query=query.skip(skip).limit(limit);

    if(req.query.page){  //to handle if we have no documents futher 
      const numTours = await Tour.countDocuments();
      if(skip>= numTours) throw new Error('This Page does not exist');
    }


    // console.log(req.query,queryObj);

    // const tours = await Tour.find({
    //     duration:5,
    //     difficulty:'easy'
    // });

    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    //EXECUTE QUERY
    const tours= await query;


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
