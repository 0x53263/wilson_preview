"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const RecordTurnoutCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Carousel dimensions - these can be used for image preparation
  // The carousel is 100% width of the viewport
  // The height is fixed at 700px
  const carouselDimensions = {
    width: '100% viewport width',
    height: '700px'
  };

  // Updated carousel slide data with different background images
  const slides = [
    {
      title: "Bringing Art & Engineering Together",
      description: "ArtEng is dedicated to fostering creativity, innovation, and collaboration between artists and engineers.",
      link: "/news/record-turnout",
      linkText: "More Info",
      backgroundImage: "/carosel1.jpg"
    },
    {
      title: "Networking Opportunities",
      description: "Connect with professionals from both art and engineering fields to create unique solutions.",
      link: "/news/new-partnerships",
      linkText: "Learn More",
      backgroundImage: "/carosel2.jpg"
    },
    {
      title: "Upcoming Events",
      description: "Join us for workshops, exhibitions, and forums that bring together creative minds and technical expertise.",
      link: "/news/innovation-award",
      linkText: "See Details",
      backgroundImage: "/carosel3.jpg"
    }
  ];

  // Preload all carousel images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = slides.map(
          (slide) =>
            new Promise((resolve, reject) => {
              const img = new Image();
              img.src = slide.backgroundImage;
              img.onload = resolve;
              img.onerror = reject;
            })
        );
        
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        // Still set as loaded even if there's an error to avoid blocking UI
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    // Auto-rotate slides every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative">
      {/* Height is responsive on mobile only, desktop remains the same */}
      <div className="relative h-[450px] md:h-[700px] w-full overflow-hidden">
        {/* Background image - dynamically selected based on current slide */}
        <Image 
          src={slides[currentSlide].backgroundImage}
          alt="Slide Background"
          fill
          priority={true}
          className="object-cover transition-opacity duration-300"
          style={{ objectPosition: "center center" }}
        />
        
        <div className="absolute inset-0 flex items-center">
          {/* Mobile-specific overlay */}
          {isMobile ? (
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
          ) : (
            /* Desktop diagonal overlay exactly as before */
            <div className="absolute inset-0" style={{ 
              background: 'linear-gradient(75deg, transparent 100%, rgba(0,0,0,0.5) 100%)',
              transform: 'translateX(0)'
            }}></div>
          )}
          
          {/* Content positioned differently on mobile vs desktop */}
          {isMobile ? (
            // Mobile layout - centered content
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white z-10">
              <div className="text-center">
              </div>
              
            </div>
          ) : (
            // Desktop layout - exactly as before
            <div className="absolute right-0 w-2/3 pr-12 text-white flex items-center justify-center h-full">
              <div className="flex flex-col items-center">
                {/* Fixed width and height container for title and description */}
                <div className="w-[500px] text-center h-[200px] flex flex-col justify-center">
                </div>
                
                {/* Fixed width button with consistent positioning */}
                <div className="h-[80px] flex items-center justify-center">
                </div>
                
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecordTurnoutCarousel;
