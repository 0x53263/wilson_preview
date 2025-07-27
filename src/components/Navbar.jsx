"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent body scrolling when menu is open
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-5 bg-white text-arteng-dark">
      <div className="flex items-center">
        <Link href="/" className="text-3xl font-bold flex items-center" onClick={closeMenu}>
          <div className="mr-2">
            <Image
              src="/my-logo.png"
              alt="ArtEng Logo"
              width={180}
              height={60}
              priority
            />
          </div>
        </Link>
      </div>

      {/* Mobile menu button - only visible on mobile */}
      {isMobile && (
        <button 
          className="block md:hidden focus:outline-none" 
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Desktop Navigation - exactly as it was before */}
      {!isMobile && (
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-lg hover:underline">Home</Link>
          <Link href="/events" className="text-lg hover:underline">Events</Link>
          <Link href="/news" className="text-lg hover:underline">News</Link>
          <Link href="/about-us" className="text-lg hover:underline">About Us</Link>
          <Link href="/membership" className="text-lg hover:underline">Membership</Link>
          <Link href="/partners" className="text-lg hover:underline">Partners</Link>
          <Link href="/faq" className="text-lg hover:underline">FAQ</Link>
          <Link href="/contact" className="text-lg hover:underline">Contact</Link>
          <Link href="/login" className="ml-4 bg-arteng-dark text-white font-bold text-lg rounded flex items-center justify-center h-10 w-28 pt-[3px]">
            SIGN UP
          </Link>
        </div>
      )}

      {/* Mobile Navigation Overlay - only appears on mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-white pt-20 z-40 overflow-auto">
          <div className="flex flex-col space-y-6 p-6">
            <Link href="/" className="text-2xl font-medium border-b border-gray-200 pb-2" onClick={closeMenu}>Home</Link>
            <Link href="/events" className="text-2xl font-medium border-b border-gray-200 pb-2" onClick={closeMenu}>Events</Link>
            <Link href="/news" className="text-2xl font-medium border-b border-gray-200 pb-2" onClick={closeMenu}>News</Link>
            <Link href="/about-us" className="text-2xl font-medium border-b border-gray-200 pb-2" onClick={closeMenu}>About Us</Link>
            <Link href="/membership" className="text-2xl font-medium border-b border-gray-200 pb-2" onClick={closeMenu}>Membership</Link>
            <Link href="/partners" className="text-2xl font-medium border-b border-gray-200 pb-2" onClick={closeMenu}>Partners</Link>
            <Link href="/faq" className="text-2xl font-medium border-b border-gray-200 pb-2" onClick={closeMenu}>FAQ</Link>
            <Link href="/contact" className="text-2xl font-medium border-b border-gray-200 pb-2" onClick={closeMenu}>Contact</Link>
            <Link 
              href="/login" 
              className="bg-arteng-dark text-white font-bold text-xl rounded flex items-center justify-center py-3 px-6 mt-4"
              onClick={closeMenu}
            >
              SIGN UP
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;