const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
      min: 6
   },
   followings: {
      type: Array,
      default: []
   },
   followers: {
      type: Array,
      default: []
   },
   isAdmin: {
      type: Boolean,
      default: false
   },
   posts: [
      {
         Post_Id: String,
         Created_Time: Date,
      }
   ],
   token: {
      type: String,
      required: true
   }
}, {timestamps: true});

UserSchema.methods.generateToken = async function() {
   try {
      const token = jwt.sign({email: this.email}, process.env.ACCES_TOKEN_SECRET);
      this.token = token;
      await this.save();
      return token;
   } catch (error) {
      console.log(error);
   }
};

module.exports = mongoose.model("User", UserSchema);