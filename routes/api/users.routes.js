const express = require("express");
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require('../../models/User.model');

// @route   POST api/users
// @desc    Registering user
// @access  Public
router.post("/", [
  check('name', "Name is required").not().isEmpty(),
  check('email', "Email is invalid").isEmail(),
  check('password', "Password is invalid").isLength({min: 6}),
], async (req, res) => {
  // Validation
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }

  const { name, email, password } = req.body;
  
  try {
    console.log(req.body);

    // Check if users exist
    let user = await User.findOne({ email })

    if (user) {
      res.status(400).json({ errors: [{msg: "User already exist"}] });
    }

    // Get user gravatars
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    user = new User({name, email, avatar, password});
  
    // Encrypt Password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    await user.save();
  
    // Return JasonWebToken
    res.send("User registered!")
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }


});

module.exports = router;
