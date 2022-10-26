const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {
  updateOne,
  getAuthor,
} = require("../controller/profileController");

router
  .route("/editor/:id")
  .put(authMiddleware, updateOne)
  .get(getAuthor)
  
module.exports = router;
