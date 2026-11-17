const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Cancelled', 'Completed'],
      default: 'Confirmed'
    },
    remarks: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Compound index for fast queries by user and event
registrationSchema.index({ user: 1, event: 1 });
registrationSchema.index({ event: 1, status: 1 });

module.exports = mongoose.model('Registration', registrationSchema);
