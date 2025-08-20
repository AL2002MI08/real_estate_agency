import React from 'react';
import type { Property } from "../types/propertyTypes";

interface FacilitiesProps {
  prevStep: () => void;
  propertyDetails: Property;
  setPropertyDetails: React.Dispatch<React.SetStateAction<Property>>;
  setOpened: (opened: boolean) => void;
  setActiveStep: (step: number) => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  error?: string | null;
  success?: boolean;
}

export const Facilities: React.FC<FacilitiesProps> = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  onSubmit,
  isSubmitting = false,
  error,
  success
}) => {
  const handleFacilityChange = (field: keyof Property['facilities'], value: number) => {
    setPropertyDetails(prev => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    console.log('📝 Final property details before submission:', propertyDetails);
    
    if (!propertyDetails.title || !propertyDetails.address || propertyDetails.price <= 0) {
      alert('Please fill in all required fields');
      return;
    }

    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Property Facilities</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms
          </label>
          <input
            type="number"
            min="0"
            value={propertyDetails.facilities.bedrooms}
            onChange={(e) => handleFacilityChange('bedrooms', parseInt(e.target.value) || 0)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms
          </label>
          <input
            type="number"
            min="0"
            value={propertyDetails.facilities.bathrooms}
            onChange={(e) => handleFacilityChange('bathrooms', parseInt(e.target.value) || 0)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parking Spaces
          </label>
          <input
            type="number"
            min="0"
            value={propertyDetails.facilities.parkings?.toString()}
            onChange={(e) => handleFacilityChange('parkings', parseInt(e.target.value) || 0)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">❌ {error}</p>
        </div>
      )}
      {success && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">✅ Property submitted successfully!</p>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={isSubmitting}
        >
          Previous
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </>
          ) : (
            'Submit Property'
          )}
        </button>
      </div>
    </div>
  );
};