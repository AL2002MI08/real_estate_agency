import { useState, useCallback } from "react";
import { UploadImage } from "./UploadImage";
import { AddLocation } from "./AddLocation";
import { BasicDetails } from "./BasicDetails";
import { Facilities } from "./Facilities";
import type { Property } from "../types/propertyTypes";
import Button from "./ui/Button";
import { useAddProperty } from "../hooks/useAddProperty";

interface AddPropertyModalProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

const STEPS = [
  { number: 1, title: "Location", subtitle: "Address" },
  { number: 2, title: "Images", subtitle: "Upload" },
  { number: 3, title: "Basics", subtitle: "Details" },
  { number: 4, title: "Facilities", subtitle: "" }
];

export const AddPropertyModal = ({ opened, setOpened }: AddPropertyModalProps) => {
  const [active, setActive] = useState(0);
  const { addProperty, isLoading, reset } = useAddProperty();

  const getInitialPropertyState = useCallback((): Property => ({
    title: "",
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: "",
    facilities: { bedrooms: 0, parkings: 0, bathrooms: 0 },
    userEmail: "",
  }), []);

  const [propertyDetails, setPropertyDetails] = useState<Property>(getInitialPropertyState);

  const nextStep = () => setActive(current => Math.min(current + 1, 4));
  const prevStep = () => setActive(current => Math.max(current - 1, 0));

  const submitProperty = async () => {
    try {
      await addProperty(propertyDetails);
      setActive(4);
    } catch (error) {
      console.error("Property submission failed:", error);
    }
  };

  const handleClose = useCallback(() => {
    setOpened(false);
    setActive(0);
    reset();
    setPropertyDetails(getInitialPropertyState);
  }, [setOpened, reset, getInitialPropertyState]);

  if (!opened) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Add New Property</h2>
          <Button variant="icon" onClick={handleClose}>&times;</Button>
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="flex justify-between mb-8 relative">
            {STEPS.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  active >= index ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.number}
                </div>
                <div className="mt-2 text-sm font-medium">{step.title}</div>
                {step.subtitle && <div className="text-xs text-gray-500">{step.subtitle}</div>}
              </div>
            ))}
          </div>

          {active === 0 && (
            <AddLocation nextStep={nextStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />
          )}
          {active === 1 && (
            <UploadImage prevStep={prevStep} nextStep={nextStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />
          )}
          {active === 2 && (
            <BasicDetails prevStep={prevStep} nextStep={nextStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />
          )}
          {active === 3 && (
            <Facilities prevStep={prevStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} onSubmit={submitProperty} isSubmitting={isLoading} />
          )}
          {active === 4 && (
            <SuccessScreen />
          )}
        </div>
      </div>
    </div>
  );
};

const SuccessScreen = () => (
  <div className="text-center py-8">
    <div className="text-green-500 text-5xl mb-4">✓</div>
    <h3 className="text-xl font-semibold mb-2">Completed!</h3>
    <p className="text-gray-600 mb-6">Your property has been successfully added!</p>
  </div>
);