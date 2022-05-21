const router = require('express').Router();
const User = require("../models/User");
const authenticate = require("../middlewares/authenticate");

/*
- POST /api/follow/{id} authenticated user would follow user with {id}
*/
router.post("/:id", authenticate,  async(req, res) => {
   const userID = req.user._id;
   if(req.params.id === userID) return res.status(403).send("You cant follow yourself");
   try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(userID);
      if(!user) {return res.status(404).send(`User with ${req.params.id} Not Found`)};
      if(!user.followers.includes(userID)) {
         await user.updateOne({$push:{followers:userID}});
         await currentUser.updateOne({$push:{followings:req.params.id}});
         res.status(200).send(`You are following ${user.name}`);
      } else {
         res.status(403).send(`You already follow ${user.name}`);
      }
   } catch (error) {
      console.log(error);
   }

});

module.exports = router;