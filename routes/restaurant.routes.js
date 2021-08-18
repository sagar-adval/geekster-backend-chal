const router = require("express").Router();
const {
  getNearbyRestaurantValidator,
} = require("../validators/restaurant.validator");
const { errorHandler } = require("../handlers/error.handler");
const { getNearbyRestaurant } = require("../controllers/restaurant.controller");

router.get(
  "/nearby",
  getNearbyRestaurantValidator(),
  errorHandler(getNearbyRestaurant)
);

module.exports = router;
