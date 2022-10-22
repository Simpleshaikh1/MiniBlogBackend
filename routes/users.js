const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { register, login } = require("../controller/userController");
const { updateOne, getAuthor } = require("../controller/profileController");

router.route("/register").post(register);
router.route("/login").post(login);
router
  .route("/editor/:id")
  .patch(authMiddleware, updateOne)
  .get(authMiddleware, getAuthor);

module.exports = router;
