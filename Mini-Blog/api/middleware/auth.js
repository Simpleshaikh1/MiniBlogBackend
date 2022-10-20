//require json web token
const jwt = require("jsonwebtoken");

//require author Schema
const Author = require("../models/user");

//create a function for authentication
const authMiddleware = async (req, res, next) => {
  //create a variable
  let token;
  //create a condition that targets the req.headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //split the headers to arrays with space, target index 1.
    token = req.headers.authorization.split(" ")[1];
  }

  //check if token is present
  if (!token) {
    return next(new ErrorResponse(`Not Authorized to Access this Route`, 401));
  }

  //verify token using jwt
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const author = await Author.findById(decode.id);

    //create a conditional that check if the author is present
    if (!author) {
      return next(new ErrorResponse("No Author found with this id:", 404));
    }

    //assign the author to req.author
    req.author = author;
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to accss this route", 404));
  }
};

//export authmiddleware
module.exports = authMiddleware;
