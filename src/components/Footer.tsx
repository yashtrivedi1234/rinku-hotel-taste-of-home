import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">R</span>
              </div>
              <span className="font-display text-xl font-bold">Rinku Hotel</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6">
              Experience authentic Indian flavors with a modern touch. 
              Where every meal tells a story of tradition and love.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Our Menu", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(" us", "").replace("our ", "").replace(" ", "-")}`}
                    className="text-primary-foreground/70 hover:text-primary transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/70">
                  123, Main Road, Near City Center,<br />
                  Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a 
                  href="tel:+919876543210" 
                  className="text-primary-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-primary-foreground/70">
                  <p>Mon - Sun: 11:00 AM - 11:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Opening Hours</h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-primary-foreground/70">
                <span>Monday - Thursday</span>
                <span>11 AM - 10 PM</span>
              </li>
              <li className="flex justify-between text-primary-foreground/70">
                <span>Friday - Saturday</span>
                <span>11 AM - 11 PM</span>
              </li>
              <li className="flex justify-between text-primary-foreground/70">
                <span>Sunday</span>
                <span>12 PM - 10 PM</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-primary/20 rounded-lg">
              <p className="text-sm text-primary-foreground/80">
                <span className="text-primary font-semibold">Special:</span> Free delivery 
                on orders above ₹500
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Rinku Hotel. All rights reserved.
          </p>
          <p className="text-primary-foreground/50 text-sm">
            Made with ❤️ for food lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
