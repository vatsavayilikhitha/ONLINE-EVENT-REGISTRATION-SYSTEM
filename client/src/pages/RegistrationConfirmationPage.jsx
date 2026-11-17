import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { registrationService } from '../services/registrationService';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  Building2,
  Printer,
  CheckCircle2,
  ArrowLeft,
  QrCode,
  ShieldCheck,
  Ticket
} from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const RegistrationConfirmationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const newlyRegistered = location.state?.newlyRegistered;

  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistration = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await registrationService.getRegistrationById(id);
        if (data.success && data.registration) {
          setRegistration(data.registration);
        } else {
          setError('Unable to load registration record');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to retrieve registration pass');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistration();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text="Generating official pass..." size="large" />
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12">
        <ErrorMessage message={error || 'Ticket not found'} />
        <div className="mt-4">
          <Link to="/my-registrations" className="text-sm font-semibold text-brand-600">
            &larr; Back to My Registrations
          </Link>
        </div>
      </div>
    );
  }

  const { registrationId, event, user: participant, registeredAt, status } = registration;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top action controls (hidden when printing) */}
      <div className="flex items-center justify-between no-print">
        <Link
          to="/my-registrations"
          className="inline-flex items-center text-xs font-bold text-warm-gray dark:text-[#A8A29E] hover:text-charcoal dark:hover:text-[#F8F7F3] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1 text-coral" />
          My Registrations
        </Link>

        <Button variant="primary" size="sm" onClick={handlePrint} className="shadow-xs font-bold">
          <Printer className="w-4 h-4 mr-1.5" />
          Print Confirmation Pass
        </Button>
      </div>

      {newlyRegistered && (
        <div className="bg-forest-soft dark:bg-[#163324] border border-forest/20 dark:border-[#1E4A34] rounded-2xl p-4 text-forest dark:text-[#4ADE80] flex items-center space-x-3 no-print">
          <CheckCircle2 className="w-5 h-5 text-forest flex-shrink-0" />
          <div className="text-xs">
            <span className="font-bold block text-sm">Registration Confirmed!</span>
            Your seat is reserved. Please save or print this official digital pass for venue check-in.
          </div>
        </div>
      )}

      {/* Official Printable Ticket Card */}
      <div className="print-card bg-white dark:bg-[#1E1E1E] rounded-3xl border border-warm-border dark:border-[#2E2E2E] shadow-xs overflow-hidden">
        {/* Ticket Header */}
        <div className="bg-charcoal text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800">
          <div>
            <div className="flex items-center space-x-2 text-coral-soft text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-coral" />
              <span>Official University Entry Pass</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {event?.title}
            </h2>
            <div className="text-xs text-stone-300 mt-1">
              Category: {event?.category} • Organized by: {event?.organizer}
            </div>
          </div>

          <div className="text-left sm:text-right bg-stone-900/90 p-3 rounded-2xl border border-stone-700/60">
            <span className="text-[10px] text-stone-400 font-mono uppercase block font-bold">
              Registration Pass ID
            </span>
            <span className="text-lg font-mono font-black text-coral tracking-wider">
              {registrationId}
            </span>
          </div>
        </div>

        {/* Ticket Body: 2 Columns */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Event & Participant Meta (2 Cols) */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-warm-gray dark:text-[#A8A29E] mb-3">
                Event Schedule & Venue
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center space-x-2.5 bg-[#F8F7F3] dark:bg-[#181818] p-3 rounded-xl border border-warm-border dark:border-[#2E2E2E]">
                  <Calendar className="w-4 h-4 text-coral flex-shrink-0" />
                  <div>
                    <span className="text-warm-gray dark:text-[#A8A29E] block text-[10px] font-medium">Date</span>
                    <span className="font-bold text-charcoal dark:text-[#F8F7F3]">{formatDate(event?.date)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 bg-[#F8F7F3] dark:bg-[#181818] p-3 rounded-xl border border-warm-border dark:border-[#2E2E2E]">
                  <Clock className="w-4 h-4 text-coral flex-shrink-0" />
                  <div>
                    <span className="text-warm-gray dark:text-[#A8A29E] block text-[10px] font-medium">Time</span>
                    <span className="font-bold text-charcoal dark:text-[#F8F7F3]">{event?.startTime} - {event?.endTime}</span>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-center space-x-2.5 bg-[#F8F7F3] dark:bg-[#181818] p-3 rounded-xl border border-warm-border dark:border-[#2E2E2E]">
                  <MapPin className="w-4 h-4 text-coral flex-shrink-0" />
                  <div>
                    <span className="text-warm-gray dark:text-[#A8A29E] block text-[10px] font-medium">Venue Location</span>
                    <span className="font-bold text-charcoal dark:text-[#F8F7F3]">{event?.venue}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Participant Details */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-warm-gray dark:text-[#A8A29E] mb-3">
                Participant Credentials
              </h4>
              <div className="bg-[#F8F7F3] dark:bg-[#181818] rounded-2xl p-4 border border-warm-border dark:border-[#2E2E2E] grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-warm-gray dark:text-[#A8A29E] block text-[10px] font-medium">Full Name</span>
                  <span className="font-bold text-charcoal dark:text-[#F8F7F3]">{participant?.name}</span>
                </div>
                <div>
                  <span className="text-warm-gray dark:text-[#A8A29E] block text-[10px] font-medium">Student Email</span>
                  <span className="font-bold text-charcoal dark:text-[#F8F7F3] truncate block">{participant?.email}</span>
                </div>
                <div>
                  <span className="text-warm-gray dark:text-[#A8A29E] block text-[10px] font-medium">Contact Phone</span>
                  <span className="font-bold text-charcoal dark:text-[#F8F7F3]">{participant?.phone}</span>
                </div>
                <div>
                  <span className="text-warm-gray dark:text-[#A8A29E] block text-[10px] font-medium">College / Department</span>
                  <span className="font-bold text-charcoal dark:text-[#F8F7F3]">{participant?.college}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Code Box (1 Col) */}
          <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-[#F8F7F3] dark:bg-[#181818] rounded-2xl border border-dashed border-warm-border dark:border-[#2E2E2E] text-center">
            <QrCode className="w-24 h-24 text-charcoal dark:text-[#F8F7F3] mb-3" />
            <span className="text-[11px] font-mono font-bold text-charcoal dark:text-[#F8F7F3]">
              {registrationId}
            </span>
            <div className="mt-3">
              <Badge
                variant={status === 'Confirmed' ? 'success' : 'danger'}
                size="sm"
              >
                Pass Status: {status}
              </Badge>
            </div>
            <p className="text-[10px] text-warm-gray dark:text-[#A8A29E] mt-3 leading-tight">
              Present this pass alongside valid College ID at entrance desk.
            </p>
          </div>
        </div>

        {/* Ticket Footer */}
        <div className="bg-[#F8F7F3] dark:bg-[#181818] px-6 py-3 border-t border-warm-border dark:border-[#2E2E2E] flex flex-col sm:flex-row items-center justify-between text-[11px] text-warm-gray dark:text-[#A8A29E]">
          <span>Registered on: {new Date(registeredAt).toLocaleString()}</span>
          <span>College Event Registration Management System (SE)</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationConfirmationPage;
