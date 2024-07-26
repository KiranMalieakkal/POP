type TaxCategory = {
  countryId: number;
  userName: string;
  tripId: number;
  places: string;
  countryName: string;
  startDate: string;
  duration: number;
  budget: number;
  journalEntry: string;
  travelTips: string;
  image: string;
};

interface TaxCardProps {
  taxCategory: TaxCategory;
}

function TaxCard({ taxCategory }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {taxCategory.title}
        </h1>
        <p className="text-gray-600 text-base">{taxCategory.description}</p>
      </div>
    </div>
  );
}

export default TaxCard;
