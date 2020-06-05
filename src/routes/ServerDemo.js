const router = require('express').Router();
const ServerDemoController = require('../controllers/ServerDemo');

module.exports = router.get('', ServerDemoController);
