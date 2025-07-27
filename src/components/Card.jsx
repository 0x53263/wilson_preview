import Image from 'next/image';
import Link from 'next/link';

const Card = ({ 
  imageUrl, 
  title, 
  description, 
  link, 
  linkText = "More Info",
  aspectRatio = "aspect-video",
  hostedBy = null,
  dateTime = null,
  location = null,
  onCardClick = null
}) => {
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 flex flex-col h-full">
      <div className={`relative ${aspectRatio} bg-gray-200`}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">Image placeholder</span>
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-base sm:text-lg mb-2 text-arteng-dark line-clamp-2">{title}</h3>
        <p className='text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-3'>{description}</p>
        
        {(dateTime || location || hostedBy) && (
          <div className="mb-3 sm:mb-4 text-xs sm:text-sm space-y-1 flex-grow">
            {dateTime && (
              <div className="flex items-start sm:items-center gap-1 sm:gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 sm:mt-0 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="flex-grow">{dateTime}</span>
              </div>
            )}
            {location && (
              <div className="flex items-start sm:items-center gap-1 sm:gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 sm:mt-0 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="flex-grow">{location}</span>
              </div>
            )}
            {hostedBy && (
              <div className="flex items-start sm:items-center gap-1 sm:gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 sm:mt-0 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="flex-grow">Hosted by {hostedBy}</span>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-auto flex justify-center w-full">
          {onCardClick ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCardClick(e);
              }}
              className="inline-block bg-arteng-dark text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm hover:bg-opacity-90 transition-colors w-28 sm:w-32 text-center"
            >
              {linkText}
            </button>
          ) : (
            <Link href={link} className="inline-block bg-arteng-dark text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm hover:bg-opacity-90 transition-colors w-28 sm:w-32 text-center">
              {linkText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;