import React from "react";
import Properties from "../components/ui/Properties";
import useFavoriteResidency from "../hooks/useFavorite";

const FavoritesPage: React.FC = () => {
  const { favorites, loading } = useFavoriteResidency();

  return (
    <div className="min-h-screen bg-gray-50">
      <Properties
        title="Favorites"
        subtitle="Review your favorite properties."
        properties={favorites}
        loading={loading}
        enableFavorites={true}
        enableBookings={true}
        className="pt-8"
      />

      {!loading && favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start exploring properties and add them to your favorites by clicking the heart icon.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Browse Properties
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
