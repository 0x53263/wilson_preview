"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import MailtoNotifyForm from '@/components/SignUp';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create mailto link as fallback
      const subject = encodeURIComponent(formData.subject || 'Contact Form Submission');
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:info@arteng.co.uk?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-arteng-dark text-white py-12 pt-24">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-5xl font-bold mb-4">Contact Page</h1>
          <p className="text-xl">Get in touch by filling in the contact form and if you'd like us to stay in touch with you, sign up to our newsletter below</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
<div className="flex flex-row gap-3 min-h-fit">
  <div className="bg-gray-50 p-6 rounded-lg min-w-fit flex-1">
    <h3 className="font-semibold text-lg mb-2 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Email
    </h3>
    <p><a href="mailto:info@arteng.co.uk" className="text-blue-600 hover:text-blue-800 transition-colors">info@arteng.co.uk</a></p>
    <p className="text-sm text-gray-600 mt-1">We typically respond within 24 hours</p>
  </div>
  
  <div className="bg-gray-50 p-6 rounded-lg min-w-fit flex-1">
    <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
    <div className="flex space-x-4">
      <a href="https://www.linkedin.com/company/arteng-uk" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center" target="_blank" rel="noopener noreferrer">
        <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
        LinkedIn
      </a>
    </div>
  </div>

  <div className="bg-gray-50 p-6 rounded-lg min-w-fit flex-1">
    <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
    <div className="text-sm text-gray-700">
      <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
      <p>Saturday - Sunday: Closed</p>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>
    </div>
  );
}