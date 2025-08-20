import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { apiUrl } from "../constants/apiUrl";
import type { Property } from "../types/propertyTypes";

export default function useGetResidencies() {
  const [loading, setLoading] = useState(false);
  const [residencies, setResidencies] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getResidencies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/residency/allresidencies`);
      setResidencies(res.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.message || "Failed to fetch residencies");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    getResidencies(); 
  }, [getResidencies]);

  return { loading, residencies, error, refetch: getResidencies };
}
