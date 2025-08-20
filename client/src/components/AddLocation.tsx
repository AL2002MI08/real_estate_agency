import type { Property } from "../types/propertyTypes";

export const AddLocation = ({ nextStep, propertyDetails, setPropertyDetails }: { nextStep: () => void; propertyDetails: Property; setPropertyDetails: (details: Property) => void; }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPropertyDetails({ ...propertyDetails, [name]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Property Location</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={propertyDetails.country}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            name="city"
            value={propertyDetails.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <textarea
          name="address"
          value={propertyDetails.address}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded focus:ring-gray- focus:border-blue-500"
        />
      </div>
      
      <div className="flex justify-end pt-4">
        <button
          onClick={nextStep}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};