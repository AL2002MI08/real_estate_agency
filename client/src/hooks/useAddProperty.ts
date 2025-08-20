import { useState } from "react";
import axios from "axios";
import { getAuthData } from "../constants/auth";
import { apiUrl } from "../constants/apiUrl";
import type { Property } from "../types/propertyTypes";

interface UseAddPropertyReturn {
  addProperty: (propertyData: Property) => Promise<Property>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

interface ApiError {
  message?: string;
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  request?: unknown;
}

const isApiError = (error: unknown): error is ApiError => {
  return typeof error === 'object' && error !== null;
};

export const useAddProperty = (): UseAddPropertyReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addProperty = async (propertyData: Property) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { token, email } = getAuthData();
      
      const response = await axios.post(
        `${apiUrl}/residency/create`,
         { 
          data: { 
            ...propertyData,
            userEmail: email,
            price: Number(propertyData.price),
            image: propertyData.image
          }
        },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      setSuccess(true);
      return response.data;
      
    } catch (err: unknown) {
      let errorMessage = 'Failed to add property';
      
      if (isApiError(err)) {
        errorMessage = err.response?.data?.message 
          || err.message 
          || errorMessage;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
      
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setSuccess(false);
  };

  return { addProperty, isLoading, error, success, reset };
};