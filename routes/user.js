const express = require('express');
const { loginIn, signup, logOut, singleUser } = require('../controllers/user');
const router = express.Router();

router.post('/login', loginIn);
router.post('/signup', signup);
router.get('/logout', logOut);
router.get('/admin/:id', singleUser);

module.exports = router;