import { useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useLoading } from "@/lib/LoadingContext";
import { useTokens } from "@/lib/TokenContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, TrophyIcon } from "lucide-react";
import RedeemTokens from "@/components/dashboard/RedeemTokens";
import RedemptionHistory from "@/components/dashboard/RedemptionHistory";

const TokensPage = () => {
  const { setIsLoading } = useLoading();
  const { tokens, streak, completedDays, completedMeals } = useTokens();
  
  // Set loading to false when component mounts
  useEffect(() => {
    // Short timeout to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Calculate completed meal stats
  const mealStats = {
    totalMeals: Object.keys(completedMeals).length,
    totalDays: Object.keys(completedDays).length
  };

  return (
    <DashboardLayout activeTab="tokens">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Tokens & Rewards</h1>
          <p className="text-muted-foreground">Earn and spend tokens by completing your diet plan</p>
        </div>

        {/* Streak and Tokens Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Progress</CardTitle>
            <CardDescription>Track your diet plan achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                <div className="bg-amber-500/20 p-4 rounded-full mr-4">
                  <TrophyIcon className="h-8 w-8 text-amber-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Tokens Earned</div>
                  <div className="text-3xl font-bold">{tokens}</div>
                  <div className="flex flex-col text-sm text-muted-foreground mt-1">
                    <span>{mealStats.totalMeals} meals completed ({(mealStats.totalMeals * 0.1).toFixed(1)} tokens)</span>
                    <span>{mealStats.totalDays} full days completed ({mealStats.totalDays} tokens)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                <div className="bg-orange-500/20 p-4 rounded-full mr-4">
                  <Flame className="h-8 w-8 text-orange-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Current Streak</div>
                  <div className="text-3xl font-bold">{streak} {streak === 1 ? 'day' : 'days'}</div>
                  <div className="text-sm text-muted-foreground mt-1">Keep going to extend your streak!</div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <h3 className="font-semibold mb-2">Token System</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                <li>Earn 0.1 tokens for each individual meal you complete</li>
                <li>Earn 1 token for marking a full day as completed</li>
                <li>Build your streak by completing consecutive days</li>
                <li>Redeem tokens for rewards below</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Token Redemption Section */}
        <RedeemTokens />

        {/* Redemption History Section */}
        <RedemptionHistory />
      </div>
    </DashboardLayout>
  );
};

export default TokensPage; 