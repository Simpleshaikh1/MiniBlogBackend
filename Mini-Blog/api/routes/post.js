// const { Router } = require('express');
const express = require ('express');
// const newsController = express('../controller/newsController');

const {
    getAllNews,
    getAllSingleUserNews,
    createNews,
    updateNews,
    deleteNews,
    getSingleNews
} = require('../controller/newsController')

const router = express.Router();

router
    .route('/')
    .get(getAllNews)
    .post(createNews);

router
.route('/getAllSingleUserNews')
.get(getAllSingleUserNews)

router
    .route('/:id')
    .get(getSingleNews)
    .patch(updateNews)
    .delete(deleteNews)

    
    
module.exports = router;