
import { useCallback } from "react";
import { FaHeart } from "react-icons/fa";

export interface HeartIconProps {
  propertyId: number;
  isFavorite: boolean;
  onToggleFavorite: (propertyId: number) => void;
  disabled?: boolean;
  className?: string;
}

export const HeartIcon = ({ propertyId, isFavorite, onToggleFavorite, disabled = false }: HeartIconProps) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!disabled) {
      onToggleFavorite(propertyId);
    }
  }, [propertyId, onToggleFavorite, disabled]);

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="absolute top-3 right-3 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 disabled:cursor-default disabled:opacity-50"
    >
      <FaHeart 
        size={16}
        className={`transition-colors duration-200 ${
          disabled 
            ? 'text-gray-400' 
            : isFavorite 
              ? 'text-red-500' 
              : 'text-gray-600 hover:text-red-300'
        }`}
      />
    </button>
  );
};