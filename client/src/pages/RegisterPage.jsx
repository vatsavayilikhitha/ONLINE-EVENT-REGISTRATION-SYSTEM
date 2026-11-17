import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import { Calendar, User, Mail, Lock, Phone, Building2 } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    college: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.phone.trim() ||
      !formData.college.trim()
    ) {
      setError('Please provide all required registration fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await register(formData);
      if (res.success) {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please check your information and try again.'
      );
    } finally {
      setLoading(false);
    }
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
          Create Student Account
        </h2>
        <p className="mt-1 text-xs text-warm-gray dark:text-[#A8A29E] font-medium">
          Register with your college details to unlock event tickets and participation
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white dark:bg-[#1C1C1C] py-8 px-6 sm:px-10 shadow-xs border border-warm-border dark:border-[#2E2E2E] rounded-3xl space-y-6 transition-colors">
          {error && <ErrorMessage message={error} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              placeholder="e.g. John Doe"
              icon={User}
              required
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="e.g. johndoe@college.edu"
              icon={Mail}
              required
              value={formData.email}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Contact Phone"
                name="phone"
                placeholder="e.g. +1 555-0192"
                icon={Phone}
                required
                value={formData.phone}
                onChange={handleChange}
              />

              <Input
                label="College / Organization"
                name="college"
                placeholder="e.g. Tech Institute"
                icon={Building2}
                required
                value={formData.college}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Min. 6 characters"
                icon={Lock}
                required
                value={formData.password}
                onChange={handleChange}
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Repeat password"
                icon={Lock}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full font-bold shadow-xs"
                isLoading={loading}
              >
                Complete Registration
              </Button>
            </div>
          </form>

          <div className="text-center pt-3 text-xs text-warm-gray dark:text-[#A8A29E] font-medium border-t border-warm-border dark:border-[#2E2E2E]">
            Already registered?{' '}
            <Link
              to="/login"
              className="font-bold text-[#D95D45] hover:underline ml-1"
            >
              Sign in to your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
