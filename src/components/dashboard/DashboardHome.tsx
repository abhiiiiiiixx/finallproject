
import { useState, useEffect } from "react";
import { CalendarIcon, ArrowRightIcon } from "lucide-react";
import { MotionDiv } from "@/components/ui/motion-div";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";

// Dummy data for displaying progress
const weeklyProgress = [
  { name: "Mon", calories: 1800, target: 2200 },
  { name: "Tue", calories: 2100, target: 2200 },
  { name: "Wed", calories: 1950, target: 2200 },
  { name: "Thu", calories: 2300, target: 2200 },
  { name: "Fri", calories: 2000, target: 2200 },
  { name: "Sat", calories: 1750, target: 2200 },
  { name: "Sun", calories: 2200, target: 2200 },
];

// Dummy data for today's macros
const macroData = [
  { name: "Proteins", value: 30, color: "#8B5CF6" },
  { name: "Carbs", value: 50, color: "#0EA5E9" },
  { name: "Fats", value: 20, color: "#D946EF" },
];

// Dummy meal plan for today
const todayMeals = [
  {
    time: "7:30 AM",
    name: "Breakfast",
    description: "Oatmeal with berries and nuts",
    calories: 350,
    completed: true,
  },
  {
    time: "10:30 AM",
    name: "Morning Snack",
    description: "Greek yogurt with honey",
    calories: 120,
    completed: false,
  },
  {
    time: "1:00 PM",
    name: "Lunch",
    description: "Grilled chicken salad with avocado",
    calories: 450,
    completed: false,
  },
  {
    time: "4:00 PM",
    name: "Afternoon Snack",
    description: "Apple with almond butter",
    calories: 180,
    completed: false,
  },
  {
    time: "7:00 PM",
    name: "Dinner",
    description: "Baked salmon with quinoa and vegetables",
    calories: 580,
    completed: false,
  },
];

const DashboardHome = () => {
  const [progress, setProgress] = useState(25);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Set formatted date
    const now = new Date();
    setCurrentDate(now.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' }));
    
    // Simulate progress update
    const timer = setTimeout(() => setProgress(65), 500);
    return () => clearTimeout(timer);
  }, []);

  // Calculate total calories for today
  const totalCaloriesToday = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const consumedCalories = todayMeals.filter(meal => meal.completed).reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Welcome back, Sarah!</h1>
          <div className="flex items-center text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{currentDate}</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>
            View Full Diet Plan
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Today's Goal</CardTitle>
              <CardDescription>Daily progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Calories Consumed</span>
                <span className="font-medium">{consumedCalories} / {totalCaloriesToday}</span>
              </div>
              <Progress value={progress} className="h-2 mb-4" />
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-fitness-primary">{macroData[0].value}%</div>
                  <div className="text-xs text-muted-foreground">Proteins</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-fitness-secondary">{macroData[1].value}%</div>
                  <div className="text-xs text-muted-foreground">Carbs</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-fitness-accent">{macroData[2].value}%</div>
                  <div className="text-xs text-muted-foreground">Fats</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Weekly Progress</CardTitle>
              <CardDescription>Calorie intake vs. target</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyProgress} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="calories" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" fill="#D1D5DB" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Today's Meal Plan</CardTitle>
              <CardDescription>Personalized for your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayMeals.map((meal, index) => (
                  <div
                    key={index}
                    className={`flex items-center border-l-4 p-4 rounded-md ${
                      meal.completed ? "border-green-500 bg-green-50 dark:bg-green-900/10" : 
                      "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    }`}
                  >
                    <div className="mr-4">
                      <div className="text-sm font-medium text-muted-foreground">{meal.time}</div>
                      <div className="text-lg font-semibold">{meal.name}</div>
                    </div>
                    <div className="flex-1">
                      <div>{meal.description}</div>
                      <div className="text-sm text-muted-foreground">{meal.calories} calories</div>
                    </div>
                    <div>
                      {meal.completed ? (
                        <div className="text-green-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          <span className="ml-1">Completed</span>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm">
                          Mark as Done
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/diet-plan">
                  <Button variant="outline" className="w-full">
                    View Full Week Plan
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Macro Distribution</CardTitle>
              <CardDescription>Today's nutrition balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <div className="text-sm text-center text-muted-foreground">
                  Based on your personalized caloric needs of <strong>2200</strong> calories daily
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>
      </div>
    </div>
  );
};

export default DashboardHome;
