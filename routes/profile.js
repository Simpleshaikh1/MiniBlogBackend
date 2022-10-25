const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {
  updateOne,
  getAuthor,
  upload,
} = require("../controller/profileController");

router
  .route("/editor/:id")
  .patch(authMiddleware, updateOne)
  .get(getAuthor)
  
module.exports = router;
