import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import {
  Calendar,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  UserCheck,
  Sparkles,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [quickLoadingRole, setQuickLoadingRole] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const executeLogin = async (targetEmail, targetPassword) => {
    setError('');
    const cleanEmail = targetEmail.trim().toLowerCase();

    if (!cleanEmail || !targetPassword) {
      setError('Please provide both your registered email and password.');
      return;
    }

    try {
      const res = await login(cleanEmail, targetPassword);
      if (res.success && res.user) {
        if (res.user.role === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else {
          navigate(from === '/login' ? '/dashboard' : from, { replace: true });
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Invalid email or password. Please verify credentials or use the Quick Demo buttons below.'
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await executeLogin(email, password);
    setLoading(false);
  };

  // Instant 1-Click Login for Student Demo
  const handleQuickStudentLogin = async () => {
    setQuickLoadingRole('student');
    setEmail('student@eventhub.edu');
    setPassword('student123');
    await executeLogin('student@eventhub.edu', 'student123');
    setQuickLoadingRole(null);
  };

  // Instant 1-Click Login for Admin Demo
  const handleQuickAdminLogin = async () => {
    setQuickLoadingRole('admin');
    setEmail('admin@eventhub.edu');
    setPassword('admin123');
    await executeLogin('admin@eventhub.edu', 'admin123');
    setQuickLoadingRole(null);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-ivory dark:bg-[#121212] transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center space-x-2.5 group">
          <div className="w-12 h-12 rounded-2xl bg-[#D95D45] flex items-center justify-center text-white shadow-xs group-hover:bg-[#B94734] transition-colors flex-shrink-0">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-2xl font-black text-charcoal dark:text-[#F8F7F3] tracking-tight leading-none font-display">
              Event<span className="text-[#D95D45]">Hub</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-warm-gray dark:text-[#A8A29E] mt-0.5">
              College Portal
            </span>
          </div>
        </Link>
        <h2 className="mt-5 text-2xl font-extrabold text-charcoal dark:text-[#F8F7F3] tracking-tight">
          Welcome to Campus Events
        </h2>
        <p className="mt-1 text-xs text-warm-gray dark:text-[#A8A29E] font-medium">
          Sign in to reserve your tickets and access your event dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#1C1C1C] py-8 px-6 sm:px-10 shadow-xs border border-warm-border dark:border-[#2E2E2E] rounded-3xl space-y-6 transition-colors">
          {error && <ErrorMessage message={error} />}

          {/* Quick 1-Click Demo Section (Highlighted for Viva) */}
          <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#252525] border border-warm-border dark:border-[#333333] shadow-xs">
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-charcoal dark:text-[#F8F7F3] mb-1.5">
              <Sparkles className="w-4 h-4 text-coral" />
              <span>1-Click Quick Demo Sign In</span>
            </div>
            <p className="text-[11px] text-warm-gray dark:text-[#A8A29E] font-medium mb-3">
              Examiner & Viva shortcut: Click either button below to log in immediately without typing passwords.
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleQuickStudentLogin}
                disabled={quickLoadingRole !== null || loading}
                className="flex items-center justify-center py-2.5 px-3 rounded-xl text-xs font-bold text-[#D95D45] dark:text-[#E06A53] bg-coral-soft dark:bg-[#3D1D16] hover:bg-[#F3D0C7] dark:hover:bg-[#4E241B] border border-coral/30 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <UserCheck className="w-4 h-4 mr-1.5 text-[#D95D45] dark:text-[#E06A53]" />
                {quickLoadingRole === 'student' ? 'Signing In...' : 'Student Demo'}
              </button>
              <button
                type="button"
                onClick={handleQuickAdminLogin}
                disabled={quickLoadingRole !== null || loading}
                className="flex items-center justify-center py-2.5 px-3 rounded-xl text-xs font-bold text-[#B7791F] dark:text-[#FBBF24] bg-[#FEF3C7] dark:bg-[#3B2D12] hover:bg-[#FDE68A] dark:hover:bg-[#4D3B18] border border-warm-amber/30 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4 mr-1.5 text-[#B7791F] dark:text-[#FBBF24]" />
                {quickLoadingRole === 'admin' ? 'Signing In...' : 'Admin Demo'}
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-warm-border dark:border-[#2E2E2E]"></div>
            <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider font-bold text-warm-gray dark:text-[#A8A29E]">
              Or Sign In Manually
            </span>
            <div className="flex-grow border-t border-warm-border dark:border-[#2E2E2E]"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-charcoal dark:text-[#F8F7F3] mb-1.5">
                College Email Address <span className="text-warm-red">*</span>
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-warm-gray dark:text-[#A8A29E]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="e.g. student@eventhub.edu"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-warm-border dark:border-[#2E2E2E] text-sm pl-10 pr-3 py-2.5 bg-white dark:bg-[#222222] text-charcoal dark:text-[#F8F7F3] font-medium placeholder-warm-gray/50 dark:placeholder-[#A8A29E]/50 focus:outline-none focus:ring-2 focus:ring-[#D95D45]/20 focus:border-[#D95D45] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-charcoal dark:text-[#F8F7F3] mb-1.5">
                Password <span className="text-warm-red">*</span>
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-warm-gray dark:text-[#A8A29E]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-warm-border dark:border-[#2E2E2E] text-sm pl-10 pr-10 py-2.5 bg-white dark:bg-[#222222] text-charcoal dark:text-[#F8F7F3] font-medium placeholder-warm-gray/50 dark:placeholder-[#A8A29E]/50 focus:outline-none focus:ring-2 focus:ring-[#D95D45]/20 focus:border-[#D95D45] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-warm-gray dark:text-[#A8A29E] hover:text-charcoal dark:hover:text-[#F8F7F3] focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white shadow-xs bg-[#D95D45] hover:bg-[#B94734] flex items-center justify-center cursor-pointer transition-colors disabled:opacity-60"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Account'}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>

          <div className="text-center pt-3 text-xs text-warm-gray dark:text-[#A8A29E] font-medium border-t border-warm-border dark:border-[#2E2E2E]">
            Don't have an account yet?{' '}
            <Link
              to="/register"
              className="font-bold text-[#D95D45] hover:underline ml-1"
            >
              Create student profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
