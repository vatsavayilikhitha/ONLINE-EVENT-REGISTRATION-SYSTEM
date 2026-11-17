import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import EventFormModal from '../components/events/EventFormModal';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import SearchBar from '../components/events/SearchBar';
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  Users,
  Eye,
  AlertTriangle,
  ArrowUpDown
} from 'lucide-react';
import { formatDate } from '../utils/formatDate';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Delete modal state
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await eventService.getEvents();
      if (data.success) {
        setEvents(data.events || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (evt) => {
    setEditingEvent(evt);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setFormSubmitting(true);
    try {
      if (editingEvent) {
        await eventService.updateEvent(editingEvent._id, formData);
      } else {
        await eventService.createEvent(formData);
      }
      setIsFormOpen(false);
      await fetchEvents();
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingEvent) return;
    setIsDeleting(true);
    try {
      await eventService.deleteEvent(deletingEvent._id);
      setDeletingEvent(null);
      await fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete event');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter events by search & category
  const filteredEvents = events.filter((evt) => {
    const matchesCategory = categoryFilter === 'All' || evt.category === categoryFilter;
    const matchesSearch =
      search.trim() === '' ||
      evt.title?.toLowerCase().includes(search.toLowerCase()) ||
      evt.venue?.toLowerCase().includes(search.toLowerCase()) ||
      evt.organizer?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-charcoal dark:text-[#F8F7F3] tracking-tight">
            Event Management
          </h1>
          <p className="text-sm text-warm-gray dark:text-[#A8A29E] mt-1">
            Create, update, or remove university events, and track registered capacity.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleOpenCreate} className="shadow-xs font-bold">
          <Plus className="w-4 h-4 mr-1.5" />
          Create New Event
        </Button>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <SearchBar
            value={search}
            onChange={(val) => setSearch(val)}
            onClear={() => setSearch('')}
            placeholder="Search by title, venue, organizer..."
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-warm-gray dark:text-[#A8A29E] font-bold whitespace-nowrap">
            Category:
          </span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-white dark:bg-[#1E1E1E] border border-warm-border dark:border-[#2E2E2E] rounded-xl px-3 py-2 text-charcoal dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral"
          >
            <option value="All" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">All Categories</option>
            <option value="Workshops" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Workshops</option>
            <option value="Technical" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Technical</option>
            <option value="Competitions" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Competitions</option>
            <option value="Cultural" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Cultural</option>
            <option value="Sports" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Sports</option>
            <option value="Seminars" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Seminars</option>
          </select>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchEvents} />}

      {/* Events Table */}
      {loading ? (
        <LoadingSpinner text="Loading events catalog..." />
      ) : filteredEvents.length > 0 ? (
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-warm-border dark:border-[#2E2E2E] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-warm-gray dark:text-[#A8A29E]">
              <thead className="bg-[#F8F7F3] dark:bg-[#141414] text-warm-gray dark:text-[#A8A29E] uppercase tracking-wider text-[11px] font-bold border-b border-warm-border dark:border-[#2E2E2E]">
                <tr>
                  <th className="px-4 py-3.5">Event Title</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Schedule</th>
                  <th className="px-4 py-3.5">Venue</th>
                  <th className="px-4 py-3.5">Capacity</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-border dark:divide-dark-border">
                {filteredEvents.map((evt) => (
                  <tr key={evt._id} className="hover:bg-stone-50 dark:hover:bg-[#252525] transition-colors">
                    <td className="px-4 py-4 font-bold text-charcoal dark:text-[#F8F7F3] max-w-[220px]">
                      <div className="truncate">{evt.title}</div>
                      <div className="text-[11px] text-warm-gray dark:text-[#A8A29E] font-medium truncate">
                        {evt.organizer}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge variant="primary" size="xs">
                        {evt.category}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-bold text-charcoal dark:text-[#F8F7F3]">{formatDate(evt.date)}</div>
                      <div className="text-[11px] text-warm-gray dark:text-[#A8A29E]">{evt.startTime}</div>
                    </td>
                    <td className="px-4 py-4 max-w-[160px] truncate text-warm-gray dark:text-[#A8A29E]">
                      {evt.venue}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-bold text-charcoal dark:text-[#F8F7F3]">
                        {evt.registeredCount || 0}
                      </span>{' '}
                      / {evt.capacity}
                      <span className="text-[11px] text-warm-gray dark:text-[#A8A29E] block">
                        {Math.max(0, evt.capacity - (evt.registeredCount || 0))} seats left
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right whitespace-nowrap space-x-2">
                      <Link
                        to={`/events/${evt._id}`}
                        className="inline-flex p-1.5 rounded-lg border border-warm-border dark:border-[#2E2E2E] text-warm-gray dark:text-[#A8A29E] hover:text-charcoal dark:hover:text-[#F8F7F3] hover:bg-stone-100 dark:hover:bg-[#282828] transition-colors"
                        title="View Public Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(evt)}
                        className="inline-flex p-1.5 rounded-lg border border-warm-border dark:border-[#2E2E2E] text-coral hover:bg-coral-soft dark:hover:bg-[#3D1D16] transition-colors cursor-pointer"
                        title="Edit Event"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingEvent(evt)}
                        className="inline-flex p-1.5 rounded-lg border border-warm-border dark:border-[#2E2E2E] text-warm-red hover:bg-warm-red/10 dark:hover:bg-[#3D1A18] transition-colors cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-slate-200 dark:border-[#2E2E2E] p-12 text-center text-slate-500 dark:text-[#A8A29E]">
          No events match the specified search or filter criteria.
        </div>
      )}

      {/* Create / Edit Modal */}
      {isFormOpen && (
        <EventFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editingEvent}
          isLoading={formSubmitting}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingEvent && (
        <Modal
          isOpen={!!deletingEvent}
          onClose={() => setDeletingEvent(null)}
          title="Confirm Delete Event"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-red-50 dark:bg-[#3D1A18] p-4 rounded-xl border border-red-200 dark:border-[#5C2320] text-red-800 dark:text-[#FCA5A5]">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600 dark:text-[#F87171]" />
              <p className="text-xs leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <strong className="font-bold text-red-950 dark:text-white">{deletingEvent.title}</strong>? All
                associated student registrations will also be removed from the system.
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeletingEvent(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDeleteConfirm}
                isLoading={isDeleting}
              >
                Delete Event
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminEventsPage;
