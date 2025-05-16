import { createContext, useContext, useState, ReactNode } from "react";

type DietPreference = 'vegetarian' | 'non-vegetarian' | 'semi-vegetarian';
type HealthGoal = 'weight-loss' | 'weight-gain' | 'maintenance';

interface DietPreferenceContextType {
  dietPreference: DietPreference;
  healthGoal: HealthGoal;
  setDietPreference: (preference: DietPreference) => void;
  setHealthGoal: (goal: HealthGoal) => void;
}

const DietPreferenceContext = createContext<DietPreferenceContextType | undefined>(undefined);

export function DietPreferenceProvider({ children }: { children: ReactNode }) {
  const [dietPreference, setDietPreference] = useState<DietPreference>('non-vegetarian');
  const [healthGoal, setHealthGoal] = useState<HealthGoal>('weight-loss');

  return (
    <DietPreferenceContext.Provider
      value={{
        dietPreference,
        healthGoal,
        setDietPreference,
        setHealthGoal
      }}
    >
      {children}
    </DietPreferenceContext.Provider>
  );
}

export function useDietPreference() {
  const context = useContext(DietPreferenceContext);
  if (context === undefined) {
    throw new Error("useDietPreference must be used within a DietPreferenceProvider");
  }
  return context;
} 