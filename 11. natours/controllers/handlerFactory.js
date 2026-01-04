const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) { //as NULL value ko false ki hi tarah consider karte h 
    return next(new AppError('No document found with ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });

});

exports.updateOne = Model => catchAsync(async (req, res, next) =>{
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) { //as NULL value ko false ki hi tarah consider karte h 
    return next(new AppError('No doc found with ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });

});

exports.createOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});


