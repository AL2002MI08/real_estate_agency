import { useState } from "react";
import axios from "axios";

interface UploadResult {
  url: string;
  public_id: string;
}

interface UseCloudinaryUploadReturn {
  uploadImage: (file: File) => Promise<UploadResult>;
  isLoading: boolean;
  error: string | null;
  progress: number;
}

export const useImageUpload = (): UseCloudinaryUploadReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (file: File): Promise<UploadResult> => {
    setIsLoading(true);
    setError(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            }
          },
        }
      );

      setProgress(100);

      return {
        url: response.data.secure_url,
        public_id: response.data.public_id,
      };
    } catch (err: unknown) {
      const errorMessage = (err as Error).message || "Upload failed";

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadImage,
    isLoading,
    error,
    progress,
  };
};
