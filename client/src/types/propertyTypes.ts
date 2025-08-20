export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  country: string;
  city: string;
  facilities: {
    Garden?: boolean;
    Parking?: boolean;
    [key: string]: boolean | undefined;
  };
  image: string;
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
  onBookVisit?: (property: Property) => void;
  onToggleFavorite?: (propertyId: string) => void;
  favorites?: Set<string>;
}

export interface FavoritesPageProps {
  userEmail: string;
  allProperties: Property[];
  onViewDetails?: (property: Property) => void;
  onBookVisit?: (property: Property) => void;
  className?: string;
}