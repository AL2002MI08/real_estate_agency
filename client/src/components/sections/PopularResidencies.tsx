import Properties from "../ui/Properties"
import useGetResidencies from "../../hooks/useGetResidencies"

const PropertiesSection = () => {
    const { loading, residencies, error } = useGetResidencies();
    return (
        <Properties
            title="All Our Properties"
            properties={residencies}
            enableFavorites={false}
            loading={loading}
            error={error}
            onViewDetails={() => { }}
        />
    );
}

export default PropertiesSection
