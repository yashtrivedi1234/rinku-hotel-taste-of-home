import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, CreditCard, Wallet, Banknote, Users, Check, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCart } from "@/contexts/CartContext";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { toast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";

const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .min(10, { message: "Please enter a valid phone number" })
    .max(15, { message: "Phone number is too long" })
    .regex(/^[0-9+\-\s()]+$/, { message: "Please enter a valid phone number" }),
  address: z
    .string()
    .trim()
    .min(10, { message: "Please enter a complete address" })
    .max(500, { message: "Address must be less than 500 characters" }),
  paymentMethod: z.enum(["cod", "upi", "card"], {
    required_error: "Please select a payment method",
  }),
  notes: z
    .string()
    .max(500, { message: "Notes must be less than 500 characters" })
    .optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { addPoints, applyReferralCode, appliedReferralCode, referralCode } = useLoyalty();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [referralInput, setReferralInput] = useState("");
  const [referralApplied, setReferralApplied] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "cod",
      notes: "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const generatedOrderNumber = `RH${Date.now().toString().slice(-8)}`;
    setOrderNumber(generatedOrderNumber);

    // Award loyalty points (10 points per ₹100)
    const earnedPoints = Math.floor(totalPrice / 100) * 10;
    if (earnedPoints > 0) {
      addPoints(earnedPoints, "order", `Order #${generatedOrderNumber}`);
    }

    console.log("Order placed:", { ...data, items, totalPrice });

    toast({
      title: "Order Placed Successfully! 🎉",
      description: `Your order #${generatedOrderNumber} has been confirmed.${earnedPoints > 0 ? ` You earned ${earnedPoints} loyalty points!` : ""}`,
    });

    clearCart();
    setIsSubmitting(false);
    setIsOrderPlaced(true);
  };

  if (isOrderPlaced) {
    return (
      <PageTransition>
        <Helmet>
          <title>Order Confirmed - Rinku Hotel</title>
        </Helmet>

        <section className="min-h-screen pt-32 pb-16 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-lg mx-auto text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-12 h-12 text-accent" />
              </motion.div>
              <motion.h1 
                className="font-display text-3xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Order Confirmed!
              </motion.h1>
              <motion.p 
                className="text-muted-foreground mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Thank you for your order. Your order number is:
              </motion.p>
              <motion.p 
                className="text-2xl font-bold text-primary mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                #{orderNumber}
              </motion.p>
              <motion.p 
                className="text-muted-foreground mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                We've sent a confirmation email with your order details. 
                Your delicious food will be on its way soon!
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link to="/menu">
                  <Button variant="hero" size="lg">
                    Order More
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" size="lg">
                    Back to Home
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    );
  }

  if (items.length === 0) {
    return (
      <PageTransition>
        <Helmet>
          <title>Checkout - Rinku Hotel</title>
        </Helmet>

        <section className="min-h-screen pt-32 pb-16 bg-muted">
          <div className="container mx-auto px-4">
            <ScrollReveal className="max-w-lg mx-auto text-center">
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-muted-foreground mb-8">
                Add some delicious items from our menu to get started!
              </p>
              <Link to="/menu">
                <Button variant="hero" size="lg">
                  Browse Menu
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Checkout - Rinku Hotel | Complete Your Order</title>
        <meta
          name="description"
          content="Complete your food order from Rinku Hotel. Fast delivery and multiple payment options available."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 bg-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Menu
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Checkout
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <ScrollReveal className="lg:col-span-2" animation="fadeRight">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-warm border border-border">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">
                  Delivery Details
                </h2>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+91 98765 43210"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your complete address including landmark..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Payment Method */}
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                            >
                              <motion.label
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  field.value === "cod"
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <RadioGroupItem value="cod" />
                                <Banknote className="w-5 h-5 text-accent" />
                                <span className="font-medium">Cash on Delivery</span>
                              </motion.label>

                              <motion.label
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  field.value === "upi"
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <RadioGroupItem value="upi" />
                                <Wallet className="w-5 h-5 text-primary" />
                                <span className="font-medium">UPI</span>
                              </motion.label>

                              <motion.label
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  field.value === "card"
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <RadioGroupItem value="card" />
                                <CreditCard className="w-5 h-5 text-secondary" />
                                <span className="font-medium">Card</span>
                              </motion.label>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any special instructions for delivery..."
                              rows={2}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Referral Code Section */}
                    {!appliedReferralCode && !referralApplied && (
                      <div className="p-4 rounded-xl border-2 border-dashed border-border bg-muted/50">
                        <div className="flex items-center gap-2 mb-3">
                          <Tag className="w-5 h-5 text-primary" />
                          <span className="font-medium text-foreground">Have a referral code?</span>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter code (e.g. RINKUAB123)"
                            value={referralInput}
                            onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
                            className="font-mono tracking-wider"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              if (!referralInput) {
                                toast({
                                  title: "Enter a code",
                                  description: "Please enter a referral code first.",
                                  variant: "destructive",
                                });
                                return;
                              }
                              if (referralInput === referralCode) {
                                toast({
                                  title: "Invalid code",
                                  description: "You can't use your own referral code.",
                                  variant: "destructive",
                                });
                                return;
                              }
                              const success = applyReferralCode(referralInput, form.getValues("email") || "guest");
                              if (success) {
                                setReferralApplied(true);
                                toast({
                                  title: "Referral Applied! 🎉",
                                  description: "You've earned 50 bonus points!",
                                });
                              } else {
                                toast({
                                  title: "Couldn't apply code",
                                  description: "You may have already used a referral code.",
                                  variant: "destructive",
                                });
                              }
                            }}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    )}

                    {(appliedReferralCode || referralApplied) && (
                      <motion.div
                        className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Referral bonus applied!</p>
                          <p className="text-sm text-muted-foreground">You received 50 bonus points</p>
                        </div>
                      </motion.div>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Button
                        type="submit"
                        variant="hero"
                        size="xl"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Placing Order..." : `Place Order • ₹${totalPrice}`}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </div>
            </ScrollReveal>

            {/* Order Summary */}
            <ScrollReveal animation="fadeLeft" delay={0.2}>
              <div className="bg-card rounded-2xl p-6 shadow-warm border border-border sticky top-24">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item, index) => (
                    <motion.div 
                      key={item.id} 
                      className="flex gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-1">
                          <div
                            className={
                              item.isVeg ? "veg-indicator" : "nonveg-indicator"
                            }
                            style={{ width: "8px", height: "8px" }}
                          />
                          <span className="text-muted-foreground text-xs">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="font-medium text-sm">
                        ₹{item.price * item.quantity}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-accent font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">₹{totalPrice}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Estimated delivery: 30-45 minutes
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Checkout;
