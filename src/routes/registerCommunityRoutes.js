const router = require('express').Router();
const registrationValidator = require('../middlewares/registerCommunityValidator');
const registration = require('../controllers/registerCommunityController');

router.post('/reg', registrationValidator, registration);

module.exports = router;
