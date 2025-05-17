import { useMemo } from "react";
import { CalendarIcon, ArrowRightIcon, UtensilsIcon, UserIcon, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { useDietPreference } from "@/lib/DietPreferenceContext";
import WeightTrackingGraph from "./WeightTrackingGraph";

const DashboardHome = () => {
  const { 
    dietPreference, 
    healthGoal, 
    setDietPreference, 
    setHealthGoal 
  } = useDietPreference();
  
  // Use memoized formatted date for better performance
  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });
  }, []);

  const handlePreferenceChange = (preference: 'vegetarian' | 'non-vegetarian' | 'semi-vegetarian') => {
    setDietPreference(preference);
    toast({
      title: "Diet preference updated!",
      description: `Your diet preference has been set to ${preference.replace('-', ' ')}.`
    });
  };

  const handleGoalChange = (goal: 'weight-loss' | 'weight-gain' | 'maintenance') => {
    setHealthGoal(goal);
    toast({
      title: "Health goal updated!",
      description: `Your health goal has been set to ${goal.replace('-', ' ')}.`
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1"> Hello, Welcome back </h1>
          <div className="flex items-center text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{currentDate}</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button asChild variant="outline">
            <Link to="/tokens">
              Tokens & Rewards
              <Coins className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link to="/diet-plan">
              View Full Diet Plan
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Diet Preference</CardTitle>
            <CardDescription>Choose your dietary preference</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={dietPreference} 
              onValueChange={handlePreferenceChange}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <label 
                htmlFor="pref-vegetarian" 
                className={`relative flex flex-col items-center justify-center border rounded-xl p-5 hover:border-fitness-primary cursor-pointer transition-all ${dietPreference === 'vegetarian' ? 'border-fitness-primary bg-fitness-primary/10' : ''}`}
              >
                <div className="text-2xl mb-2">🥦</div>
                <RadioGroupItem 
                  value="vegetarian" 
                  id="pref-vegetarian" 
                  className="absolute top-3 left-3"
                />
                <div className="font-medium mt-2">Vegetarian</div>
                <p className="text-xs text-muted-foreground text-center mt-1">No meat, fish, or animal products</p>
              </label>
              
              <label 
                htmlFor="pref-non-vegetarian" 
                className={`relative flex flex-col items-center justify-center border rounded-xl p-5 hover:border-fitness-primary cursor-pointer transition-all ${dietPreference === 'non-vegetarian' ? 'border-fitness-primary bg-fitness-primary/10' : ''}`}
              >
                <div className="text-2xl mb-2">🍗</div>
                <RadioGroupItem 
                  value="non-vegetarian" 
                  id="pref-non-vegetarian" 
                  className="absolute top-3 left-3"
                />
                <div className="font-medium mt-2">Non-Vegetarian</div>
                <p className="text-xs text-muted-foreground text-center mt-1">Include all types of food</p>
              </label>
              
              <label 
                htmlFor="pref-semi-vegetarian" 
                className={`relative flex flex-col items-center justify-center border rounded-xl p-5 hover:border-fitness-primary cursor-pointer transition-all ${dietPreference === 'semi-vegetarian' ? 'border-fitness-primary bg-fitness-primary/10' : ''}`}
              >
                <div className="text-2xl mb-2">🥗</div>
                <RadioGroupItem 
                  value="semi-vegetarian" 
                  id="pref-semi-vegetarian" 
                  className="absolute top-3 left-3"
                />
                <div className="font-medium mt-2">Semi-Vegetarian</div>
                <p className="text-xs text-muted-foreground text-center mt-1">Mostly plant-based with some animal products</p>
              </label>
            </RadioGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Health Goal</CardTitle>
            <CardDescription>Set your primary health goal</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={healthGoal}
              onValueChange={handleGoalChange}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <label 
                htmlFor="goal-weight-loss" 
                className={`relative flex flex-col items-center justify-center border rounded-xl p-5 hover:border-fitness-primary cursor-pointer transition-all ${healthGoal === 'weight-loss' ? 'border-fitness-primary bg-fitness-primary/10' : ''}`}
              >
                <div className="text-2xl mb-2">⬇️</div>
                <RadioGroupItem 
                  value="weight-loss" 
                  id="goal-weight-loss" 
                  className="absolute top-3 left-3"
                />
                <div className="font-medium mt-2">Weight Loss</div>
                <p className="text-xs text-muted-foreground text-center mt-1">Reduce body fat and weight</p>
              </label>
              
              <label 
                htmlFor="goal-weight-gain" 
                className={`relative flex flex-col items-center justify-center border rounded-xl p-5 hover:border-fitness-primary cursor-pointer transition-all ${healthGoal === 'weight-gain' ? 'border-fitness-primary bg-fitness-primary/10' : ''}`}
              >
                <div className="text-2xl mb-2">⬆️</div>
                <RadioGroupItem 
                  value="weight-gain" 
                  id="goal-weight-gain" 
                  className="absolute top-3 left-3"
                />
                <div className="font-medium mt-2">Weight Gain</div>
                <p className="text-xs text-muted-foreground text-center mt-1">Build muscle and increase weight</p>
              </label>
              
              <label 
                htmlFor="goal-maintenance" 
                className={`relative flex flex-col items-center justify-center border rounded-xl p-5 hover:border-fitness-primary cursor-pointer transition-all ${healthGoal === 'maintenance' ? 'border-fitness-primary bg-fitness-primary/10' : ''}`}
              >
                <div className="text-2xl mb-2">⚖️</div>
                <RadioGroupItem 
                  value="maintenance" 
                  id="goal-maintenance" 
                  className="absolute top-3 left-3"
                />
                <div className="font-medium mt-2">Maintenance</div>
                <p className="text-xs text-muted-foreground text-center mt-1">Maintain current weight and improve health</p>
              </label>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tips & Reminders</CardTitle>
            <CardDescription>Stay on track</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-fitness-primary/10 rounded-full p-2">
                  <span className="text-xl">💧</span>
                </div>
                <div>
                  <h4 className="font-medium">Stay Hydrated</h4>
                  <p className="text-sm text-muted-foreground">Drink at least 8 glasses of water today</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-fitness-primary/10 rounded-full p-2">
                  <span className="text-xl">🏃‍♀️</span>
                </div>
                <div>
                  <h4 className="font-medium">Activity Reminder</h4>
                  <p className="text-sm text-muted-foreground">30 minutes of exercise recommended today</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-fitness-primary/10 rounded-full p-2">
                  <span className="text-xl">🥦</span>
                </div>
                <div>
                  <h4 className="font-medium">Nutrition Tip</h4>
                  <p className="text-sm text-muted-foreground">Include colorful vegetables in your meals</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <WeightTrackingGraph />
      </div>
    </div>
  );
};

export default DashboardHome;
