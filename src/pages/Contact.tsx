import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Rinku Hotel | Visit or Call Us</title>
        <meta name="description" content="Get in touch with Rinku Hotel. Find our location, opening hours, and contact details. Call us or visit our restaurant today!" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium">Get in Touch</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Visit <span className="text-primary">Us</span> Today
            </h1>
            <p className="text-muted-foreground text-lg">
              We'd love to welcome you to Rinku Hotel. Find us, call us, 
              or drop by for an unforgettable dining experience.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Map */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      123, Main Road, Near City Center,<br />
                      Mumbai, Maharashtra 400001, India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a 
                      href="tel:+919876543210" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Opening Hours</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Monday - Thursday: 11:00 AM - 10:00 PM</p>
                      <p>Friday - Saturday: 11:00 AM - 11:00 PM</p>
                      <p>Sunday: 12:00 PM - 10:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="tel:+919876543210" className="flex-1">
                  <Button variant="hero" size="lg" className="w-full">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </Button>
                </a>
                <a 
                  href="https://wa.me/919876543210?text=Hi,%20I%20would%20like%20to%20make%20a%20reservation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="accent" size="lg" className="w-full">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </Button>
                </a>
              </div>

              {/* Special Note */}
              <div className="mt-8 p-6 bg-muted rounded-xl">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Reservations
                </h3>
                <p className="text-muted-foreground text-sm">
                  For large group bookings or special occasions, we recommend calling 
                  ahead to reserve your table. We're happy to customize menus for 
                  private events and celebrations.
                </p>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Find Us
              </h2>
              <div className="rounded-xl overflow-hidden shadow-warm-lg h-[400px] lg:h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.755929055652!2d72.82519831490265!3d19.01784228712693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce5e14a1eeed%3A0x5f5b5d5b0c7c7c7c!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rinku Hotel Location"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Click on the map to open in Google Maps for directions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Ready to Experience Authentic Indian Flavors?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join us for a memorable dining experience. Whether it's a family dinner, 
            a celebration, or a quick lunch, we're here to serve you the best.
          </p>
          <a href="tel:+919876543210">
            <Button variant="secondary" size="xl">
              <Phone className="w-5 h-5" />
              Reserve Your Table
            </Button>
          </a>
        </div>
      </section>
    </>
  );
};

export default Contact;
