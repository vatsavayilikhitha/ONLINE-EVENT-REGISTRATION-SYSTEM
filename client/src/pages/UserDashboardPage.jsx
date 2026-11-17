import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registrationService } from '../services/registrationService';
import { eventService } from '../services/eventService';
import StatCard from '../components/dashboard/StatCard';
import RegistrationCard from '../components/registrations/RegistrationCard';
import EventCard from '../components/events/EventCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';
import {
  Ticket,
  CalendarClock,
  CheckCircle,
  XCircle,
  Compass,
  User,
  ArrowRight,
  Sparkles,
  GraduationCap
} from 'lucide-react';

const UserDashboardPage = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const [regRes, eventRes] = await Promise.all([
        registrationService.getMyRegistrations(),
        eventService.getEvents({ limit: 3, sort: 'date_asc' })
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
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCancelRegistration = async (id) => {
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
  const completedRegistrations = confirmedRegistrations.filter(
    (r) => r.event && new Date(r.event.date) < now
  );
  const cancelledCount = registrations.filter((r) => r.status === 'Cancelled').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-8 border border-warm-border dark:border-[#2E2E2E] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-coral-soft dark:bg-[#3D1D16] text-coral dark:text-[#F87171] border border-coral/20 dark:border-[#5A261D] text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Student Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-charcoal dark:text-[#F8F7F3]">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xs sm:text-sm text-warm-gray dark:text-[#A8A29E]">
            {user?.college} • {user?.email}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/events">
            <button className="px-4 py-2.5 rounded-xl font-bold text-xs bg-coral hover:bg-coral-hover text-white shadow-xs flex items-center cursor-pointer transition-colors">
              <Compass className="w-4 h-4 mr-1.5" />
              Browse Events
            </button>
          </Link>
          <Link to="/my-registrations">
            <button className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#F8F7F3] dark:bg-[#252525] hover:bg-stone-200/60 dark:hover:bg-[#303030] border border-warm-border dark:border-[#2E2E2E] text-charcoal dark:text-[#F8F7F3] flex items-center cursor-pointer transition-colors">
              <Ticket className="w-4 h-4 mr-1.5" />
              My Tickets
            </button>
          </Link>
          <Link to="/profile">
            <button className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#F8F7F3] dark:bg-[#252525] hover:bg-stone-200/60 dark:hover:bg-[#303030] border border-warm-border dark:border-[#2E2E2E] text-charcoal dark:text-[#F8F7F3] flex items-center cursor-pointer transition-colors">
              <User className="w-4 h-4 mr-1.5" />
              Edit Profile
            </button>
          </Link>
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
          title="Completed Events"
          value={completedRegistrations.length}
          icon={CheckCircle}
          color="purple"
          description="Attended campus sessions"
        />
        <StatCard
          title="Cancelled Passes"
          value={cancelledCount}
          icon={XCircle}
          color="amber"
          description="Withdrawn entries"
        />
      </div>

      {/* User's Upcoming Events */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-charcoal dark:text-[#F8F7F3] tracking-tight">
              My Upcoming Registered Events
            </h2>
            <p className="text-xs text-warm-gray dark:text-[#A8A29E]">
              Sessions you are confirmed to attend in the coming days.
            </p>
          </div>
          {upcomingRegistrations.length > 0 && (
            <Link
              to="/my-registrations"
              className="text-xs font-bold text-coral hover:text-coral-hover flex items-center"
            >
              <span>View all ({upcomingRegistrations.length})</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          )}
        </div>

        {upcomingRegistrations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingRegistrations.map((reg) => (
              <RegistrationCard
                key={reg._id}
                registration={reg}
                onCancel={handleCancelRegistration}
                isCancelling={cancellingId === reg._id}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-warm-border dark:border-[#2E2E2E] p-10 text-center space-y-3 shadow-xs">
            <Ticket className="w-12 h-12 text-coral mx-auto" />
            <h3 className="text-base font-bold text-charcoal dark:text-[#F8F7F3]">
              No upcoming event registrations
            </h3>
            <p className="text-xs text-warm-gray dark:text-[#A8A29E] max-w-sm mx-auto">
              You haven't reserved tickets for any upcoming events yet. Discover exciting workshops and competitions now!
            </p>
            <div className="pt-2">
              <Link to="/events">
                <button className="px-5 py-2.5 rounded-xl font-bold text-xs bg-coral hover:bg-coral-hover text-white shadow-xs cursor-pointer transition-colors">
                  Explore College Events
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Recommended / Available Events */}
      <div className="space-y-4 pt-4 border-t border-warm-border dark:border-[#2E2E2E]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-charcoal dark:text-[#F8F7F3] tracking-tight">
              Recommended Events For You
            </h2>
            <p className="text-xs text-warm-gray dark:text-[#A8A29E]">
              Upcoming sessions matched to your campus interests.
            </p>
          </div>
          <Link
            to="/events"
            className="text-xs font-bold text-coral hover:text-coral-hover flex items-center"
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
