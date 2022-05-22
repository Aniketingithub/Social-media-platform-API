const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const followRoute = require("./routes/follow");
const unfollowRoute = require("./routes/unfollow");
const likeRoute = require("./routes/like");
const unlikeRoute = require("./routes/unlike");
const commentRoute = require("./routes/comment");
const allPostRoute = require("./routes/all_posts");

dotenv.config();

// database
mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
   }).then(() => console.log("mongodb connected")).catch((err) => console.error(err));
   
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("common"));
app.use("/api/user", userRoute);
app.use("/api/authenticate", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/follow", followRoute);
app.use("/api/unfollow", unfollowRoute);
app.use("/api/like", likeRoute);
app.use("/api/unlike", unlikeRoute);
app.use("/api/comment", commentRoute);
app.use("/api/all_posts", allPostRoute);

app.get("/", (req, res) => {
   res.send("Created an API");
});

app.listen(process.env.PORT, () => {
   console.log(`Server running at ${process.env.PORT}`);
});
