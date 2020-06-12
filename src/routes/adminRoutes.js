const router = require('express').Router();
const { adminLoginValidator } = require('../middlewares/loginValidator');
const adminLogin = require('../controllers/adminController');

router.post('/login', adminLoginValidator, adminLogin);

module.exports = router;
