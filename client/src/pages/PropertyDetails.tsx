import { FaBath, FaBed, FaMapMarkerAlt, FaRulerCombined } from "react-icons/fa";
import { Card } from "../components/ui/PropertyCard";
import { useParams } from "react-router-dom";
import useGetPropertyDetails from "../hooks/useGetPropertyDetails";
import { Spinner } from "../components/ui/Spinner";


const PropertyDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
  const { property, loading, error } = useGetPropertyDetails(id!)

  if (loading) return <Spinner />
  if (error) return <p>Error: {error}</p>;
  if (!property) return <p>No property found.</p>;

  return (
    <section className="container mx-auto px-4 md:px-16 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="rounded-2xl shadow-md w-full object-cover max-h-[500px]"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
          <p className="text-lg text-gray-500 mt-2 flex items-center gap-2">
            <FaMapMarkerAlt className="text-purple-500" /> {property.address}
          </p>

          <p className="text-2xl font-semibold text-purple-600 mt-4">
            ${property.price.toLocaleString()}
          </p>
          <div className="flex flex-wrap gap-6 text-gray-600 mt-6">
            <div className="flex items-center gap-2">
              <FaBed /> {property.beds} Beds
            </div>
            <div className="flex items-center gap-2">
              <FaBath /> {property.baths} Baths
            </div>
            <div className="flex items-center gap-2">
              <FaRulerCombined /> {property.sqft?.toLocaleString()} sqft
            </div>
          </div>
        </div>
      </div>

      <Card className="mt-10 p-6">
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <p className="text-gray-600 leading-relaxed">{property.description}</p>
      </Card>
      <Card className="mt-10 p-6">
        <h2 className="text-xl font-semibold mb-4">Facilities</h2>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
          {property.facilities?.Garden && <li>🌳 Garden</li>}
          {property.facilities?.Parking && <li>🚗 Parking</li>}
        </ul>
      </Card>
    </section>
  );
};

export default PropertyDetails;
