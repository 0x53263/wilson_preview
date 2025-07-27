import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import SponsorCard from '@/components/SponsorCard';

export default function PartnersPage() {
  // Primary sponsors data
  const primarySponsors = [
    {
      id: 1,
      name: "Forusall",
      logo: "/thisoneisit.png",
      description: "Forusall is a company that is at the heart of connecting people, promoting product awareness, championing innovation and joining likeminded businesses. With a commitment to supporting and promoting engineering and manufacturing in its many forms, Forusall is passionate about the very shapes, designs and innovations that influence the everyday lives of each and everyone of us."
    },
    {
      id: 2,
      name: "Business Cube",
      logo: "/businesscube.jpg",
      description: "The Business Cube is a place where SMEs can connect, share knowledge and collaborate with trusted experts to accelerate growth. Our multi-dimensional support is free – the only charge to your business will be for any work that goes ahead with our experts to help your business grow."
    },
    {
      id: 3,
      name: "CMA Media",
      logo: "/cmamedia.png",
      description: "CMA Media provides marketing support to businesses who need assistance with digital marketing, websites, SEO, video and communications. Our experience of working with SMEs and large corporate organisations means that we can work to any particular requirements and circumstances."
    },
    {
      id: 4,
      name: "Tool Life",
      logo: "/tool_life.png",
      description: "TooLife brings all the elements of the tool making industry together to create awareness of best manufacturing practices for businesses and individuals. We aim to address not only the needs of today's manufacturing process but look to shape the industry for future generations."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-arteng-dark text-white py-12 pt-24">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-5xl font-bold mb-4">Our Partners</h1>
        </div>
      </section>

      {/* Partnership Information */}
      <section className="py-16 px-4 md:px-8 ">
        <div className="container mx-auto">
          <div>
            <h2 className="text-4xl sm:text-4xl font-bold text-arteng-dark text-center sm:text-left">Partner With Us</h2>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="relative w-full lg:w-96 h-96 bg-gray-200 rounded-md overflow-hidden mb-8 lg:mb-0 flex-shrink-0">
              <Image 
                src="/partnerspagenew.jpg" 
                alt="Partnership Opportunities" 
                fill
                className="object-cover"
                style={{ imageOrientation: 'from-image' }}
              />
            </div>
            
            <div className="flex-1">
              <p className="mb-6 text-xl">
                Partnering with Arteng offers a unique opportunity for companies seeking to innovate, stand out in competitive markets, and connect with stakeholders in the art and engineering industries. We offer a unique approach that blends creativity with technical precision and this synergy leads to the development of products, services, and experiences that are not only functional but also visually engaging.  By collaborating with Arteng professionals or initiatives, companies gain access to fresh perspectives that can reimagine how their brand communicates, operates, and evolves. In marketing and branding, Arteng driven ideas can create more immersive and memorable experiences.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-12 justify-items-center items-center">
            <Link href="/login">
              <button className="bg-arteng-dark text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors">
                Contact Us
              </button>
            </Link>
          </div>
          
        </div>
      </section>

      {/* Primary Sponsors */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto">
          <div>
            <h2 className="text-4xl sm:text-4xl font-bold text-arteng-dark text-center sm:text-left">Our Partners</h2>
          </div>
          
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {primarySponsors.map((sponsor) => (
              <SponsorCard
                key={sponsor.id}
                name={sponsor.name}
                logo={sponsor.logo}
                description={sponsor.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-16 px-4 md:px-8 bg-arteng-dark text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Become a Partner</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Interested in supporting our mission to bring art and engineering together? We're always looking for new partners who share our vision.
          </p>
          <Link href="/contact">
            <button className="bg-white text-arteng-dark px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors">
              Get In Touch
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}