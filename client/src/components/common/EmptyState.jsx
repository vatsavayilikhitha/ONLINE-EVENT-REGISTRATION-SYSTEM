import React from 'react';
import { CalendarX } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  icon: Icon = CalendarX,
  title = 'No items found',
  description = 'There are no records matching your criteria.',
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-warm-border dark:border-[#2E2E2E] shadow-xs ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-coral-soft dark:bg-[#D95D45]/15 flex items-center justify-center text-coral mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-charcoal dark:text-[#F8F7F3] mb-1">{title}</h3>
      <p className="text-sm text-warm-gray dark:text-[#A8A29E] max-w-sm mb-6">{description}</p>
      {actionText && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
