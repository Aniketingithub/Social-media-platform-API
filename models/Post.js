const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
   userid : String,
   title: {
      type: String,
      required: true
   },
   desc: {
      type: String,
      max: 500
   },
   comments: [{
      userid: String,
      comment: {
         type: String,
         max: 500
      }
   }],
   likes: {
      type: Array,
      default: []
   }
}, {timestamps: true});

module.exports = mongoose.model("Post", PostSchema);