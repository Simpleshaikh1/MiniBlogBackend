const Author = require("../models/user");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const authorTaken = await validateEmail(req.body.email);
    if (authorTaken) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const newAuthor = new Author({
      ...req.body,
    });

    await newAuthor.save();
    return res.status(201).json({
      message: "Account successfully created",
      data: newAuthor,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const author = await Author.findOne({ email });
    if (!author) {
      res.status(403).json({
        message: "Failed login attempt",
      });
    }
    let isMatch = await author.matchPasswords(password);
    if (isMatch) {

     let token = author.getSignedJwtToken(author._id)

      
      res.status(200).json({
        message: "Login success",
        authorId: author._id,
        data: token
      });
    } else {
      res.status(403).json({
        message: "Failed login attempt",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const validateEmail = async (email) => {
  let author = await Author.findOne({ email });
  if (author) {
    return true;
  } else {
    return false;
  }
};


module.exports = {
  register,
  login,
};
