const express = require("express")
const tourController = require("../controllers/tourController") //import karna
//instead of above we can also do that by desructuring
const authController = require("../controllers/authController")
const reviewController = require("../controllers/reviewController")
const router = express.Router();

// router.param('id', (req, res, next, val) => { //new par. val is added
//     console.log(`Tour id is: ${val}`); //value is used to store id value
//     next();
// })

// router.param('id',tourController.checkID); //As we had comment it in controller

/* 
chaining multiplemiddleware function
Create a checkBody middleware (means check karsakte h uss POST req ko api or db mai bhjna h ya nahi)
If not,send back 400 (bad request)
Add it to the post handler stack
*/

router.route('/top-5-cheap').get(tourController.aliasTopTour, tourController.getAllTour)

router.route('/tour-stats').get(tourController.getTourStats)
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan)

router
    .route('/')
    .get(authController.protect, tourController.getAllTour)
    .post(tourController.createTour); //here we have implemented two middleware

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour);


router.route('/:tourId/reviews').post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
);

module.exports = router;
