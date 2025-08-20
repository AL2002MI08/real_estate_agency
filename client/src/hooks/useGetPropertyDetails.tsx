import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../constants/apiUrl";
import type { Property } from "../types/propertyTypes";

export default function useGetPropertyDetails(id: string) {
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Property ID is required");
      return;
    }

    const fetchProperty = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${apiUrl}/residency/${id}`);
        setProperty(res.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.message || "Failed to fetch property");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { loading, property, error };
}
