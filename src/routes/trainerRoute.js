const router = require('express').Router();
const TrainerController = require('../controllers/trainerController');
const validator = require('../middlewares/trainerValidator');

router.post('/sign-up', validator.createTrainer,
  TrainerController.createTrainer);
router.get('/create', TrainerController.verifyEmail);

module.exports = router;
