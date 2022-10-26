// const { Router } = require('express');
const express = require("express");
const authMiddleware = require("../middleware/auth");
// const newsController = express('../controller/newsController');
const router = express.Router();

const {
  getAllNews,
  getAllSingleUserNews,
  createNews,
  updateNews,
  deleteNews,
  getSingleNews,
} = require("../controller/newsController");


router.route("/").get(getAllNews).post(authMiddleware, createNews);

router.route("/getAllSingleUserNews").get(getAllSingleUserNews);

router
  .route("/:id")
  .get(getSingleNews)
  .patch(authMiddleware, updateNews)
  .delete(authMiddleware, deleteNews);

module.exports = router;
