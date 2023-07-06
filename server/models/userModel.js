const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
   },
   likedMovies: {
      type: Array,
   },
});

const userModel = new mongoose.model("users", userSchema);
module.exports = userModel;
