const router = require('express').Router();
const serverDemoController = require('../controllers/serverDemoController');

router.get('', serverDemoController);

module.exports = router;
