const router = require('express').Router();
const serverDemo = require('./serverDemoRoutes');
const registerCommunity = require('./registerCommunityRoutes');

router.use('', serverDemo);
router.use('/communities', registerCommunity);

module.exports = router;
