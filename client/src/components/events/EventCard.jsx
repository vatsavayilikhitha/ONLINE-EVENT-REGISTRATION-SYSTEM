import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight, Sparkles, Flame, Building2 } from 'lucide-react';
import { formatDate, isDeadlinePassed } from '../../utils/formatDate';

const EventCard = ({ event }) => {
  const {
    _id,
    title,
    category,
    date,
    startTime,
    venue,
    organizer,
    capacity,
    registeredCount = 0,
    registrationDeadline,
    price = 0,
    isFeatured,
    isTrending,
    image
  } = event;

  const seatsLeft = Math.max(0, capacity - registeredCount);
  const isFull = seatsLeft <= 0;
  const isPastDeadline = isDeadlinePassed(registrationDeadline);
  const fillPercentage = Math.min(100, Math.round((registeredCount / capacity) * 100));

  const getCategoryStyles = (cat) => {
    switch (cat) {
      case 'Technology and Hackathons':
      case 'Technical':
      case 'Competitions':
        return 'bg-[#F8E4DE] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#F87171] border-[#F2C5BB] dark:border-[#5A261D]';
      case 'Workshops and Technical Sessions':
      case 'Workshops':
        return 'bg-[#E6F0EB] dark:bg-[#163324] text-[#2F6B4F] dark:text-[#4ADE80] border-[#C8DFD2] dark:border-[#1E4A34]';
      case 'Music and Entertainment':
        return 'bg-[#F3E8FF] dark:bg-[#321B47] text-[#9333EA] dark:text-[#C084FC] border-[#E9D5FF] dark:border-[#581C87]';
      case 'Cultural Festivals':
      case 'Cultural':
        return 'bg-[#FEF3C7] dark:bg-[#3D2F14] text-[#B7791F] dark:text-[#FBBF24] border-[#FDE68A] dark:border-[#5A4518]';
      case 'Sports':
        return 'bg-[#E0F2FE] dark:bg-[#122E40] text-[#0284C7] dark:text-[#38BDF8] border-[#BAE6FD] dark:border-[#0C4A6E]';
      case 'Entrepreneurship and Business':
        return 'bg-[#DCFCE7] dark:bg-[#143B22] text-[#16A34A] dark:text-[#4ADE80] border-[#BBF7D0] dark:border-[#166534]';
      case 'Art and Photography':
        return 'bg-[#FCE7F3] dark:bg-[#40182E] text-[#DB2777] dark:text-[#F472B6] border-[#FBCFE8] dark:border-[#831843]';
      case 'College Events':
        return 'bg-[#FFEDD5] dark:bg-[#3E2313] text-[#EA580C] dark:text-[#FB923C] border-[#FED7AA] dark:border-[#7C2D12]';
      case 'Conferences and Seminars':
      case 'Seminars':
        return 'bg-[#F0EFEB] dark:bg-[#262626] text-[#525252] dark:text-[#D4D4D4] border-[#E5E2DB] dark:border-[#404040]';
      default:
        return 'bg-[#F0EFEB] dark:bg-[#262626] text-[#525252] dark:text-[#D4D4D4] border-[#E5E2DB] dark:border-[#404040]';
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs hover:border-[#D95D45]/50 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image Banner */}
      <Link to={`/events/${_id}`} state={{ event }} className="block relative h-52 w-full overflow-hidden bg-[#F3F1EC] dark:bg-[#2A2A2A] cursor-pointer">
        <img
          src={image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80';
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md border ${getCategoryStyles(category)}`}>
            {category}
          </span>
          {isFeatured && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#D95D45] text-white shadow-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              Featured
            </span>
          )}
          {isTrending && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-extrabold bg-[#B7791F] text-white shadow-xs">
              <Flame className="w-3 h-3 mr-0.5" />
              Hot
            </span>
          )}
        </div>

        {/* Price & Status on Image */}
        <div className="absolute top-3.5 right-3.5 z-10 flex flex-col items-end gap-1.5">
          <span className="px-3 py-1 rounded-full text-xs font-black shadow-md bg-white/95 dark:bg-[#1E1E1E]/95 text-[#171717] dark:text-[#F8F7F3] border border-white/20">
            {price === 0 ? 'Free' : `$${price}`}
          </span>
        </div>

        {/* Bottom Banner Status Tag */}
        <div className="absolute bottom-3 right-3.5 z-10">
          {isPastDeadline ? (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FCEBEA] dark:bg-[#3D1A18] text-[#C2413B] dark:text-[#F87171] border border-[#F8C8C6] dark:border-[#5C2320]">
              Closed
            </span>
          ) : isFull ? (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] dark:bg-[#3D2F14] text-[#B7791F] dark:text-[#FBBF24] border border-[#FDE68A] dark:border-[#5A4518]">
              Sold Out
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 dark:bg-black/70 text-[#2F6B4F] dark:text-[#4ADE80] backdrop-blur-xs">
              {seatsLeft} seats left
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <Link to={`/events/${_id}`} state={{ event }} className="block cursor-pointer">
            <h3 className="text-base sm:text-lg font-bold text-[#171717] dark:text-[#F8F7F3] line-clamp-1 group-hover:text-[#D95D45] transition-colors leading-snug">
              {title}
            </h3>
          </Link>

          <div className="space-y-1.5 text-xs text-[#6B6B67] dark:text-[#A8A29E]">
            <div className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-[#D95D45] flex-shrink-0" />
              <span className="font-bold text-[#171717] dark:text-[#F8F7F3]">{formatDate(date)}</span>
              <span className="text-[#D4D0C5] dark:text-[#4A4A4A]">•</span>
              <Clock className="w-3.5 h-3.5 text-[#8C8C87] dark:text-[#A8A29E] flex-shrink-0" />
              <span>{startTime}</span>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#8C8C87] dark:text-[#A8A29E] flex-shrink-0" />
              <span className="truncate">{venue}</span>
            </div>

            {organizer && (
              <div className="flex items-center space-x-2 pt-0.5">
                <Building2 className="w-3.5 h-3.5 text-[#8C8C87] dark:text-[#A8A29E] flex-shrink-0" />
                <span className="truncate font-medium">{organizer}</span>
              </div>
            )}
          </div>
        </div>

        {/* Capacity Bar & Action */}
        <div className="pt-3.5 border-t border-[#E5E2DB] dark:border-[#2E2E2E] space-y-3">
          <div>
            <div className="flex justify-between items-center text-[11px] font-semibold text-[#6B6B67] dark:text-[#A8A29E] mb-1.5">
              <span className="flex items-center">
                <Users className="w-3.5 h-3.5 mr-1 text-[#8C8C87] dark:text-[#A8A29E]" />
                Registrations
              </span>
              <span className="font-bold text-[#171717] dark:text-[#F8F7F3]">
                {registeredCount} / {capacity}
              </span>
            </div>
            <div className="w-full bg-[#F3F1EC] dark:bg-[#2A2A2A] rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  fillPercentage >= 90
                    ? 'bg-[#C2413B]'
                    : fillPercentage >= 70
                    ? 'bg-[#B7791F]'
                    : 'bg-[#D95D45]'
                }`}
                style={{ width: `${Math.max(fillPercentage, 3)}%` }}
              />
            </div>
          </div>

          <Link
            to={`/events/${_id}`}
            state={{ event }}
            className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#D95D45] hover:bg-[#B94734] transition-all shadow-xs group-hover:shadow-md cursor-pointer"
          >
            <span>View Details & Register</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
