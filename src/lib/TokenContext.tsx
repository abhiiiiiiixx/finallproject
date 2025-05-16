import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface CompletedDay {
  date: string;
  dayOfWeek: string;
}

interface TokenContextType {
  tokens: number;
  streak: number;
  completedDays: Record<string, boolean>;
  completedMeals: Record<string, boolean>;
  markDayAsCompleted: (day: string) => void;
  markMealAsCompleted: (day: string, mealType: string) => void;
  isShowingTokenAnimation: boolean;
  animationTokenAmount: number;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

// Helper to generate current week key (e.g., "2023-W30")
const getCurrentWeekKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const oneJan = new Date(year, 0, 1);
  const weekNumber = Math.ceil(((now.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7);
  return `${year}-W${weekNumber}`;
};

// Check if API is available
const checkApiAvailability = async () => {
  try {
    await axios.get('/api/tokens');
    return true;
  } catch (error) {
    return false;
  }
};

export function TokenProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({});
  const [completedMeals, setCompletedMeals] = useState<Record<string, boolean>>({});
  const [isShowingTokenAnimation, setIsShowingTokenAnimation] = useState(false);
  const [animationTokenAmount, setAnimationTokenAmount] = useState(0.1);
  const [useApi, setUseApi] = useState<boolean | null>(null);
  
  // Check if API is available
  useEffect(() => {
    const checkApi = async () => {
      const apiAvailable = await checkApiAvailability();
      setUseApi(apiAvailable);
      
      if (apiAvailable) {
        try {
          const response = await axios.get('/api/tokens');
          setTokens(response.data.totalTokens);
          setStreak(response.data.currentStreak);
          
          // Convert API format to local format
          const formattedCompletedDays: Record<string, boolean> = {};
          response.data.completedDays.forEach((day: CompletedDay) => {
            const date = new Date(day.date);
            const weekKey = `${date.getFullYear()}-W${Math.ceil((date.getDate() + date.getDay()) / 7)}`;
            const dayKey = `${weekKey}-${day.dayOfWeek}`;
            formattedCompletedDays[dayKey] = true;
          });
          
          setCompletedDays(formattedCompletedDays);
        } catch (error) {
          console.error("Error fetching tokens:", error);
          loadFromLocalStorage();
        }
      } else {
        loadFromLocalStorage();
      }
    };
    
    checkApi();
  }, []);
  
  // Load from localStorage as fallback
  const loadFromLocalStorage = () => {
    const savedTokens = localStorage.getItem('fitness-tokens');
    const savedStreak = localStorage.getItem('fitness-streak');
    const savedCompletedDays = localStorage.getItem('fitness-completed-days');
    const savedCompletedMeals = localStorage.getItem('fitness-completed-meals');
    
    if (savedTokens) setTokens(parseFloat(savedTokens));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedCompletedDays) setCompletedDays(JSON.parse(savedCompletedDays));
    if (savedCompletedMeals) setCompletedMeals(JSON.parse(savedCompletedMeals));
  };
  
  const markMealAsCompleted = (day: string, mealType: string) => {
    const weekKey = getCurrentWeekKey();
    const mealKey = `${weekKey}-${day}-${mealType}`;
    
    // Check if the meal is already completed
    if (completedMeals[mealKey]) {
      return;
    }
    
    // Update completed meals
    const updatedCompletedMeals = {
      ...completedMeals,
      [mealKey]: true
    };
    
    // Update tokens - 0.1 token per meal
    const newTokens = Number((tokens + 0.1).toFixed(1));
    
    // Check if all meals for this day are completed
    const mealTypes = ['breakfast', 'morningSnack', 'lunch', 'afternoonSnack', 'dinner'];
    const allMealsCompleted = mealTypes.every(meal => {
      const key = `${weekKey}-${day}-${meal}`;
      return meal === mealType || updatedCompletedMeals[key];
    });
    
    // Update completed days if all meals are completed
    let updatedCompletedDays = {...completedDays};
    let newStreak = streak;
    
    if (allMealsCompleted) {
      const dayKey = `${weekKey}-${day}`;
      updatedCompletedDays[dayKey] = true;
      
      // If we completed a consecutive day, increase streak
      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const dayIndex = daysOfWeek.indexOf(day);
      
      if (dayIndex > 0) {
        const previousDay = daysOfWeek[dayIndex - 1];
        const previousDayKey = `${weekKey}-${previousDay}`;
        
        if (completedDays[previousDayKey]) {
          newStreak += 1;
        } else {
          // Reset streak if previous day wasn't completed
          newStreak = 1;
        }
      } else if (dayIndex === 0) {
        // It's Monday, start of a new streak
        newStreak = 1;
      }
      
      setCompletedDays(updatedCompletedDays);
      setStreak(newStreak);
      localStorage.setItem('fitness-completed-days', JSON.stringify(updatedCompletedDays));
      localStorage.setItem('fitness-streak', newStreak.toString());
    }
    
    // Save to state and localStorage
    setTokens(newTokens);
    setCompletedMeals(updatedCompletedMeals);
    
    localStorage.setItem('fitness-tokens', newTokens.toString());
    localStorage.setItem('fitness-completed-meals', JSON.stringify(updatedCompletedMeals));
    
    // Show token animation
    setAnimationTokenAmount(0.1);
    setIsShowingTokenAnimation(true);
    setTimeout(() => setIsShowingTokenAnimation(false), 2000);
  };
  
  const markDayAsCompleted = (day: string) => {
    const weekKey = getCurrentWeekKey();
    const dayKey = `${weekKey}-${day}`;
    
    // Check if the day is already completed
    if (completedDays[dayKey]) {
      return;
    }
    
    // Update completed days
    const updatedCompletedDays = {
      ...completedDays,
      [dayKey]: true
    };
    
    // Update tokens - still give 1 token for marking the whole day at once
    const newTokens = tokens + 1;
    
    // Calculate streak
    let newStreak = streak;
    
    // If we completed a consecutive day, increase streak
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayIndex = daysOfWeek.indexOf(day);
    
    if (dayIndex > 0) {
      const previousDay = daysOfWeek[dayIndex - 1];
      const previousDayKey = `${weekKey}-${previousDay}`;
      
      if (completedDays[previousDayKey]) {
        newStreak += 1;
      } else {
        // Reset streak if previous day wasn't completed
        newStreak = 1;
      }
    } else if (dayIndex === 0) {
      // It's Monday, start of a new streak
      newStreak = 1;
    }
    
    // Also mark all meals for this day as completed
    const mealTypes = ['breakfast', 'morningSnack', 'lunch', 'afternoonSnack', 'dinner'];
    const updatedCompletedMeals = {...completedMeals};
    
    mealTypes.forEach(mealType => {
      const mealKey = `${weekKey}-${day}-${mealType}`;
      updatedCompletedMeals[mealKey] = true;
    });
    
    // Save to state and localStorage
    setTokens(newTokens);
    setStreak(newStreak);
    setCompletedDays(updatedCompletedDays);
    setCompletedMeals(updatedCompletedMeals);
    
    localStorage.setItem('fitness-tokens', newTokens.toString());
    localStorage.setItem('fitness-streak', newStreak.toString());
    localStorage.setItem('fitness-completed-days', JSON.stringify(updatedCompletedDays));
    localStorage.setItem('fitness-completed-meals', JSON.stringify(updatedCompletedMeals));
    
    // Show token animation with 1 full token
    setAnimationTokenAmount(1);
    setIsShowingTokenAnimation(true);
    setTimeout(() => setIsShowingTokenAnimation(false), 2000);
  };
  
  return (
    <TokenContext.Provider
      value={{
        tokens,
        streak,
        completedDays,
        completedMeals,
        markDayAsCompleted,
        markMealAsCompleted,
        isShowingTokenAnimation,
        animationTokenAmount
      }}
    >
      {children}
      
      {/* Token animation overlay */}
      <AnimatePresence>
        {isShowingTokenAnimation && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <motion.div 
              className="bg-fitness-primary text-white font-bold rounded-full w-24 h-24 flex items-center justify-center text-xl"
              animate={{ 
                y: [0, -50, -100],
                opacity: [1, 1, 0] 
              }}
              transition={{ duration: 1.5 }}
            >
              +{animationTokenAmount} Token{animationTokenAmount !== 1 ? 's' : ''}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TokenContext.Provider>
  );
}

export function useTokens() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useTokens must be used within a TokenProvider");
  }
  return context;
} 