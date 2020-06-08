const router = require('express').Router();
const TrainerController = require('../controllers/trainerController');
const validator = require('../middlewares/trainerValidator');

router.get('/verify', TrainerController.verifyEmail);
router.post('/create', validator.createTrainer,
  TrainerController.createTrainer);

module.exports = router;
