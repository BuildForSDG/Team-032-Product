const router = require('express').Router();
const serverDemo = require('./serverDemoRoutes');
const registerCommunity = require('./registerCommunityRoutes');
const userLoginRoutes = require('./userLoginRoutes');

router.use('', serverDemo);
router.use('/communities', registerCommunity);
router.use('/users', userLoginRoutes);

module.exports = router;
