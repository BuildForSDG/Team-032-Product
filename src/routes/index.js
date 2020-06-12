const router = require('express').Router();
const serverDemo = require('./serverDemoRoutes');
const registerCommunity = require('./registerCommunityRoutes');
const admin = require('./adminRoutes');

router.use('', serverDemo);
router.use('/communities', registerCommunity);
router.use('/admin', admin);

module.exports = router;
