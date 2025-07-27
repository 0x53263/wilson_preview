import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-arteng-dark text-white">
      <div className="container mx-auto py-8 md:py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Column */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-4">About ArtEng</h3>
            <p className="text-lg mb-4">
              Bringing creatives and innovators together to transform ideas into unforgettable experiences.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="https://www.linkedin.com/company/arteng-uk" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links - Updated order to match navbar */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-lg hover:text-gray-300">Home</Link>
              </li>
              <li>
                <Link href="/events" className="text-lg hover:text-gray-300">Events</Link>
              </li>
              <li>
                <Link href="/news" className="text-lg hover:text-gray-300">News</Link>
              </li>
              <li>
                <Link href="/about-us" className="text-lg hover:text-gray-300">About Us</Link>
              </li>
              <li>
                <Link href="/membership" className="text-lg hover:text-gray-300">Membership</Link>
              </li>
              <li>
                <Link href="/partners" className="text-lg hover:text-gray-300">Partners</Link>
              </li>
              <li>
                <Link href="/faq" className="text-lg hover:text-gray-300">FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="text-lg hover:text-gray-300">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <address className="not-italic text-lg">
              <p className="mb-2">Email: <a href="mailto:info@arteng.co.uk" className="hover:text-gray-300">info@arteng.co.uk</a></p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} ArtEng. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy-policy" className="text-sm hover:text-gray-300">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
