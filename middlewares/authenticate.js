const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require('dotenv');

const authenticate = async (req, res, next) => {
   try {
      const token = req.cookies.jwt;
      const verifyUser = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
      const user = await User.findOne({email: verifyUser.email});
      if(!user) { throw new Error('User not found')};
      req.token = token;
      req.user = user;
      next();
   } catch (error) {
      res.status(401).send(error);
   }
};

module.exports = authenticate;