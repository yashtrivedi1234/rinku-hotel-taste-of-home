import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CheckCircle, CreditCard, Wallet, Banknote } from "lucide-react";
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
import { toast } from "@/hooks/use-toast";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

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

    console.log("Order placed:", { ...data, items, totalPrice });

    toast({
      title: "Order Placed Successfully!",
      description: `Your order #${generatedOrderNumber} has been confirmed.`,
    });

    clearCart();
    setIsSubmitting(false);
    setIsOrderPlaced(true);
  };

  if (isOrderPlaced) {
    return (
      <>
        <Helmet>
          <title>Order Confirmed - Rinku Hotel</title>
        </Helmet>

        <section className="min-h-screen pt-32 pb-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-accent" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                Order Confirmed!
              </h1>
              <p className="text-muted-foreground mb-2">
                Thank you for your order. Your order number is:
              </p>
              <p className="text-2xl font-bold text-primary mb-6">
                #{orderNumber}
              </p>
              <p className="text-muted-foreground mb-8">
                We've sent a confirmation email with your order details. 
                Your delicious food will be on its way soon!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Checkout - Rinku Hotel</title>
        </Helmet>

        <section className="min-h-screen pt-32 pb-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
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
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
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
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
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
                              <label
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  field.value === "cod"
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <RadioGroupItem value="cod" />
                                <Banknote className="w-5 h-5 text-accent" />
                                <span className="font-medium">Cash on Delivery</span>
                              </label>

                              <label
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  field.value === "upi"
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <RadioGroupItem value="upi" />
                                <Wallet className="w-5 h-5 text-primary" />
                                <span className="font-medium">UPI</span>
                              </label>

                              <label
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                  field.value === "card"
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <RadioGroupItem value="card" />
                                <CreditCard className="w-5 h-5 text-secondary" />
                                <span className="font-medium">Card</span>
                              </label>
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

                    <Button
                      type="submit"
                      variant="hero"
                      size="xl"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Placing Order..." : `Place Order • ₹${totalPrice}`}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-card rounded-2xl p-6 shadow-warm border border-border sticky top-24">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
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
                    </div>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
