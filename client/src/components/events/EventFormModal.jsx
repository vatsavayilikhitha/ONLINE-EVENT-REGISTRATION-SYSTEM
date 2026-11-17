import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';

const INITIAL_FORM = {
  title: '',
  description: '',
  category: 'Workshops',
  date: '',
  startTime: '10:00 AM',
  endTime: '04:00 PM',
  venue: '',
  organizer: '',
  contact: '',
  capacity: 60,
  registrationDeadline: '',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80'
};

const CATEGORIES = [
  'Workshops',
  'Technical',
  'Cultural',
  'Sports',
  'Seminars',
  'Competitions',
  'Other'
];

const EventFormModal = ({ isOpen, onClose, onSubmit, initialData = null, isLoading }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'Workshops',
        date: initialData.date ? initialData.date.split('T')[0] : '',
        startTime: initialData.startTime || '',
        endTime: initialData.endTime || '',
        venue: initialData.venue || '',
        organizer: initialData.organizer || '',
        contact: initialData.contact || '',
        capacity: initialData.capacity || 50,
        registrationDeadline: initialData.registrationDeadline
          ? initialData.registrationDeadline.split('T')[0]
          : '',
        image: initialData.image || ''
      });
    } else {
      // Default dates: event in 14 days, deadline in 10 days
      const d = new Date();
      d.setDate(d.getDate() + 14);
      const dl = new Date();
      dl.setDate(dl.getDate() + 10);

      setFormData({
        ...INITIAL_FORM,
        date: d.toISOString().split('T')[0],
        registrationDeadline: dl.toISOString().split('T')[0]
      });
    }
    setFormError('');
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validation
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.date ||
      !formData.startTime.trim() ||
      !formData.endTime.trim() ||
      !formData.venue.trim() ||
      !formData.organizer.trim() ||
      !formData.contact.trim() ||
      !formData.registrationDeadline
    ) {
      setFormError('Please fill in all required fields');
      return;
    }

    if (Number(formData.capacity) <= 0) {
      setFormError('Capacity must be a positive number greater than 0');
      return;
    }

    if (new Date(formData.registrationDeadline) > new Date(formData.date)) {
      setFormError('Registration deadline cannot be after the event date');
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setFormError(err.response?.data?.message || err.message || 'Failed to save event');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Event Details' : 'Create New Event'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {formError && <ErrorMessage message={formError} />}

        <Input
          label="Event Title"
          name="title"
          required
          placeholder="e.g. AI & Machine Learning Workshop"
          value={formData.title}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-charcoal dark:text-[#F8F7F3] mb-1.5">
              Category <span className="text-warm-red">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full rounded-xl border border-warm-border dark:border-[#2E2E2E] text-sm px-3.5 py-2.5 bg-white dark:bg-[#1C1C1C] text-charcoal dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="dark:bg-[#1C1C1C] dark:text-[#F8F7F3]">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Total Capacity (Seats)"
            name="capacity"
            type="number"
            min="1"
            required
            value={formData.capacity}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Event Date"
            name="date"
            type="date"
            required
            value={formData.date}
            onChange={handleChange}
          />

          <Input
            label="Registration Deadline"
            name="registrationDeadline"
            type="date"
            required
            value={formData.registrationDeadline}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Time"
            name="startTime"
            required
            placeholder="e.g. 09:30 AM"
            value={formData.startTime}
            onChange={handleChange}
          />

          <Input
            label="End Time"
            name="endTime"
            required
            placeholder="e.g. 04:30 PM"
            value={formData.endTime}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Venue / Location"
          name="venue"
          required
          placeholder="e.g. Seminar Hall 302, Academic Block"
          value={formData.venue}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Organizer / Department"
            name="organizer"
            required
            placeholder="e.g. Dept of Computer Science"
            value={formData.organizer}
            onChange={handleChange}
          />

          <Input
            label="Contact Info"
            name="contact"
            required
            placeholder="e.g. events@college.edu | +1 (555) 019"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Banner Image URL"
          name="image"
          placeholder="https://images.unsplash.com/..."
          value={formData.image}
          onChange={handleChange}
          helperText="Direct image URL for the event cover banner."
        />

        <div>
          <label className="block text-sm font-bold text-charcoal dark:text-[#F8F7F3] mb-1.5">
            Description <span className="text-warm-red">*</span>
          </label>
          <textarea
            name="description"
            rows="3"
            required
            placeholder="Detailed description of the event, learning objectives, rules, eligibility..."
            value={formData.description}
            onChange={handleChange}
            className="block w-full rounded-xl border border-warm-border dark:border-[#2E2E2E] text-sm p-3 bg-white dark:bg-[#1C1C1C] text-charcoal dark:text-[#F8F7F3] placeholder-warm-gray/50 dark:placeholder-[#6B6B67] focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-warm-border dark:border-[#2E2E2E]">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isLoading} className="font-bold">
            {initialData ? 'Update Event' : 'Create Event'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EventFormModal;
