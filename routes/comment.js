const router = require('express').Router();
const User = require("../models/User");
const Post = require("../models/Post");
const authenticate = require("../middlewares/authenticate");

/*
- POST /api/comment/{id} add comment for post with {id} by the authenticated user.
    - Input: Comment
    - Return: Comment-ID
*/
router.post("/:id", authenticate, async(req, res) => {
   try {
      const userId = req.user._id;
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if(!post) {
         return res.status(404).send("Post not found");
      }
      await post.updateOne({$push: {comments: {userid: userId, comment: req.body.Comment}}});
      const updatedPost = await Post.findById(postId);
      const commentArray = updatedPost.comments;
      res.status(200).send({"Comment-ID":  commentArray[commentArray.length - 1]._id});
   } catch (error) {
      res.status(500).json(error);
   }
});

module.exports = router;