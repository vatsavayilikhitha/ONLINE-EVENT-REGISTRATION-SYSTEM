import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Calendar, MapPin, User, Mail, Phone, Building2, CheckCircle2 } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  event,
  user,
  isLoading
}) => {
  if (!event || !user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Event Registration"
      maxWidth="max-w-lg"
    >
      <div className="space-y-5">
        <p className="text-xs text-warm-gray dark:text-[#A8A29E]">
          Please review your registration details before confirming. A unique registration ID will be generated upon confirmation.
        </p>

        {/* Event Summary Box */}
        <div className="bg-[#F8F7F3] dark:bg-[#141414] rounded-xl p-4 border border-warm-border dark:border-[#2E2E2E] space-y-2">
          <h4 className="font-bold text-sm text-charcoal dark:text-[#F8F7F3]">{event.title}</h4>
          <div className="flex items-center text-xs text-warm-gray dark:text-[#A8A29E] space-x-2">
            <Calendar className="w-3.5 h-3.5 text-coral flex-shrink-0" />
            <span>{formatDate(event.date)} at {event.startTime}</span>
          </div>
          <div className="flex items-center text-xs text-warm-gray dark:text-[#A8A29E] space-x-2">
            <MapPin className="w-3.5 h-3.5 text-warm-gray dark:text-[#A8A29E] flex-shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* Participant Details Box */}
        <div className="border border-warm-border dark:border-[#2E2E2E] rounded-xl p-4 space-y-3 bg-white dark:bg-[#181818]">
          <h5 className="text-xs font-bold uppercase tracking-wider text-warm-gray dark:text-[#A8A29E]">
            Participant Details
          </h5>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-warm-gray dark:text-[#A8A29E] block text-[11px]">Full Name</span>
              <span className="font-bold text-charcoal dark:text-[#F8F7F3]">{user.name}</span>
            </div>
            <div>
              <span className="text-warm-gray dark:text-[#A8A29E] block text-[11px]">Email Address</span>
              <span className="font-bold text-charcoal dark:text-[#F8F7F3] truncate block">{user.email}</span>
            </div>
            <div>
              <span className="text-warm-gray dark:text-[#A8A29E] block text-[11px]">Phone Number</span>
              <span className="font-bold text-charcoal dark:text-[#F8F7F3]">{user.phone}</span>
            </div>
            <div>
              <span className="text-warm-gray dark:text-[#A8A29E] block text-[11px]">College / Organization</span>
              <span className="font-bold text-charcoal dark:text-[#F8F7F3]">{user.college}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-warm-border dark:border-[#2E2E2E]">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            Confirm & Register
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
