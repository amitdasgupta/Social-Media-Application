const express = require('express');

const router = express.Router();

router.use('/api', require('./apicontroller/indexController'));

module.exports = router;
