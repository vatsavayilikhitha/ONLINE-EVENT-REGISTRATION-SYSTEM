import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Phone, MapPin, Sparkles, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#171717] text-[#A8A29E] text-sm mt-auto border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center space-x-2 text-white group">
              <div className="w-9 h-9 rounded-xl bg-[#D95D45] flex items-center justify-center text-white shadow-xs group-hover:bg-[#B94734] transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight font-display text-white">
                Event<span className="text-[#D95D45]">Hub</span>
              </span>
            </Link>
            <p className="text-[#8C8C87] text-xs leading-relaxed">
              The premier college event discovery and registration platform connecting students with impactful technical hackathons, masterclass workshops, cultural celebrations, athletic tournaments, and academic summits.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-[#F8F7F3] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-[#F8F7F3] transition-colors">
                  Explore All Events
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#F8F7F3] transition-colors">
                  Student Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#F8F7F3] transition-colors">
                  Create Student Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Key Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to={`/events?category=${encodeURIComponent('Technology and Hackathons')}`}
                  className="hover:text-[#F8F7F3] transition-colors"
                >
                  Technology & Hackathons
                </Link>
              </li>
              <li>
                <Link
                  to={`/events?category=${encodeURIComponent('Workshops and Technical Sessions')}`}
                  className="hover:text-[#F8F7F3] transition-colors"
                >
                  Workshops & Technical Sessions
                </Link>
              </li>
              <li>
                <Link
                  to={`/events?category=${encodeURIComponent('Music and Entertainment')}`}
                  className="hover:text-[#F8F7F3] transition-colors"
                >
                  Music & Entertainment
                </Link>
              </li>
              <li>
                <Link
                  to={`/events?category=${encodeURIComponent('Cultural Festivals')}`}
                  className="hover:text-[#F8F7F3] transition-colors"
                >
                  Cultural Festivals
                </Link>
              </li>
              <li>
                <Link
                  to={`/events?category=${encodeURIComponent('Sports')}`}
                  className="hover:text-[#F8F7F3] transition-colors"
                >
                  Inter-College Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* College Contact */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Campus Contact & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8C8C87]">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#D95D45] flex-shrink-0 mt-0.5" />
                <span>Main Academic Block, Tech Boulevard, University City</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#D95D45] flex-shrink-0" />
                <span>support@eventhub.edu</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#D95D45] flex-shrink-0" />
                <span>+1 (555) 019-4820</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between text-xs text-[#737373] space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} EventHub College Event Registration System.
          </div>
          <div className="flex items-center space-x-3">
            <span>MERN Stack Architecture</span>
            <span className="text-[#404040]">•</span>
            <span>REST API Verified</span>
            <span className="text-[#404040]">•</span>
            <span className="text-[#A8A29E]">SE Capstone Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
