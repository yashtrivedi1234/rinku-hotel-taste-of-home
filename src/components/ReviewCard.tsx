import { StarRating } from "./StarRating";
import { formatDistanceToNow } from "date-fns";

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-warm-sm hover:shadow-warm-md transition-shadow duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-lg">
              {review.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{review.name}</h4>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        <StarRating rating={review.rating} readonly size="sm" />
      </div>
      <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
    </div>
  );
}
