'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import SponsorCard from '@/components/SponsorCard';
import TeamMemberCard from '@/components/TeamMemberCard';
import RecordTurnoutCarousel from '@/components/RecordTurnoutCarousel';

export default function Home() {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);



  const teamMembers = [
    {
      id: 4,
      name: "Wendy Bennett",
      description: "Wendy is a trailblazer for women in industry and has a reputation for becoming the first female in a variety of positions across many engineering fields. She worked within the precision investment casting industry for 26 years and was CEO and previous owner of Lost Wax Development Limited.",
      imageUrl: "/wendynew.png",
      long1: "Wendy is a trailblazer for women in industry and has a reputation for becoming the first female in a variety of positions across many engineering fields. She worked within the precision investment casting industry for 26 years and was CEO and previous owner of Lost Wax Development Limited. Her achievements in the industry are far ranging and include recognition nationally and internationally. Wendy was the first female to be awarded a Fellowship to the Institute of Cast Metal Engineers (ICME) in 2012 and was also the first female Chair of the Cast Metal Federation (CMF) from 2015 to 2017 and is the current President of the West Midlands branch of the ICME.",
      long2: "In 2016 she visited Dresden for the International Foundry Forum and represented the UK Foundry Industry and has also been a Government advisor on industrial strategy on behalf of the Metals Council. She was invited to join the Council of 'Made in the Midlands' after being recognised as one of the only women within the region who was involved in industry and who owned a precision investment casting facility. Wendy has also been involved in the 'Advanced Engineering Cluster' which was set up to promote the use of students and under graduates for technical projects within the manufacturing sector, utilising the latest technologies available within the universities.",
      long3: ""
    },
    {
      id: 2,
      name: "Stephen Fletcher",
      description: "Stephen's career spans more than 45 years covering a range of roles including Logistics/Transport management, Project management, Key Account management and Sales Business Development.",
      imageUrl: "/steve.png",
      long1: "Stephen's career spans more than 45 years covering a range of roles including Logistics/Transport management, Project management, Key Account management and Sales Business Development. He has worked on behalf of a range of manufacturing and service suppliers including Metal fabrication, Flexible packaging, Precision Engineering and Commercial Heat Treatment",
      long2: "Stephen's experience covers a broad range of industrial sectors including Automotive, Agricultural, Aerospace, General Industrial [including tool making and precision engineering] and Defence across UK and Europe. In addition, Stephen's vast range of experience also incorporates a deep involvement in the arts and media. A long term involvement in theatre has seen him take on roles of acting, producing and directing in a variety of productions. This has led to a passion for promoting and supporting the theatre and creative media sector including writing, live performance, independent film making and production. Similarly, he has managed, overseen and facilitated creative media driven projects, awareness programmes and initiatives for the NHS and Schools. This has also extended to sales networking and training in the corporate sector.",
      long3: "Stephen's experience has led to a passion for supporting the transition of students in the move towards a career environment, allowing them access to as much information as they need to complete their studies, because anything is possible if you are supported by the right people."
    },
    {
      id: 3,
      name: "Joan Smith",
      description: "With over 20 years of experience in business advice and guidance, Joan brings a wealth of knowledge in all areas of business support. Having worked with hundreds of companies across diverse sectors, Joan has always managed to understand their unique challenges and opportunities that businesses face.",
      imageUrl: "/jess-smith.jpg",
      long1: "With over 20 years of experience in business advice and guidance, Joan brings a wealth of knowledge in all areas of business support. Having worked with hundreds of companies across diverse sectors, Joan has always managed to understand their unique challenges and opportunities that businesses face. Her approach is centred around learning about each business, analysing their needs, and providing tailored solutions to help them achieve their goals.",
      long2: "As an impartial broker, she specialises in connecting businesses with the right experts and resources, ensuring they receive the guidance needed to thrive. Past experience includes managing members for the Chamber of Commerce and successfully fostering a thriving business community in the Solihull area. This included organising and hosting prestigious business awards evenings - celebrating local success stories, recognising outstanding achievements, and creating opportunities for businesses to showcase their impact on the local, national and global stage. These events not only strengthened connections within the business community but also inspired growth and collaboration.",
      long3: "Joan's philosophy is 'Let's Make a Difference Together' and she genuinely believes that every business deserves access to expert advice and guidance in all areas. By working together, any business can thrive, achieving goals with clarity, expertise, and a shared purpose."
    },
    {
      id: 1,
      name: "Adam Snelleksz",
      description: "Adam has a wide and varied work history in marketing, communication and PR with over 25 years experience in many different roles and organisations. After graduating from university with a marketing degree, Adam moved to London and worked in a busy press office for the National Consumer Council.",
      imageUrl: "/adam.png",
      long1: "Adam has a wide and varied work history in marketing, communication and PR with over 25 years experience in many different roles and organisations. After graduating from university with a marketing degree, Adam moved to London and worked in a busy press office for the National Consumer Council. Following two years in the capital, Adam returned to Birmingham as head of communications for Birmingham City Football Club. The role included hosting and organising manager and player press conferences, dealing with media enquiries and setting up the club's first online TV channel, Blues TV. Adam then stayed in the sports industry when he became head of marketing for Birmingham City Council's sports events department. Responsible for the commercial partnerships, ticket sales, marketing and promotion of world and European championships including the World BMX Championships, European Gymnastics Championships, Diamond League Athletics and many more held at the National Indoor Arena and Birmingham Alexander Stadium.",
      long2: "After working in sport, Adam took the step of setting up his own company - a video production company called CMA Video. He built the company into a widely recognised video agency which produced TV and cinema adverts for Sea Life Centre, Lego Land, Brooks running shoes and many more. After 12 years of successful trading, Adam sold the business and set up an off-shoot marketing company called CMA Media which specialises in digital marketing, social media and website services. Current clients include Aston University and Birmingham based charity, Help Harry Help Others",
      long3: ""
    }
  ];

  // Helper function to format article date
  const formatArticleDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      return date.toLocaleDateString('en-GB', options);
    } catch (error) {
      return dateString;
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

  // Helper function to extract plain text from Contentful rich text
  const extractPlainText = (richTextContent) => {
    if (!richTextContent || !richTextContent.content) return '';
    
    let text = '';
    const extractTextFromNode = (node) => {
      if (node.nodeType === 'text') {
        text += node.value;
      } else if (node.content) {
        node.content.forEach(extractTextFromNode);
      }
    };
    
    richTextContent.content.forEach(extractTextFromNode);
    return text;
  };

  // Transform API article to match component expectations
  const transformArticle = (apiArticle) => {
    const imageUrl = apiArticle.fields.featuredImage?.fields?.file?.url 
      ? `https:${apiArticle.fields.featuredImage.fields.file.url}` 
      : null;

    return {
      id: apiArticle.sys.id,
      title: apiArticle.fields.title,
      slug: apiArticle.fields.slug,
      description: apiArticle.fields.excerpt || extractPlainText(apiArticle.fields.content).substring(0, 150) + '...',
      imageUrl: imageUrl,
      date: formatArticleDate(apiArticle.sys.createdAt),
      rawDate: apiArticle.sys.createdAt,
      author: apiArticle.fields.author,
      tags: apiArticle.fields.tags || []
    };
  };

  // Transform API event to match component expectations
  const transformEvent = (apiEvent) => ({
    id: apiEvent.id,
    title: apiEvent.title,
    subtitle: apiEvent.subtitle,
    description: apiEvent.description,
    imageUrl: apiEvent.thumbImage || apiEvent.bannerImage, // Use thumb image first, fallback to banner
    bannerImage: apiEvent.bannerImage, // Keep banner for modal
    thumbImage: apiEvent.thumbImage,
    dateTime: formatEventDate(apiEvent.date),
    rawDate: apiEvent.date,
    location: apiEvent.location,
    hostedBy: apiEvent.sponsor || 'ArtEng Community',
    capacity: apiEvent.capacity,
    price: apiEvent.price,
    sponsorLogo: apiEvent.sponsorLogo,
    publishDate: apiEvent.publishDate,
    longDescription: apiEvent.description
  });

  // Fetch articles from API with retry logic
  useEffect(() => {
    const fetchArticles = async (retryCount = 0) => {
      try {
        setLoadingNews(true);
        const response = await fetch('https://arteng-be.onrender.com/api/v1/articles');
        
        if (response.status === 429 && retryCount < 2) {
          // Wait and retry for rate limit
          console.log('Rate limited, retrying in 3 seconds...');
          setTimeout(() => fetchArticles(retryCount + 1), 3000);
          return;
        }
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            const transformedArticles = data.data.map(transformArticle);
            console.log('Homepage articles:', transformedArticles); // Debug log
            // Take the first 3 articles for the homepage
            setFeaturedNews(transformedArticles.slice(0, 3));
          }
        } else {
          console.error('Failed to fetch articles:', response.status, response.statusText);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        if (retryCount < 2) {
          console.log('Retrying articles fetch in 2 seconds...');
          setTimeout(() => fetchArticles(retryCount + 1), 2000);
        }
        // Keep empty array on error
      } finally {
        setLoadingNews(false);
      }
    };

    fetchArticles();
  }, []);

  // Fetch events from API with retry logic
  useEffect(() => {
    const fetchEvents = async (retryCount = 0) => {
      try {
        setLoadingEvents(true);
        const response = await fetch('https://arteng-be.onrender.com/api/v1/events');
        
        if (response.status === 429 && retryCount < 2) {
          // Wait and retry for rate limit
          console.log('Rate limited, retrying in 3 seconds...');
          setTimeout(() => fetchEvents(retryCount + 1), 3000);
          return;
        }
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            const transformedEvents = data.data.map(transformEvent);
            // Take the first 3 events for the homepage
            setUpcomingEvents(transformedEvents.slice(0, 3));
          }
        } else {
          console.error('Failed to fetch events:', response.status, response.statusText);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        if (retryCount < 2) {
          console.log('Retrying events fetch in 2 seconds...');
          setTimeout(() => fetchEvents(retryCount + 1), 2000);
        }
        // Keep empty array on error
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - With responsive padding */}
      <section className="bg-white text-arteng-dark py-10 md:py-16 pt-20 md:pt-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-5xl font-bold mb-4">Bringing Art &<br />Engineering Together</h1>
            </div>
            <div className="text-center">
              <p className="text-base md:text-2xl">Connecting, nurturing and developing the artistic and engineering worlds...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Record Turnout Carousel Section */}
      <RecordTurnoutCarousel />
      
      {/* About ArtEng Section - Now with white background and responsive layout */}
      <section className="py-10 md:py-16 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold">About ArtEng</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-6">
              <div>
                <Image 
                  src="/homepagefire.jpg" 
                  alt="ArtEng Team" 
                  width={600} 
                  height={400} 
                  className="rounded-md w-full"
                />
              </div>
            </div>
            
            <div className="lg:col-span-6">
              <p className="mb-3 md:mb-4 text-gray-800 text-base md:text-xl">
                ArtEng is an innovative concept that merges the worlds of art and engineering to encourage creativity and problem-solving in industry. It was established to bridge the gap between art and engineering, offering a platform for artists, engineers, and creators to collaborate and develop groundbreaking solutions.
              </p>
              <p className="mb-3 md:mb-4 text-gray-800 text-base md:text-xl">
                Through networking, events and a programme of activities, ArtEng is striving to cultivate a dynamic space where imagination meets engineering, resulting in groundbreaking works that shape the future of both art and technology.
              </p>
              
              {/* Button centered under the right column content */}
              <div className="flex items-center justify-center mt-4 md:mt-6">
                <Link href="/about-us" className="bg-arteng-dark text-white px-4 md:px-6 py-1.5 md:py-2 rounded inline-block hover:bg-opacity-90 transition-colors text-sm md:text-base">
                  More Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet the Team Section - With responsive grid for team members */}
      <section className="py-10 md:py-16 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h2 className="text-4xl sm:text-4xl font-bold text-arteng-dark text-center sm:text-left">Co-Founders</h2>
              <p className="text-gray-600 text-center sm:text-left text-lg sm:text-lg">The team behind ArtEng</p>
            </div>
            <Link href="/about-us" className="mt-3 sm:mt-0 bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm hover:bg-gray-800 transition-colors">
              More Info
            </Link>
          </div>
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow hover:shadow-lg transition-all transform hover:translate-y-[-3px] group relative h-full"
              >
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mb-3 sm:mb-4 mt-2 flex-shrink-0">
                  <Image src={member.imageUrl} alt={member.name} fill className="object-cover rounded-md" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <div className="flex flex-col items-center flex-grow p-3 sm:p-4 pt-0">
                  <h3 className="text-base sm:text-lg font-bold group-hover:text-arteng-dark transition-colors duration-300 mb-2">{member.name}</h3>
                  <p className="text-sm sm:text-base text-center mb-4 flex-grow">{member.description}</p>
                </div>
                
                {/* Click indicator - Fixed position at bottom */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-arteng-dark">
                    <span className="text-sm font-medium mr-1">Click for more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
          
        </div>
      </section>
      
      {/* Latest News Section */}
      <section className="py-10 md:py-16 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div>
            <h2 className="text-4xl sm:text-4xl font-bold text-arteng-dark text-center sm:text-left">Latest News</h2>
            <p className="text-gray-600 text-center sm:text-left text-lg sm:text-lg">Keep up to date with what's happening, what our partners have been up to and all our news</p>
          </div>
          
          {loadingNews ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-arteng-dark"></div>
            </div>
          ) : featuredNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredNews.map((article) => (
                <Card
                  key={article.id}
                  imageUrl={article.imageUrl}
                  title={article.title}
                  description={article.description}
                  dateTime={article.date}
                  link={`/news/${encodeURIComponent(article.id)}`}
                  linkText="Read More"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No news articles available at the moment.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="py-10 md:py-16 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto">
          <div>
            <h2 className="text-4xl sm:text-4xl font-bold text-arteng-dark text-center sm:text-left">Upcoming Events</h2>
            <p className="text-gray-600 text-center sm:text-left text-lg sm:text-lg">Events coming soon, to book and find out more click on each image</p>
          </div>
          
          {loadingEvents ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-arteng-dark"></div>
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {upcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  imageUrl={event.imageUrl}
                  title={event.title}
                  description={event.description}
                  dateTime={event.dateTime}
                  location={event.location}
                  hostedBy={event.hostedBy}
                  link="#"
                  linkText="More Info"
                  onCardClick={(e) => {
                    e.preventDefault();
                    setSelectedEvent(event);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No upcoming events available at the moment.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Our Partners Section (renamed from Sponsors) */}
      <section className="py-10 md:py-16 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div>
            <h2 className="text-4xl sm:text-4xl font-bold text-arteng-dark text-center sm:text-left">Our Partners</h2>
            <p className="text-gray-600 text-center sm:text-left text-lg sm:text-lg">Primary Partners</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <SponsorCard 
              name="Forusall" 
              logo="/thisoneisit.png" 
              description="Forusall is a company that is at the heart of connecting people, promoting product awareness, championing innovation and joining likeminded businesses."
            />
            <SponsorCard 
              name="Business Cube" 
              logo="/businesscube.jpg" 
              description="The Business Cube is a place where SMEs can connect, share knowledge and collaborate with trusted experts to accelerate growth."
            />
            <SponsorCard 
              name="CMA Media" 
              logo="/cmamedia.png" 
              description="CMA Media provides marketing support to businesses who need assistance with digital marketing, websites, SEO, video and communications."
            />
            <SponsorCard 
              name="Toolife" 
              logo="/tool_life.png" 
              description="Toolife provides innovative tools and solutions for creative professionals and engineers, bridging the gap between artistic vision and technical implementation."
            />
          </div>
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Main Banner Image */}
              <div className="h-64 relative">
                <Image 
                  src={selectedEvent.bannerImage || selectedEvent.imageUrl} 
                  alt={selectedEvent.title} 
                  fill 
                  className="object-cover object-center"
                />
                <button 
                  onClick={closeEventModal}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Main Content */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 text-arteng-dark">{selectedEvent.title}</h2>
                    {selectedEvent.subtitle && (
                      <h3 className="text-lg text-gray-600 mb-3">{selectedEvent.subtitle}</h3>
                    )}
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{selectedEvent.dateTime}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{selectedEvent.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Hosted by {selectedEvent.hostedBy}</span>
                      </div>

                      {selectedEvent.capacity && (
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>Capacity: {selectedEvent.capacity}</span>
                        </div>
                      )}

                      {selectedEvent.price !== undefined && (
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span>{selectedEvent.price === 0 ? 'Free' : `£${(selectedEvent.price / 100).toFixed(2)}`}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-700 mb-6">{selectedEvent.longDescription}</p>
                  </div>

                  {/* Side Panel with Additional Images */}
                  <div className="lg:w-80 space-y-4">
                    {/* Sponsor Logo */}
                    {selectedEvent.sponsorLogo && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Event Sponsor</h4>
                        <div className="relative h-20 bg-white rounded-md p-2 flex items-center justify-center">
                          <Image 
                            src={selectedEvent.sponsorLogo} 
                            alt="Sponsor logo" 
                            fill 
                            className="object-contain p-2"
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-2 text-center">Sponsored by {selectedEvent.hostedBy}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center mt-6 pt-6 border-t border-gray-200">
                  <Link href={`/events/signup?eventId=${selectedEvent.id}`} className="bg-arteng-dark text-white py-2 px-6 rounded hover:bg-opacity-90 transition-colors text-center">
                    Register Now
                  </Link>
                  
                  <button 
                    onClick={closeEventModal}
                    className="border border-gray-300 py-2 px-6 rounded hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
