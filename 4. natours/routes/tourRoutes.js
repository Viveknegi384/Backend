const express = require("express")
const tourController = require("./../controllers/tourController") //import karna
//instead of above we can also do that by desructuring

const router = express.Router();

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
