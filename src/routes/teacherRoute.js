const router = require('express').Router();
const TeacherController = require('../controllers/teacherController');

router.get('/verify', TeacherController.verifyEmail);
router.post('/create', TeacherController.createTeacher);

module.exports = router;
