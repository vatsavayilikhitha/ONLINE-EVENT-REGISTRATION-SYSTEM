const Registration = require('../models/Registration');
const Event = require('../models/Event');

// Helper to generate unique registration ID
const generateUniqueRegistrationId = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `EVT-${year}-${randomNum}`;
};

// @desc    Register user for an event
// @route   POST /api/registrations
// @access  Private
const createRegistration = async (req, res, next) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an event ID'
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check registration deadline
    const now = new Date();
    if (now > new Date(event.registrationDeadline)) {
      return res.status(400).json({
        success: false,
        message: 'Registration deadline for this event has passed'
      });
    }

    // Check capacity
    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Registration full. All seats for this event have been booked'
      });
    }

    // Check duplicate active registration
    const existingRegistration = await Registration.findOne({
      user: req.user._id,
      event: event._id,
      status: 'Confirmed'
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this event',
        registrationId: existingRegistration.registrationId
      });
    }

    // Create unique registration ID
    let registrationId = generateUniqueRegistrationId();
    // Safety check for uniqueness
    while (await Registration.findOne({ registrationId })) {
      registrationId = generateUniqueRegistrationId();
    }

    // Create registration
    const registration = await Registration.create({
      registrationId,
      user: req.user._id,
      event: event._id,
      status: 'Confirmed'
    });

    // Increment event registeredCount
    event.registeredCount += 1;
    await event.save();

    // Populate user and event for confirmation return
    const populated = await Registration.findById(registration._id)
      .populate('user', 'name email phone college')
      .populate('event');

    res.status(201).json({
      success: true,
      message: 'Registration confirmed successfully',
      registration: populated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's registrations
// @route   GET /api/registrations/my
// @access  Private
const getMyRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate('event')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single registration details
// @route   GET /api/registrations/:id
// @access  Private
const getRegistrationById = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('user', 'name email phone college')
      .populate('event');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    // Check ownership or admin
    if (
      registration.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this registration'
      });
    }

    res.status(200).json({
      success: true,
      registration
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel a registration
// @route   DELETE /api/registrations/:id
// @access  Private
const cancelRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration record not found'
      });
    }

    // Ownership or admin check
    if (
      registration.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this registration'
      });
    }

    if (registration.status === 'Cancelled') {
      return res.status(400).json({
        success: false,
        message: 'This registration is already cancelled'
      });
    }

    // Update status to Cancelled
    registration.status = 'Cancelled';
    await registration.save();

    // Decrease registered count in Event
    const event = await Event.findById(registration.event);
    if (event && event.registeredCount > 0) {
      event.registeredCount -= 1;
      await event.save();
    }

    res.status(200).json({
      success: true,
      message: 'Registration successfully cancelled',
      registration
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRegistration,
  getMyRegistrations,
  getRegistrationById,
  cancelRegistration
};
