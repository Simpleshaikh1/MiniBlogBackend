const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const { updateOne, getAuthor } = require("../controller/profileController");

router
  .route("/editor/:id")
  .patch(authMiddleware, updateOne)
  .get(authMiddleware, getAuthor);

module.exports = router;
