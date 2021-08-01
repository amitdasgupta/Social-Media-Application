const express = require('express');
const authMiddleWare = require('../../middlewares/auth');

const router = express.Router();

router.use('/auth', require('./authController'));

router.use(authMiddleWare);

router.use('/user', require('./usersController'));

module.exports = router;
