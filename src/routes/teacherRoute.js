const router = require('express').Router();
const TeacherController = require('../controllers/teacherController');
const validator = require('../middlewares/teacherValidator');

router.post('/sign-up', validator.createTeacher,
  TeacherController.createTeacher);
router.get('/create', TeacherController.verifyEmail);

module.exports = router;
