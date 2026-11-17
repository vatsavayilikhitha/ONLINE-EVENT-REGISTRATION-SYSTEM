const Event = require('../models/Event');
const Registration = require('../models/Registration');

// @desc    Get all events with search, filter, and sort options
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res, next) => {
  try {
    const { search, category, availability, sort, limit } = req.query;

    let query = {};

    // Search filter across title, description, venue, organizer
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { venue: searchRegex },
        { organizer: searchRegex }
      ];
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Availability filter
    if (availability === 'available') {
      // capacity > registeredCount
      query.$expr = { $gt: ['$capacity', '$registeredCount'] };
    }

    // Sorting
    let sortOptions = { date: 1 }; // default upcoming first
    if (sort === 'date_desc') {
      sortOptions = { date: -1 };
    } else if (sort === 'title_asc') {
      sortOptions = { title: 1 };
    } else if (sort === 'capacity_desc') {
      sortOptions = { capacity: -1 };
    }

    let eventsQuery = Event.find(query).sort(sortOptions);

    if (limit) {
      eventsQuery = eventsQuery.limit(parseInt(limit, 10));
    }

    const events = await eventsQuery;

    res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      date,
      startTime,
      endTime,
      venue,
      organizer,
      contact,
      capacity,
      registrationDeadline,
      image
    } = req.body;

    // Field presence checks
    if (
      !title ||
      !description ||
      !category ||
      !date ||
      !startTime ||
      !endTime ||
      !venue ||
      !organizer ||
      !contact ||
      capacity === undefined ||
      !registrationDeadline
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required event details'
      });
    }

    // Capacity check
    if (Number(capacity) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Capacity must be greater than 0'
      });
    }

    // Deadline vs Event date check
    const eventDate = new Date(date);
    const deadlineDate = new Date(registrationDeadline);

    if (deadlineDate > eventDate) {
      return res.status(400).json({
        success: false,
        message: 'Registration deadline cannot be after the event date'
      });
    }

    const event = await Event.create({
      title: title.trim(),
      description: description.trim(),
      category,
      date: eventDate,
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      venue: venue.trim(),
      organizer: organizer.trim(),
      contact: contact.trim(),
      capacity: Number(capacity),
      registrationDeadline: deadlineDate,
      image: image && image.trim() !== '' ? image.trim() : undefined
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const {
      title,
      description,
      category,
      date,
      startTime,
      endTime,
      venue,
      organizer,
      contact,
      capacity,
      registrationDeadline,
      image
    } = req.body;

    // Capacity validation if updated
    if (capacity !== undefined) {
      if (Number(capacity) <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Capacity must be greater than 0'
        });
      }
      if (Number(capacity) < event.registeredCount) {
        return res.status(400).json({
          success: false,
          message: `Capacity cannot be lower than current confirmed registrations (${event.registeredCount})`
        });
      }
    }

    // Date & deadline check if provided
    const targetEventDate = date ? new Date(date) : event.date;
    const targetDeadline = registrationDeadline ? new Date(registrationDeadline) : event.registrationDeadline;

    if (targetDeadline > targetEventDate) {
      return res.status(400).json({
        success: false,
        message: 'Registration deadline cannot be after the event date'
      });
    }

    if (title) event.title = title.trim();
    if (description) event.description = description.trim();
    if (category) event.category = category;
    if (date) event.date = targetEventDate;
    if (startTime) event.startTime = startTime.trim();
    if (endTime) event.endTime = endTime.trim();
    if (venue) event.venue = venue.trim();
    if (organizer) event.organizer = organizer.trim();
    if (contact) event.contact = contact.trim();
    if (capacity !== undefined) event.capacity = Number(capacity);
    if (registrationDeadline) event.registrationDeadline = targetDeadline;
    if (image) event.image = image.trim();

    const updatedEvent = await event.save();

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event: updatedEvent
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete event and its associated registrations
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Remove registrations associated with this event
    await Registration.deleteMany({ event: event._id });
    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Event and associated registrations deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
