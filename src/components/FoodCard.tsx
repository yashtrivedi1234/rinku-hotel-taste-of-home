import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

interface FoodCardProps {
  id?: string;
  name: string;
  description: string;
  price: string;
  image: string;
  isVeg: boolean;
  showAddToCart?: boolean;
}

const FoodCard = ({ 
  id, 
  name, 
  description, 
  price, 
  image, 
  isVeg, 
  showAddToCart = true 
}: FoodCardProps) => {
  const { addToCart } = useCart();

  // Parse price string to number (remove ₹ and convert)
  const numericPrice = parseInt(price.replace(/[₹,]/g, ""), 10);

  const handleAddToCart = () => {
    addToCart({
      id: id || `${name}-${numericPrice}`,
      name,
      description,
      price: numericPrice,
      image,
      isVeg,
    });
  };

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

        {/* Quick Add Button */}
        {showAddToCart && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-warm-md"
            aria-label={`Add ${name} to cart`}
          >
            <Plus className="w-5 h-5" />
          </button>
        )}
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
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {description}
        </p>
        
        {showAddToCart && (
          <Button 
            onClick={handleAddToCart} 
            variant="outline" 
            size="sm" 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
