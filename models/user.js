const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  dataCreated: {
    type: Date,
    default: Date.now()
  }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
