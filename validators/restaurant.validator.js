const { query } = require("express-validator");

const getNearbyRestaurantValidator = () => {
  return [
    query("address", "validation:create:Address is required!").notEmpty(),
  ];
};

module.exports = { getNearbyRestaurantValidator };
