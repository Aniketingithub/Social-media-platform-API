const router = require('express').Router();
const User = require("../models/User");
const authenticate = require('../middlewares/authenticate');

/*
- GET /api/user should authenticate the request and return the respective user profile.
    - RETURN: User Name, number of followers & followings.
*/

router.get("/", authenticate, (req, res) => {
   const Name = req.user.name;
   const followers = req.user.followers.length;
   const followings = req.user.followings.length;
   const obj = {
      "Name": Name, 
      "No-of-followers": followers, 
      "No-of-followings": followings
   };
   res.send(obj);
});

module.exports = router;