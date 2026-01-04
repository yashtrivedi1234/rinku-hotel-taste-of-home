interface FoodCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  isVeg: boolean;
}

const FoodCard = ({ name, description, price, image, isVeg }: FoodCardProps) => {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-warm-sm card-hover">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Veg/Non-veg Indicator */}
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm p-1.5 rounded-md">
          <div className={isVeg ? "veg-indicator" : "nonveg-indicator"} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
          <span className="text-primary font-bold whitespace-nowrap">
            {price}
          </span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FoodCard;
