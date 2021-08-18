const { body } = require("express-validator");

const getNearbyRestaurantValidator = () => {
  return [body("address", "validation:create:Address is required!").notEmpty()];
};

module.exports = { getNearbyRestaurantValidator };
