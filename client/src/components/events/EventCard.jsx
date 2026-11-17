import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { formatDate, isDeadlinePassed } from '../../utils/formatDate';

const EventCard = ({ event }) => {
  const {
    _id,
    title,
    category,
    date,
    startTime,
    venue,
    capacity,
    registeredCount = 0,
    registrationDeadline,
    image
  } = event;

  const seatsLeft = Math.max(0, capacity - registeredCount);
  const isFull = seatsLeft <= 0;
  const isPastDeadline = isDeadlinePassed(registrationDeadline);
  const fillPercentage = Math.min(100, Math.round((registeredCount / capacity) * 100));

  const getCategoryStyles = (cat) => {
    switch (cat) {
      case 'Workshops':
        return 'bg-[#E6F0EB] dark:bg-[#163324] text-[#2F6B4F] dark:text-[#4ADE80] border-[#C8DFD2] dark:border-[#1E4A34]';
      case 'Technical':
        return 'bg-[#F8E4DE] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#F87171] border-[#F2C5BB] dark:border-[#5A261D]';
      case 'Competitions':
        return 'bg-[#F8E4DE] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#F87171] border-[#F2C5BB] dark:border-[#5A261D]';
      case 'Cultural':
        return 'bg-[#FEF3C7] dark:bg-[#3D2F14] text-[#B7791F] dark:text-[#FBBF24] border-[#FDE68A] dark:border-[#5A4518]';
      case 'Sports':
        return 'bg-[#F2EFE9] dark:bg-[#2B2927] text-[#57534E] dark:text-[#D6D3D1] border-[#E5E0D8] dark:border-[#44403C]';
      case 'Seminars':
        return 'bg-[#F0EFEB] dark:bg-[#262626] text-[#525252] dark:text-[#D4D4D4] border-[#E5E2DB] dark:border-[#404040]';
      default:
        return 'bg-[#F0EFEB] dark:bg-[#262626] text-[#525252] dark:text-[#D4D4D4] border-[#E5E2DB] dark:border-[#404040]';
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs hover:border-[#D95D45]/40 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Image Banner */}
      <Link to={`/events/${_id}`} state={{ event }} className="block relative h-48 w-full overflow-hidden bg-[#F3F1EC] dark:bg-[#2A2A2A] group cursor-pointer">
        <img
          src={image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getCategoryStyles(category)}`}>
            {category}
          </span>
        </div>

        {/* Status Tag */}
        <div className="absolute top-3 right-3">
          {isPastDeadline ? (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FCEBEA] dark:bg-[#3D1A18] text-[#C2413B] dark:text-[#F87171] border border-[#F8C8C6] dark:border-[#5C2320]">
              Closed
            </span>
          ) : isFull ? (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEF3C7] dark:bg-[#3D2F14] text-[#B7791F] dark:text-[#FBBF24] border border-[#FDE68A] dark:border-[#5A4518]">
              Full
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E6F0EB] dark:bg-[#163324] text-[#2F6B4F] dark:text-[#4ADE80] border border-[#C8DFD2] dark:border-[#1E4A34]">
              {seatsLeft} seats left
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link to={`/events/${_id}`} state={{ event }} className="block group cursor-pointer">
            <h3 className="text-base font-bold text-[#171717] dark:text-[#F8F7F3] line-clamp-1 group-hover:text-[#D95D45] transition-colors">
              {title}
            </h3>
          </Link>

          <div className="mt-2.5 space-y-1.5 text-xs text-[#6B6B67] dark:text-[#A8A29E]">
            <div className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-[#D95D45] flex-shrink-0" />
              <span className="font-medium text-[#171717] dark:text-[#F8F7F3]">{formatDate(date)}</span>
              <span className="text-[#D4D0C5] dark:text-[#4A4A4A]">•</span>
              <Clock className="w-3.5 h-3.5 text-[#8C8C87] dark:text-[#A8A29E] flex-shrink-0" />
              <span>{startTime}</span>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#8C8C87] dark:text-[#A8A29E] flex-shrink-0" />
              <span className="truncate">{venue}</span>
            </div>
          </div>
        </div>

        {/* Capacity Bar & Action */}
        <div className="pt-3 border-t border-[#E5E2DB] dark:border-[#2E2E2E] space-y-3">
          <div>
            <div className="flex justify-between items-center text-[11px] font-semibold text-[#6B6B67] dark:text-[#A8A29E] mb-1">
              <span className="flex items-center">
                <Users className="w-3.5 h-3.5 mr-1 text-[#8C8C87] dark:text-[#A8A29E]" />
                Registrations
              </span>
              <span>{registeredCount} / {capacity}</span>
            </div>
            <div className="w-full bg-[#F3F1EC] dark:bg-[#2A2A2A] rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  fillPercentage >= 90
                    ? 'bg-[#C2413B]'
                    : fillPercentage >= 70
                    ? 'bg-[#B7791F]'
                    : 'bg-[#D95D45]'
                }`}
                style={{ width: `${fillPercentage}%` }}
              />
            </div>
          </div>

          <Link
            to={`/events/${_id}`}
            state={{ event }}
            className="w-full flex items-center justify-center py-2 px-4 rounded-xl text-xs font-bold text-white bg-[#D95D45] hover:bg-[#B94734] transition-colors cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
