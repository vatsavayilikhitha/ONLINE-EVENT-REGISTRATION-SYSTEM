import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#171717] text-[#A8A29E] text-sm mt-auto border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-[#D95D45] flex items-center justify-center text-white">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold tracking-tight font-display text-white">
                Event<span className="text-[#D95D45]">Hub</span>
              </span>
            </Link>
            <p className="text-[#8C8C87] text-xs leading-relaxed">
              The premier college event registration platform designed to connect students with impactful technical workshops, cultural celebrations, academic seminars, and sports competitions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-[#F8F7F3] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-[#F8F7F3] transition-colors">
                  Browse All Events
                </Link>
              </li>
              <li>
                <Link to="/events?category=Workshops" className="hover:text-[#F8F7F3] transition-colors">
                  Technical Workshops
                </Link>
              </li>
              <li>
                <Link to="/events?category=Competitions" className="hover:text-[#F8F7F3] transition-colors">
                  Hackathons & Competitions
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Event Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/events?category=Technical" className="hover:text-[#F8F7F3] transition-colors">
                  Technical & Coding
                </Link>
              </li>
              <li>
                <Link to="/events?category=Cultural" className="hover:text-[#F8F7F3] transition-colors">
                  Cultural Celebrations
                </Link>
              </li>
              <li>
                <Link to="/events?category=Seminars" className="hover:text-[#F8F7F3] transition-colors">
                  Seminars & Conferences
                </Link>
              </li>
              <li>
                <Link to="/events?category=Sports" className="hover:text-[#F8F7F3] transition-colors">
                  Inter-College Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* College Contact */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Campus Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8C8C87]">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#D95D45] flex-shrink-0 mt-0.5" />
                <span>Main Academic Campus, Tech Boulevard, University City</span>
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
            &copy; {new Date().getFullYear()} EventHub College Event Registration System. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>Software Engineering Capstone Project</span>
            <span className="text-[#404040]">|</span>
            <span>MERN Stack Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
