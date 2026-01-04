import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { X } from "lucide-react";

import heroFood from "@/assets/hero-food.jpg";
import interiorImage from "@/assets/restaurant-interior.jpg";
import butterChicken from "@/assets/dish-butter-chicken.jpg";
import samosa from "@/assets/dish-samosa.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import paneer from "@/assets/dish-paneer.jpg";
import naan from "@/assets/dish-naan.jpg";
import tandoori from "@/assets/dish-tandoori.jpg";
import lassi from "@/assets/dish-lassi.jpg";
import dal from "@/assets/dish-dal.jpg";
import gulabJamun from "@/assets/dish-gulab-jamun.jpg";

const galleryImages = [
  { src: heroFood, alt: "Traditional Indian Thali", category: "food" },
  { src: interiorImage, alt: "Restaurant Interior", category: "interior" },
  { src: butterChicken, alt: "Butter Chicken", category: "food" },
  { src: biryani, alt: "Hyderabadi Biryani", category: "food" },
  { src: paneer, alt: "Paneer Tikka Masala", category: "food" },
  { src: samosa, alt: "Crispy Samosa", category: "food" },
  { src: naan, alt: "Fresh Naan Bread", category: "food" },
  { src: tandoori, alt: "Tandoori Chicken", category: "food" },
  { src: lassi, alt: "Mango Lassi", category: "food" },
  { src: dal, alt: "Dal Makhani", category: "food" },
  { src: gulabJamun, alt: "Gulab Jamun", category: "food" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<string>("");

  const openLightbox = (src: string, alt: string) => {
    setSelectedImage(src);
    setSelectedAlt(alt);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setSelectedAlt("");
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <Helmet>
        <title>Gallery - Rinku Hotel | Food & Restaurant Photos</title>
        <meta name="description" content="Browse our gallery of mouth-watering dishes and cozy restaurant ambiance at Rinku Hotel. See what awaits you!" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium">Visual Feast</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Our <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              A glimpse into our kitchen, our dishes, and the warm ambiance 
              that awaits you at Rinku Hotel.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-xl"
                onClick={() => openLightbox(image.src, image.alt)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                    <p className="text-primary-foreground font-display text-lg font-semibold">
                      {image.alt}
                    </p>
                    <p className="text-primary-foreground/80 text-sm mt-1">
                      Click to view
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-primary-foreground hover:text-primary transition-colors duration-200"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-5xl max-h-[90vh] animate-scale-in">
            <img
              src={selectedImage}
              alt={selectedAlt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-center text-primary-foreground mt-4 font-display text-lg">
              {selectedAlt}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
