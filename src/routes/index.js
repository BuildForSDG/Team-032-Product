const router = require('express').Router();
const serverDemo = require('./serverDemoRoutes');
const registerCommunity = require('./registerCommunityRoutes');
const registerTeacher = require('./teacherRoute');
const registerTrainer = require('./trainerRoute');

router.use('', serverDemo);
router.use('/communities', registerCommunity);
router.use('/users/teachers', registerTeacher);
router.use('/users/trainers', registerTrainer);

module.exports = router;
