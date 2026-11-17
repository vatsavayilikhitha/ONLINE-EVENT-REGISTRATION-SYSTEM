import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Building,
  Mail,
  Users,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Share2,
  Ticket,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { eventService } from '../services/eventService';
import { registrationService } from '../services/registrationService';
import { useAuth } from '../context/AuthContext';
import { formatDate, isDeadlinePassed } from '../utils/formatDate';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ConfirmationModal from '../components/registrations/ConfirmationModal';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  // Instant render from router navigation state (eliminates lag completely)
  const initialEvent = location.state?.event || null;
  const [event, setEvent] = useState(initialEvent);
  const [loading, setLoading] = useState(!initialEvent);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [userRegistration, setUserRegistration] = useState(null);

  // Registration modal & state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState('');
  const [copied, setCopied] = useState(false);

  const fetchEventData = async () => {
    if (!event) setLoading(true);
    setError('');
    try {
      const promises = [eventService.getEventById(id)];
      if (isAuthenticated) {
        promises.push(registrationService.getMyRegistrations());
      }

      const results = await Promise.allSettled(promises);
      const eventRes = results[0].status === 'fulfilled' ? results[0].value : null;

      if (eventRes && eventRes.success && eventRes.event) {
        setEvent(eventRes.event);
      } else if (!event) {
        setError('Event details could not be found.');
      }

      if (results[1] && results[1].status === 'fulfilled') {
        const regData = results[1].value;
        if (regData && regData.success && regData.registrations) {
          const found = regData.registrations.find(
            (r) => (r.event?._id === id || r.event === id) && r.status === 'Confirmed'
          );
          if (found) {
            setIsRegistered(true);
            setUserRegistration(found);
          } else {
            setIsRegistered(false);
            setUserRegistration(null);
          }
        }
      }
    } catch (err) {
      if (!event) {
        setError(err.response?.data?.message || 'Failed to load event details. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    fetchEventData();
  }, [id, isAuthenticated]);

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    setActionError('');
    setIsModalOpen(true);
  };

  const handleConfirmRegistration = async () => {
    setSubmitting(true);
    setActionError('');
    try {
      const response = await registrationService.registerForEvent(id);
      if (response.success && response.registration) {
        setIsModalOpen(false);
        navigate(`/registrations/confirmation/${response.registration._id}`, {
          state: { newlyRegistered: true }
        });
      }
    } catch (err) {
      setActionError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text="Retrieving event details..." size="large" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <ErrorMessage message={error || 'Event not found'} onRetry={fetchEventData} />
        <div className="pt-2">
          <Link to="/events" className="inline-flex items-center text-sm text-brand-600 font-bold hover:text-brand-800">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to all events catalog
          </Link>
        </div>
      </div>
    );
  }

  const seatsRemaining = Math.max(0, event.capacity - (event.registeredCount || 0));
  const isFull = seatsRemaining <= 0;
  const isClosed = isDeadlinePassed(event.registrationDeadline);
  const fillPercentage = Math.min(100, Math.round(((event.registeredCount || 0) / event.capacity) * 100));

  const getCategoryBadgeClass = (cat) => {
    switch (cat) {
      case 'Workshops':
        return 'bg-forest-soft text-forest border border-forest/20';
      case 'Technical':
        return 'bg-coral-soft text-coral border border-coral/20';
      case 'Competitions':
        return 'bg-coral-soft text-coral border border-coral/20';
      case 'Cultural':
        return 'bg-warm-amber-soft text-warm-amber border border-warm-amber/20';
      case 'Sports':
        return 'bg-[#F1EFEA] text-[#57534E] border border-warm-border';
      case 'Seminars':
        return 'bg-[#E5E2DB] text-[#44403C] border border-warm-border';
      default:
        return 'bg-stone-100 text-charcoal border border-warm-border';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Share */}
      <div className="flex items-center justify-between">
        <Link
          to="/events"
          className="inline-flex items-center text-xs font-bold text-warm-gray dark:text-[#A8A29E] hover:text-charcoal dark:hover:text-[#F8F7F3] transition-colors bg-white dark:bg-[#1E1E1E] px-3.5 py-2 rounded-xl border border-warm-border dark:border-[#2E2E2E] shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 text-coral" />
          Back to Events Catalog
        </Link>
        <button
          onClick={handleShare}
          className="inline-flex items-center text-xs font-bold px-3.5 py-2 rounded-xl border border-warm-border dark:border-[#2E2E2E] bg-white dark:bg-[#1E1E1E] text-charcoal dark:text-[#F8F7F3] hover:bg-stone-50 dark:hover:bg-[#282828] transition-colors shadow-xs cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 mr-1.5 text-coral" />
          {copied ? 'Link Copied!' : 'Share Event'}
        </button>
      </div>

      {actionError && <ErrorMessage message={actionError} />}

      {/* Main Grid: Left Banner & Details, Right Registration Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Banner Image */}
          <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-warm-border dark:border-[#2E2E2E] bg-stone-100 dark:bg-[#1C1C1C] shadow-sm">
            <img
              src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80'}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-xs ${getCategoryBadgeClass(event.category)}`}>
                {event.category}
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-[11px] uppercase font-bold tracking-widest text-coral-soft mb-1">
                Official University Event
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-white">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Quick Schedule Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3.5 bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-warm-border dark:border-[#2E2E2E] shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-coral-soft dark:bg-[#3D1D16] text-coral dark:text-[#F87171] flex items-center justify-center flex-shrink-0 shadow-xs">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-warm-gray dark:text-[#A8A29E] font-bold">Event Date</div>
                <div className="font-bold text-charcoal dark:text-[#F8F7F3] text-sm">{formatDate(event.date)}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3.5 bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-warm-border dark:border-[#2E2E2E] shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-[#3D2F14] text-warm-amber dark:text-[#FBBF24] flex items-center justify-center flex-shrink-0 shadow-xs">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-warm-gray dark:text-[#A8A29E] font-bold">Timing</div>
                <div className="font-bold text-charcoal dark:text-[#F8F7F3] text-sm">{event.startTime} - {event.endTime}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3.5 bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-warm-border dark:border-[#2E2E2E] shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-stone-100 dark:bg-[#282828] text-charcoal dark:text-[#F8F7F3] flex items-center justify-center flex-shrink-0 shadow-xs">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-warm-gray dark:text-[#A8A29E] font-bold">Campus Venue</div>
                <div className="font-bold text-charcoal dark:text-[#F8F7F3] text-sm truncate max-w-[220px]">{event.venue}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3.5 bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-warm-border dark:border-[#2E2E2E] shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-forest-soft dark:bg-[#163324] text-forest dark:text-[#4ADE80] flex items-center justify-center flex-shrink-0 shadow-xs">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-warm-gray dark:text-[#A8A29E] font-bold">Organizer</div>
                <div className="font-bold text-charcoal dark:text-[#F8F7F3] text-sm truncate max-w-[220px]">{event.organizer}</div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white dark:bg-[#1E1E1E] p-6 sm:p-8 rounded-3xl border border-warm-border dark:border-[#2E2E2E] shadow-xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-charcoal dark:text-[#F8F7F3] tracking-tight">
              About This Event
            </h2>
            <div className="text-sm text-warm-gray dark:text-[#A8A29E] leading-relaxed whitespace-pre-line">
              {event.description}
            </div>
          </div>

          {/* Organizer & Support Box */}
          <div className="bg-[#F3F1EC] dark:bg-[#1E1E1E] p-6 rounded-3xl border border-warm-border dark:border-[#2E2E2E] space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-warm-gray dark:text-[#A8A29E]">
              Inquiries & Faculty Coordinator
            </h4>
            <div className="flex items-center space-x-2 text-sm text-charcoal dark:text-[#F8F7F3] font-medium">
              <Mail className="w-4 h-4 text-coral" />
              <span>{event.contact}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-[#1E1E1E] rounded-3xl border-2 border-warm-border dark:border-[#333333] p-6 sm:p-7 shadow-lg space-y-6">
            <div className="border-b border-warm-border dark:border-[#2E2E2E] pb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-warm-gray dark:text-[#A8A29E] block mb-1.5">
                Seat Booking Status
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xl sm:text-2xl font-black text-charcoal dark:text-[#F8F7F3]">
                  Free Student Pass
                </span>
                {isRegistered ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-[#E6F0EB] text-[#2F6B4F] border border-[#A3D1B8] dark:bg-[#10B981]/20 dark:text-[#34D399] dark:border-[#10B981]/40 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mr-1.5 inline-block"></span>
                    Confirmed
                  </span>
                ) : isClosed ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-[#FCEBEA] text-[#C2413B] border border-[#FCA5A5] dark:bg-[#EF4444]/20 dark:text-[#F87171] dark:border-[#EF4444]/40 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mr-1.5 inline-block"></span>
                    Closed
                  </span>
                ) : isFull ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-[#FEF3C7] text-[#B7791F] border border-[#FCD34D] dark:bg-[#F59E0B]/20 dark:text-[#FBBF24] dark:border-[#F59E0B]/40 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mr-1.5 inline-block"></span>
                    Seats Full
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black bg-[#FAF0ED] text-[#D95D45] border border-[#F2C5BB] dark:bg-[#D95D45]/25 dark:text-[#FF8A73] dark:border-[#D95D45]/50 shadow-[0_0_12px_rgba(217,93,69,0.25)]">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse mr-2 inline-block"></span>
                    Open
                  </span>
                )}
              </div>
            </div>

            {/* Capacity Progress */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs font-bold text-charcoal dark:text-white">
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1.5 text-[#D95D45]" />
                  Available Seats
                </span>
                <span className="text-[#D95D45] dark:text-[#FF8A73] font-black text-sm">
                  {seatsRemaining} of {event.capacity} left
                </span>
              </div>
              <div className="w-full bg-[#E5E2DB] dark:bg-[#282828] rounded-full h-3 overflow-hidden p-0.5 border border-warm-border dark:border-[#383838]">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    fillPercentage >= 90
                      ? 'bg-[#C2413B] shadow-xs'
                      : fillPercentage >= 70
                      ? 'bg-[#B7791F] shadow-xs'
                      : 'bg-[#D95D45] shadow-xs'
                  }`}
                  style={{ width: `${Math.max(fillPercentage, 4)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-warm-gray dark:text-[#A8A29E]">
                <span>{event.registeredCount || 0} students enrolled</span>
                <span className="font-semibold text-charcoal dark:text-stone-300">{Math.round(fillPercentage)}% filled</span>
              </div>
            </div>

            {/* Deadline Notice */}
            <div className="bg-[#FAF9F6] dark:bg-[#252525] rounded-2xl p-4 border border-[#E5E2DB] dark:border-[#383838] flex items-center justify-between text-xs transition-colors hover:border-[#D95D45]/40">
              <div className="space-y-0.5">
                <span className="text-warm-gray dark:text-[#A8A29E] block text-[11px] font-semibold uppercase tracking-wider">Registration Cutoff</span>
                <span className={`font-black text-sm ${isClosed ? 'text-warm-red' : 'text-charcoal dark:text-white'}`}>
                  {formatDate(event.registrationDeadline)}
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-[#303030] flex items-center justify-center text-[#D95D45] shadow-2xs">
                <Calendar className="w-4 h-4 text-[#D95D45]" />
              </div>
            </div>

            {/* Action Button */}
            <div>
              {isRegistered ? (
                <div className="space-y-3">
                  <div
                    style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.4)' }}
                    className="flex items-center justify-center p-3.5 rounded-2xl border text-sm font-bold text-[#10B981] dark:text-[#34D399] shadow-xs transition-transform hover:scale-[1.01]"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2 text-[#10B981] dark:text-[#34D399] flex-shrink-0" />
                    You hold a confirmed seat!
                  </div>
                  {userRegistration && (
                    <Link
                      to={`/registrations/confirmation/${userRegistration._id}`}
                      className="w-full block group"
                    >
                      <button
                        type="button"
                        style={{ backgroundColor: '#D95D45', color: '#FFFFFF' }}
                        className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white shadow-md hover:brightness-110 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center cursor-pointer"
                      >
                        <Ticket className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-12" />
                        View / Print Digital Ticket
                      </button>
                    </Link>
                  )}
                </div>
              ) : isClosed ? (
                <button
                  type="button"
                  disabled
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-stone-200 dark:bg-[#2A2A2A] text-stone-500 dark:text-[#888888] cursor-not-allowed border border-stone-300 dark:border-[#383838]"
                >
                  Registration Closed
                </button>
              ) : isFull ? (
                <button
                  type="button"
                  disabled
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-[#FEF3C7] dark:bg-[#3D2F14] text-[#B7791F] dark:text-[#FBBF24] cursor-not-allowed border border-[#FDE68A] dark:border-[#5A4518]"
                >
                  Event Full (Waitlist Closed)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRegisterClick}
                  style={{ backgroundColor: '#D95D45', color: '#FFFFFF' }}
                  className="w-full py-4 px-6 rounded-xl font-black text-sm text-white shadow-lg hover:brightness-110 hover:shadow-xl hover:shadow-[#D95D45]/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Register Now (Free)</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-warm-gray dark:text-[#A8A29E] pt-2 border-t border-warm-border dark:border-[#2E2E2E]">
              <ShieldCheck className="w-4 h-4 text-forest flex-shrink-0" />
              <span>Official registration pass issued instantly upon confirmation.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmRegistration}
          event={event}
          user={user}
          isLoading={submitting}
        />
      )}
    </div>
  );
};

export default EventDetailsPage;
