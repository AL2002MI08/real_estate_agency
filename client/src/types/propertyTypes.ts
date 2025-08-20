export interface Property {
  id?: number;
  title: string;
  description: string;
  price: number;
  address: string;
  country: string;
  city: string;
  facilities: {
    Garden?: boolean;
    Parking?: string | number;
    bathrooms?: number;
    bedrooms?: number;
    [key: string]: boolean | undefined | number | string;
  };
  image: string | File;
  userEmail?: string;
  featured?: boolean;
  beds?: number;
  baths?: number;
  sqft?: number;
}

export interface PropertyComponentProps {
  title?: string;
  subtitle?: string;
  showPopularLabel?: boolean;
  enableFavorites?: boolean;
  enableBookings?: boolean;
  properties?: Property[];
  className?: string;
  loading?: boolean;
  error?: string | null;
  onViewDetails?: (property: Property) => void;
  onToggleFavorite?: (propertyId?: string) => void;
  favorites?: Set<string>;
}

export interface FavoritesPageProps {
  userEmail: string;
  allProperties: Property[];
  onViewDetails?: (property: Property) => void;
  onBookVisit?: (property: Property) => void;
  className?: string;
}