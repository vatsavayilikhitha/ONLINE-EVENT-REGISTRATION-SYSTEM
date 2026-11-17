import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../services/adminService';
import StatCard from '../components/dashboard/StatCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import {
  Calendar,
  CalendarCheck,
  Ticket,
  Users,
  PlusCircle,
  Layers,
  ArrowRight,
  Shield,
  Clock,
  Settings
} from 'lucide-react';
import { formatDate } from '../utils/formatDate';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminService.getStats();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load administrative analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text="Compiling administrative metrics..." size="large" />
      </div>
    );
  }

  const categoryBarColors = [
    'bg-coral',
    'bg-forest',
    'bg-warm-amber',
    'bg-charcoal',
    'bg-[#8C7A6B]',
    'bg-coral-hover'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-8 border border-warm-border dark:border-[#2E2E2E] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-coral-soft dark:bg-[#3D1D16] text-coral dark:text-[#F87171] border border-coral/20 dark:border-[#5A261D] text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-charcoal dark:text-[#F8F7F3]">
            Campus Event Administration
          </h1>
          <p className="text-xs sm:text-sm text-warm-gray dark:text-[#A8A29E]">
            Monitor real-time student bookings, department capacities, and attendance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/admin/events">
            <button className="px-4 py-2.5 rounded-xl font-bold text-xs bg-coral hover:bg-coral-hover text-white shadow-xs flex items-center cursor-pointer transition-colors">
              <PlusCircle className="w-4 h-4 mr-1.5" />
              Manage Events
            </button>
          </Link>
          <Link to="/admin/participants">
            <button className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#F8F7F3] dark:bg-[#252525] hover:bg-stone-200/60 dark:hover:bg-[#303030] border border-warm-border dark:border-[#2E2E2E] text-charcoal dark:text-[#F8F7F3] flex items-center cursor-pointer transition-colors">
              <Users className="w-4 h-4 mr-1.5" />
              Participants Roster
            </button>
          </Link>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchStats} />}

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Events"
          value={stats?.totalEvents || 0}
          icon={Calendar}
          color="coral"
          description="Created across all terms"
        />
        <StatCard
          title="Upcoming Events"
          value={stats?.upcomingEvents || 0}
          icon={CalendarCheck}
          color="emerald"
          description="Scheduled ahead"
        />
        <StatCard
          title="Total Registrations"
          value={stats?.totalRegistrations || 0}
          icon={Ticket}
          color="coral"
          description={`${stats?.confirmedRegistrations || 0} confirmed passes`}
        />
        <StatCard
          title="Total Students"
          value={stats?.totalUsers || 0}
          icon={Users}
          color="amber"
          description="Enrolled accounts"
        />
      </div>

      {/* 2 Columns: Category Breakdown & Recent Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Breakdown (1 Col) */}
        <div className="lg:col-span-1 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-warm-border dark:border-[#2E2E2E] p-6 sm:p-7 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-charcoal dark:text-[#F8F7F3] flex items-center">
            <Layers className="w-4 h-4 mr-2 text-coral" />
            Events by Category
          </h3>

          <div className="space-y-4 pt-1">
            {stats?.eventsByCategory && stats.eventsByCategory.length > 0 ? (
              stats.eventsByCategory.map((cat, idx) => {
                const totalEvents = stats.totalEvents || 1;
                const percent = Math.round((cat.count / totalEvents) * 100);
                const barBg = categoryBarColors[idx % categoryBarColors.length];
                return (
                  <div key={cat._id} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-charcoal dark:text-[#F8F7F3]">
                      <span>{cat._id}</span>
                      <span className="text-warm-gray dark:text-[#A8A29E] font-semibold">
                        {cat.count} event{cat.count > 1 ? 's' : ''} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#E5E2DB] dark:bg-[#2A2A2A] rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${barBg} transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-warm-gray dark:text-[#A8A29E]">No events categorized yet.</p>
            )}
          </div>
        </div>

        {/* Recent Registrations Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-warm-border dark:border-[#2E2E2E] p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-charcoal dark:text-[#F8F7F3] flex items-center">
              <Clock className="w-4 h-4 mr-2 text-coral" />
              Recent Student Registrations
            </h3>
            <Link
              to="/admin/participants"
              className="text-xs font-bold text-coral hover:text-coral-hover flex items-center"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-warm-gray dark:text-[#A8A29E]">
              <thead className="bg-[#F8F7F3] dark:bg-[#141414] text-warm-gray dark:text-[#A8A29E] uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="px-3.5 py-3 rounded-l-xl">ID</th>
                  <th className="px-3.5 py-3">Student</th>
                  <th className="px-3.5 py-3">Event</th>
                  <th className="px-3.5 py-3">Date</th>
                  <th className="px-3.5 py-3 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-border dark:divide-dark-border">
                {stats?.recentRegistrations && stats.recentRegistrations.length > 0 ? (
                  stats.recentRegistrations.map((reg) => (
                    <tr key={reg._id} className="hover:bg-stone-50 dark:hover:bg-[#252525] transition-colors">
                      <td className="px-3.5 py-3 font-mono font-bold text-charcoal dark:text-[#F8F7F3]">
                        {reg.registrationId}
                      </td>
                      <td className="px-3.5 py-3 font-bold text-charcoal dark:text-[#F8F7F3]">
                        {reg.user?.name || 'Unknown Student'}
                      </td>
                      <td className="px-3.5 py-3 truncate max-w-[180px] text-charcoal dark:text-[#F8F7F3]">
                        {reg.event?.title || 'Unknown Event'}
                      </td>
                      <td className="px-3.5 py-3 whitespace-nowrap text-warm-gray dark:text-[#A8A29E]">
                        {formatDate(reg.createdAt)}
                      </td>
                      <td className="px-3.5 py-3">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            reg.status === 'Confirmed'
                              ? 'bg-forest-soft text-forest border border-forest/20'
                              : 'bg-warm-red/10 text-warm-red border border-warm-red/20'
                          }`}
                        >
                          {reg.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-warm-gray dark:text-[#A8A29E]">
                      No registrations logged yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
