//require mongoose
const mongoose = require("mongoose");
//require json web token
const jwt = require("jsonwebtoken");
//require bcrypt
const bcrypt = require("bcrypt");

const authorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  isTrash: {
    type: Boolean,
    default: false,
  },
  newsSchema_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  ],
});

//create a method for bcrypt password
authorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//create a method for bcrypt compare
authorSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//create a method for jwt signed token
authorSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

//export author schema
const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
