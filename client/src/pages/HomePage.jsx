import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Code,
  BookOpen,
  Music,
  Trophy,
  Briefcase,
  Camera,
  GraduationCap,
  Globe,
  Compass,
  CheckCircle,
  Clock,
  Ticket,
  Flame,
  Search,
  ShieldCheck
} from 'lucide-react';
import { eventService } from '../services/eventService';
import EventCard from '../components/events/EventCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CATEGORIES = [
  {
    name: 'Technology and Hackathons',
    icon: Code,
    desc: 'Hackathons & AI Challenges',
    bg: 'bg-[#F8E4DE]',
    text: 'text-[#D95D45]',
    border: 'border-[#F2C5BB]'
  },
  {
    name: 'Workshops and Technical Sessions',
    icon: BookOpen,
    desc: 'Deep Learning & Cloud Labs',
    bg: 'bg-[#E6F0EB]',
    text: 'text-[#2F6B4F]',
    border: 'border-[#C8DFD2]'
  },
  {
    name: 'Music and Entertainment',
    icon: Music,
    desc: 'Rockfest & Acoustic Jams',
    bg: 'bg-[#F3E8FF]',
    text: 'text-[#9333EA]',
    border: 'border-[#E9D5FF]'
  },
  {
    name: 'Cultural Festivals',
    icon: Sparkles,
    desc: 'Vibrance & Dance Battles',
    bg: 'bg-[#FEF3C7]',
    text: 'text-[#B7791F]',
    border: 'border-[#FDE68A]'
  },
  {
    name: 'Sports',
    icon: Trophy,
    desc: 'Athletics & Football Cup',
    bg: 'bg-[#E0F2FE]',
    text: 'text-[#0284C7]',
    border: 'border-[#BAE6FD]'
  },
  {
    name: 'Entrepreneurship and Business',
    icon: Briefcase,
    desc: 'VC Pitch & E-Cell Summits',
    bg: 'bg-[#DCFCE7]',
    text: 'text-[#16A34A]',
    border: 'border-[#BBF7D0]'
  },
  {
    name: 'Art and Photography',
    icon: Camera,
    desc: 'Canvas Expo & Photo Walks',
    bg: 'bg-[#FCE7F3]',
    text: 'text-[#DB2777]',
    border: 'border-[#FBCFE8]'
  },
  {
    name: 'College Events',
    icon: GraduationCap,
    desc: 'Freshers Carnival & Science Fair',
    bg: 'bg-[#FFEDD5]',
    text: 'text-[#EA580C]',
    border: 'border-[#FED7AA]'
  },
  {
    name: 'Conferences and Seminars',
    icon: Globe,
    desc: 'Quantum Computing & Green Tech',
    bg: 'bg-[#F0EFEB]',
    text: 'text-[#525252]',
    border: 'border-[#E5E2DB]'
  }
];

const STEPS = [
  {
    step: '01',
    title: 'Explore Campus Catalog',
    desc: 'Browse hundreds of verified events, technical hackathons, cultural festivals, and business forums.',
    icon: Compass
  },
  {
    step: '02',
    title: 'Inspect Live Details',
    desc: 'Review real-time seat counts, lab venues, faculty coordinator contacts, and registration deadlines.',
    icon: Clock
  },
  {
    step: '03',
    title: '1-Click Registration',
    desc: 'Reserve your verified seat in real time and automatically generate a tamper-proof digital entry pass.',
    icon: Ticket
  },
  {
    step: '04',
    title: 'Attend & Network',
    desc: 'Check in with your digital QR ticket pass, gain hands-on knowledge, and expand your career network.',
    icon: CheckCircle
  }
];

const HomePage = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [trendingEvents, setTrendingEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeEvents = async () => {
      try {
        const [featuredRes, trendingRes] = await Promise.all([
          eventService.getEvents({ isFeatured: 'true', limit: 6, sort: 'date_asc' }),
          eventService.getEvents({ isTrending: 'true', limit: 6, sort: 'popularity' })
        ]);

        if (featuredRes.success) {
          setFeaturedEvents(featuredRes.events || []);
        }
        if (trendingRes.success) {
          setTrendingEvents(trendingRes.events || []);
        }
      } catch (err) {
        console.error('Failed to load homepage events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeEvents();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/events');
    }
  };

  const displayedEvents = activeTab === 'featured' ? featuredEvents : trendingEvents;

  return (
    <div className="bg-[#F8F7F3] dark:bg-[#121212] space-y-20 pb-20">
      {/* Modern High-Impact Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#E5E2DB] dark:border-[#2E2E2E] overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-[#D95D45]/10 via-[#B7791F]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Tag Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#F8E4DE] dark:bg-[#3D1D16] border border-[#F2C5BB] dark:border-[#5A261D] text-[#D95D45] dark:text-[#F87171] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#D95D45]" />
            <span>Official University Event Platform • 2026 Academic Term</span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#171717] dark:text-[#F8F7F3] tracking-tight leading-[1.08] font-display">
              Discover. Register.{' '}
              <span className="text-[#D95D45] inline-block">Experience.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#6B6B67] dark:text-[#A8A29E] max-w-2xl mx-auto leading-relaxed">
              Explore premier university hackathons, masterclass technical workshops, cultural pro-nights, and athletic championships all in one unified portal.
            </p>
          </div>

          {/* Hero Instant Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleHeroSearch}
              className="relative flex items-center bg-white dark:bg-[#1E1E1E] rounded-2xl p-2 border-2 border-[#E5E2DB] dark:border-[#2E2E2E] shadow-lg hover:border-[#D95D45]/40 transition-colors"
            >
              <div className="pl-3.5 pr-2 text-[#8C8C87] dark:text-[#A8A29E]">
                <Search className="w-5 h-5 text-[#D95D45]" />
              </div>
              <input
                type="text"
                placeholder="Search events by title, venue, topic, or organizer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base font-medium text-[#171717] dark:text-[#F8F7F3] placeholder-[#8C8C87] dark:placeholder-[#6B6B67] focus:outline-none py-2"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#D95D45] hover:bg-[#B94734] text-white shadow-xs transition-all hover:shadow-md cursor-pointer flex-shrink-0"
              >
                Find Events
              </button>
            </form>

            {/* Quick Keyword Suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-[#6B6B67] dark:text-[#A8A29E]">
              <span className="font-semibold text-xs">Trending:</span>
              <Link
                to="/events?search=Hackathon"
                className="hover:text-[#D95D45] hover:underline transition-colors"
              >
                Hackathons
              </Link>
              <span>•</span>
              <Link
                to="/events?search=AI"
                className="hover:text-[#D95D45] hover:underline transition-colors"
              >
                AI & Deep Learning
              </Link>
              <span>•</span>
              <Link
                to="/events?search=Vibrance"
                className="hover:text-[#D95D45] hover:underline transition-colors"
              >
                Vibrance Fest
              </Link>
              <span>•</span>
              <Link
                to="/events?search=Football"
                className="hover:text-[#D95D45] hover:underline transition-colors"
              >
                Football League
              </Link>
            </div>
          </div>

          {/* Platform Metric Counters */}
          <div className="pt-6 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs">
              <div className="text-2xl sm:text-3xl font-black text-[#D95D45]">25+</div>
              <div className="text-xs font-bold text-[#6B6B67] dark:text-[#A8A29E] mt-0.5">Live Campus Events</div>
            </div>
            <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs">
              <div className="text-2xl sm:text-3xl font-black text-[#171717] dark:text-[#F8F7F3]">9</div>
              <div className="text-xs font-bold text-[#6B6B67] dark:text-[#A8A29E] mt-0.5">Diverse Categories</div>
            </div>
            <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs">
              <div className="text-2xl sm:text-3xl font-black text-[#2F6B4F] dark:text-[#4ADE80]">100%</div>
              <div className="text-xs font-bold text-[#6B6B67] dark:text-[#A8A29E] mt-0.5">Faculty Verified</div>
            </div>
            <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs">
              <div className="text-2xl sm:text-3xl font-black text-[#B7791F] dark:text-[#FBBF24]">Instant</div>
              <div className="text-xs font-bold text-[#6B6B67] dark:text-[#A8A29E] mt-0.5">Digital Ticket Passes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured & Trending Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#D95D45] mb-1">
              Curated Highlights
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] dark:text-[#F8F7F3] tracking-tight">
              Featured & Trending Events
            </h2>
          </div>

          {/* Toggle Tabs */}
          <div className="flex items-center space-x-2 bg-white dark:bg-[#1E1E1E] p-1 rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E]">
            <button
              onClick={() => setActiveTab('featured')}
              className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'featured'
                  ? 'bg-[#D95D45] text-white shadow-2xs'
                  : 'text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#171717] dark:hover:text-[#F8F7F3]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Featured Picks
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'trending'
                  ? 'bg-[#B7791F] text-white shadow-2xs'
                  : 'text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#171717] dark:hover:text-[#F8F7F3]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 mr-1.5" />
              Trending Now
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner text="Retrieving events from campus directory..." />
        ) : displayedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E5E2DB] dark:border-[#2E2E2E] text-[#6B6B67] dark:text-[#A8A29E]">
            No events found in this section.
          </div>
        )}

        <div className="pt-2 text-center">
          <Link
            to="/events"
            className="inline-flex items-center px-6 py-3 rounded-xl font-bold text-xs bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#F8F7F3] border border-[#E5E2DB] dark:border-[#2E2E2E] hover:border-[#D95D45] hover:text-[#D95D45] transition-colors shadow-2xs"
          >
            <span>Browse Complete Events Directory (All 9 Categories)</span>
            <ArrowRight className="w-4 h-4 ml-2 text-[#D95D45]" />
          </Link>
        </div>
      </section>

      {/* All 9 Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D95D45]">
            Diverse Campus Interests
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] dark:text-[#F8F7F3] tracking-tight">
            Browse By Category
          </h2>
          <p className="text-sm text-[#6B6B67] dark:text-[#A8A29E]">
            Discover opportunities mapped directly to your academic passion, technical craft, or creative expression.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/events?category=${encodeURIComponent(cat.name)}`}
                className="bg-white dark:bg-[#1E1E1E] p-5 rounded-3xl border border-[#E5E2DB] dark:border-[#2E2E2E] hover:border-[#D95D45]/50 hover:shadow-md transition-all flex items-center space-x-4 group cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${cat.bg} dark:bg-opacity-20 ${cat.text} border ${cat.border} dark:border-opacity-30 transition-transform group-hover:scale-105`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#171717] dark:text-[#F8F7F3] group-hover:text-[#D95D45] transition-colors truncate">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-[#6B6B67] dark:text-[#A8A29E] mt-0.5 truncate">
                    {cat.desc}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8C8C87] group-hover:text-[#D95D45] group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white dark:bg-[#181818] py-16 border-y border-[#E5E2DB] dark:border-[#2E2E2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#D95D45]">
              Frictionless Experience
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] dark:text-[#F8F7F3] tracking-tight">
              How Event Registration Works
            </h2>
            <p className="text-sm text-[#6B6B67] dark:text-[#A8A29E]">
              Book confirmed seats for any campus event in under a minute with real-time digital confirmation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-6 bg-[#F8F7F3] dark:bg-[#1E1E1E] rounded-3xl border border-[#E5E2DB] dark:border-[#2E2E2E] flex flex-col justify-between space-y-6"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black tracking-widest text-[#D95D45] font-mono">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-[#E5E2DB] dark:border-[#2E2E2E] flex items-center justify-center text-[#D95D45] shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-[#171717] dark:text-[#F8F7F3] mb-1.5">
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

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#171717] dark:bg-[#1E1E1E] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#262626] dark:border-[#2E2E2E] shadow-xl">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-extrabold text-[#D95D45]">
              <ShieldCheck className="w-4 h-4" />
              <span>Free for All Enrolled Students</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">
              Ready to take part in college events?
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A29E] max-w-lg leading-relaxed">
              Create your student profile today, explore technical bootcamps, and reserve your seat with guaranteed digital tickets.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link to="/register">
              <button className="px-7 py-3.5 rounded-xl font-bold text-sm bg-[#D95D45] hover:bg-[#B94734] text-white shadow-md transition-all cursor-pointer">
                Create Free Account
              </button>
            </Link>
            <Link to="/events">
              <button className="px-7 py-3.5 rounded-xl font-bold text-sm bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 transition-all cursor-pointer">
                Browse Events
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
