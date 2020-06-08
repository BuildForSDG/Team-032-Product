const router = require('express').Router();
const TeacherController = require('../controllers/teacherController');
const validator = require('../middlewares/teacherValidator');

router.get('/verify', TeacherController.verifyEmail);
router.post('/create', validator.createTeacher,
  TeacherController.createTeacher);

module.exports = router;
