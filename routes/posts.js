const router = require('express').Router();
const User = require("../models/User");
const Post = require("../models/Post");
const authenticate = require("../middlewares/authenticate");


/*
- GET api/posts/{id} would return a single post with {id} populated with its number of likes and comments
*/
router.get("/:id", authenticate, async(req, res) => {
   try {
      const post = await Post.findById(req.params.id);
      if(!post) { return res.status(404).send("Post not found") };
      const postDetails = {
         "Number of likes": post.likes.length,
         "Number of Comments": post.comments.length
      };
      res.status(200).send(postDetails);
   } catch (error) {
      
   }
});

/*
- POST api/posts/ would add a new post created by the authenticated user.
    - Input: Title, Description
    - RETURN: Post-ID, Title, Description, Created Time(UTC).
*/
router.post("/", authenticate, async (req, res) => {
   const newPost = new Post({userid: req.user._id, title: req.body.title, desc: req.body.desc});
   const userId = req.user._id;
   try {
      const user = await User.findById(userId);
      const post = await newPost.save();
      console.log(post);
      await user.updateOne({$push: {posts: {Post_Id: post._id, Created_Time: post.createdAt}}});
      const obj = {
         "POST-ID": post._id,
         "Title": post.title,
         "Description": post.desc,
         "Created Time(UTC)": post.createdAt
      };
      res.status(200).send(obj);
   } catch (error) {
      res.status(500).json(error);
   }
});

/*
- DELETE api/posts/{id} would delete post with {id} created by the authenticated user.
*/
router.delete("/:id", authenticate, async(req, res) => {
   try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if(!post) { return res.status(403).send("Post not found") };
      await Post.deleteOne({_id: postId});
      res.status(200).send(`post with ${postId} deleted successfully`);
   } catch (error) {
      res.status(500).json(error);
   }
});

module.exports = router;