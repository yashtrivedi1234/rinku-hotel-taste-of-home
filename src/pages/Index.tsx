import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Award, Heart, Sparkles, Percent, Flame } from "lucide-react";
import FoodCard from "@/components/FoodCard";
import TestimonialCard from "@/components/TestimonialCard";
import CountdownTimer from "@/components/CountdownTimer";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer from "@/components/StaggerContainer";

import heroImage from "@/assets/hero-food.jpg";
import butterChicken from "@/assets/dish-butter-chicken.jpg";
import samosa from "@/assets/dish-samosa.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import paneer from "@/assets/dish-paneer.jpg";

// End of day for countdown
const today = new Date();
const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999);

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
    <PageTransition>
      <Helmet>
        <title>Rinku Hotel - Authentic Indian Restaurant | Taste That Feels Like Home</title>
        <meta name="description" content="Experience authentic Indian cuisine at Rinku Hotel. Fresh ingredients, traditional recipes, and warm hospitality. Visit us for the best butter chicken, biryani, and more!" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center py-32">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Welcome to Our Kitchen
            </motion.span>
            <motion.h1 
              className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Taste That Feels{" "}
              <span className="text-secondary">Like Home</span>
            </motion.h1>
            <motion.p 
              className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Experience the rich flavors of authentic Indian cuisine, crafted with fresh ingredients 
              and served with love at Rinku Hotel.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
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
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
        >
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-primary-foreground rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <span className="text-primary font-medium">Our Specials</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              Featured Dishes
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Discover our most loved dishes, prepared with authentic recipes and the finest ingredients.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish) => (
              <FoodCard key={dish.name} {...dish} />
            ))}
          </StaggerContainer>

          <ScrollReveal className="text-center mt-10" delay={0.3}>
            <Link to="/menu">
              <Button variant="outline" size="lg">
                View Full Menu
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <span className="text-primary font-medium">Why Rinku Hotel</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              What Makes Us Special
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.15}>
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="bg-card rounded-xl p-6 text-center shadow-warm-sm hover:shadow-warm-md transition-shadow duration-300"
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
          </StaggerContainer>
        </div>
      </section>

      {/* Special Offers Teaser */}
      <section className="py-16 bg-secondary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <ScrollReveal animation="fadeRight">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <Flame className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-sm">Hot Deals Today</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Special <span className="text-primary">Offers</span> & Deals
              </h2>
              <p className="text-muted-foreground mb-6">
                Don't miss our daily specials, combo meals, and seasonal promotions. 
                Save big while enjoying authentic Indian cuisine!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/offers">
                  <Button variant="hero" size="lg">
                    <Percent className="w-4 h-4" />
                    View All Offers
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeLeft" delay={0.2}>
              <div className="bg-card rounded-2xl p-6 shadow-warm-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Today's Special</p>
                    <p className="text-sm text-muted-foreground">Limited time only!</p>
                  </div>
                </div>
                
                <div className="flex gap-4 mb-4">
                  <img 
                    src={biryani} 
                    alt="Biryani Deal" 
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Biryani Feast Combo
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Biryani + Raita + Salan + Dessert
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground line-through text-sm">₹450</span>
                      <span className="text-primary font-bold text-xl">₹299</span>
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                        33% OFF
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2 text-center">Offer ends in:</p>
                  <CountdownTimer targetDate={endOfDay} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <span className="text-primary font-medium">Testimonials</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              What Our Guests Say
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Opening Hours Banner */}
      <ScrollReveal>
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
      </ScrollReveal>
    </PageTransition>
  );
};

export default Index;
