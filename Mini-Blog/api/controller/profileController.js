const Author = require("../models/user");

const updateOne = async(req, res) => {
    try {
        const {email, id} =req.body
        if (!email || !id) {
            res.status(401).json({msg: "Please provide email and id"})
        }
        const author = await Author.findOne({_id: id})
        if (!author) {
            res.status(401).json({msg: "Unauthorized Access to use route"})
        }
        await Author.findByIdAndUpdate(req.user._id, req.body);
        
        return res.status(201).json({
            message: "Author successfully updated",
            success: true,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

const getAuthor = async(req, res) => {
    try {
        if (req.author.id !== req.params.id) {
            res.status(401).json({msg: "Unauthorized Author"})
        }
        const author = await Author.findById(req.params._id).select("-password").populate("");
        if(author) {
            return res.status(200).json(author);
        }
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

module.exports = {
    updateOne,
    getAuthor
}