import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTokens } from "@/lib/TokenContext";
import { useDietPreference } from "@/lib/DietPreferenceContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WeightTrackingGraph = () => {
  const { completedDays, completedMeals } = useTokens();
  const { healthGoal } = useDietPreference();

  // Show 3 weeks (21 days) for a more informative trend
  const numDays = 21;
  const days = Array.from({ length: numDays }, (_, i) => `Day ${i + 1}`);

  // Calculate expected weight change based on health goal
  const calculateExpectedWeightChange = (day: number) => {
    const baseWeight = 70; // Starting weight in kg
    const dailyChange = healthGoal === 'weight-loss' ? -0.2 : 
                       healthGoal === 'weight-gain' ? 0.2 : 0;
    return baseWeight + (dailyChange * day);
  };

  // Calculate actual weight based on completed meals
  const calculateActualWeight = (day: number) => {
    const baseWeight = 70; // Starting weight in kg
    const dailyChange = healthGoal === 'weight-loss' ? -0.2 : 
                       healthGoal === 'weight-gain' ? 0.2 : 0;
    
    // Check if all meals for the day were completed
    const weekKey = getCurrentWeekKey();
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const currentDay = daysOfWeek[day];
    const dayKey = `${weekKey}-${currentDay}`;
    
    // If day is not completed, reduce the weight change by 50%
    const completionFactor = completedDays[dayKey] ? 1 : 0.5;
    
    return baseWeight + (dailyChange * day * completionFactor);
  };

  // Prepare chart data for only expected progress
  const chartData = useMemo(() => {
    return {
      labels: days,
      datasets: [
        {
          label: 'Expected Progress',
          data: days.map((_, index) => calculateExpectedWeightChange(index)),
          borderColor: 'rgb(99, 102, 241)',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [healthGoal]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)} kg`;
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Weight (kg)'
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Expected Weight Progress (3 Weeks)</CardTitle>
        <CardDescription>Projected weight change based on your goal</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[500px] w-full"> {/* Increased height and full width for a bigger graph */}
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => {
                toast({
                  title: "Certificate",
                  description: "You have not completed a 30 days streak.",
                  variant: "destructive"
                });
              }}
              variant="outline"
              size="lg"
            >
              Generate Certificate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeightTrackingGraph; 