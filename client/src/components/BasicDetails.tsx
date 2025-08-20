import type { Property } from "../types/propertyTypes";

export const BasicDetails = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }: { prevStep: () => void; nextStep: () => void; propertyDetails: Property; setPropertyDetails: (details: Property) => void; }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPropertyDetails({ ...propertyDetails, [name]: value });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Basic Details</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                    type="text"
                    name="title"
                    value={propertyDetails.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    value={propertyDetails.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                    type="number"
                    name="price"
                    value={propertyDetails.price}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="flex justify-between pt-4">
                <button
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                    Back
                </button>
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


