const Author = require("../models/user");

const updateOne = async (req, res) => {
     try {
          // const {email, id} =req.body
          // if (!email || !id) {
          //     res.status(401).json({msg: "Please provide email and id"})
          // }

          req.author._id === req.params;
          const author = await Author.findOne(req.author._id);
          if (!author) {
               res.status(401).json({
                    msg: "Unauthorized Access to use route",
               });
          }
          await Author.findByIdAndUpdate(req.author._id, req.body);

          return res.status(201).json({
               message: "Author successfully updated",
               success: true,
          });
     } catch (err) {
          return res.status(500).json({
               message: err.message,
               success: false,
          });
     }
};

const getAuthor = async (req, res) => {
    
     const { id } = req.params;

     try {
          const author = await Author.findOne({ id }).select("-password");
          if (author) {
               return res.status(200).json(author);
          }
     } catch (err) {
          return res.status(500).json({
               message: err.message,
               success: false,
          });
     }
};

module.exports = {
     updateOne,
     getAuthor,
};
