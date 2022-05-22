const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

/*
- POST /api/authenticate should perform user authentication and return a JWT token.
    - INPUT: Email, Password
    - RETURN: JWT token
*/

router.post("/", async (req, res) => {
   try {
      const {email, password} = req.body;
      const user = await User.findOne({email:email});
      if(!user) {
         res.status(404).send("User not found");
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if(!validPassword) {
         res.status(400).send("Password Invalid");
      }
      
      // generating token
      const token = await user.generateToken();

      // store token in cookie
      res.cookie("jwt", token, {
         expires: new Date(Date.now() + 604800000),         // expires in 1 week
         httpOnly: true,
      });

      // Return the jwt token
      res.status(200).send({"JWT Token" : req.cookies.jwt});
   } catch(err) {
      console.log(err);
   }
});

router.post("/register", async (req, res) => {
   const {name, email, password} = req.body;
   
   try {
      // create new hashed-password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({name, email, password: hashedPassword});

      // generate token
      const token = await newUser.generateToken();

      // store token in cookies
      res.cookie("jwt", token, {
         expires: new Date(Date.now() + 604800000),    // expires in 1 week
         httpOnly: true
      });

      // save user
      const user = await newUser.save();
      res.status(200).send(user);
   } catch (error) {
      console.log(error);
   }
});

module.exports = router;