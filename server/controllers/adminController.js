const Event = require('../models/Event');
const Registration = require('../models/Registration');
const User = require('../models/User');

// @desc    Get dashboard metrics & statistics for Admin
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res, next) => {
  try {
    const now = new Date();

    const [
      totalEvents,
      upcomingEvents,
      totalRegistrations,
      confirmedRegistrations,
      totalUsers,
      eventsByCategory,
      recentRegistrations
    ] = await Promise.all([
      Event.countDocuments(),
      Event.countDocuments({ date: { $gte: now } }),
      Registration.countDocuments(),
      Registration.countDocuments({ status: 'Confirmed' }),
      User.countDocuments({ role: 'user' }),
      Event.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
            totalCapacity: { $sum: '$capacity' },
            totalRegistered: { $sum: '$registeredCount' }
          }
        },
        { $sort: { count: -1 } }
      ]),
      Registration.find()
        .populate('user', 'name email phone college')
        .populate('event', 'title date venue')
        .sort({ createdAt: -1 })
        .limit(6)
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalEvents,
        upcomingEvents,
        totalRegistrations,
        confirmedRegistrations,
        totalUsers,
        eventsByCategory,
        recentRegistrations
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all registrations with search and filtering for Admin
// @route   GET /api/admin/registrations
// @access  Private/Admin
const getAdminRegistrations = async (req, res, next) => {
  try {
    const { search, eventId, status } = req.query;

    let query = {};

    if (eventId && eventId !== 'All') {
      query.event = eventId;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    let registrations = await Registration.find(query)
      .populate('user', 'name email phone college')
      .populate('event', 'title date venue category capacity registeredCount')
      .sort({ createdAt: -1 });

    // Filter by participant name, email, or registrationId if search is provided
    if (search && search.trim() !== '') {
      const term = search.toLowerCase().trim();
      registrations = registrations.filter((reg) => {
        const userName = reg.user?.name?.toLowerCase() || '';
        const userEmail = reg.user?.email?.toLowerCase() || '';
        const regId = reg.registrationId?.toLowerCase() || '';
        const eventTitle = reg.event?.title?.toLowerCase() || '';
        return (
          userName.includes(term) ||
          userEmail.includes(term) ||
          regId.includes(term) ||
          eventTitle.includes(term)
        );
      });
    }

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update registration status
// @route   PATCH /api/admin/registrations/:id/status
// @access  Private/Admin
const updateRegistrationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Confirmed', 'Cancelled', 'Completed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    const previousStatus = registration.status;
    registration.status = status;
    await registration.save();

    // Adjust event capacity if status transitioned to or from Cancelled
    if (previousStatus !== 'Cancelled' && status === 'Cancelled') {
      const event = await Event.findById(registration.event);
      if (event && event.registeredCount > 0) {
        event.registeredCount -= 1;
        await event.save();
      }
    } else if (previousStatus === 'Cancelled' && status === 'Confirmed') {
      const event = await Event.findById(registration.event);
      if (event) {
        event.registeredCount += 1;
        await event.save();
      }
    }

    const updated = await Registration.findById(registration._id)
      .populate('user', 'name email phone college')
      .populate('event', 'title date venue');

    res.status(200).json({
      success: true,
      message: `Registration marked as ${status}`,
      registration: updated
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminStats,
  getAdminRegistrations,
  updateRegistrationStatus
};
