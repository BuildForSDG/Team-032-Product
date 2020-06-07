const router = require('express').Router();
const serverDemo = require('./serverDemo');
const communityRoutes = require('./communityRoutes');

router.use('', serverDemo);
router.use('/communities', communityRoutes);

module.exports = router;
