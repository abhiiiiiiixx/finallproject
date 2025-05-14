import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { MotionDiv } from "@/components/ui/motion-div";
import { RefreshCcwIcon, Share2, Download, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

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

// Generate sample meals
const generateSampleMeals = (): WeeklyMealPlan => {
  const breakfastOptions = [
    {
      name: "Greek Yogurt Bowl",
      description: "Greek yogurt with honey, berries, and granola",
      calories: 340,
      protein: 18,
      carbs: 45,
      fat: 10,
      alternatives: ["Protein Smoothie", "Avocado Toast"]
    },
    {
      name: "Veggie Omelette",
      description: "3 egg omelette with spinach, tomato, and feta cheese",
      calories: 380,
      protein: 22,
      carbs: 12,
      fat: 26,
      alternatives: ["Scrambled Tofu", "Breakfast Burrito"]
    },
    {
      name: "Overnight Oats",
      description: "Rolled oats soaked with almond milk, chia seeds, and fruits",
      calories: 320,
      protein: 12,
      carbs: 50,
      fat: 8,
      alternatives: ["Quinoa Porridge", "Protein Pancakes"]
    },
  ];
  
  const lunchOptions = [
    {
      name: "Grilled Chicken Salad",
      description: "Grilled chicken breast on mixed greens with avocado",
      calories: 420,
      protein: 35,
      carbs: 15,
      fat: 22,
      alternatives: ["Tuna Salad", "Mediterranean Bowl"]
    },
    {
      name: "Quinoa Buddha Bowl",
      description: "Quinoa with roasted vegetables, chickpeas, and tahini dressing",
      calories: 450,
      protein: 16,
      carbs: 68,
      fat: 16,
      alternatives: ["Rice Bowl", "Lentil Soup with Bread"]
    },
    {
      name: "Turkey Wrap",
      description: "Whole grain wrap with turkey, lettuce, tomato, and hummus",
      calories: 380,
      protein: 25,
      carbs: 42,
      fat: 12,
      alternatives: ["Chicken Sandwich", "Veggie Wrap"]
    },
  ];
  
  const dinnerOptions = [
    {
      name: "Baked Salmon",
      description: "Baked salmon with steamed broccoli and quinoa",
      calories: 480,
      protein: 36,
      carbs: 35,
      fat: 20,
      alternatives: ["Grilled Cod", "Shrimp Stir-Fry"]
    },
    {
      name: "Lean Beef Stir-Fry",
      description: "Lean beef strips with mixed vegetables and brown rice",
      calories: 520,
      protein: 32,
      carbs: 56,
      fat: 16,
      alternatives: ["Chicken Stir-Fry", "Tofu Stir-Fry"]
    },
    {
      name: "Vegetarian Chili",
      description: "Bean chili with mixed vegetables and avocado",
      calories: 380,
      protein: 18,
      carbs: 62,
      fat: 8,
      alternatives: ["Black Bean Burger", "Lentil Stew"]
    },
  ];
  
  const snackOptions = [
    {
      name: "Apple with Almond Butter",
      description: "Medium apple with 1 tbsp almond butter",
      calories: 180,
      protein: 4,
      carbs: 25,
      fat: 9,
      alternatives: ["Banana with Peanut Butter", "Trail Mix"]
    },
    {
      name: "Greek Yogurt with Berries",
      description: "Plain Greek yogurt with mixed berries",
      calories: 140,
      protein: 15,
      carbs: 14,
      fat: 3,
      alternatives: ["Cottage Cheese with Fruit", "Protein Shake"]
    },
    {
      name: "Hummus with Veggie Sticks",
      description: "2 tbsp hummus with carrot and cucumber sticks",
      calories: 120,
      protein: 5,
      carbs: 15,
      fat: 5,
      alternatives: ["Hard Boiled Eggs", "Edamame"]
    },
  ];
  
  const generateRandomMeal = (options: MealOption[]): MealOption => {
    return options[Math.floor(Math.random() * options.length)];
  };
  
  // Generate a plan for each day of the week
  const weeklyPlan: WeeklyMealPlan = {};
  
  DAYS_OF_WEEK.forEach(day => {
    weeklyPlan[day] = {
      breakfast: generateRandomMeal(breakfastOptions),
      morningSnack: generateRandomMeal(snackOptions),
      lunch: generateRandomMeal(lunchOptions),
      afternoonSnack: generateRandomMeal(snackOptions),
      dinner: generateRandomMeal(dinnerOptions),
    };
  });
  
  return weeklyPlan;
};

const DietPlanGenerator = () => {
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyMealPlan>(generateSampleMeals());
  const [activeDay, setActiveDay] = useState("Monday");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRegeneratePlan = () => {
    setIsGenerating(true);
    // Simulate API call or calculation
    setTimeout(() => {
      setWeeklyPlan(generateSampleMeals());
      setIsGenerating(false);
    }, 1500);
  };

  const handleDownloadPlan = () => {
    // In a real app, this would generate and download a PDF
    alert("Downloading your meal plan as PDF...");
  };

  const handleSharePlan = () => {
    // In a real app, this would open a share dialog
    alert("Sharing your meal plan...");
  };

  // Calculate total daily calories
  const calculateDailyTotals = (day: string) => {
    const dayPlan = weeklyPlan[day];
    const calories = Object.values(dayPlan).reduce((total, meal) => total + meal.calories, 0);
    const protein = Object.values(dayPlan).reduce((total, meal) => total + meal.protein, 0);
    const carbs = Object.values(dayPlan).reduce((total, meal) => total + meal.carbs, 0);
    const fat = Object.values(dayPlan).reduce((total, meal) => total + meal.fat, 0);
    
    return { calories, protein, carbs, fat };
  };

  const MealCard = ({ meal, title }: { meal: MealOption; title: string }) => {
    const [showAlternatives, setShowAlternatives] = useState(false);
    
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <h4 className="font-bold">{meal.name}</h4>
            <p className="text-sm text-muted-foreground">{meal.description}</p>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-xs mt-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
              <div className="font-semibold">{meal.calories}</div>
              <div className="text-muted-foreground">calories</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
              <div className="font-semibold">{meal.protein}g</div>
              <div className="text-muted-foreground">protein</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
              <div className="font-semibold">{meal.carbs}g</div>
              <div className="text-muted-foreground">carbs</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
              <div className="font-semibold">{meal.fat}g</div>
              <div className="text-muted-foreground">fat</div>
            </div>
          </div>
          
          {meal.alternatives && meal.alternatives.length > 0 && (
            <div className="mt-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs px-2 py-1 h-auto"
                onClick={() => setShowAlternatives(!showAlternatives)}
              >
                {showAlternatives ? "Hide Alternatives" : "Show Alternatives"}
                <ArrowRight className={cn("h-3 w-3 ml-1 transition-transform", showAlternatives && "rotate-90")} />
              </Button>
              
              {showAlternatives && (
                <div className="mt-2 space-y-1">
                  {meal.alternatives.map((alt, i) => (
                    <div key={i} className="text-sm p-1 bg-gray-50 dark:bg-gray-800 rounded">
                      {alt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Your Weekly Diet Plan</h1>
          <p className="text-muted-foreground">
            Personalized based on your profile and preferences
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSharePlan}
            className="flex items-center"
          >
            <Share2 className="w-4 h-4 mr-1" /> Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadPlan}
            className="flex items-center"
          >
            <Download className="w-4 h-4 mr-1" /> Download PDF
          </Button>
          <Button
            size="sm"
            onClick={handleRegeneratePlan}
            disabled={isGenerating}
            className="flex items-center"
          >
            <RefreshCcwIcon className={cn("w-4 h-4 mr-1", isGenerating && "animate-spin")} />
            {isGenerating ? "Generating..." : "Regenerate Plan"}
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="Monday"
        value={activeDay}
        onValueChange={setActiveDay}
        className="space-y-4"
      >
        <div className="overflow-auto">
          <TabsList className="w-full md:w-auto">
            {DAYS_OF_WEEK.map((day) => (
              <TabsTrigger key={day} value={day}>
                {day}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {DAYS_OF_WEEK.map((day) => (
          <TabsContent key={day} value={day} className="space-y-6">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{day}'s Meal Plan</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Daily Total:</span>
                  <span className="font-semibold">{calculateDailyTotals(day).calories} calories</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MealCard 
                  meal={weeklyPlan[day].breakfast} 
                  title="Breakfast" 
                />
                <MealCard 
                  meal={weeklyPlan[day].lunch} 
                  title="Lunch" 
                />
                <MealCard 
                  meal={weeklyPlan[day].dinner} 
                  title="Dinner" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <MealCard 
                  meal={weeklyPlan[day].morningSnack} 
                  title="Morning Snack" 
                />
                <MealCard 
                  meal={weeklyPlan[day].afternoonSnack} 
                  title="Afternoon Snack" 
                />
              </div>

              <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <h3 className="font-semibold mb-2">Daily Nutrition Summary</h3>
                <div className="grid grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-xl font-bold">{calculateDailyTotals(day).calories}</div>
                    <div className="text-sm text-muted-foreground">Total Calories</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{calculateDailyTotals(day).protein}g</div>
                    <div className="text-sm text-muted-foreground">Protein</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{calculateDailyTotals(day).carbs}g</div>
                    <div className="text-sm text-muted-foreground">Carbs</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{calculateDailyTotals(day).fat}g</div>
                    <div className="text-sm text-muted-foreground">Fat</div>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DietPlanGenerator;
