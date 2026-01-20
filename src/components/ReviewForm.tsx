import { useState } from "react";
import { z } from "zod";
import { StarRating } from "./StarRating";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { Send, Gift } from "lucide-react";

const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
  comment: z.string().min(10, "Review must be at least 10 characters").max(500, "Review is too long"),
  rating: z.number().min(1, "Please select a rating").max(5),
});

interface ReviewFormProps {
  onSubmit: (review: { name: string; comment: string; rating: number }) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<{ name?: string; comment?: string; rating?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { addPoints } = useLoyalty();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = reviewSchema.safeParse({ name, comment, rating });

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof errors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    onSubmit({ name, comment, rating });
    
    // Award loyalty points for review
    addPoints(25, "review", "Review submitted");
    
    toast({
      title: "Thank you for your review! ⭐",
      description: "Your feedback helps us serve you better. You earned 25 loyalty points!",
    });

    setName("");
    setComment("");
    setRating(0);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg text-sm text-accent mb-4">
        <Gift className="w-4 h-4" />
        <span>Earn 25 loyalty points for submitting a review!</span>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Your Rating
        </label>
        <StarRating rating={rating} onRatingChange={setRating} size="lg" />
        {errors.rating && (
          <p className="text-destructive text-sm mt-1">{errors.rating}</p>
        )}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Your Name
        </label>
        <Input
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-destructive text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-2">
          Your Review
        </label>
        <Textarea
          id="comment"
          placeholder="Share your experience with us..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className={errors.comment ? "border-destructive" : ""}
        />
        {errors.comment && (
          <p className="text-destructive text-sm mt-1">{errors.comment}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Submit Review
          </>
        )}
      </Button>
    </form>
  );
}
