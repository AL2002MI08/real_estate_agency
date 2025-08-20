import Properties from "../ui/Properties"
import useGetResidencies from "../../hooks/useGetResidencies"

const PropertiesSection = () => {
    const { loading, residencies, error } = useGetResidencies();
    return (
        <Properties
            title="Popular Residencies"
            subtitle="Discover the most sought-after properties"
            properties={residencies}
            enableFavorites={false}
            loading={loading}
            error={error}
            onViewDetails={() => { }}
        />
    );
}

export default PropertiesSection
