import { useCallback } from "react";
import { Card } from "./PropertyCard";
import { HeartIcon } from "./HeartIcon";
import { FaBath, FaBed, FaMapMarkerAlt, FaRulerCombined } from "react-icons/fa";
import Button from "../ui/Button";
import type { Property, PropertyComponentProps } from "../../types/propertyTypes";
import { Spinner } from "./Spinner";
import useFavoriteResidency from "../../hooks/useFavorite";


const Properties: React.FC<PropertyComponentProps> = ({
  title = "All Properties",
  subtitle = "Discover our extensive collection of properties carefully selected for you.",
  showPopularLabel = false,
  enableFavorites = true,
  properties = [],
  className = "",
  loading = false,
  error = null,
  onViewDetails,
}) => {
  const { favorites, isFavorite, toggleFavorite, loading: favoritesLoading } = useFavoriteResidency();

  const handleToggleFavorite = useCallback((propertyId: number) => {
    toggleFavorite(propertyId);
  }, [toggleFavorite]);

  const handleViewDetails = useCallback((property: Property) => {
    if (onViewDetails) onViewDetails(property);
  }, [onViewDetails]);


  const isLoading = loading || favoritesLoading;

  if (isLoading) return <div className={`py-12 ${className}`}><Spinner /></div>;

  if (error) return (
    <div className={`py-12 ${className}`}>
      <div className="flex justify-center items-center h-64 text-red-500 text-center">
        <p>Error loading properties</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    </div>
  );

  if ((!properties || properties.length === 0) && (!favorites || favorites.length === 0)) {
    return (
      <div className={`py-12 ${className}`}>
        <div className="flex justify-center items-center h-64 text-gray-500 text-center">
          <p>No properties available</p>
        </div>
      </div>
    );
  }

  const displayedProperties = properties.length > 0 ? properties : favorites;

  return (
    <section className={`py-12 bg-gray-50 ${className}`}>
      <div className="pb-10 text-center">
        <h1 className="text-2xl font-bold pb-3">{showPopularLabel ? "Popular Residencies" : title}</h1>
        <p className="text-gray-500 text-wrap max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="container mx-auto px-4 md:px-16 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {displayedProperties.map((property: Property) => (
          <Card key={property.id} className="hover:shadow-xl transition-shadow duration-300">
            <Card.Header>
            <img src={typeof property.image === 'string' ? property.image : URL.createObjectURL(property.image)} alt={property.title} className="w-full h-full object-cover" />
              <HeartIcon
                propertyId={property.id ?? 0}
                isFavorite={isFavorite(property.id?? 0)}
                onToggleFavorite={handleToggleFavorite}
                disabled={!enableFavorites}
              />
            </Card.Header>

            <Card.Content>
              <Card.Title className="text-gray-700 flex items-center justify-between">
                <span>{property.title}</span>
                <span className="text-purple-600 font-bold">{property.price}</span>
              </Card.Title>

              <Card.Description className="flex items-center gap-2 text-gray-500 mt-2">
                <FaMapMarkerAlt className="text-xs" />{property.address}
              </Card.Description>

              <div className="flex items-center gap-4 text-gray-400 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <FaBed className="text-xs" />
                  {property.facilities?.bedrooms || 0} beds
                </div>
                <div className="flex items-center gap-1">
                  <FaBath className="text-xs" />
                  {property.facilities?.bathrooms || 0} baths
                </div>
                <div className="flex items-center gap-1">
                  <FaRulerCombined className="text-xs" />
                  {property.facilities?.parkings || 0} parking
                </div>
              </div>
            </Card.Content>

            <Card.Footer>
              <Button variant="primary" onClick={() => handleViewDetails(property)}>View Details</Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Properties;
