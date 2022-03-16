const express = require('express');
const authMiddleWare = require('../../middlewares/auth');
const { upload } = require('../../helpers/multer');

const router = express.Router();

router.use('/auth', upload.none(), require('./authController'));

router.use(authMiddleWare);

router.use('/user', require('./usersController'));
router.use('/post', require('./postController'));
router.use('/comment', require('./commentController'));

module.exports = router;
