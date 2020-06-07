const router = require('express').Router();
const registrationValidator = require('../middlewares/registerCommunityValidator');
const registration = require('../controllers/communityController');

router.post('/reg', registrationValidator, registration);

module.exports = router;
