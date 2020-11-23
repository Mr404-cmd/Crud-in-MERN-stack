const  mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [2, "UserName should be greater than 4 characters"],
  },
  dob: {
    type: String,
    required: true,
  }
})
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
