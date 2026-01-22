import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Copy, Check, Gift, Share2 } from "lucide-react";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import ScrollReveal from "@/components/ScrollReveal";

const ReferralSection = () => {
  const { referralCode, referrals, appliedReferralCode } = useLoyalty();
  const [copied, setCopied] = useState(false);

  const completedReferrals = referrals.filter((r) => r.status === "completed").length;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      toast({
        title: "Code Copied! 📋",
        description: "Share it with friends to earn bonus points.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copy failed",
        description: "Please copy the code manually.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    const shareText = `Use my referral code ${referralCode} at Rinku Hotel and we both get bonus points! 🍛`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Rinku Hotel Rewards",
          text: shareText,
          url: window.location.origin,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopyCode();
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Refer Friends & Earn
          </h2>
          <p className="text-muted-foreground mt-2">
            Share your code and earn 100 points when friends place their first order
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Your Referral Code */}
          <ScrollReveal delay={0.1}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-primary" />
                  Your Referral Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      value={referralCode}
                      readOnly
                      className="text-center font-mono text-lg font-bold tracking-wider bg-muted"
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyCode}
                      className="shrink-0"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-accent" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </motion.div>
                </div>

                <Button variant="default" className="w-full" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Friends
                </Button>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Successful Referrals</span>
                    <span className="font-bold text-foreground">{completedReferrals}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Points Earned</span>
                    <span className="font-bold text-accent">{completedReferrals * 100} pts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* How It Works */}
          <ScrollReveal delay={0.2}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-accent" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Share Your Code</p>
                      <p className="text-sm text-muted-foreground">
                        Send your referral code to friends and family
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Friend Orders</p>
                      <p className="text-sm text-muted-foreground">
                        They apply your code at checkout and get 50 pts
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <span className="text-accent font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">You Earn 100 Points!</p>
                      <p className="text-sm text-muted-foreground">
                        Get bonus points when they complete their first order
                      </p>
                    </div>
                  </motion.div>
                </div>

                {appliedReferralCode && (
                  <div className="mt-6 p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-sm text-muted-foreground">
                        You joined with code:{" "}
                        <span className="font-mono font-bold text-foreground">
                          {appliedReferralCode}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ReferralSection;