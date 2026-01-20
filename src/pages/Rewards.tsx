import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Gift, Crown, Star, ShoppingBag, MessageSquare, ArrowRight, Check } from "lucide-react";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";

const tierColors = {
  Bronze: "from-amber-600 to-amber-800",
  Silver: "from-slate-400 to-slate-600",
  Gold: "from-yellow-400 to-yellow-600",
  Platinum: "from-purple-500 to-purple-700",
};

const tierBenefits = {
  Bronze: ["Earn 10 pts per ₹100", "Birthday reward"],
  Silver: ["Earn 12 pts per ₹100", "Birthday reward", "Free delivery on orders over ₹500"],
  Gold: ["Earn 15 pts per ₹100", "Birthday reward", "Free delivery", "Priority support"],
  Platinum: ["Earn 20 pts per ₹100", "Birthday reward", "Free delivery", "Priority support", "Exclusive menu access"],
};

const rewards = [
  { id: 1, name: "Free Samosa", points: 100, description: "Crispy vegetable samosa" },
  { id: 2, name: "Free Lassi", points: 150, description: "Sweet or salted lassi" },
  { id: 3, name: "₹100 Off Order", points: 300, description: "On orders above ₹500" },
  { id: 4, name: "Free Dessert", points: 250, description: "Choice of gulab jamun or kheer" },
  { id: 5, name: "₹250 Off Order", points: 600, description: "On orders above ₹1000" },
  { id: 6, name: "Free Main Course", points: 800, description: "Any main course up to ₹400" },
];

const Rewards = () => {
  const { points, tier, pointsToNextTier, nextTierPoints, transactions, redeemPoints } = useLoyalty();

  const progress = tier === "Platinum" 
    ? 100 
    : ((points - (nextTierPoints - 500)) / 500) * 100;

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (points < reward.points) {
      toast({
        title: "Not enough points",
        description: `You need ${reward.points - points} more points to redeem this reward.`,
        variant: "destructive",
      });
      return;
    }

    const success = redeemPoints(reward.points, `Redeemed: ${reward.name}`);
    if (success) {
      toast({
        title: "Reward Redeemed! 🎉",
        description: `You've redeemed ${reward.name}. Show this at checkout.`,
      });
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Loyalty Rewards - Rinku Hotel</title>
        <meta name="description" content="Earn points on every order and review. Redeem for free food and discounts at Rinku Hotel." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-primary/10 to-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Gift className="w-5 h-5" />
              <span className="font-medium">Loyalty Program</span>
            </motion.div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your Rewards
            </h1>
            <p className="text-lg text-muted-foreground">
              Earn points on every order and review. Redeem for delicious rewards!
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Points Overview */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Points Card */}
            <ScrollReveal className="lg:col-span-1">
              <motion.div
                className={`relative overflow-hidden rounded-2xl p-6 text-white bg-gradient-to-br ${tierColors[tier]}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <Crown className="w-8 h-8 mb-4" />
                <p className="text-white/80 text-sm mb-1">{tier} Member</p>
                <p className="text-4xl font-bold mb-2">{points}</p>
                <p className="text-white/80">Points Available</p>
                
                {tier !== "Platinum" && (
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-sm text-white/80">
                      <span>Progress to next tier</span>
                      <span>{pointsToNextTier} pts</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </ScrollReveal>

            {/* Tier Benefits */}
            <ScrollReveal className="lg:col-span-2" delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    {tier} Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tierBenefits[tier].map((benefit, index) => (
                      <motion.li
                        key={benefit}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-foreground">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How to Earn */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              How to Earn Points
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <ScrollReveal delay={0.1}>
              <Card className="text-center p-6">
                <ShoppingBag className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Order Food</h3>
                <p className="text-muted-foreground mb-3">Earn 10 points for every ₹100 spent</p>
                <p className="text-2xl font-bold text-primary">10 pts / ₹100</p>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="text-center p-6">
                <MessageSquare className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Write Reviews</h3>
                <p className="text-muted-foreground mb-3">Share your experience and earn</p>
                <p className="text-2xl font-bold text-accent">25 pts / review</p>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Available Rewards */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Redeem Rewards
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward, index) => (
              <ScrollReveal key={reward.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -4 }}>
                  <Card className={`h-full ${points >= reward.points ? '' : 'opacity-60'}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-display font-bold text-foreground">{reward.name}</h3>
                          <p className="text-sm text-muted-foreground">{reward.description}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm">
                          {reward.points} pts
                        </span>
                      </div>
                      <Button
                        variant={points >= reward.points ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={() => handleRedeem(reward)}
                        disabled={points < reward.points}
                      >
                        {points >= reward.points ? (
                          <>
                            Redeem <ArrowRight className="w-4 h-4 ml-1" />
                          </>
                        ) : (
                          `Need ${reward.points - points} more pts`
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Transaction History */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Points History
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                {transactions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No transactions yet. Start ordering to earn points!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {transactions.slice(0, 10).map((txn) => (
                      <div key={txn.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            txn.type === "order" ? "bg-primary/10" :
                            txn.type === "review" ? "bg-accent/10" : "bg-destructive/10"
                          }`}>
                            {txn.type === "order" ? (
                              <ShoppingBag className="w-5 h-5 text-primary" />
                            ) : txn.type === "review" ? (
                              <MessageSquare className="w-5 h-5 text-accent" />
                            ) : (
                              <Gift className="w-5 h-5 text-destructive" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{txn.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(txn.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className={`font-bold ${txn.points > 0 ? "text-accent" : "text-destructive"}`}>
                          {txn.points > 0 ? "+" : ""}{txn.points}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
};

export default Rewards;
