const router = require('express').Router();
const userLoginValidator = require('../middlewares/userLoginValidator');
const userLogin = require('../controllers/userLoginController');

router.post('/login', userLoginValidator, userLogin);

module.exports = router;
