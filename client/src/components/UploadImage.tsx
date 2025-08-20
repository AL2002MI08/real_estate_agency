import type { Property } from "../types/propertyTypes";
import Button from "./ui/Button";

export const UploadImage = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }: { prevStep: () => void; nextStep: () => void; propertyDetails: Property; setPropertyDetails: (details: Property) => void; }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPropertyDetails({ ...propertyDetails, image: e.target.files[0] });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Upload Property Image</h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="text-gray-500 mb-2">
          <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex text-sm text-gray-600 justify-center">
          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
            <span>Upload a file</span>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="sr-only"
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
      </div>

      {propertyDetails.image && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Selected file: {propertyDetails.image.name}</p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button
          onClick={prevStep}
          variant="none"
        >
          Back
        </Button>
        <Button
            onClick={nextStep}
            variant="next"
        >
          Next
        </Button>
      </div>
    </div>
  );
};