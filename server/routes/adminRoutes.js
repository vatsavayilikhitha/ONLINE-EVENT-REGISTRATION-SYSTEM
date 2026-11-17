const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  getAdminRegistrations,
  updateRegistrationStatus
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect, admin); // all admin routes require admin authorization

router.get('/stats', getAdminStats);
router.get('/registrations', getAdminRegistrations);
router.patch('/registrations/:id/status', updateRegistrationStatus);

module.exports = router;
