import { useNavigate } from "react-router-dom";
import Properties from "../components/ui/Properties";
import useGetResidencies from "../hooks/useGetResidencies";
import type { Property } from "../types/propertyTypes";

const Residencies: React.FC = () => {
  const { loading, residencies, error } = useGetResidencies();
  const navigate = useNavigate();

  return (
    <Properties
      title="All Our Properties"
      properties={residencies}
      enableFavorites={true}
      enableBookings={true}
      loading={loading}           
      error={error}  
      onViewDetails={(property: Property) => navigate(`/residencies/${property.id}`)}
    />
  );
};

export default Residencies;
