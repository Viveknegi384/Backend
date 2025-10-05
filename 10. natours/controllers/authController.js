const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync(async (req, res, next) => {
    // const newUser = await User.create(req.body); // This is not safe because user can add role as admin in req.body
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
});

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    //1) Check if email and password exist
    if (!email || !password) {
        return next(new appError('Please provide email and password!', 400));
    }
    //2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password'); //as password field is set to select false in user schema so we have to explicitly select it here

    //test1234 === $2b$12$EaA3njqA9wBNFbhI.5aukubGGHrK6B2JX5CUNquN0XpgmUcMR2oWi
    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new appError('Incorrect email or password', 401));
    }

    //3) If everything ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });
}