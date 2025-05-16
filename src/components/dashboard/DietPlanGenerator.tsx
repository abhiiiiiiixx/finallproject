import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCcwIcon, Share2, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { FoodItem, getRandomFoodItems } from "@/lib/foodDatabase";
import { useDietPreference } from "@/lib/DietPreferenceContext";

// Example meal data - in real app would be generated based on user preferences
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface MealOption {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  alternatives?: string[];
}

interface DayMeals {
  breakfast: MealOption;
  morningSnack: MealOption;
  lunch: MealOption;
  afternoonSnack: MealOption;
  dinner: MealOption;
}

interface WeeklyMealPlan {
  [key: string]: DayMeals;
}

// Generate meal plan based on preferences - completely synchronous
const generateMealPlan = (
  dietPreference: 'vegetarian' | 'non-vegetarian' | 'semi-vegetarian',
  healthGoal: 'weight-loss' | 'weight-gain' | 'maintenance'
): WeeklyMealPlan => {
  const weeklyPlan: WeeklyMealPlan = {};
  
  DAYS_OF_WEEK.forEach(day => {
    // Get 5 random food items for each day
    const dailyFoods = getRandomFoodItems(dietPreference, healthGoal, 5);
    
    weeklyPlan[day] = {
      breakfast: dailyFoods[0],
      morningSnack: dailyFoods[1],
      lunch: dailyFoods[2],
      afternoonSnack: dailyFoods[3],
      dinner: dailyFoods[4]
    };
  });
  
  return weeklyPlan;
};

// Precompute all possible meal plans eagerly before component loads
// Move this to module scope to be calculated only once when the file is imported
const allPlans: Record<string, WeeklyMealPlan> = (() => {
  const plans: Record<string, WeeklyMealPlan> = {};
  const preferences = ['vegetarian', 'non-vegetarian', 'semi-vegetarian'];
  const goals = ['weight-loss', 'weight-gain', 'maintenance'];
  
  preferences.forEach(pref => {
    goals.forEach(goal => {
      const key = `${pref}-${goal}`;
      plans[key] = generateMealPlan(pref as any, goal as any);
    });
  });
  
  return plans;
})();

const DietPlanGenerator = () => {
  // Use the context instead of local state
  const { dietPreference, healthGoal } = useDietPreference();
  const [activeDay, setActiveDay] = useState("Monday");
  const [planVersion, setPlanVersion] = useState(0); // Use a version number to force re-render when plan changes

  // Get the current plan based on preferences
  const weeklyPlan = useMemo(() => {
    const key = `${dietPreference}-${healthGoal}`;
    return allPlans[key];
  }, [dietPreference, healthGoal, planVersion]);

  const handleRegeneratePlan = () => {
    // Generate a fresh plan
    const newPlan = generateMealPlan(dietPreference, healthGoal);
    // Update the cached plan
    allPlans[`${dietPreference}-${healthGoal}`] = newPlan;
    
    // Force re-render by incrementing plan version
    setPlanVersion(prev => prev + 1);
    
    toast({
      title: "Diet plan regenerated!",
      description: "Your new personalized meal plan is ready."
    });
  };

  const handleDownloadPlan = () => {
    toast({
      title: "Downloading...",
      description: "Your meal plan is being downloaded as a PDF."
    });
  };

  const handleSharePlan = () => {
    toast({
      title: "Share your plan",
      description: "Sharing options opened."
    });
  };

  const calculateDailyTotals = (day: string) => {
    if (!weeklyPlan || !weeklyPlan[day]) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    
    const meals = Object.values(weeklyPlan[day]);
    return meals.reduce(
      (acc, meal) => {
        return {
          calories: acc.calories + meal.calories,
          protein: acc.protein + meal.protein,
          carbs: acc.carbs + meal.carbs,
          fat: acc.fat + meal.fat,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const MealCard = ({ meal, title }: { meal: MealOption; title: string }) => {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="space-y-2">
            <div className="font-medium">{meal.name}</div>
            <p className="text-sm text-muted-foreground">{meal.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="text-xs px-2 py-1 bg-fitness-primary/10 text-fitness-primary rounded-full">
                {meal.calories} cal
          </div>
              <div className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                P: {meal.protein}g
            </div>
              <div className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full">
                C: {meal.carbs}g
            </div>
              <div className="text-xs px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-full">
                F: {meal.fat}g
            </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Personalized Diet Plan</h1>
      
      <div className="mb-4">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">Current Diet Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Diet Preference:</div>
                <div className="font-medium capitalize">{dietPreference.replace('-', ' ')}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Health Goal:</div>
                <div className="font-medium capitalize">{healthGoal.replace('-', ' ')}</div>
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              To change these settings, please update your preferences on the dashboard home page.
            </div>
          </CardContent>
        </Card>
      </div>

      {weeklyPlan && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Weekly Meal Plan</h2>
            <div className="flex space-x-2">
              <Button onClick={handleRegeneratePlan} variant="outline" size="sm">
                <RefreshCcwIcon className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Button onClick={handleSharePlan} variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button onClick={handleDownloadPlan} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <Tabs defaultValue={activeDay} onValueChange={setActiveDay} className="mb-8">
            <TabsList className="grid grid-cols-7 mb-6">
              {DAYS_OF_WEEK.map((day) => (
                <TabsTrigger key={day} value={day}>
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>

            {DAYS_OF_WEEK.map((day) => (
              <TabsContent key={day} value={day} className="space-y-6">
                {weeklyPlan[day] && (
                  <>
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-lg">Daily Summary ({day})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div className="p-3 bg-fitness-primary/10 rounded-lg">
                            <div className="text-2xl font-bold">{calculateDailyTotals(day).calories}</div>
                            <div className="text-sm text-muted-foreground">Calories</div>
                          </div>
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <div className="text-2xl font-bold">{calculateDailyTotals(day).protein}g</div>
                            <div className="text-sm text-muted-foreground">Protein</div>
                          </div>
                          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <div className="text-2xl font-bold">{calculateDailyTotals(day).carbs}g</div>
                            <div className="text-sm text-muted-foreground">Carbs</div>
                          </div>
                          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <div className="text-2xl font-bold">{calculateDailyTotals(day).fat}g</div>
                            <div className="text-sm text-muted-foreground">Fats</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                      <MealCard meal={weeklyPlan[day].breakfast} title="Breakfast" />
                      <MealCard meal={weeklyPlan[day].morningSnack} title="Morning Snack" />
                      <MealCard meal={weeklyPlan[day].lunch} title="Lunch" />
                      <MealCard meal={weeklyPlan[day].afternoonSnack} title="Afternoon Snack" />
                      <MealCard meal={weeklyPlan[day].dinner} title="Dinner" />
                    </div>
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}
    </div>
  );
};

export default DietPlanGenerator;
