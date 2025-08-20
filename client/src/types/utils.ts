import type { Property } from "./propertyTypes";

export interface NavBarProps {
    onLogout?: () => void;
    loggedIn?: boolean;
    sectionsRef?: Record<string, React.RefObject<HTMLDivElement>>;
}

export interface UploadImageProps {
  prevStep: () => void;
  nextStep: () => void;
  propertyDetails: Property;
  setPropertyDetails: (details: Property) => void;
}

export interface FacilitiesProps {
  prevStep: () => void;
  propertyDetails: Property;
  setPropertyDetails: (details: Property) => void;
  setOpened: (opened: boolean) => void;
  setActiveStep: (step: number) => void;
}