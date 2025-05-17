import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCcwIcon, Share2, Download, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { FoodItem, getRandomFoodItems } from "../../lib/foodDatabase";
import { useDietPreference } from "@/lib/DietPreferenceContext";
import { useTokens } from "@/lib/TokenContext";

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
  const { completedDays, completedMeals, markDayAsCompleted, markMealAsCompleted } = useTokens();
  const [activeDay, setActiveDay] = useState("Monday");
  const [planVersion, setPlanVersion] = useState(0); // Use a version number to force re-render when plan changes

  // Get the current plan based on preferences
  const weeklyPlan = useMemo(() => {
    const key = `${dietPreference}-${healthGoal}`;
    return allPlans[key];
  }, [dietPreference, healthGoal, planVersion]);

  // Get the current week key for completed days tracking
  const getCurrentWeekKey = () => {
    const now = new Date();
    const year = now.getFullYear();
    const oneJan = new Date(year, 0, 1);
    const weekNumber = Math.ceil(((now.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7);
    return `${year}-W${weekNumber}`;
  };

  // Check if a day is completed
  const isDayCompleted = (day: string) => {
    const weekKey = getCurrentWeekKey();
    const dayKey = `${weekKey}-${day}`;
    return completedDays[dayKey] || false;
  };

  // Check if a meal is completed
  const isMealCompleted = (day: string, mealType: string) => {
    const weekKey = getCurrentWeekKey();
    const mealKey = `${weekKey}-${day}-${mealType}`;
    return completedMeals[mealKey] || false;
  };

  // Handle marking a day as completed
  const handleMarkAsCompleted = (day: string) => {
    markDayAsCompleted(day);
    toast({
      title: "Day Completed!",
      description: `You've earned a token for completing ${day}'s diet plan.`
    });
  };

  // Handle marking a meal as completed
  const handleMarkMealAsCompleted = (day: string, mealType: string) => {
    markMealAsCompleted(day, mealType);
    toast({
      title: "Meal Completed!",
      description: `You've earned 0.1 tokens for completing this meal.`
    });
  };

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
    return meals.reduce((acc, meal) => {
      return {
        calories: acc.calories + (meal.calories || 0),
        protein: acc.protein + (meal.protein || 0),
        carbs: acc.carbs + (meal.carbs || 0),
        fat: acc.fat + (meal.fat || 0)
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const MealCard = ({ meal, title, day }: { meal: MealOption; title: string; day: string }) => {
    // Normalize meal type to match what the TokenContext expects
    const mealType = title.toLowerCase().replace(/\s+/g, '');
    const isCompleted = isMealCompleted(day, mealType);
    
    return (
      <Card className="h-full relative">
        {isCompleted && (
          <span className="absolute -top-1 -right-1 z-10">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </span>
        )}
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
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
        <CardFooter>
          {!isCompleted ? (
            <Button 
              size="sm"
              variant="outline" 
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={() => {
                console.log(`Completing meal: ${day} - ${title} (${mealType})`);
                handleMarkMealAsCompleted(day, mealType);
              }}
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Complete
            </Button>
          ) : (
            <div className="w-full text-center text-green-500 text-xs font-medium">
              Completed
            </div>
          )}
        </CardFooter>
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
              {/* <Button onClick={handleSharePlan} variant="outline" size="sm"> */}
                {/* <Share2 className="h-4 w-4 mr-2" /> */}
                
              {/* </Button> */}
              <Button onClick={handleDownloadPlan} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <Tabs defaultValue={activeDay} onValueChange={setActiveDay} className="mb-8">
            <TabsList className="grid grid-cols-7 mb-6">
              {DAYS_OF_WEEK.map((day) => (
                <TabsTrigger key={day} value={day} className="relative">
                  {day}
                  {isDayCompleted(day) && (
                    <span className="absolute -top-1 -right-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {DAYS_OF_WEEK.map((day) => (
              <TabsContent key={day} value={day} className="space-y-6">
                {weeklyPlan[day] && (
                  <>
                    <Card className="mb-6">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Daily Summary ({day})</CardTitle>
                        {!isDayCompleted(day) ? (
                          <Button 
                            variant="outline" 
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => {
                              console.log(`Marking day as completed: ${day}`);
                              handleMarkAsCompleted(day);
                            }}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark All as Completed
                          </Button>
                        ) : (
                          <div className="flex items-center text-green-500 text-sm font-medium">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Completed
                          </div>
                        )}
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
                      <MealCard meal={weeklyPlan[day].breakfast} title="Breakfast" day={day} />
                      <MealCard meal={weeklyPlan[day].morningSnack} title="MorningSnack" day={day} />
                      <MealCard meal={weeklyPlan[day].lunch} title="Lunch" day={day} />
                      <MealCard meal={weeklyPlan[day].afternoonSnack} title="AfternoonSnack" day={day} />
                      <MealCard meal={weeklyPlan[day].dinner} title="Dinner" day={day} />
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
