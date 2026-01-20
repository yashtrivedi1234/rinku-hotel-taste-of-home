import { Gift, Crown } from "lucide-react";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const tierColors = {
  Bronze: "text-amber-700 bg-amber-100 dark:bg-amber-900/30",
  Silver: "text-slate-500 bg-slate-100 dark:bg-slate-800/50",
  Gold: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30",
  Platinum: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
};

export function LoyaltyBadge() {
  const { points, tier, pointsToNextTier, nextTierPoints } = useLoyalty();

  const progress = tier === "Platinum" 
    ? 100 
    : ((points - (nextTierPoints - 500)) / 500) * 100;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.button
          className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Gift className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm text-primary">{points}</span>
        </motion.button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              <span className="font-display font-bold text-foreground">Loyalty Rewards</span>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tierColors[tier]}`}>
              {tier}
            </span>
          </div>

          <div className="text-center py-4 bg-muted rounded-xl">
            <p className="text-3xl font-bold text-primary">{points}</p>
            <p className="text-sm text-muted-foreground">Available Points</p>
          </div>

          {tier !== "Platinum" && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{tier}</span>
                <span>{pointsToNextTier} pts to next tier</span>
              </div>
              <Progress value={Math.max(0, Math.min(100, progress))} className="h-2" />
            </div>
          )}

          <div className="space-y-2 text-sm">
            <p className="font-medium text-foreground">How to earn:</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• 10 pts per ₹100 spent on orders</li>
              <li>• 25 pts for each review</li>
            </ul>
          </div>

          <Link to="/rewards">
            <Button variant="outline" size="sm" className="w-full">
              View Rewards & History
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
