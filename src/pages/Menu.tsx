import { Helmet } from "react-helmet-async";
import { useState } from "react";
import FoodCard from "@/components/FoodCard";

import butterChicken from "@/assets/dish-butter-chicken.jpg";
import samosa from "@/assets/dish-samosa.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import paneer from "@/assets/dish-paneer.jpg";
import naan from "@/assets/dish-naan.jpg";
import tandoori from "@/assets/dish-tandoori.jpg";
import lassi from "@/assets/dish-lassi.jpg";
import dal from "@/assets/dish-dal.jpg";
import gulabJamun from "@/assets/dish-gulab-jamun.jpg";

const menuCategories = [
  { id: "all", name: "All" },
  { id: "starters", name: "Starters" },
  { id: "main", name: "Main Course" },
  { id: "breads", name: "Breads" },
  { id: "rice", name: "Rice & Biryani" },
  { id: "beverages", name: "Beverages" },
  { id: "desserts", name: "Desserts" },
];

const menuItems = [
  // Starters
  {
    id: "samosa",
    category: "starters",
    name: "Crispy Samosa",
    description: "Golden fried pastries stuffed with spiced potatoes and peas, served with mint chutney",
    price: "₹60",
    image: samosa,
    isVeg: true,
  },
  {
    id: "paneer-tikka",
    category: "starters",
    name: "Paneer Tikka",
    description: "Marinated cottage cheese cubes grilled to perfection with spices and vegetables",
    price: "₹220",
    image: paneer,
    isVeg: true,
  },
  {
    id: "tandoori-chicken",
    category: "starters",
    name: "Tandoori Chicken",
    description: "Classic charcoal-grilled chicken marinated in yogurt and aromatic spices",
    price: "₹280",
    image: tandoori,
    isVeg: false,
  },
  // Main Course
  {
    id: "butter-chicken",
    category: "main",
    name: "Butter Chicken",
    description: "Tender chicken in rich, creamy tomato gravy with aromatic spices and butter",
    price: "₹320",
    image: butterChicken,
    isVeg: false,
  },
  {
    id: "paneer-tikka-masala",
    category: "main",
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese cubes in spiced tomato-based curry with cream",
    price: "₹280",
    image: paneer,
    isVeg: true,
  },
  {
    id: "dal-makhani",
    category: "main",
    name: "Dal Makhani",
    description: "Creamy black lentils slow-cooked overnight with butter and aromatic spices",
    price: "₹180",
    image: dal,
    isVeg: true,
  },
  {
    id: "chicken-curry",
    category: "main",
    name: "Chicken Curry",
    description: "Traditional home-style chicken curry with onion-tomato gravy",
    price: "₹260",
    image: butterChicken,
    isVeg: false,
  },
  // Breads
  {
    id: "butter-naan",
    category: "breads",
    name: "Butter Naan",
    description: "Soft leavened bread baked in tandoor and brushed with butter",
    price: "₹40",
    image: naan,
    isVeg: true,
  },
  {
    id: "garlic-naan",
    category: "breads",
    name: "Garlic Naan",
    description: "Fluffy naan topped with minced garlic and fresh coriander",
    price: "₹50",
    image: naan,
    isVeg: true,
  },
  {
    id: "tandoori-roti",
    category: "breads",
    name: "Tandoori Roti",
    description: "Whole wheat bread baked crisp in traditional clay oven",
    price: "₹25",
    image: naan,
    isVeg: true,
  },
  // Rice & Biryani
  {
    id: "hyderabadi-biryani",
    category: "rice",
    name: "Hyderabadi Biryani",
    description: "Fragrant basmati rice layered with spiced meat, saffron, and fried onions",
    price: "₹350",
    image: biryani,
    isVeg: false,
  },
  {
    id: "veg-biryani",
    category: "rice",
    name: "Veg Biryani",
    description: "Aromatic rice with mixed vegetables, paneer, and traditional biryani spices",
    price: "₹250",
    image: biryani,
    isVeg: true,
  },
  {
    id: "jeera-rice",
    category: "rice",
    name: "Jeera Rice",
    description: "Basmati rice tempered with cumin seeds and ghee",
    price: "₹120",
    image: biryani,
    isVeg: true,
  },
  // Beverages
  {
    id: "mango-lassi",
    category: "beverages",
    name: "Mango Lassi",
    description: "Creamy yogurt smoothie blended with fresh mango pulp and cardamom",
    price: "₹80",
    image: lassi,
    isVeg: true,
  },
  {
    id: "sweet-lassi",
    category: "beverages",
    name: "Sweet Lassi",
    description: "Traditional yogurt drink sweetened with sugar and rose water",
    price: "₹60",
    image: lassi,
    isVeg: true,
  },
  {
    id: "masala-chai",
    category: "beverages",
    name: "Masala Chai",
    description: "Spiced Indian tea brewed with ginger, cardamom, and fresh milk",
    price: "₹30",
    image: lassi,
    isVeg: true,
  },
  // Desserts
  {
    id: "gulab-jamun",
    category: "desserts",
    name: "Gulab Jamun",
    description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
    price: "₹80",
    image: gulabJamun,
    isVeg: true,
  },
  {
    id: "rasmalai",
    category: "desserts",
    name: "Rasmalai",
    description: "Soft cottage cheese patties in sweetened, cardamom-flavored milk",
    price: "₹100",
    image: gulabJamun,
    isVeg: true,
  },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = activeCategory === "all"
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Our Menu - Rinku Hotel | Authentic Indian Cuisine</title>
        <meta name="description" content="Explore Rinku Hotel's delicious menu featuring authentic Indian dishes - from crispy samosas to creamy butter chicken, aromatic biryani, and more." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium">Explore Our</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Delicious <span className="text-primary">Menu</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              From appetizing starters to decadent desserts, discover the authentic flavors 
              of India prepared with love and tradition.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-30 bg-background border-b border-border py-4 shadow-warm-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-warm-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Legend */}
          <div className="flex gap-6 mb-8 justify-center">
            <div className="flex items-center gap-2">
              <div className="veg-indicator" />
              <span className="text-sm text-muted-foreground">Vegetarian</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="nonveg-indicator" />
              <span className="text-sm text-muted-foreground">Non-Vegetarian</span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <FoodCard {...item} />
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Special Note */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              Special Dietary Requirements?
            </h3>
            <p className="text-muted-foreground">
              We're happy to accommodate dietary restrictions and allergies. 
              Please inform our staff when ordering, and we'll prepare your meal accordingly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;
