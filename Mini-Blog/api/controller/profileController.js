const Author = require("../models/user");
const cloudinary = require("cloudinary").v2;

const updateOne = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ msg: `Author not found` });
  }

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );

  const newUpate = {
    ...req.body,
    image: result.secure_url,
  };

  const author = await Author.findByIdAndUpdate({ _id: id }, newUpate, {
    new: true,
    runValidators: true,
  }).select("-password")

  res.json({ author, ImageURL: result.secure_url });
};


const getAuthor = async (req, res) => {
  try {
    let id = req.params.id;
    const author = await Author.findById(id)
      .select("-password").select("-isTrash");
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
