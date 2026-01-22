import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LoyaltyTransaction {
  id: string;
  type: "order" | "review" | "redemption" | "referral";
  points: number;
  description: string;
  date: string;
}

interface Referral {
  id: string;
  referredEmail: string;
  status: "pending" | "completed";
  date: string;
}

interface LoyaltyContextType {
  points: number;
  transactions: LoyaltyTransaction[];
  addPoints: (amount: number, type: "order" | "review" | "referral", description: string) => void;
  redeemPoints: (amount: number, description: string) => boolean;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  nextTierPoints: number;
  pointsToNextTier: number;
  referralCode: string;
  referrals: Referral[];
  applyReferralCode: (code: string, email: string) => boolean;
  completeReferral: (email: string) => void;
  appliedReferralCode: string | null;
}

const TIER_THRESHOLDS = {
  Bronze: 0,
  Silver: 500,
  Gold: 1500,
  Platinum: 3000,
};

const REFERRAL_BONUS = 100; // Points for referrer when friend orders
const REFERRED_BONUS = 50; // Points for new user using referral code

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (!context) {
    throw new Error("useLoyalty must be used within a LoyaltyProvider");
  }
  return context;
};

const getTier = (points: number): "Bronze" | "Silver" | "Gold" | "Platinum" => {
  if (points >= TIER_THRESHOLDS.Platinum) return "Platinum";
  if (points >= TIER_THRESHOLDS.Gold) return "Gold";
  if (points >= TIER_THRESHOLDS.Silver) return "Silver";
  return "Bronze";
};

const getNextTierPoints = (tier: "Bronze" | "Silver" | "Gold" | "Platinum"): number => {
  switch (tier) {
    case "Bronze":
      return TIER_THRESHOLDS.Silver;
    case "Silver":
      return TIER_THRESHOLDS.Gold;
    case "Gold":
      return TIER_THRESHOLDS.Platinum;
    case "Platinum":
      return TIER_THRESHOLDS.Platinum;
  }
};

const generateReferralCode = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "RINKU";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const LoyaltyProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState<number>(() => {
    const saved = localStorage.getItem("loyaltyPoints");
    return saved ? JSON.parse(saved) : 0;
  });

  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>(() => {
    const saved = localStorage.getItem("loyaltyTransactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [referralCode] = useState<string>(() => {
    const saved = localStorage.getItem("referralCode");
    if (saved) return saved;
    const newCode = generateReferralCode();
    localStorage.setItem("referralCode", newCode);
    return newCode;
  });

  const [referrals, setReferrals] = useState<Referral[]>(() => {
    const saved = localStorage.getItem("referrals");
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedReferralCode, setAppliedReferralCode] = useState<string | null>(() => {
    return localStorage.getItem("appliedReferralCode");
  });

  useEffect(() => {
    localStorage.setItem("loyaltyPoints", JSON.stringify(points));
  }, [points]);

  useEffect(() => {
    localStorage.setItem("loyaltyTransactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("referrals", JSON.stringify(referrals));
  }, [referrals]);

  const addPoints = (amount: number, type: "order" | "review" | "referral", description: string) => {
    const transaction: LoyaltyTransaction = {
      id: `txn_${Date.now()}`,
      type,
      points: amount,
      description,
      date: new Date().toISOString(),
    };

    setPoints((prev) => prev + amount);
    setTransactions((prev) => [transaction, ...prev].slice(0, 50));
  };

  const redeemPoints = (amount: number, description: string): boolean => {
    if (points < amount) return false;

    const transaction: LoyaltyTransaction = {
      id: `txn_${Date.now()}`,
      type: "redemption",
      points: -amount,
      description,
      date: new Date().toISOString(),
    };

    setPoints((prev) => prev - amount);
    setTransactions((prev) => [transaction, ...prev].slice(0, 50));
    return true;
  };

  const applyReferralCode = (code: string, email: string): boolean => {
    // Can't use own referral code
    if (code.toUpperCase() === referralCode) return false;
    
    // Already applied a code
    if (appliedReferralCode) return false;

    // Store the applied code
    setAppliedReferralCode(code.toUpperCase());
    localStorage.setItem("appliedReferralCode", code.toUpperCase());
    
    // Give bonus to new user
    addPoints(REFERRED_BONUS, "referral", "Welcome bonus from referral");
    
    return true;
  };

  const completeReferral = (email: string) => {
    // This simulates rewarding the referrer when a referred friend places first order
    // In a real app, this would be handled server-side
    const pendingReferral = referrals.find(
      (r) => r.referredEmail === email && r.status === "pending"
    );

    if (pendingReferral) {
      setReferrals((prev) =>
        prev.map((r) =>
          r.id === pendingReferral.id ? { ...r, status: "completed" as const } : r
        )
      );
      addPoints(REFERRAL_BONUS, "referral", `Referral bonus: ${email} placed first order`);
    }
  };

  const tier = getTier(points);
  const nextTierPoints = getNextTierPoints(tier);
  const pointsToNextTier = tier === "Platinum" ? 0 : nextTierPoints - points;

  return (
    <LoyaltyContext.Provider
      value={{
        points,
        transactions,
        addPoints,
        redeemPoints,
        tier,
        nextTierPoints,
        pointsToNextTier,
        referralCode,
        referrals,
        applyReferralCode,
        completeReferral,
        appliedReferralCode,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};
