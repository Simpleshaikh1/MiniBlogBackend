// const { Router } = require('express');
const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

const {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
  getSingleNews,
} = require("../controller/newsController");


router.route("/").get(getAllNews).post( authMiddleware, createNews);


router
  .route("/:id")
  .get(getSingleNews)
  .put(authMiddleware, updateNews)
  .delete(authMiddleware, deleteNews);

module.exports = router;
