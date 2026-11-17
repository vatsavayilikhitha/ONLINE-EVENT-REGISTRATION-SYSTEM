import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Calendar,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Ticket,
  Menu,
  X,
  Layers,
  Users,
  Sun,
  Moon
} from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `text-xs font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded-xl ${
      isActive
        ? 'text-[#D95D45] bg-[#F8E4DE] dark:bg-[#3D1D16] dark:text-[#E06A53]'
        : 'text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#171717] dark:hover:text-white hover:bg-[#F3F1EC] dark:hover:bg-[#252525]'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center px-3.5 py-2.5 rounded-xl text-sm font-bold ${
      isActive
        ? 'bg-[#F8E4DE] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#E06A53]'
        : 'text-[#171717] dark:text-[#F8F7F3] hover:bg-[#F3F1EC] dark:hover:bg-[#252525]'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#181818]/95 backdrop-blur-xs border-b border-[#E5E2DB] dark:border-[#2E2E2E] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#D95D45] flex items-center justify-center text-white shadow-xs group-hover:bg-[#B94734] transition-colors flex-shrink-0">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-[#171717] dark:text-[#F8F7F3] tracking-tight leading-none font-display">
                Event<span className="text-[#D95D45]">Hub</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6B6B67] dark:text-[#A8A29E] mt-0.5">
                College Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1.5">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/events" className={navLinkClass}>
              Events
            </NavLink>

            {isAuthenticated && !isAdmin && (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/my-registrations" className={navLinkClass}>
                  My Tickets
                </NavLink>
              </>
            )}

            {isAdmin && (
              <div className="flex items-center space-x-1.5 border-l border-[#E5E2DB] dark:border-[#2E2E2E] pl-3 ml-2">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#B7791F] dark:text-[#FBBF24] bg-[#FEF3C7] dark:bg-[#3D2F14] px-2 py-0.5 rounded-full border border-[#FDE68A] dark:border-[#5A4518] mr-1">
                  Admin
                </span>
                <NavLink to="/admin/dashboard" className={navLinkClass}>
                  Overview
                </NavLink>
                <NavLink to="/admin/events" className={navLinkClass}>
                  Manage Events
                </NavLink>
                <NavLink to="/admin/participants" className={navLinkClass}>
                  Participants
                </NavLink>
              </div>
            )}
          </nav>

          {/* Desktop Auth Buttons, Theme Toggle & User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="p-2 rounded-xl text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#171717] dark:hover:text-white hover:bg-[#F3F1EC] dark:hover:bg-[#252525] border border-[#E5E2DB] dark:border-[#2E2E2E] transition-colors cursor-pointer flex items-center justify-center"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#F59E0B]" />
              ) : (
                <Moon className="w-4 h-4 text-[#171717]" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2.5">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-[#E5E2DB] dark:border-[#2E2E2E] bg-white dark:bg-[#1C1C1C] text-[#171717] dark:text-[#F8F7F3] hover:bg-[#F8F7F3] dark:hover:bg-[#252525] transition-colors text-xs font-bold"
                  title="View Profile"
                >
                  <div className="w-5 h-5 rounded-full bg-[#F8E4DE] dark:bg-[#3D1D16] text-[#D95D45] dark:text-[#E06A53] flex items-center justify-center text-[10px] font-bold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="max-w-[120px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-1.5 rounded-xl text-xs font-bold text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#C2413B] dark:hover:text-[#E06A53] hover:bg-[#FCEBEA] dark:hover:bg-[#3D1D16] transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <button className="px-4 py-2 rounded-xl text-xs font-bold text-[#171717] dark:text-[#F8F7F3] hover:bg-[#F3F1EC] dark:hover:bg-[#252525] transition-colors cursor-pointer">
                    Sign In
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#D95D45] hover:bg-[#B94734] transition-colors shadow-2xs cursor-pointer">
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="p-2 rounded-xl text-[#6B6B67] dark:text-[#A8A29E] hover:text-[#171717] dark:hover:text-white hover:bg-[#F3F1EC] dark:hover:bg-[#252525] border border-[#E5E2DB] dark:border-[#2E2E2E]"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-[#F59E0B]" />
              ) : (
                <Moon className="w-5 h-5 text-[#171717]" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#171717] dark:text-[#F8F7F3] hover:bg-[#F3F1EC] dark:hover:bg-[#252525]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E5E2DB] dark:border-[#2E2E2E] bg-white dark:bg-[#1C1C1C] px-4 pt-3 pb-6 space-y-3 shadow-md">
          <div className="space-y-1">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/events"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Events
            </NavLink>

            {isAuthenticated && !isAdmin && (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileNavLinkClass}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/my-registrations"
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileNavLinkClass}
                >
                  <Ticket className="w-4 h-4 mr-2" />
                  My Tickets
                </NavLink>
              </>
            )}

            {isAdmin && (
              <div className="pt-2 border-t border-[#E5E2DB] dark:border-[#2E2E2E] mt-2">
                <div className="text-[11px] font-bold text-[#B7791F] uppercase px-3 py-1">
                  Administrator Console
                </div>
                <NavLink
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileNavLinkClass}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Admin Dashboard
                </NavLink>
                <NavLink
                  to="/admin/events"
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileNavLinkClass}
                >
                  <Layers className="w-4 h-4 mr-2" />
                  Manage Events
                </NavLink>
                <NavLink
                  to="/admin/participants"
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileNavLinkClass}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Participants
                </NavLink>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#E5E2DB] dark:border-[#2E2E2E]">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3.5 py-2.5 rounded-xl text-[#171717] dark:text-[#F8F7F3] hover:bg-[#F3F1EC] dark:hover:bg-[#252525] font-bold text-sm"
                >
                  <UserIcon className="w-4 h-4 mr-2 text-[#6B6B67] dark:text-[#A8A29E]" />
                  Profile ({user?.name})
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3.5 py-2.5 rounded-xl text-[#C2413B] hover:bg-[#FCEBEA] dark:hover:bg-[#3D1D16] font-bold text-sm text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full font-bold">
                    Sign In
                  </Button>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="primary" className="w-full font-bold">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
