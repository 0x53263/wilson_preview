"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EventSignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');

  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    company: ''
  });
  const [eventDetails, setEventDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fetch event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) {
        setError('No event ID provided');
        setLoadingEvent(false);
        return;
      }

      try {
        setLoadingEvent(true);
        const response = await fetch(`https://arteng-be.onrender.com/api/v1/events/${eventId}`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setEventDetails(data.data);
          } else {
            setError('Event not found');
          }
        } else {
          setError('Failed to load event details');
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event details');
      } finally {
        setLoadingEvent(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!eventId) {
      setError('No event ID provided');
      setIsSubmitting(false);
      return;
    }

    try {
      const signUpData = {
        eventId: eventId,
        email: formData.email,
        firstName: formData.firstName,
        secondName: formData.secondName,
        company: formData.company || null
      };

      const response = await fetch('https://arteng-be.onrender.com/api/v1/events/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
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
      setError(err instanceof Error ? err.message : 'An error occurred during event registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to format event date
  const formatEventDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return date.toLocaleDateString('en-GB', options);
    } catch (error) {
      return dateString;
    }
  };

  if (loadingEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-arteng-dark mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!eventId || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-50 border border-red-200 rounded-md p-6">
            <h2 className="text-2xl font-bold text-red-800 mb-2">Error</h2>
            <p className="text-red-700 mb-4">{error || 'Invalid event ID'}</p>
            <Link 
              href="/events" 
              className="inline-block bg-arteng-dark text-white px-4 py-2 rounded-md hover:bg-opacity-90"
            >
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-green-50 border border-green-200 rounded-md p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-2">Registration Successful!</h2>
            <p className="text-green-700 mb-4">
              You have successfully registered for "{eventDetails?.title}". 
              You should receive a confirmation email shortly.
            </p>
            <div className="space-y-2">
              <Link 
                href="/events" 
                className="block bg-arteng-dark text-white px-4 py-2 rounded-md hover:bg-opacity-90"
              >
                Back to Events
              </Link>
              <Link 
                href="/" 
                className="block border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Event Details Header */}
        {eventDetails && (
          <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
            <div className="relative h-48 md:h-64">
              <Image 
                src={eventDetails.bannerImage || eventDetails.thumbImage || '/placeholder-event.jpg'} 
                alt={eventDetails.title} 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-6 text-white">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{eventDetails.title}</h1>
                  {eventDetails.subtitle && (
                    <p className="text-lg opacity-90">{eventDetails.subtitle}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-arteng-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatEventDate(eventDetails.date)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-arteng-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{eventDetails.location}</span>
                </div>
                
                {eventDetails.capacity && (
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-arteng-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Capacity: {eventDetails.capacity}</span>
                  </div>
                )}

                {eventDetails.price !== undefined && (
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-arteng-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className="font-semibold">{eventDetails.price === 0 ? 'Free Event' : `£${(eventDetails.price / 100).toFixed(2)}`}</span>
                  </div>
                )}
              </div>
              
              {eventDetails.description && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-700">{eventDetails.description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-arteng-dark">Event Registration</h2>
            <p className="mt-2 text-gray-600">Please fill in your details to register for this event</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-arteng-dark focus:border-arteng-dark"
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <label htmlFor="secondName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  id="secondName"
                  name="secondName"
                  type="text"
                  required
                  value={formData.secondName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-arteng-dark focus:border-arteng-dark"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-arteng-dark focus:border-arteng-dark"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company <span className="text-gray-500">(optional)</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-arteng-dark focus:border-arteng-dark"
                placeholder="Enter your company name"
              />
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

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-arteng-dark text-white py-3 px-6 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-arteng-dark disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? 'Registering...' : 'Register for Event'}
              </button>
              
              <Link 
                href="/events"
                className="flex-1 sm:flex-none border border-gray-300 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors text-center font-medium"
              >
                Back to Events
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}