import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  // Default to not loading for faster initial render
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg">
            <div className="relative w-12 h-12 mx-auto mb-3">
              <div className="absolute top-0 left-0 w-full h-full border-3 border-gray-200 rounded-full"></div>
              <div 
                className="absolute top-0 left-0 w-full h-full border-3 border-t-fitness-primary rounded-full animate-spin"
                style={{ animationDuration: '0.7s' }}
              />
            </div>
            <h2 className="text-lg font-semibold mb-1">Preparing your dashboard...</h2>
            <p className="text-sm text-muted-foreground">Almost ready</p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}; 