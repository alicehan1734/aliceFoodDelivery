const bcrypt = require("bcryptjs");
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



userSchema.pre("save", function (next) {
  let user = this;

  bcrypt.genSalt(10)
    .then(salt => {

      bcrypt.hash(user.password, salt)
        .then(hashedPwd => {

          user.password = hashedPwd;
          next();
        })
        .catch(err => {
          //console.log(`Error occurred when hashing ... ${err}`);
        })
    })
    .catch(err => {
      //console.log(`Error occurred when salting ... ${err}`);
    })
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
