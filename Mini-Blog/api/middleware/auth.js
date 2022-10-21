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
          res.status(401).json({ msg: `Unauthorize to access this route` });
     }

     //verify token using jwt
     try {
          const decode = jwt.verify(token, process.env.JWT_SECRET);
          const author = await Author.findById(decode.id);

          //create a conditional that check if the author is present
          if (!author) {
               res.status(401).json({ msg: `Token not found or Invalid` });
          }

          //assign the author to req.author
          req.author = author;
          next();
     } catch (error) {
          return next(
               res.status(500).json({msg: 'not working'})
          );
     }
};

//export authmiddleware
module.exports = authMiddleware;
