import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Sparkles,
  ArrowRight,
  BookOpen,
  Code,
  Music,
  Trophy,
  Users,
  Compass,
  CheckCircle,
  Clock,
  Ticket,
  Zap
} from 'lucide-react';
import { eventService } from '../services/eventService';
import EventCard from '../components/events/EventCard';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CATEGORIES = [
  {
    name: 'Workshops',
    icon: BookOpen,
    desc: 'Hands-on Sessions',
    bg: 'bg-[#E6F0EB]',
    text: 'text-[#2F6B4F]',
    border: 'border-[#C8DFD2]'
  },
  {
    name: 'Technical',
    icon: Code,
    desc: 'Code & Systems',
    bg: 'bg-[#F8E4DE]',
    text: 'text-[#D95D45]',
    border: 'border-[#F2C5BB]'
  },
  {
    name: 'Competitions',
    icon: Trophy,
    desc: 'Hackathons & Contests',
    bg: 'bg-[#F8E4DE]',
    text: 'text-[#D95D45]',
    border: 'border-[#F2C5BB]'
  },
  {
    name: 'Cultural',
    icon: Music,
    desc: 'Music & Arts Fest',
    bg: 'bg-[#FEF3C7]',
    text: 'text-[#B7791F]',
    border: 'border-[#FDE68A]'
  },
  {
    name: 'Sports',
    icon: Zap,
    desc: 'Athletics & Games',
    bg: 'bg-[#F2EFE9]',
    text: 'text-[#57534E]',
    border: 'border-[#E5E0D8]'
  },
  {
    name: 'Seminars',
    icon: Users,
    desc: 'Expert Lectures',
    bg: 'bg-[#F0EFEB]',
    text: 'text-[#525252]',
    border: 'border-[#E5E2DB]'
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Discover an Event',
    desc: 'Browse our curated directory of campus workshops, cultural festivals, sports tournaments, and hackathons.',
    icon: Compass
  },
  {
    step: '02',
    title: 'Inspect Schedule & Venue',
    desc: 'Review faculty coordinators, session timings, lab locations, live capacity, and registration deadlines.',
    icon: Clock
  },
  {
    step: '03',
    title: 'Register Instantly',
    desc: 'One-click registration reserves your seat in real time and automatically generates a unique digital ticket ID.',
    icon: Ticket
  },
  {
    step: '04',
    title: 'Attend & Experience',
    desc: 'Bring your official digital confirmation pass to the campus venue, expand your skill set, and network with peers.',
    icon: CheckCircle
  }
];

const HomePage = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await eventService.getEvents({ limit: 6, sort: 'date_asc' });
        if (data.success) {
          setFeaturedEvents(data.events || []);
        }
      } catch (err) {
        console.error('Failed to load featured events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="bg-[#F8F7F3] dark:bg-[#121212] space-y-16 pb-20">
      {/* Warm Editorial Hero Section */}
      <section className="pt-12 sm:pt-20 pb-16 border-b border-[#E5E2DB] dark:border-[#2E2E2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtle Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F8E4DE] dark:bg-[#D95D45]/15 border border-[#F2C5BB] dark:border-[#D95D45]/30 text-[#D95D45] dark:text-[#F87171] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#D95D45]" />
            <span>Official University Event Portal • 2026 Academic Term</span>
          </div>

          {/* Heading in Charcoal + Terracotta */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#171717] dark:text-[#F8F7F3] tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none font-display">
            Discover. Register.{' '}
            <span className="text-[#D95D45]">Experience.</span>
          </h1>

          {/* Warm Gray Description */}
          <p className="mt-5 text-base sm:text-lg text-[#6B6B67] dark:text-[#A8A29E] max-w-2xl mx-auto leading-relaxed">
            Find and register for exciting college events, workshops, seminars, competitions and more — all in one unified platform.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link to="/events">
              <button className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm bg-[#D95D45] hover:bg-[#B94734] text-white shadow-xs transition-colors flex items-center justify-center cursor-pointer">
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </Link>
            <Link to="/register">
              <button className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm bg-white dark:bg-[#1E1E1E] hover:bg-[#F3F1EC] dark:hover:bg-[#282828] border border-[#E5E2DB] dark:border-[#2E2E2E] text-[#171717] dark:text-[#F8F7F3] transition-colors cursor-pointer">
                Create Account
              </button>
            </Link>
          </div>

          {/* Editorial Metric Cards */}
          <div className="mt-14 max-w-3xl mx-auto grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D95D45]">500+</div>
              <div className="text-xs font-medium text-[#6B6B67] dark:text-[#A8A29E] mt-1">Student Participants</div>
            </div>
            <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#171717] dark:text-[#F8F7F3]">100%</div>
              <div className="text-xs font-medium text-[#6B6B67] dark:text-[#A8A29E] mt-1">Verified College Events</div>
            </div>
            <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#2F6B4F] dark:text-[#4ADE80]">Instant</div>
              <div className="text-xs font-medium text-[#6B6B67] dark:text-[#A8A29E] mt-1">Ticket Generation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#D95D45] mb-1">
              What's Happening
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] dark:text-[#F8F7F3] tracking-tight">
              Featured Upcoming Events
            </h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center text-sm font-bold text-[#D95D45] hover:text-[#B94734] transition-colors"
          >
            <span>View all events</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner text="Fetching featured college events..." />
        ) : featuredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] text-[#6B6B67] dark:text-[#A8A29E]">
            No events currently scheduled. Check back soon!
          </div>
        )}
      </section>

      {/* Categories Grid with Subtle Light Pastel Backgrounds */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D95D45] mb-1">
            Browse By Interest
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] dark:text-[#F8F7F3] tracking-tight">
            Event Categories
          </h2>
          <p className="text-sm text-[#6B6B67] dark:text-[#A8A29E] mt-1.5">
            Explore curated events matched to your academic, technical, or extracurricular goals.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/events?category=${cat.name}`}
                className="bg-white dark:bg-[#1E1E1E] p-5 rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] hover:border-[#D95D45]/50 hover:shadow-sm transition-all text-center group flex flex-col items-center"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${cat.bg} dark:bg-opacity-20 ${cat.text} border ${cat.border} dark:border-opacity-30 transition-transform group-hover:scale-105`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-[#171717] dark:text-[#F8F7F3] group-hover:text-[#D95D45] transition-colors">
                  {cat.name}
                </h4>
                <span className="text-[11px] font-medium text-[#6B6B67] dark:text-[#A8A29E] mt-0.5">
                  {cat.desc}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white dark:bg-[#181818] py-16 border-y border-[#E5E2DB] dark:border-[#2E2E2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#D95D45] mb-1">
              Seamless Workflow
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] dark:text-[#F8F7F3] tracking-tight">
              How It Works
            </h2>
            <p className="text-sm text-[#6B6B67] dark:text-[#A8A29E] mt-1.5">
              Participating in campus activities is straightforward and takes less than 60 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-6 bg-[#F8F7F3] dark:bg-[#1E1E1E] rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black tracking-widest text-[#D95D45] font-mono">
                        {item.step}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#1C1C1C] border border-[#E5E2DB] dark:border-[#2E2E2E] flex items-center justify-center text-[#D95D45]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-[#171717] dark:text-[#F8F7F3] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6B6B67] dark:text-[#A8A29E] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#171717] dark:bg-[#1E1E1E] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#262626] dark:border-[#2E2E2E] shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
              Ready to take part in college events?
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A29E] max-w-lg leading-relaxed">
              Create your student profile today, explore technical bootcamps, and reserve your seat with guaranteed digital tickets.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link to="/register">
              <button className="px-7 py-3.5 rounded-xl font-bold text-sm bg-[#D95D45] hover:bg-[#B94734] text-white shadow-xs transition-colors cursor-pointer">
                Create Free Account
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
