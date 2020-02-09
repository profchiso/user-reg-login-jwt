const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../../models/User");

router.post(
  "/",
  [
    check("name", "name required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid emial").isEmail(),
    check(
      "password",
      "please enter a password of 6 or more characters"
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    res.send("users route");
  }
);

module.exports = router;
