import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Building,
  Mail,
  Users,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Share2,
  Ticket,
  Sparkles,
  Flame,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { eventService } from '../services/eventService';
import { registrationService } from '../services/registrationService';
import { useAuth } from '../context/AuthContext';
import { formatDate, isDeadlinePassed } from '../utils/formatDate';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ConfirmationModal from '../components/registrations/ConfirmationModal';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

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

  const fetchEventData = useCallback(async () => {
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
  }, [id, isAuthenticated, event]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    fetchEventData();
  }, [id, isAuthenticated, fetchEventData]);

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
          <Link to="/events" className="inline-flex items-center text-sm text-[#D95D45] font-bold hover:underline">
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
      case 'Technology and Hackathons':
      case 'Technical':
      case 'Competitions':
        return 'bg-[#F8E4DE] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#F87171] border border-[#F2C5BB] dark:border-[#5A261D]';
      case 'Workshops and Technical Sessions':
      case 'Workshops':
        return 'bg-[#E6F0EB] dark:bg-[#163324] text-[#2F6B4F] dark:text-[#4ADE80] border border-[#C8DFD2] dark:border-[#1E4A34]';
      case 'Music and Entertainment':
        return 'bg-[#F3E8FF] dark:bg-[#321B47] text-[#9333EA] dark:text-[#C084FC] border border-[#E9D5FF] dark:border-[#581C87]';
      case 'Cultural Festivals':
      case 'Cultural':
        return 'bg-[#FEF3C7] dark:bg-[#3D2F14] text-[#B7791F] dark:text-[#FBBF24] border border-[#FDE68A] dark:border-[#5A4518]';
      case 'Sports':
        return 'bg-[#E0F2FE] dark:bg-[#122E40] text-[#0284C7] dark:text-[#38BDF8] border border-[#BAE6FD] dark:border-[#0C4A6E]';
      case 'Entrepreneurship and Business':
        return 'bg-[#DCFCE7] dark:bg-[#143B22] text-[#16A34A] dark:text-[#4ADE80] border border-[#BBF7D0] dark:border-[#166534]';
      case 'Art and Photography':
        return 'bg-[#FCE7F3] dark:bg-[#40182E] text-[#DB2777] dark:text-[#F472B6] border border-[#FBCFE8] dark:border-[#831843]';
      case 'College Events':
        return 'bg-[#FFEDD5] dark:bg-[#3E2313] text-[#EA580C] dark:text-[#FB923C] border border-[#FED7AA] dark:border-[#7C2D12]';
      case 'Conferences and Seminars':
      case 'Seminars':
        return 'bg-[#F0EFEB] dark:bg-[#262626] text-[#525252] dark:text-[#D4D4D4] border border-[#E5E2DB] dark:border-[#404040]';
      default:
        return 'bg-stone-100 text-charcoal border border-[#E5E2DB]';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Share */}
      <div className="flex items-center justify-between">
        <Link
          to="/events"
          className="inline-flex items-center text-xs font-bold text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#171717] dark:hover:text-[#F8F7F3] transition-colors bg-white dark:bg-[#1E1E1E] px-4 py-2.5 rounded-xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-[#D95D45]" />
          Back to Events Catalog
        </Link>
        <button
          onClick={handleShare}
          className="inline-flex items-center text-xs font-bold px-4 py-2.5 rounded-xl border border-[#E5E2DB] dark:border-[#2E2E2E] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#F8F7F3] hover:bg-[#F8F7F3] dark:hover:bg-[#252525] transition-colors shadow-2xs cursor-pointer"
        >
          <Share2 className="w-4 h-4 mr-1.5 text-[#D95D45]" />
          {copied ? 'Link Copied to Clipboard!' : 'Share Event'}
        </button>
      </div>

      {actionError && <ErrorMessage message={actionError} />}

      {/* Main Grid: Left Banner & Details, Right Registration Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Banner Image */}
          <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-[#E5E2DB] dark:border-[#2E2E2E] bg-stone-100 dark:bg-[#1C1C1C] shadow-sm">
            <img
              src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80'}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-xs ${getCategoryBadgeClass(event.category)}`}>
                {event.category}
              </span>
              {event.isFeatured && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black bg-[#D95D45] text-white shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Featured Event
                </span>
              )}
              {event.isTrending && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black bg-[#B7791F] text-white shadow-xs">
                  <Flame className="w-3.5 h-3.5 mr-1" />
                  Trending
                </span>
              )}
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="text-[11px] uppercase font-black tracking-widest text-[#F8E4DE]">
                Official University Campus Event
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-white font-display">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Quick Schedule Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3.5 bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-[#F8E4DE] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#F87171] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#6B6B67] dark:text-[#A8A29E] font-bold">Event Date</div>
                <div className="font-bold text-[#171717] dark:text-[#F8F7F3] text-sm">{formatDate(event.date)}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3.5 bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] dark:bg-[#3D2F14] text-[#B7791F] dark:text-[#FBBF24] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#6B6B67] dark:text-[#A8A29E] font-bold">Session Timing</div>
                <div className="font-bold text-[#171717] dark:text-[#F8F7F3] text-sm">{event.startTime} - {event.endTime}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3.5 bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-[#F0EFEB] dark:bg-[#282828] text-[#171717] dark:text-[#F8F7F3] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <MapPin className="w-6 h-6 text-[#D95D45]" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-[#6B6B67] dark:text-[#A8A29E] font-bold">Campus Venue</div>
                <div className="font-bold text-[#171717] dark:text-[#F8F7F3] text-sm truncate">{event.venue}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3.5 bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F0EB] dark:bg-[#163324] text-[#2F6B4F] dark:text-[#4ADE80] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Building className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-[#6B6B67] dark:text-[#A8A29E] font-bold">Department / Organizer</div>
                <div className="font-bold text-[#171717] dark:text-[#F8F7F3] text-sm truncate">{event.organizer}</div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white dark:bg-[#1E1E1E] p-6 sm:p-8 rounded-3xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs space-y-4">
            <h2 className="text-xl font-extrabold text-[#171717] dark:text-[#F8F7F3] tracking-tight">
              About This Event
            </h2>
            <div className="text-sm text-[#6B6B67] dark:text-[#A8A29E] leading-relaxed whitespace-pre-line">
              {event.description}
            </div>

            {event.tags && event.tags.length > 0 && (
              <div className="pt-4 border-t border-[#E5E2DB] dark:border-[#2E2E2E] flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#6B6B67] dark:text-[#A8A29E] mr-1 flex items-center">
                  <Tag className="w-3.5 h-3.5 mr-1" />
                  Tags:
                </span>
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-[#F8F7F3] dark:bg-[#252525] text-[#171717] dark:text-[#F8F7F3] border border-[#E5E2DB] dark:border-[#2E2E2E]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Organizer & Support Box */}
          <div className="bg-[#FAF9F6] dark:bg-[#1E1E1E] p-6 rounded-3xl border border-[#E5E2DB] dark:border-[#2E2E2E] space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#6B6B67] dark:text-[#A8A29E]">
              Inquiries & Faculty Coordinator
            </h4>
            <div className="flex items-center space-x-2 text-sm text-[#171717] dark:text-[#F8F7F3] font-medium">
              <Mail className="w-4 h-4 text-[#D95D45]" />
              <span>{event.contact}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-[#1E1E1E] rounded-3xl border-2 border-[#E5E2DB] dark:border-[#2E2E2E] p-6 sm:p-7 shadow-xl space-y-6">
            <div className="border-b border-[#E5E2DB] dark:border-[#2E2E2E] pb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B67] dark:text-[#A8A29E] block mb-1.5">
                Ticket & Seat Status
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="text-2xl font-black text-[#171717] dark:text-[#F8F7F3]">
                  {event.price === 0 ? 'Free Student Pass' : `$${event.price} Admission`}
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
                    Sold Out
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black bg-[#FAF0ED] text-[#D95D45] border border-[#F2C5BB] dark:bg-[#D95D45]/25 dark:text-[#FF8A73] dark:border-[#D95D45]/50 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse mr-2 inline-block"></span>
                    Open
                  </span>
                )}
              </div>
            </div>

            {/* Capacity Progress */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs font-bold text-[#171717] dark:text-[#F8F7F3]">
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1.5 text-[#D95D45]" />
                  Available Seats
                </span>
                <span className="text-[#D95D45] dark:text-[#FF8A73] font-black text-sm">
                  {seatsRemaining} of {event.capacity} left
                </span>
              </div>
              <div className="w-full bg-[#E5E2DB] dark:bg-[#282828] rounded-full h-3 overflow-hidden p-0.5 border border-[#E5E2DB] dark:border-[#383838]">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    fillPercentage >= 90
                      ? 'bg-[#C2413B]'
                      : fillPercentage >= 70
                      ? 'bg-[#B7791F]'
                      : 'bg-[#D95D45]'
                  }`}
                  style={{ width: `${Math.max(fillPercentage, 4)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-[#6B6B67] dark:text-[#A8A29E]">
                <span>{event.registeredCount || 0} students enrolled</span>
                <span className="font-semibold text-[#171717] dark:text-[#F8F7F3]">{Math.round(fillPercentage)}% booked</span>
              </div>
            </div>

            {/* Deadline Notice */}
            <div className="bg-[#FAF9F6] dark:bg-[#252525] rounded-2xl p-4 border border-[#E5E2DB] dark:border-[#383838] flex items-center justify-between text-xs transition-colors">
              <div className="space-y-0.5">
                <span className="text-[#6B6B67] dark:text-[#A8A29E] block text-[11px] font-semibold uppercase tracking-wider">
                  Registration Cutoff
                </span>
                <span className={`font-black text-sm ${isClosed ? 'text-[#C2413B]' : 'text-[#171717] dark:text-white'}`}>
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
                  <div className="flex items-center justify-center p-3.5 rounded-2xl border text-sm font-bold bg-[#E6F0EB] text-[#2F6B4F] border-[#A3D1B8] dark:bg-[#10B981]/20 dark:text-[#34D399] dark:border-[#10B981]/40 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
                    You hold a confirmed seat!
                  </div>
                  {userRegistration && (
                    <Link
                      to={`/registrations/confirmation/${userRegistration._id}`}
                      className="w-full block"
                    >
                      <button
                        type="button"
                        className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#D95D45] hover:bg-[#B94734] shadow-md transition-all flex items-center justify-center cursor-pointer"
                      >
                        <Ticket className="w-4 h-4 mr-2" />
                        View / Print Official Pass
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
                  Registration Cutoff Has Passed
                </button>
              ) : isFull ? (
                <button
                  type="button"
                  disabled
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-[#FEF3C7] dark:bg-[#3D2F14] text-[#B7791F] dark:text-[#FBBF24] cursor-not-allowed border border-[#FDE68A] dark:border-[#5A4518]"
                >
                  Event Full (All Seats Reserved)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRegisterClick}
                  className="w-full py-4 px-6 rounded-2xl font-black text-sm text-white bg-[#D95D45] hover:bg-[#B94734] shadow-lg hover:shadow-xl hover:shadow-[#D95D45]/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Register Now {event.price === 0 ? '(Free)' : `($${event.price})`}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-[#6B6B67] dark:text-[#A8A29E] pt-2 border-t border-[#E5E2DB] dark:border-[#2E2E2E]">
              <ShieldCheck className="w-4 h-4 text-[#2F6B4F] flex-shrink-0" />
              <span>Instant digital ticket pass with verification QR issued upon registration.</span>
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
