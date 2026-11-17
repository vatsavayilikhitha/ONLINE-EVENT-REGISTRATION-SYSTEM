import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { eventService } from '../services/eventService';
import EventCard from '../components/events/EventCard';
import SearchBar from '../components/events/SearchBar';
import FilterBar from '../components/events/FilterBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import ErrorMessage from '../components/common/ErrorMessage';
import { CalendarSearch, Sparkles } from 'lucide-react';

const EventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search & Filter State
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState('date_asc');

  useEffect(() => {
    const urlCat = searchParams.get('category') || 'All';
    setCategory(urlCat);
  }, [searchParams]);

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        sort: sortBy
      };
      if (search.trim()) params.search = search.trim();
      if (category && category !== 'All') params.category = category;
      if (onlyAvailable) params.availability = 'available';

      const data = await eventService.getEvents(params);
      if (data.success) {
        setEvents(data.events || []);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(
        err.response?.data?.message ||
          'Failed to load events. Make sure the backend server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [category, onlyAvailable, sortBy]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    fetchEvents();
  };

  const handleCategorySelect = (newCategory) => {
    setCategory(newCategory);
    if (newCategory === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', newCategory);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('All');
    setOnlyAvailable(false);
    setSortBy('date_asc');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Editorial Page Header */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-8 border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#F8E4DE] dark:bg-[#D95D45]/15 text-[#D95D45] dark:text-[#F87171] border border-[#F2C5BB] dark:border-[#D95D45]/30 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Campus Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] dark:text-[#F8F7F3] tracking-tight font-display">
          Explore College Events
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B67] dark:text-[#A8A29E]">
          Discover hands-on workshops, state hackathons, cultural pro-nights, and inter-college athletics.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white dark:bg-[#1E1E1E] p-5 rounded-2xl border border-[#E5E2DB] dark:border-[#2E2E2E] shadow-2xs space-y-3.5">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <SearchBar
            value={search}
            onChange={(val) => setSearch(val)}
            onClear={() => {
              setSearch('');
              setTimeout(fetchEvents, 0);
            }}
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#D95D45] hover:bg-[#B94734] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        <FilterBar
          selectedCategory={category}
          onSelectCategory={handleCategorySelect}
          onlyAvailable={onlyAvailable}
          onToggleAvailable={(val) => setOnlyAvailable(val)}
          sortBy={sortBy}
          onChangeSort={(val) => setSortBy(val)}
        />
      </div>

      {/* Main Content Area */}
      {error && <ErrorMessage message={error} onRetry={fetchEvents} />}

      {loading ? (
        <LoadingSpinner text="Loading events..." size="large" />
      ) : events.length > 0 ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold text-[#6B6B67] dark:text-[#A8A29E] px-1">
            <span>
              Showing {events.length} event{events.length === 1 ? '' : 's'}
              {category !== 'All' ? ` in ${category}` : ''}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={CalendarSearch}
          title="No events match your criteria"
          description="Try broadening your search term, clearing your category filter, or checking unreserved events."
          actionText="Clear All Filters"
          onAction={handleClearFilters}
        />
      )}
    </div>
  );
};

export default EventsPage;
