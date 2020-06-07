const router = require('express').Router();
const ServerDemoController = require('../controllers/ServerDemo');

router.get('', ServerDemoController);

module.exports = router;
