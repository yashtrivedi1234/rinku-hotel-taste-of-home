import { ReactNode } from "react";
import { Clock, Percent } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

interface OfferCardProps {
  title: string;
  description: string;
  originalPrice?: string;
  offerPrice: string;
  discount?: string;
  image: string;
  badge?: string;
  badgeColor?: "primary" | "secondary" | "accent";
  endDate?: Date;
  children?: ReactNode;
}

const OfferCard = ({
  title,
  description,
  originalPrice,
  offerPrice,
  discount,
  image,
  badge,
  badgeColor = "primary",
  endDate,
}: OfferCardProps) => {
  const badgeClasses = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
  };

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-warm-md hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

        {/* Badge */}
        {badge && (
          <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-semibold ${badgeClasses[badgeColor]}`}>
            {badge}
          </div>
        )}

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full flex items-center gap-1">
            <Percent className="w-4 h-4" />
            <span className="font-bold">{discount}</span>
          </div>
        )}

        {/* Price on Image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            {originalPrice && (
              <span className="text-primary-foreground/70 line-through text-sm mr-2">
                {originalPrice}
              </span>
            )}
            <span className="text-primary-foreground font-display text-2xl font-bold">
              {offerPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Countdown Timer */}
        {endDate && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-primary mb-3">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Offer ends in:</span>
            </div>
            <CountdownTimer targetDate={endDate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferCard;
