import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LoyaltyTransaction {
  id: string;
  type: "order" | "review" | "redemption";
  points: number;
  description: string;
  date: string;
}

interface LoyaltyContextType {
  points: number;
  transactions: LoyaltyTransaction[];
  addPoints: (amount: number, type: "order" | "review", description: string) => void;
  redeemPoints: (amount: number, description: string) => boolean;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  nextTierPoints: number;
  pointsToNextTier: number;
}

const TIER_THRESHOLDS = {
  Bronze: 0,
  Silver: 500,
  Gold: 1500,
  Platinum: 3000,
};

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

export const LoyaltyProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState<number>(() => {
    const saved = localStorage.getItem("loyaltyPoints");
    return saved ? JSON.parse(saved) : 0;
  });

  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>(() => {
    const saved = localStorage.getItem("loyaltyTransactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("loyaltyPoints", JSON.stringify(points));
  }, [points]);

  useEffect(() => {
    localStorage.setItem("loyaltyTransactions", JSON.stringify(transactions));
  }, [transactions]);

  const addPoints = (amount: number, type: "order" | "review", description: string) => {
    const transaction: LoyaltyTransaction = {
      id: `txn_${Date.now()}`,
      type,
      points: amount,
      description,
      date: new Date().toISOString(),
    };

    setPoints((prev) => prev + amount);
    setTransactions((prev) => [transaction, ...prev].slice(0, 50)); // Keep last 50 transactions
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
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};
