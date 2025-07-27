"use client";

import { useState } from 'react';

export default function MailtoNotifyForm() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const generateMailtoLink = (emailClient) => {

    //  Change Email Content Here

    //  Target Email
    const toEmail = 'notifications@yourdomain.com';
    
    //  Email Subject
    const subject = 'Notification Request';
    
    //  Email Body
    const body = `
        Hello,

        I'd like to receive notifications.

        My information:
        First Name: ${formData.firstName || '[Not provided]'}
        Last Name: ${formData.lastName || '[Not provided]'}
        Email: ${formData.email || '[Not provided]'}

        Thank you!
    `.trim();

    const encodedEmail = encodeURIComponent(toEmail);
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    let mailtoLink = `mailto:${encodedEmail}?subject=${encodedSubject}&body=${encodedBody}`;
    
    if (emailClient === 'gmail') {
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}&su=${encodedSubject}&body=${encodedBody}`;
    } else if (emailClient === 'outlook') {
      return `https://outlook.office.com/mail/deeplink/compose?to=${encodedEmail}&subject=${encodedSubject}&body=${encodedBody}`;
    }
    
    return mailtoLink;
  };


  const handleEmailClient = (emailClient) => {
    if (!formData.firstName.trim() || !formData.email.trim()) {
      alert('Please provide at least your first name and email');
      return;
    }

    const mailtoLink = generateMailtoLink(emailClient);
    
    window.open(mailtoLink, '_blank');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Get Notified</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name*
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <button 
            type="button"
            onClick={() => handleEmailClient('gmail')}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Open in Gmail
          </button>
          
          <button 
            type="button"
            onClick={() => handleEmailClient('outlook')}
            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Open in Outlook
          </button>

          <button 
            type="button"
            onClick={() => handleEmailClient('default')}
            className="px-4 py-2 bg-[#1A193F] text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Open Default Client
          </button>
        </div>
      </form>
    </div>
  );
}