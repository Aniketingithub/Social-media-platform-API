const router = require('express').Router();
const User = require("../models/User");
const Post = require("../models/Post");
const authenticate = require("../middlewares/authenticate");

/*
- GET /api/all_posts would return all posts created by authenticated user sorted by post time.
   - RETURN: For each post return the following values
      - id: ID of the post
      - title: Title of the post
      - desc: Description of the post
      - created_at: Date and time when the post was created
      - comments: Array of comments, for the particular post
      - likes: Number of likes for the particular post
*/

router.get("/", authenticate, async (req, res) => {
   try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      const postArray = user.posts;
      
      // Sorts the posts in increasing order of time.
      postArray.sort(function(a, b) {
         return a.createdAt - b.createdAt;
      });
      // An array of objects containing information about all posts of autjenticated user sorted by time.
      const result = [];
      // wait for all input promises to complete and returns a promise
      await Promise.all(postArray.map(async function(item, index) {
         try {
            const post = await Post.findById(item.Post_Id);
            const obj = {
               "id": post._id,
               "title": post.title,
               "desc" : post.desc,
               "created_at": post.createdAt,
               "comments": post.comments.length,
               "likes": post.likes.length
            };
            result.push(obj);
            // console.log(result);
         } catch (error) {
            return res.status(500).send(error);
         }
      }));
      res.status(200).send(result);
   } catch (error) {
      res.status(500).send(error);
   }
});

module.exports = router;