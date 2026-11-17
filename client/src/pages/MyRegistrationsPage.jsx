import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { registrationService } from '../services/registrationService';
import RegistrationCard from '../components/registrations/RegistrationCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import ErrorMessage from '../components/common/ErrorMessage';
import { Ticket, Calendar, Search } from 'lucide-react';

const MyRegistrationsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await registrationService.getMyRegistrations();
      if (data.success) {
        setRegistrations(data.registrations || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to retrieve registrations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleCancelRegistration = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this event ticket? Your seat will be released for other students.')) {
      return;
    }
    setCancellingId(id);
    try {
      await registrationService.cancelRegistration(id);
      await fetchRegistrations();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel registration');
    } finally {
      setCancellingId(null);
    }
  };

  // Filter registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesStatus = statusFilter === 'All' || reg.status === statusFilter;
    const matchesSearch =
      searchTerm.trim() === '' ||
      reg.event?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.registrationId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.event?.venue?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#171717] dark:text-[#F8F7F3] tracking-tight">
            My Event Registrations
          </h1>
          <p className="text-sm text-[#6B6B67] dark:text-[#A8A29E] mt-1">
            Review your booked tickets, check event venues, and print official entry passes.
          </p>
        </div>

        <Link
          to="/events"
          className="inline-flex items-center text-xs font-bold px-4 py-2.5 bg-[#D95D45] hover:bg-[#B94734] text-white rounded-xl transition-colors shadow-2xs cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 mr-1.5" />
          Register For More Events
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-[#E5E2DB] dark:border-[#2E2E2E]">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {['All', 'Confirmed', 'Cancelled'].map((tab) => {
            const isActive = statusFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D95D45] text-white border border-[#D95D45] shadow-xs'
                    : 'bg-white dark:bg-[#1E1E1E] text-[#6B6B67] dark:text-[#A8A29E] border border-[#E5E2DB] dark:border-[#2E2E2E] hover:text-[#171717] dark:hover:text-white hover:bg-[#F3F1EC] dark:hover:bg-[#252525]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Search within registrations */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#6B6B67] dark:text-[#A8A29E]" />
          <input
            type="text"
            placeholder="Search by event or Ticket ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-[#1C1C1C] text-[#171717] dark:text-[#F8F7F3] border border-[#E5E2DB] dark:border-[#2E2E2E] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D95D45]/20 focus:border-[#D95D45] placeholder-[#6B6B67]/50 dark:placeholder-[#A8A29E]/50"
          />
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchRegistrations} />}

      {loading ? (
        <LoadingSpinner text="Retrieving your registered passes..." />
      ) : filteredRegistrations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRegistrations.map((reg) => (
            <RegistrationCard
              key={reg._id}
              registration={reg}
              onCancel={handleCancelRegistration}
              isCancelling={cancellingId === reg._id}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Ticket}
          title="No registrations found"
          description={
            statusFilter !== 'All' || searchTerm
              ? 'No registration records match your filter criteria.'
              : "You haven't registered for any events yet. Explore upcoming workshops and competitions!"
          }
          actionText="Browse Available Events"
          onAction={() => (window.location.href = '/events')}
        />
      )}
    </div>
  );
};

export default MyRegistrationsPage;
