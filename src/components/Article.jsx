import Image from 'next/image';
import Link from 'next/link';

const Article = ({ 
  imageUrl, 
  title, 
  description,
  readTime, 
  link, 
  linkText = "Read Now",
  aspectRatio = "aspect-video",
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
        <p className="text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm line-clamp-3">{description}</p>
        <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">{readTime} minutes</p>
        <div className="mt-auto">
          <Link href={link} className="inline-block bg-arteng-dark text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm hover:bg-opacity-90 transition-colors w-20 sm:w-24 text-center">
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;