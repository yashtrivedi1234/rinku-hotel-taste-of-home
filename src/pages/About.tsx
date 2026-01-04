import { Helmet } from "react-helmet-async";
import { Award, Heart, Leaf, Users } from "lucide-react";

import interiorImage from "@/assets/restaurant-interior.jpg";
import heroFood from "@/assets/hero-food.jpg";

const values = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "We source the freshest vegetables, spices, and meats daily from trusted local suppliers, ensuring every dish bursts with authentic flavors.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Our chefs pour their heart into every dish, treating each meal as if they're cooking for their own family.",
  },
  {
    icon: Award,
    title: "Authentic Recipes",
    description: "Time-honored recipes passed down through generations, preserving the true essence of Indian culinary traditions.",
  },
  {
    icon: Users,
    title: "Warm Hospitality",
    description: "Every guest is treated like family. Our service is as warm as our food is flavorful.",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Rinku Hotel | Our Story & Values</title>
        <meta name="description" content="Learn about Rinku Hotel's journey, our commitment to authentic Indian cuisine, fresh ingredients, and warm hospitality. Discover what makes us special." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium">Our Story</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              A Legacy of <span className="text-primary">Flavor</span> & Love
            </h1>
            <p className="text-muted-foreground text-lg">
              Since our humble beginnings, Rinku Hotel has been serving authentic Indian cuisine 
              that brings families together and creates lasting memories.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={interiorImage}
                alt="Rinku Hotel Interior"
                className="rounded-2xl shadow-warm-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-warm-lg hidden md:block">
                <p className="font-display text-3xl font-bold">15+</p>
                <p className="text-sm opacity-90">Years of Service</p>
              </div>
            </div>

            <div>
              <span className="text-primary font-medium">Who We Are</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                From a Small Kitchen to Your Heart
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Rinku Hotel started as a small family-run eatery in the heart of the city, 
                  driven by a simple dream: to serve food that tastes like home. Our founder, 
                  Mr. Rinku Sharma, believed that great food has the power to bring people together.
                </p>
                <p>
                  What began as a 10-table restaurant has now grown into one of the most beloved 
                  dining destinations in the area. But one thing hasn't changed – our commitment 
                  to authentic flavors, fresh ingredients, and warm hospitality.
                </p>
                <p>
                  Every recipe at Rinku Hotel tells a story. From the rich, creamy butter chicken 
                  that's been perfected over decades to the fragrant biryanis that fill our kitchen 
                  with aromas of celebration, each dish carries the love and dedication of our culinary team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Our Values</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-xl p-6 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-primary font-medium">Our Kitchen</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Where Magic Happens
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Step into our kitchen, and you'll find a symphony of sizzling pans, 
                  aromatic spices, and passionate chefs working in perfect harmony. 
                  Our culinary team, led by experienced chefs with decades of expertise, 
                  treats every dish as a work of art.
                </p>
                <p>
                  We maintain the highest standards of hygiene and quality. Our kitchen 
                  is regularly inspected, and we follow strict food safety protocols to 
                  ensure every meal you enjoy is not just delicious but also safe.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="font-display text-2xl font-bold text-primary">100%</p>
                  <p className="text-sm text-muted-foreground">Hygienic</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="font-display text-2xl font-bold text-primary">Fresh</p>
                  <p className="text-sm text-muted-foreground">Daily Prep</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="font-display text-2xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">Dishes</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <img
                src={heroFood}
                alt="Our Kitchen and Food"
                className="rounded-2xl shadow-warm-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
