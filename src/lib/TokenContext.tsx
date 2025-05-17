import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface CompletedDay {
  date: string;
  dayOfWeek: string;
}

interface TokenContextType {
  tokens: number;
  setTokens: (tokens: number) => void;
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
// This function is critical for consistency - don't modify without updating all references
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
    console.log('API not available, using localStorage');
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
  
  // For debugging - remove in production
  useEffect(() => {
    console.log('Current tokens state:', { tokens, streak, completedDays, completedMeals });
  }, [tokens, streak, completedDays, completedMeals]);
  
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
    try {
      const savedTokens = localStorage.getItem('fitness-tokens');
      const savedStreak = localStorage.getItem('fitness-streak');
      const savedCompletedDays = localStorage.getItem('fitness-completed-days');
      const savedCompletedMeals = localStorage.getItem('fitness-completed-meals');
      
      console.log('Loading from localStorage:', { 
        savedTokens, 
        savedStreak, 
        hasCompletedDays: !!savedCompletedDays,
        hasCompletedMeals: !!savedCompletedMeals
      });
      
      if (savedTokens) setTokens(parseFloat(savedTokens));
      if (savedStreak) setStreak(parseInt(savedStreak));
      if (savedCompletedDays) setCompletedDays(JSON.parse(savedCompletedDays));
      if (savedCompletedMeals) setCompletedMeals(JSON.parse(savedCompletedMeals));
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  };
  
  // Custom setter for tokens that also updates localStorage
  const updateTokens = (newTokens: number) => {
    setTokens(newTokens);
    localStorage.setItem('fitness-tokens', newTokens.toString());
    console.log('Updated tokens:', newTokens);
  };
  
  const markMealAsCompleted = (day: string, mealType: string) => {
    // Normalize day name to ensure consistency
    const normalizedDay = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
    const normalizedMealType = mealType.toLowerCase();
    
    console.log(`Marking meal as completed: ${normalizedDay} - ${normalizedMealType}`);
    
    const weekKey = getCurrentWeekKey();
    const mealKey = `${weekKey}-${normalizedDay}-${normalizedMealType}`;
    
    // Check if the meal is already completed
    if (completedMeals[mealKey]) {
      console.log('Meal already completed:', mealKey);
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
      const key = `${weekKey}-${normalizedDay}-${meal}`;
      return meal === normalizedMealType || updatedCompletedMeals[key];
    });
    
    // Update completed days if all meals are completed
    let updatedCompletedDays = {...completedDays};
    let newStreak = streak;
    
    if (allMealsCompleted) {
      const dayKey = `${weekKey}-${normalizedDay}`;
      updatedCompletedDays[dayKey] = true;
      
      // If we completed a consecutive day, increase streak
      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const dayIndex = daysOfWeek.indexOf(normalizedDay);
      
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
    updateTokens(newTokens);
    setCompletedMeals(updatedCompletedMeals);
    
    localStorage.setItem('fitness-completed-meals', JSON.stringify(updatedCompletedMeals));
    
    // Show token animation
    setAnimationTokenAmount(0.1);
    setIsShowingTokenAnimation(true);
    setTimeout(() => setIsShowingTokenAnimation(false), 2000);
  };
  
  const markDayAsCompleted = (day: string) => {
    // Normalize day name to ensure consistency
    const normalizedDay = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
    
    console.log(`Marking day as completed: ${normalizedDay}`);
    
    const weekKey = getCurrentWeekKey();
    const dayKey = `${weekKey}-${normalizedDay}`;
    
    // Check if the day is already completed
    if (completedDays[dayKey]) {
      console.log('Day already completed:', dayKey);
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
    const dayIndex = daysOfWeek.indexOf(normalizedDay);
    
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
      const mealKey = `${weekKey}-${normalizedDay}-${mealType}`;
      updatedCompletedMeals[mealKey] = true;
    });
    
    console.log('Updating after day completion:', {
      newTokens,
      newStreak,
      updatedCompletedDays,
      updatedCompletedMeals
    });
    
    // Save to state and localStorage
    updateTokens(newTokens);
    setStreak(newStreak);
    setCompletedDays(updatedCompletedDays);
    setCompletedMeals(updatedCompletedMeals);
    
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
        setTokens: updateTokens,
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