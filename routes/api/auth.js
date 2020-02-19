const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select(
      "-password"
    );
    if (!user) {
      res.status(404).json({ msg: "user does not exist" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "server error" });
  }
});

router.post(
  "/",
  [
    check("email", "Please enter a valid emial").isEmail(),
    check("password", "please enter a password").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }
      const payload = {
        email: user.email
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      Console.log(err);
      res.status(500).json({ msg: "server error" });
    }
  }
);

module.exports = router;
