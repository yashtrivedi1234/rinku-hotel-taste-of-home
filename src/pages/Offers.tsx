import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Sparkles, Flame, Gift, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import OfferCard from "@/components/OfferCard";
import CountdownTimer from "@/components/CountdownTimer";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import StaggerContainer from "@/components/StaggerContainer";

import butterChicken from "@/assets/dish-butter-chicken.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import paneer from "@/assets/dish-paneer.jpg";
import tandoori from "@/assets/dish-tandoori.jpg";
import naan from "@/assets/dish-naan.jpg";
import heroFood from "@/assets/hero-food.jpg";

// Calculate dates relative to today
const today = new Date();
const endOfDay = new Date(today);
endOfDay.setHours(23, 59, 59, 999);

const endOfWeek = new Date(today);
endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
endOfWeek.setHours(23, 59, 59, 999);

const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

const seasonalEnd = new Date(today);
seasonalEnd.setDate(today.getDate() + 14);
seasonalEnd.setHours(23, 59, 59, 999);

const dailyDeals = [
  {
    title: "Monday Biryani Bonanza",
    description: "Get our signature Hyderabadi Biryani with a free Raita and Salan",
    originalPrice: "₹400",
    offerPrice: "₹299",
    discount: "25% OFF",
    image: biryani,
    badge: "Monday Special",
    badgeColor: "secondary" as const,
  },
  {
    title: "Tuesday Tandoori Treat",
    description: "Full Tandoori Chicken with butter naan and mint chutney",
    originalPrice: "₹550",
    offerPrice: "₹399",
    discount: "30% OFF",
    image: tandoori,
    badge: "Tuesday Special",
    badgeColor: "secondary" as const,
  },
  {
    title: "Weekend Family Feast",
    description: "Complete meal for 4 with appetizers, main course, breads, and dessert",
    originalPrice: "₹1800",
    offerPrice: "₹1299",
    discount: "28% OFF",
    image: heroFood,
    badge: "Sat-Sun Only",
    badgeColor: "primary" as const,
    endDate: endOfWeek,
  },
];

const comboMeals = [
  {
    title: "Couple's Delight Combo",
    description: "2 Main courses + 4 Naan + 2 Rice + 2 Beverages + 2 Desserts",
    originalPrice: "₹1200",
    offerPrice: "₹849",
    discount: "29% OFF",
    image: butterChicken,
    badge: "Best Value",
    badgeColor: "accent" as const,
  },
  {
    title: "Solo Lunch Special",
    description: "Any main course + Naan or Rice + Beverage + Sweet",
    originalPrice: "₹450",
    offerPrice: "₹299",
    discount: "33% OFF",
    image: paneer,
    badge: "Lunch Only",
    badgeColor: "secondary" as const,
  },
  {
    title: "Bread Basket Combo",
    description: "5 Assorted Naans (Butter, Garlic, Cheese, Tandoori, Plain) + 2 Dips",
    originalPrice: "₹320",
    offerPrice: "₹199",
    discount: "38% OFF",
    image: naan,
    badge: "Popular",
    badgeColor: "primary" as const,
  },
];

const seasonalOffers = [
  {
    title: "Winter Warmth Festival",
    description: "Enjoy our special winter menu featuring rich gravies, hot soups, and warming desserts. Limited time only!",
    originalPrice: "₹800",
    offerPrice: "₹599",
    discount: "25% OFF",
    image: heroFood,
    badge: "Seasonal",
    badgeColor: "accent" as const,
    endDate: seasonalEnd,
  },
  {
    title: "Anniversary Special Thali",
    description: "Celebrating 15 years! Grand thali with 12 items including appetizers, 3 curries, rice, breads, and desserts",
    originalPrice: "₹650",
    offerPrice: "₹450",
    discount: "31% OFF",
    image: heroFood,
    badge: "Limited Time",
    badgeColor: "primary" as const,
    endDate: endOfMonth,
  },
];

const Offers = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Special Offers - Rinku Hotel | Daily Deals & Combos</title>
        <meta name="description" content="Discover amazing deals at Rinku Hotel! Daily specials, combo meals, and seasonal promotions. Save big on authentic Indian cuisine." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTMwIDVhMjUgMjUgMCAxIDAgMCA1MCAyNSAyNSAwIDAgMCAwLTUwem0wIDQ1YTIwIDIwIDAgMSAxIDAtNDAgMjAgMjAgMCAwIDEgMCA0MHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz4KPC9zdmc+')] bg-repeat" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span className="text-primary-foreground font-medium">Limited Time Offers</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Special <span className="text-secondary">Deals</span> & Offers
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Savor the best of Indian cuisine at unbeatable prices. 
              Don't miss our daily specials and combo meals!
            </p>

            {/* Main Countdown */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 inline-block">
              <p className="text-primary-foreground/90 font-medium mb-4">
                Today's Deals End In:
              </p>
              <CountdownTimer targetDate={endOfDay} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Daily Deals */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
              <Flame className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <span className="text-primary font-medium text-sm">Hot Deals</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Daily Specials
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyDeals.map((deal) => (
              <OfferCard key={deal.title} {...deal} />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Combo Meals */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6 text-accent" />
            </div>
            <div>
              <span className="text-primary font-medium text-sm">Value Packs</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Combo Meals
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comboMeals.map((combo) => (
              <OfferCard key={combo.title} {...combo} />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Seasonal Promotions */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="text-primary font-medium text-sm">Don't Miss Out</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Seasonal Promotions
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {seasonalOffers.map((offer) => (
              <OfferCard key={offer.title} {...offer} />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Terms & CTA */}
      <ScrollReveal>
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-warm-sm">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Terms & Conditions
                </h3>
                <ul className="text-muted-foreground text-sm space-y-2 mb-6">
                  <li>• Offers valid for dine-in and takeaway orders only</li>
                  <li>• Cannot be combined with other offers or discounts</li>
                  <li>• Subject to availability; limited quantities per day</li>
                  <li>• Management reserves the right to modify or withdraw offers</li>
                  <li>• Daily deals valid on specific days as mentioned</li>
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                  <Link to="/menu" className="flex-1">
                    <Button variant="outline" size="lg" className="w-full">
                      View Full Menu
                    </Button>
                  </Link>
                  <a href="tel:+919876543210" className="flex-1">
                    <Button variant="hero" size="lg" className="w-full">
                      Order Now
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </PageTransition>
  );
};

export default Offers;
