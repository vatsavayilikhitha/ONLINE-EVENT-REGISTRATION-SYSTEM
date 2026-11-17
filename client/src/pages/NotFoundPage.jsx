import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-coral-soft dark:bg-[#3D1D16] text-coral dark:text-[#F87171] flex items-center justify-center mb-6">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black text-charcoal dark:text-[#F8F7F3] tracking-tight sm:text-5xl">
        404 - Page Not Found
      </h1>
      <p className="mt-3 text-sm text-warm-gray dark:text-[#A8A29E] max-w-md">
        The college event or dashboard view you are searching for does not exist or has been relocated.
      </p>
      <div className="mt-8">
        <Link to="/">
          <Button variant="primary" className="font-bold shadow-xs">
            <ArrowLeft className="w-4 h-4 mr-2" /> Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
