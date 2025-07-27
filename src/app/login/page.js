"use client"

import Link from 'next/link';
import { useState } from 'react';

export default function SignUpPage() {
  const [activeTab, setActiveTab] = useState('member');
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Clear company field when switching to member tab
    if (tab === 'member') {
      setFormData(prev => ({
        ...prev,
        company: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const signUpData = {
        email: formData.email,
        firstName: formData.firstName,
        secondName: formData.secondName,
        company: activeTab === 'partner' ? formData.company || undefined : undefined
      };

      const response = await fetch('https://arteng-be.onrender.com/api/v1/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess(true);
      
      // Reset form
      setFormData({
        firstName: '',
        secondName: '',
        email: '',
        company: ''
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign up');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <h2 className="text-2xl font-bold text-green-800 mb-2">Success!</h2>
            <p className="text-green-700">You have successfully been registered.</p>
            <Link 
              href="/" 
              className="mt-4 inline-block bg-arteng-dark text-white px-4 py-2 rounded-md hover:bg-opacity-90"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-arteng-dark">Sign Up</h2>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => handleTabChange('member')}
            className={`flex-1 py-2 px-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'member'
                ? 'border-arteng-dark text-arteng-dark'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Member
          </button>
          <button
            onClick={() => handleTabChange('partner')}
            className={`flex-1 py-2 px-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'partner'
                ? 'border-arteng-dark text-arteng-dark'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Partner
          </button>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-arteng-dark focus:border-arteng-dark focus:z-10 sm:text-sm"
                placeholder="First Name"
              />
            </div>
            
            <div>
              <label htmlFor="secondName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="secondName"
                name="secondName"
                type="text"
                required
                value={formData.secondName}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-arteng-dark focus:border-arteng-dark focus:z-10 sm:text-sm"
                placeholder="Last Name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-arteng-dark focus:border-arteng-dark focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            {/* Company field - only shown for Partner tab */}
            {activeTab === 'partner' && (
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-arteng-dark focus:border-arteng-dark focus:z-10 sm:text-sm"
                  placeholder="Company name"
                />
              </div>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-arteng-dark focus:ring-arteng-dark border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the <a href="#" className="font-medium text-arteng-dark hover:text-opacity-90">Terms of Service</a> and <a href="#" className="font-medium text-arteng-dark hover:text-opacity-90">Privacy Policy</a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-arteng-dark hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-arteng-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}