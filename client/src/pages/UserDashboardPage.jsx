import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registrationService } from '../services/registrationService';
import { eventService } from '../services/eventService';
import StatCard from '../components/dashboard/StatCard';
import RegistrationCard from '../components/registrations/RegistrationCard';
import EventCard from '../components/events/EventCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import {
  Ticket,
  CalendarClock,
  CheckCircle,
  XCircle,
  Compass,
  User,
  ArrowRight,
  LogOut,
  Mail,
  Building2,
  Phone
} from 'lucide-react';

const UserDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [regRes, eventRes] = await Promise.all([
        registrationService.getMyRegistrations(),
        eventService.getEvents({ limit: 3, sort: 'popularity' })
      ]);

      if (regRes.success) {
        setRegistrations(regRes.registrations || []);
      }
      if (eventRes.success) {
        setRecommendedEvents(eventRes.events || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard metrics.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleCancelRegistration = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this event ticket? Your seat will be released.')) {
      return;
    }
    setCancellingId(id);
    try {
      await registrationService.cancelRegistration(id);
      await fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel registration');
    } finally {
      setCancellingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text="Loading student dashboard..." size="large" />
      </div>
    );
  }

  // Calculate metrics
  const now = new Date();
  const confirmedRegistrations = registrations.filter((r) => r.status === 'Confirmed');
  const upcomingRegistrations = confirmedRegistrations.filter(
    (r) => r.event && new Date(r.event.date) >= now
  );
  const pastRegistrations = confirmedRegistrations.filter(
    (r) => r.event && new Date(r.event.date) < now
  );
  const cancelledRegistrations = registrations.filter((r) => r.status === 'Cancelled');

  let currentTabRegistrations = [];
  if (activeTab === 'upcoming') currentTabRegistrations = upcomingRegistrations;
  else if (activeTab === 'past') currentTabRegistrations = pastRegistrations;
  else if (activeTab === 'all') currentTabRegistrations = registrations;
  else if (activeTab === 'cancelled') currentTabRegistrations = cancelledRegistrations;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* User Profile Header Card */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-8 border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-[#D95D45] text-white flex items-center justify-center text-2xl font-black shadow-xs flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#171717] dark:text-[#F8F7F3]">
                {user?.name}
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F8E4DE] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#F87171] uppercase tracking-wider">
                {user?.role === 'admin' ? 'Administrator' : 'Student Member'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B6B67] dark:text-[#A8A29E]">
              <span className="flex items-center">
                <Mail className="w-3.5 h-3.5 mr-1 text-[#D95D45]" />
                {user?.email}
              </span>
              <span className="flex items-center">
                <Building2 className="w-3.5 h-3.5 mr-1 text-[#D95D45]" />
                {user?.college}
              </span>
              {user?.phone && (
                <span className="flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1 text-[#D95D45]" />
                  {user?.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-[#E5E2DB] dark:border-[#2E2E2E]">
          <Link to="/events">
            <button className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#D95D45] hover:bg-[#B94734] text-white shadow-xs flex items-center cursor-pointer transition-colors">
              <Compass className="w-4 h-4 mr-1.5" />
              Browse Events
            </button>
          </Link>
          <Link to="/profile">
            <button className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#F8F7F3] dark:bg-[#252525] hover:bg-stone-200/60 dark:hover:bg-[#303030] border border-[#E5E2DB] dark:border-[#2E2E2E] text-[#171717] dark:text-[#F8F7F3] flex items-center cursor-pointer transition-colors">
              <User className="w-4 h-4 mr-1.5" />
              Edit Profile
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#FCEBEA] dark:bg-[#3D1A18] text-[#C2413B] dark:text-[#F87171] border border-[#F8C8C6] dark:border-[#5C2320] hover:bg-[#F8D7D5] transition-colors flex items-center cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            Logout
          </button>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchDashboardData} />}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Registrations"
          value={registrations.length}
          icon={Ticket}
          color="coral"
          description="Lifetime bookings"
        />
        <StatCard
          title="Upcoming Events"
          value={upcomingRegistrations.length}
          icon={CalendarClock}
          color="emerald"
          description="Confirmed admissions"
        />
        <StatCard
          title="Past Events"
          value={pastRegistrations.length}
          icon={CheckCircle}
          color="purple"
          description="Attended campus sessions"
        />
        <StatCard
          title="Cancelled Passes"
          value={cancelledRegistrations.length}
          icon={XCircle}
          color="amber"
          description="Withdrawn entries"
        />
      </div>

      {/* Tabbed Registrations Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2DB] dark:border-[#2E2E2E] pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-[#D95D45] text-white shadow-2xs'
                  : 'bg-white dark:bg-[#1E1E1E] text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#171717] dark:hover:text-[#F8F7F3] border border-[#E5E2DB] dark:border-[#2E2E2E]'
              }`}
            >
              Upcoming Events ({upcomingRegistrations.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'past'
                  ? 'bg-[#D95D45] text-white shadow-2xs'
                  : 'bg-white dark:bg-[#1E1E1E] text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#171717] dark:hover:text-[#F8F7F3] border border-[#E5E2DB] dark:border-[#2E2E2E]'
              }`}
            >
              Past Events ({pastRegistrations.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#D95D45] text-white shadow-2xs'
                  : 'bg-white dark:bg-[#1E1E1E] text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#171717] dark:hover:text-[#F8F7F3] border border-[#E5E2DB] dark:border-[#2E2E2E]'
              }`}
            >
              All Passes ({registrations.length})
            </button>
            {cancelledRegistrations.length > 0 && (
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'cancelled'
                    ? 'bg-[#D95D45] text-white shadow-2xs'
                    : 'bg-white dark:bg-[#1E1E1E] text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#171717] dark:hover:text-[#F8F7F3] border border-[#E5E2DB] dark:border-[#2E2E2E]'
                }`}
              >
                Cancelled ({cancelledRegistrations.length})
              </button>
            )}
          </div>

          <Link
            to="/my-registrations"
            className="text-xs font-bold text-[#D95D45] hover:underline flex items-center"
          >
            <span>Manage All Tickets</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {/* Display Current Tab Registrations */}
        {currentTabRegistrations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTabRegistrations.map((reg) => (
              <RegistrationCard
                key={reg._id}
                registration={reg}
                onCancel={handleCancelRegistration}
                isCancelling={cancellingId === reg._id}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E5E2DB] dark:border-[#2E2E2E] p-10 text-center space-y-3 shadow-2xs">
            <Ticket className="w-12 h-12 text-[#D95D45] mx-auto opacity-80" />
            <h3 className="text-base font-bold text-[#171717] dark:text-[#F8F7F3]">
              No {activeTab} registrations found
            </h3>
            <p className="text-xs text-[#6B6B67] dark:text-[#A8A29E] max-w-sm mx-auto">
              {activeTab === 'upcoming'
                ? "You haven't reserved tickets for any upcoming events yet. Discover exciting workshops and competitions now!"
                : `You currently have no events in the ${activeTab} category.`}
            </p>
            <div className="pt-2">
              <Link to="/events">
                <button className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#D95D45] hover:bg-[#B94734] text-white shadow-xs cursor-pointer transition-colors">
                  Explore College Events
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Recommended / Trending Events Section */}
      <div className="space-y-4 pt-4 border-t border-[#E5E2DB] dark:border-[#2E2E2E]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#171717] dark:text-[#F8F7F3] tracking-tight">
              Recommended Events For You
            </h2>
            <p className="text-xs text-[#6B6B67] dark:text-[#A8A29E]">
              Popular upcoming campus sessions and workshops.
            </p>
          </div>
          <Link
            to="/events"
            className="text-xs font-bold text-[#D95D45] hover:underline flex items-center"
          >
            <span>See more events</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedEvents.map((evt) => (
            <EventCard key={evt._id} event={evt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
