import Image from 'next/image';

const SponsorCard = ({ name, logo, description }) => {
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 p-3 sm:p-4 flex flex-col items-center">
      <div className="w-full h-28 sm:h-32 md:h-36 lg:h-40 relative mb-3 sm:mb-4">
        {logo ? (
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
            <span className="text-gray-400 text-sm">{name}</span>
          </div>
        )}
      </div>
      <h3 className="font-medium text-sm sm:text-base mb-2 text-center">{name}</h3>
      <p className="text-xs sm:text-sm text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default SponsorCard;