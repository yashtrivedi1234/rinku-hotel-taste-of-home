import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Award, Heart, Sparkles } from "lucide-react";
import FoodCard from "@/components/FoodCard";
import TestimonialCard from "@/components/TestimonialCard";

import heroImage from "@/assets/hero-food.jpg";
import butterChicken from "@/assets/dish-butter-chicken.jpg";
import samosa from "@/assets/dish-samosa.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import paneer from "@/assets/dish-paneer.jpg";

const featuredDishes = [
  {
    name: "Butter Chicken",
    description: "Tender chicken in rich, creamy tomato gravy with aromatic spices",
    price: "₹320",
    image: butterChicken,
    isVeg: false,
  },
  {
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese cubes in spiced tomato-based curry",
    price: "₹280",
    image: paneer,
    isVeg: true,
  },
  {
    name: "Hyderabadi Biryani",
    description: "Fragrant basmati rice layered with spiced meat and saffron",
    price: "₹350",
    image: biryani,
    isVeg: false,
  },
  {
    name: "Crispy Samosa",
    description: "Golden fried pastries stuffed with spiced potatoes and peas",
    price: "₹60",
    image: samosa,
    isVeg: true,
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    review: "The butter chicken here is absolutely divine! It reminds me of my grandmother's cooking. Best Indian food in the city!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    review: "Amazing ambiance and even better food. The biryani is perfectly spiced and the naan is fresh from the tandoor.",
    rating: 5,
  },
  {
    name: "Anjali Patel",
    review: "Such warm hospitality! The staff made us feel like family. Will definitely come back for the paneer tikka.",
    rating: 4,
  },
];

const whyChooseUs = [
  {
    icon: Sparkles,
    title: "Fresh Ingredients",
    description: "We use only the freshest vegetables, spices, and meats sourced daily from local markets.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every dish is prepared with passion and care, just like home-cooked meals.",
  },
  {
    icon: Award,
    title: "Authentic Recipes",
    description: "Traditional recipes passed down through generations, preserving the true taste of India.",
  },
  {
    icon: Clock,
    title: "Quick Service",
    description: "Enjoy hot, freshly prepared meals served promptly without compromising quality.",
  },
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Rinku Hotel - Authentic Indian Restaurant | Taste That Feels Like Home</title>
        <meta name="description" content="Experience authentic Indian cuisine at Rinku Hotel. Fresh ingredients, traditional recipes, and warm hospitality. Visit us for the best butter chicken, biryani, and more!" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center py-32">
          <div className="max-w-3xl mx-auto animate-fade-up">
            <span className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium mb-6">
              Welcome to Our Kitchen
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Taste That Feels{" "}
              <span className="text-secondary">Like Home</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Experience the rich flavors of authentic Indian cuisine, crafted with fresh ingredients 
              and served with love at Rinku Hotel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu">
                <Button variant="hero" size="xl">
                  View Our Menu
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="heroOutline" size="xl">
                  Visit Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Our Specials</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              Featured Dishes
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Discover our most loved dishes, prepared with authentic recipes and the finest ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish) => (
              <FoodCard key={dish.name} {...dish} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/menu">
              <Button variant="outline" size="lg">
                View Full Menu
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Why Rinku Hotel</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              What Makes Us Special
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="bg-card rounded-xl p-6 text-center shadow-warm-sm hover:shadow-warm-md transition-shadow duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Testimonials</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              What Our Guests Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Opening Hours Banner */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTMwIDVhMjUgMjUgMCAxIDAgMCA1MCAyNSAyNSAwIDAgMCAwLTUwem0wIDQ1YTIwIDIwIDAgMSAxIDAtNDAgMjAgMjAgMCAwIDEgMCA0MHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz4KPC9zdmc+')] bg-repeat" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                Visit Us Today!
              </h2>
              <p className="text-primary-foreground/80">
                Open Daily: 11:00 AM - 11:00 PM
              </p>
            </div>
            <div className="flex gap-4">
              <a href="tel:+919876543210">
                <Button variant="secondary" size="lg">
                  Call Now
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="heroOutline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Get Directions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
