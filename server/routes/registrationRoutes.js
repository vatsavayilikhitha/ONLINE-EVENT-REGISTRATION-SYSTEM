const express = require('express');
const router = express.Router();
const {
  createRegistration,
  getMyRegistrations,
  getRegistrationById,
  cancelRegistration
} = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // all registration routes require login

router.post('/', createRegistration);
router.get('/my', getMyRegistrations);
router.get('/:id', getRegistrationById);
router.delete('/:id', cancelRegistration);

module.exports = router;
