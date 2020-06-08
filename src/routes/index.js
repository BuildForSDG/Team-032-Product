const router = require('express').Router();
const serverDemo = require('./serverDemoRoutes');
const registerCommunity = require('./registerCommunityRoutes');
const registerTeacher = require('./teacherRoute');
const registerTrainer = require('./trainerRoute');

router.use('', serverDemo);
router.use('/communities', registerCommunity);
router.use('/teachers', registerTeacher);
router.use('/trainers', registerTrainer);

module.exports = router;
