import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoading } from '@/lib/LoadingContext';

/**
 * Custom hook to handle loading state during navigation
 * - With optimized performance - skip loading state when possible
 */
export const useLoadingNavigation = () => {
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  
  // Function to navigate with loading state
  const navigateWithLoading = (to: string) => {
    // Skip loading state for fast navigation
    navigate(to);
  };
  
  return { navigateWithLoading };
};

/**
 * Custom hook to ensure loading is turned off when page completes loading
 * - With minimal timeouts for faster perceived performance
 */
export const useEnsureLoaded = () => {
  const { setIsLoading } = useLoading();
  const location = useLocation();
  
  useEffect(() => {
    // Immediately turn off loading when component mounts
    setIsLoading(false);
  }, [location, setIsLoading]);
  
  return null;
}; 