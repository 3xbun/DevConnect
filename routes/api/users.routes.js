const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// @route   POST api/users
// @desc    Registering user
// @access  Public
router.post("/", [
  check('name', "Name is required").not().isEmpty(),
  check('email', "Email invalid").isEmail(),
  check('password', "Password invalid").isLength({min: 6}),
], (req, res) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }

  console.log(req.body);
});

module.exports = router;
