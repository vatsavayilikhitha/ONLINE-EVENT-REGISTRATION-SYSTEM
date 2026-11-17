import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../services/adminService';
import { eventService } from '../services/eventService';
import SearchBar from '../components/events/SearchBar';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Users, Ticket, Filter, ExternalLink, Printer } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

const AdminParticipantsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [regRes, eventRes] = await Promise.all([
        adminService.getRegistrations({
          search: search.trim() || undefined,
          eventId: selectedEventId,
          status: selectedStatus
        }),
        eventService.getEvents()
      ]);

      if (regRes.success) {
        setRegistrations(regRes.registrations || []);
      }
      if (eventRes.success) {
        setEvents(eventRes.events || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to retrieve participants roster');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedEventId, selectedStatus]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    fetchData();
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await adminService.updateRegistrationStatus(id, newStatus);
      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update registration status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadgeVariant = (st) => {
    switch (st) {
      case 'Confirmed':
        return 'success';
      case 'Cancelled':
        return 'danger';
      case 'Completed':
        return 'indigo';
      default:
        return 'default';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-charcoal dark:text-[#F8F7F3] tracking-tight">
          Participant Management
        </h1>
        <p className="text-sm text-warm-gray dark:text-[#A8A29E] mt-1">
          Review student registrations, filter by event or status, and verify attendance.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full lg:w-96">
          <SearchBar
            value={search}
            onChange={(val) => setSearch(val)}
            onClear={() => {
              setSearch('');
              setTimeout(fetchData, 0);
            }}
            placeholder="Search student, email, ID..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-coral hover:bg-coral-hover text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Find
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Event Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-warm-gray dark:text-[#A8A29E] font-bold">Event:</span>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="text-xs bg-white dark:bg-[#1E1E1E] border border-warm-border dark:border-[#2E2E2E] rounded-xl px-3 py-2 text-charcoal dark:text-[#F8F7F3] max-w-[200px] truncate focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral"
            >
              <option value="All" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">All Events</option>
              {events.map((evt) => (
                <option key={evt._id} value={evt._id} className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">
                  {evt.title}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-warm-gray dark:text-[#A8A29E] font-bold">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs bg-white dark:bg-[#1E1E1E] border border-warm-border dark:border-[#2E2E2E] rounded-xl px-3 py-2 text-charcoal dark:text-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral"
            >
              <option value="All" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">All Statuses</option>
              <option value="Confirmed" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Confirmed</option>
              <option value="Completed" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Completed</option>
              <option value="Cancelled" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchData} />}

      {/* Participants Table */}
      {loading ? (
        <LoadingSpinner text="Searching participants..." />
      ) : registrations.length > 0 ? (
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-warm-border dark:border-[#2E2E2E] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-warm-gray dark:text-[#A8A29E]">
              <thead className="bg-[#F8F7F3] dark:bg-[#141414] text-warm-gray dark:text-[#A8A29E] uppercase tracking-wider text-[11px] font-bold border-b border-warm-border dark:border-[#2E2E2E]">
                <tr>
                  <th className="px-4 py-3.5">Registration ID</th>
                  <th className="px-4 py-3.5">Student Name</th>
                  <th className="px-4 py-3.5">Email & Phone</th>
                  <th className="px-4 py-3.5">Registered Event</th>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-border dark:divide-dark-border">
                {registrations.map((reg) => (
                  <tr key={reg._id} className="hover:bg-stone-50 dark:hover:bg-[#252525] transition-colors">
                    <td className="px-4 py-4 font-mono font-bold text-charcoal dark:text-[#F8F7F3] whitespace-nowrap">
                      {reg.registrationId}
                    </td>
                    <td className="px-4 py-4 font-bold text-charcoal dark:text-[#F8F7F3] whitespace-nowrap">
                      <div>{reg.user?.name || 'Unknown User'}</div>
                      <div className="text-[11px] text-warm-gray dark:text-[#A8A29E] font-medium">
                        {reg.user?.college || 'College N/A'}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-charcoal dark:text-[#F8F7F3] font-medium">{reg.user?.email || 'N/A'}</div>
                      <div className="text-[11px] text-warm-gray dark:text-[#A8A29E]">{reg.user?.phone || 'N/A'}</div>
                    </td>
                    <td className="px-4 py-4 max-w-[200px]">
                      <div className="font-bold text-charcoal dark:text-[#F8F7F3] truncate">
                        {reg.event?.title || 'Unknown Event'}
                      </div>
                      <div className="text-[11px] text-warm-gray dark:text-[#A8A29E] truncate">
                        {reg.event?.venue}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-warm-gray dark:text-[#A8A29E]">
                      {formatDate(reg.registeredAt || reg.createdAt)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <select
                        value={reg.status}
                        disabled={updatingId === reg._id}
                        onChange={(e) => handleStatusChange(reg._id, e.target.value)}
                        className={`text-xs rounded-xl px-2.5 py-1 font-bold border ${
                          reg.status === 'Confirmed'
                            ? 'bg-forest-soft dark:bg-[#163324] text-forest dark:text-[#4ADE80] border-forest/20'
                            : reg.status === 'Cancelled'
                            ? 'bg-warm-red/10 dark:bg-[#3D1A18] text-warm-red dark:text-[#F87171] border-warm-red/20'
                            : 'bg-stone-100 dark:bg-[#262626] text-charcoal dark:text-[#F8F7F3] border-warm-border dark:border-[#3E3E3E]'
                        } cursor-pointer focus:outline-none`}
                      >
                        <option value="Confirmed" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Confirmed</option>
                        <option value="Completed" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Completed</option>
                        <option value="Cancelled" className="dark:bg-[#1E1E1E] dark:text-[#F8F7F3]">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      <Link
                        to={`/registrations/confirmation/${reg._id}`}
                        target="_blank"
                        className="inline-flex items-center text-xs text-coral hover:text-coral-hover font-bold"
                        title="View Official Ticket"
                      >
                        <Printer className="w-3.5 h-3.5 mr-1" />
                        Pass
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-slate-200 dark:border-[#2E2E2E] p-12 text-center text-slate-500 dark:text-[#A8A29E]">
          No participant registration records match the criteria.
        </div>
      )}
    </div>
  );
};

export default AdminParticipantsPage;
