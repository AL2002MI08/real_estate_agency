import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../constants/apiUrl";
import type { Property } from "../types/propertyTypes";
import { getAuthData } from "../constants/auth";

export const getAllFavoritesAPI = async (): Promise<Property[]> => {
  const {token} = getAuthData();

  const response = await axios.get(`${apiUrl}/user/allFav`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const addToFavAPI = async (residencyId: number) => {
  const { token, email } = getAuthData();
  const response = await axios.post(
    `${apiUrl}/user/toFav/${residencyId}`,
    { email },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
export default function useFavoriteResidency() {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    } else {
      console.warn("User email not found");
    }
  }, []);

  const fetchFavorites = useCallback(async () => {
    if (!userEmail) {
      return;
    }

    const { token } = getAuthData();
    if (!token) {
      setError("Please log in to view favorites");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const favProperties = await getAllFavoritesAPI();
      setFavorites(favProperties);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.warn("Axios Error Response:", err.response?.data);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
        } else {
          setError(err.message || "Failed to fetch favorites");
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  const toggleFavorite = useCallback(
    async (residencyId: number) => {
      if (!userEmail) {
        toast.error("Please log in to manage favorites");
        return;
      }

      const { token } = getAuthData();
      if (!token) {
        toast.error("Session expired. Please log in again.");
        return;
      }

      const numericId = Number(residencyId);
      const isCurrentlyFavorite = favorites.some((f) => f.id === numericId);

      try {
        await addToFavAPI(residencyId);

        await fetchFavorites();

        toast.success(
          isCurrentlyFavorite
            ? "Residency removed from favorites"
            : "Residency added to favorites ❤️"
        );
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            toast.error("Session expired. Please log in again.");
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
          } else {
            toast.error(err.message || "Failed to update favorites");
          }
        } else {
          toast.error("Failed to update favorites");
        }
        console.error("Toggle favorite error:", err);
      }
    },
    [userEmail, favorites, fetchFavorites]
  );

  const isFavorite = useCallback(
    (residencyId: number) => favorites.some((f) => f.id === residencyId),
    [favorites]
  );

  useEffect(() => {
    if (userEmail) {
      fetchFavorites();
    }
  }, [userEmail, fetchFavorites]);

  return {
    favorites,
    loading,
    error,
    userEmail,
    toggleFavorite,
    isFavorite,
    refetchFavorites: fetchFavorites,
  };
}
