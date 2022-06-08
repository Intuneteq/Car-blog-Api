const express = require('express');
const router = express.Router(); 
const { createnewBlog } = require("../controllers/newBlogController");

router.post('/newBlog', createnewBlog);

module.exports = router;