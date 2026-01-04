import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  review: string;
  rating: number;
  image?: string;
}

const TestimonialCard = ({ name, review, rating, image }: TestimonialCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-warm-sm relative">
      {/* Quote Icon */}
      <div className="absolute -top-4 left-6 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
        <Quote className="w-4 h-4 text-primary-foreground fill-current" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4 pt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-secondary fill-secondary" : "text-muted"
            }`}
          />
        ))}
      </div>

      {/* Review */}
      <p className="text-muted-foreground mb-6 leading-relaxed">
        "{review}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-display font-bold text-lg">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">Food Lover</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
