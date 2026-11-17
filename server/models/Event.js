const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an event title'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide an event description']
    },
    category: {
      type: String,
      required: [true, 'Please select an event category'],
      enum: ['Workshops', 'Technical', 'Cultural', 'Sports', 'Seminars', 'Competitions', 'Other'],
      default: 'Technical'
    },
    date: {
      type: Date,
      required: [true, 'Please provide the event date']
    },
    startTime: {
      type: String,
      required: [true, 'Please provide the event start time'],
      trim: true
    },
    endTime: {
      type: String,
      required: [true, 'Please provide the event end time'],
      trim: true
    },
    venue: {
      type: String,
      required: [true, 'Please provide a venue or location'],
      trim: true
    },
    organizer: {
      type: String,
      required: [true, 'Please specify the event organizer or department'],
      trim: true
    },
    contact: {
      type: String,
      required: [true, 'Please provide contact information (email or phone)'],
      trim: true
    },
    capacity: {
      type: Number,
      required: [true, 'Please specify the event capacity'],
      min: [1, 'Capacity must be at least 1 seat']
    },
    registeredCount: {
      type: Number,
      default: 0,
      min: [0, 'Registered count cannot be negative']
    },
    registrationDeadline: {
      type: Date,
      required: [true, 'Please specify the registration deadline']
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual field for available seats
eventSchema.virtual('availableSeats').get(function () {
  return Math.max(0, this.capacity - (this.registeredCount || 0));
});

// Virtual field for isRegistrationOpen
eventSchema.virtual('isOpen').get(function () {
  const now = new Date();
  const deadline = new Date(this.registrationDeadline);
  const seatsLeft = this.capacity - (this.registeredCount || 0);
  return now <= deadline && seatsLeft > 0;
});

module.exports = mongoose.model('Event', eventSchema);
