import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import { User, Mail, Phone, Building2, CheckCircle2 } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    college: user?.college || ''
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        college: user.college || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.college.trim()) {
      setErrorMsg('Name, Phone, and College cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const res = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        college: formData.college
      });
      if (res.success) {
        setSuccessMsg('Your profile has been updated successfully!');
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || 'Failed to update profile. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#171717] dark:text-[#F8F7F3] tracking-tight">
          Account Profile
        </h1>
        <p className="text-sm text-[#6B6B67] dark:text-[#A8A29E] mt-1">
          Manage your personal details and academic affiliation.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E5E2DB] dark:border-[#2E2E2E] p-6 sm:p-8 shadow-2xs space-y-6">
        {/* User Card Header */}
        <div className="flex items-center space-x-4 pb-6 border-b border-[#E5E2DB] dark:border-[#2E2E2E]">
          <div className="w-16 h-16 rounded-2xl bg-[#D95D45] text-white flex items-center justify-center text-2xl font-black shadow-xs">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-[#171717] dark:text-[#F8F7F3]">{user?.name}</h2>
              <span className="text-xs uppercase font-bold px-2.5 py-0.5 rounded-lg bg-[#F8F7F3] dark:bg-[#252525] text-[#171717] dark:text-[#F8F7F3] border border-[#E5E2DB] dark:border-[#2E2E2E]">
                {user?.role}
              </span>
            </div>
            <p className="text-xs text-[#6B6B67] dark:text-[#A8A29E] mt-0.5">{user?.college}</p>
          </div>
        </div>

        {successMsg && (
          <div className="p-3.5 bg-[#E6F0EB] dark:bg-[#163324] border border-[#C8DFD2] dark:border-[#1E4A34] text-[#2F6B4F] dark:text-[#4ADE80] rounded-xl text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#2F6B4F] flex-shrink-0" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        {errorMsg && <ErrorMessage message={errorMsg} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            placeholder="Your full name"
            icon={User}
            required
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label="Email Address (Read-Only)"
            name="email"
            type="email"
            icon={Mail}
            disabled
            value={formData.email}
            helperText="Registered academic email address cannot be changed."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Contact Phone"
              name="phone"
              placeholder="+1 (555) 000-0000"
              icon={Phone}
              required
              value={formData.phone}
              onChange={handleChange}
            />

            <Input
              label="College / Organization"
              name="college"
              placeholder="Your department or institute"
              icon={Building2}
              required
              value={formData.college}
              onChange={handleChange}
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="font-bold shadow-xs cursor-pointer"
              isLoading={loading}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
