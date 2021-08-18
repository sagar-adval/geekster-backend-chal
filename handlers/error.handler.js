const { validationResult } = require("express-validator");

const errorHandler = (method) => async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const e = errors.array();
      return res.status(400).json({ errors: e });
    }
    await method(req, res, next);
  } catch (error) {
    console.log("Error,", error);
    res.status(500).json({
      error,
    });
  }
};

module.exports = { errorHandler };
