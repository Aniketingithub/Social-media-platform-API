const router = require('express').Router();
const User = require("../models/User");
const authenticate = require("../middlewares/authenticate");

/*
- POST /api/unfollow/{id} authenticated user would unfollow a user with {id}
*/

router.post("/:id", authenticate,  async(req, res) => {
   const userID = req.user._id;
   if(req.params.id === userID) return res.status(403).send("You cant unfollow yourself");
   try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(userID);
      if(!user) {return res.status(404).send(`User with ${req.params.id} Not Found`)};
      if(user.followers.includes(userID)) {
         await user.updateOne({$pull:{followers:userID}});
         await currentUser.updateOne({$pull:{followings:req.params.id}});
         res.status(200).send(`You unfollowed ${user.name}`);
      } else {
         res.status(403).send(`You already unfollow ${user.name}`);
      }
   } catch (error) {
      console.log(error);
   }

});

module.exports = router;