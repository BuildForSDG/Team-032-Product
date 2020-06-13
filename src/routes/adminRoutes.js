const router = require('express').Router();
const { adminLoginValidator, deployTeacherValidator } = require('../middlewares/loginValidator');
const adminController = require('../controllers/adminController');

router.post('/login', adminLoginValidator, adminController.adminLogin);

// there should be check for authorisation
router.get('/deployTeacher', deployTeacherValidator, adminController.deployTeacher);

module.exports = router;
