const router = require('express').Router();
const User = require("../models/User");
const Post = require("../models/Post");
const authenticate = require("../middlewares/authenticate");

/*
- POST /api/unlike/{id} would unlike the post with {id} by the authenticated user.
*/

router.post("/:id", authenticate, async(req, res) => {
   try {
      const userId = req.user._id;
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if(!post) { return res.status(404).send("Post not found") };
      if(!post.likes.includes(userId)) {
         return res.status(403).send("You already unliked the post.");
      }
      await post.updateOne({$pull: {likes: userId}});
      res.status(200).send(`You Unliked Post with ID: ${postId}`);
   } catch (error) {
      res.status(500).json(error);
   }
});

module.exports = router;