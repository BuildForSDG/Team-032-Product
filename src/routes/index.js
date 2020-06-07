const router = require('express').Router();
const serverDemo = require('./serverDemoRoutes');
const registerCommunity = require('./registerCommunityRoutes');
const registerTeachers = require('./teacherRoute');

router.use('', serverDemo);
router.use('/communities', registerCommunity);
router.use('/teachers', registerTeachers);

module.exports = router;
