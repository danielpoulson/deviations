const express = require('express');
const router = express.Router();
const loggers = require('../controllers/loggers');

router.post('/', loggers.createLog);
router.get('/:id', loggers.getLog);

module.exports = router;