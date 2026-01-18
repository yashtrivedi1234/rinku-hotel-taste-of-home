import { useState, useEffect } from "react";
import { ReviewCard, Review } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import ScrollReveal from "./ScrollReveal";
import StaggerContainer from "./StaggerContainer";
import { MessageSquarePlus } from "lucide-react";

const defaultReviews: Review[] = [
  {
    id: "1",
    name: "Priya Sharma",
    rating: 5,
    comment: "Absolutely love the butter chicken here! The flavors are authentic and remind me of my grandmother's cooking. The staff is incredibly friendly and the ambiance is perfect for family dinners.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    name: "Rahul Patel",
    rating: 4,
    comment: "Great biryani with perfect spices. The portion sizes are generous and the prices are reasonable. Will definitely come back for more!",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    name: "Anita Desai",
    rating: 5,
    comment: "The best Indian restaurant in town! Tried the paneer tikka and dal makhani - both were exceptional. The gulab jamun for dessert was the perfect ending to a wonderful meal.",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const STORAGE_KEY = "rinku-hotel-reviews";

export function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setReviews([...parsed, ...defaultReviews]);
      } catch {
        setReviews(defaultReviews);
      }
    } else {
      setReviews(defaultReviews);
    }
  }, []);

  const handleSubmitReview = (review: { name: string; comment: string; rating: number }) => {
    const newReview: Review = {
      id: Date.now().toString(),
      ...review,
      createdAt: new Date().toISOString(),
    };

    const userReviews = reviews.filter((r) => !defaultReviews.find((d) => d.id === r.id));
    const updatedUserReviews = [newReview, ...userReviews];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUserReviews));
    setReviews([newReview, ...reviews]);
  };

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-secondary font-medium tracking-wider uppercase text-sm">
              Testimonials
            </span>
            <h2 className="heading-display text-3xl md:text-4xl mt-2 mb-4">
              What Our Guests Say
            </h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <span className="text-2xl font-bold text-foreground">{averageRating}</span>
              <span>out of 5</span>
              <span className="text-muted-foreground/50">•</span>
              <span>{reviews.length} reviews</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Review Form */}
          <ScrollReveal>
            <div className="bg-card border border-border rounded-xl p-6 shadow-warm-sm h-fit">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquarePlus className="w-5 h-5 text-primary" />
                <h3 className="font-display text-xl font-semibold">Leave a Review</h3>
              </div>
              <ReviewForm onSubmit={handleSubmitReview} />
            </div>
          </ScrollReveal>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            <StaggerContainer className="space-y-4" staggerDelay={0.1}>
              {reviews.slice(0, 6).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
