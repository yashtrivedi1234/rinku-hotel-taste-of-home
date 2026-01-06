import { Helmet } from "react-helmet-async";
import { Phone, Clock, Users, CalendarDays, Utensils, Star } from "lucide-react";
import ReservationForm from "@/components/ReservationForm";

const Reservations = () => {
  return (
    <>
      <Helmet>
        <title>Book a Table - Rinku Hotel | Online Reservation</title>
        <meta 
          name="description" 
          content="Reserve your table at Rinku Hotel. Easy online booking with date and time selection. Perfect for family dinners, celebrations, and special occasions." 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium">Table Reservation</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Book Your <span className="text-primary">Table</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Reserve your spot for an unforgettable dining experience. 
              Whether it's a romantic dinner or a family celebration, we're ready to welcome you.
            </p>
          </div>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-warm-lg border border-border">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Make a Reservation
                </h2>
                <ReservationForm />
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Opening Hours */}
              <div className="bg-card rounded-xl p-6 shadow-warm border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Opening Hours
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Mon - Thu</span>
                    <span>11:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fri - Sat</span>
                    <span>11:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>12:00 PM - 10:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-card rounded-xl p-6 shadow-warm border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Need Help?
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  For large groups (10+) or special events, please call us directly.
                </p>
                <a 
                  href="tel:+919876543210" 
                  className="text-primary font-semibold hover:underline"
                >
                  +91 98765 43210
                </a>
              </div>

              {/* Why Book With Us */}
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Why Book With Us?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <CalendarDays className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Instant confirmation via email</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Accommodate groups of all sizes</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Utensils className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Special menu customization available</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Star className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Preferred seating for regulars</span>
                  </li>
                </ul>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-muted rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  Reservation Policy
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Tables are held for 15 minutes past reservation time</li>
                  <li>• Free cancellation up to 2 hours before</li>
                  <li>• For parties of 6+, a deposit may be required</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Happy Customers Daily</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Tables Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">4.8★</div>
              <div className="text-sm text-muted-foreground">Customer Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">15+</div>
              <div className="text-sm text-muted-foreground">Years of Service</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reservations;
