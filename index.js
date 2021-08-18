const express = require("express");
const cors = require("cors");
require("dotenv").config();
const restaurantRoutes = require("./routes/restaurant.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => res.send("Working Fine!"));

app.use("/restaurants", restaurantRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
