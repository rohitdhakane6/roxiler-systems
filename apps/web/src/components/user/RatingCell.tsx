import { useState, useEffect } from "react";
import { Star } from "lucide-react";

import { useUpdateRating } from "@/hooks/useUser";

interface RatingCellProps {
  storeId: string;
  rating: number;
}

export default function RatingCell({ storeId, rating }: RatingCellProps) {
  const { mutateAsync: updateRating, isPending } = useUpdateRating();
  const [hoveredRating, setHoveredRating] = useState(0);
  const [animatingStars, setAnimatingStars] = useState<number[]>([]);

  // Beat loader animation effect
  useEffect(() => {
    if (isPending) {
      const interval = setInterval(() => {
        setAnimatingStars((prev) => {
          const nextStar = prev.length === 0 ? 1 : Math.max(...prev) + 1;
          if (nextStar > 5) {
            return []; // Reset animation
          }
          return [...prev, nextStar];
        });
      }, 200); // 200ms delay between each star

      return () => clearInterval(interval);
    } else {
      setAnimatingStars([]);
    }
  }, [isPending]);

  const handleStarClick = async (starRating: number) => {
    await updateRating({
      rating: starRating,
      storeId: storeId,
    });
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const displayRating = hoveredRating || rating;

  return (
    <>
      <div className="flex items-center space-x-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1 hover:scale-110 transition-transform"
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
              disabled={isPending}
            >
              <Star
                className={`h-8 w-8 transition-all duration-300 ${
                  isPending && animatingStars.includes(star)
                    ? "fill-yellow-400 text-yellow-400 animate-pulse scale-110"
                    : star <= displayRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
