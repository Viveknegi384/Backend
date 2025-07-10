const express = require("express")
const tourController = require("./../controllers/tourController") //import karna
//instead of above we can also do that by desructuring

const router = express.Router();

// router.param('id', (req, res, next, val) => { //new par. val is added
//     console.log(`Tour id is: ${val}`); //value is used to store id value
//     next();
// })

router.param('id',tourController.checkID);


router
    .route('/')
    .get(tourController.getAllTour)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;
