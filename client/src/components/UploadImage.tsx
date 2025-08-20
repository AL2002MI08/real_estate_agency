import { useState } from "react";
import Button from "./ui/Button";
import { useImageUpload } from "../hooks/useUploadImage";
import type { UploadImageProps } from "../types/utils";


export const UploadImage = ({ 
  prevStep, 
  nextStep, 
  propertyDetails, 
  setPropertyDetails 
}: UploadImageProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadImage, isLoading, error, progress } = useImageUpload()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const result = await uploadImage(selectedFile);
      setPropertyDetails({ 
        ...propertyDetails, 
        image: result.url
      });
      nextStep();
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
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
              disabled={isLoading}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
      </div>
      {isLoading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Uploading... {progress}%</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="text-sm">Error: {error}</p>
        </div>
      )}
      {selectedFile && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Selected file:</p>
              <p className="text-sm text-gray-600">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={handleRemoveImage}
              className="text-red-500 hover:text-red-700 text-sm"
              disabled={isLoading}
            >
              Remove
            </button>
          </div>
          <div className="mt-3">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              className="max-h-40 max-w-full rounded object-cover"
            />
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button
          onClick={prevStep}
          variant="none"
          disabled={isLoading}
        >
          Back
        </Button>
        
        <Button
          onClick={handleUpload}
          variant="next"
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload & Continue'}
        </Button>
      </div>
    </div>
  );
};