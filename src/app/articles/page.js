"use client"

import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import Article from '@/components/Article';
import MailtoNotifyForm from '@/components/SignUp';
import { useState } from 'react';

export default function EventsPage() {

  const [showForm, setShowForm] = useState(false);

  const eventsMain = [
    {
      id: 1,
      title: "The Intersection of Art and Engineering",
      description: "Discover how creative vision and technical precision combine to create innovative solutions that are both functional and aesthetically pleasing.",
      imageUrl: "/acquisition-news.jpg",
      readTime: "5-7"
    },
    {
      id: 2,
      title: "Sustainable Design Principles",
      description: "Exploring eco-friendly approaches to design that minimize environmental impact while maximizing creative potential and engineering efficiency.",
      imageUrl: "/award-background.png",
      readTime: "8-10"
    },
    {
      id: 3,
      title: "Digital Fabrication Techniques",
      description: "A deep dive into modern fabrication methods that are revolutionizing how artists and engineers bring their ideas from concept to reality.",
      imageUrl: "/ceo-award.jpg",
      readTime: "6-8"
    },
    {
      id: 4,
      title: "Material Innovation in Creative Fields",
      description: "How new materials and composites are opening unprecedented possibilities for artistic expression and engineering solutions.",
      imageUrl: "/engineering-celebration.jpg",
      readTime: "4-6"
    },
    {
      id: 5,
      title: "Interactive Installations: Behind the Scenes",
      description: "The technical challenges and creative problem-solving required to build engaging interactive art installations that captivate audiences.",
      imageUrl: "/eoy-celebration.jpg",
      readTime: "7-9"
    },
    {
      id: 6,
      title: "From Concept to Exhibition: A Technical Journey",
      description: "Following the process of transforming an artistic concept into a fully realized exhibition through collaboration between artists and engineers.",
      imageUrl: "/exhibition-opening.jpg",
      readTime: "10-12"
    }
  ];

  const toggleForm = () => {
    setShowForm(prevState => !prevState);
  };

  return (
<div className="min-h-screen flex flex-col bg-white">
  {/* Hero Section */}
  <section className="bg-arteng-dark text-white py-12 relative z-50">
    <div className="container mx-auto px-4 md:px-8">
      <h1 className="text-4xl font-bold mb-4">Articles</h1>
      <p className="text-lg">Curated by ArtEng specifically for you.</p>
    </div>
  </section>
  
  <div className="relative flex-grow flex flex-col bg-white">
    <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center z-10">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mt-[-115px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Coming Soon</h2>
        <p className="text-gray-600 mb-4">We're working hard to bring you the highest quality content. Please check back later!</p>
          <button onClick={toggleForm} className="bg-arteng-dark text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"> {showForm ? 'Hide Form' : 'Notify Me'} </button>
          {showForm && (
          <div className="mt-6 border-t pt-6 border-gray-200">
            <MailtoNotifyForm />
          </div>
        )}
      </div>
    </div>

    {/* Featured Events */}
    <section className="py-16 px-4 md:px-8 flex-grow">
      <div className="container mx-auto h-full">
        <SectionHeader 
          title="Event Schedule" 
          subtitle="Featured Events" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsMain.map((event) => (
            <Article
              key={event.id}
              imageUrl={event.imageUrl}
              title={event.title}
              description={event.description}
              readTime={event.readTime}
              link={`/articles/${event.id}`}
            />
          ))}
        </div>

        <div className="flex justify-center w-full mt-8">
          <Link href="/events" className="inline-block bg-arteng-dark text-white px-4 py-1 rounded text-sm hover:bg-opacity-90 transition-colors w-24 text-center">
            View All
          </Link>
        </div>
      </div>
    </section>
  </div>
</div>
  );
}