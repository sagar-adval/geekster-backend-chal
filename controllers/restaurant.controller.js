const kmlParse = require("kml-parse");
const fs = require("fs-extra");
const DOMParser = require("xmldom").DOMParser;

const kmlDom = new DOMParser().parseFromString(
  fs.readFileSync("./asset.kml", "utf8")
);
const location = kmlParse.parse(kmlDom).geoJSON.features;

const Geocoding = require("@mapquest/geocoding");
const client = new Geocoding({
  key: process.env.GEOCODE_API_KEY,
});

const classifyPoint = require("robust-point-in-polygon");

const getNearbyRestaurant = async (req, res, next) => {
  console.log(req.query);
  try {
    let geocodedAddress = await client.forward(req.query.address);
    for (let i = 0; i < location.length; i++) {
      if (location[i].geometry.type === "Polygon") {
        let restaurantExists = classifyPoint(
          location[i].geometry.coordinates[0],
          geocodedAddress.geometry.coordinates
        );
        if (restaurantExists === -1 || restaurantExists === 0) {
          return res.status(200).send({
            message: "Outlet found",
            restaurant: location[i].properties.name,
          });
        }
      }
    }
    return res.send({
      message: "Outlet not found",
    });
  } catch (e) {
    console.log(e);
    return res.status(403).send({
      message: "Internal server error!",
      error: e.message,
    });
  }
};

module.exports = { getNearbyRestaurant };
