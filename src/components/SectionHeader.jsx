import Link from 'next/link';

const SectionHeader = ({ title, subtitle, viewAllLink }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold text-arteng-dark">{title}</h2>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      {viewAllLink && (
        <Link href={viewAllLink} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
          View All
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;