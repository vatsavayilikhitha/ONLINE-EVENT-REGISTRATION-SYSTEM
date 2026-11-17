import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket, Ban, Printer, ExternalLink, AlertTriangle } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { formatDate } from '../../utils/formatDate';

const RegistrationCard = ({ registration, onCancel, isCancelling }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const {
    _id,
    registrationId,
    event,
    status,
    registeredAt
  } = registration;

  if (!event) return null;

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

  const handleConfirmCancel = async () => {
    await onCancel(_id);
    setShowCancelModal(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-warm-border dark:border-[#2E2E2E] p-5 shadow-xs flex flex-col justify-between transition-colors">
        <div>
          <div className="flex items-start justify-between gap-2 mb-3">
            <Badge variant={getStatusBadgeVariant(status)} size="sm">
              {status}
            </Badge>
            <span className="text-[11px] font-mono font-bold text-warm-gray dark:text-[#A8A29E] bg-[#F8F7F3] dark:bg-[#282828] border border-warm-border dark:border-[#383838] px-2.5 py-0.5 rounded-lg">
              {registrationId}
            </span>
          </div>

          <h3 className="text-base font-bold text-charcoal dark:text-[#F8F7F3] line-clamp-1 mb-2">
            {event.title}
          </h3>

          <div className="space-y-1.5 text-xs text-warm-gray dark:text-[#A8A29E] mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-coral flex-shrink-0" />
              <span>{formatDate(event.date)} • {event.startTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-warm-gray dark:text-[#A8A29E] flex-shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-warm-border dark:border-[#2E2E2E] flex items-center justify-between gap-2">
          <Link
            to={`/registrations/confirmation/${_id}`}
            className="inline-flex items-center text-xs font-bold text-coral hover:text-coral-hover transition-colors"
          >
            <Printer className="w-3.5 h-3.5 mr-1" />
            View / Print Ticket
          </Link>

          {status === 'Confirmed' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCancelModal(true)}
              className="text-xs text-warm-red hover:bg-warm-red/10 border-warm-border dark:border-[#2E2E2E] hover:border-warm-red/30 font-bold"
            >
              <Ban className="w-3.5 h-3.5 mr-1" />
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Cancellation Confirmation Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Registration"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3 bg-[#FEF3C7] dark:bg-[#3D2F14] p-4 rounded-xl border border-[#FDE68A] dark:border-[#5A4518]">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-[#B7791F] dark:text-[#FBBF24] mt-0.5" />
            <p className="text-xs leading-relaxed text-[#78350F] dark:text-[#FDE68A]">
              Are you sure you want to cancel your registration for{' '}
              <strong className="font-bold text-[#451A03] dark:text-white">{event.title}</strong>? Your reserved seat will be released for others.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-warm-border dark:border-[#2E2E2E]">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCancelModal(false)}
              disabled={isCancelling}
            >
              Keep Registration
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleConfirmCancel}
              isLoading={isCancelling}
            >
              Yes, Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RegistrationCard;
