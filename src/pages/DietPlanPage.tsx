import { useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DietPlanGenerator from "@/components/dashboard/DietPlanGenerator";
import { useLoading } from "@/lib/LoadingContext";

const DietPlanPage = () => {
  const { setIsLoading } = useLoading();
  
  // Set loading to false when component mounts
  useEffect(() => {
    // Short timeout to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <DashboardLayout activeTab="diet">
      <DietPlanGenerator />
    </DashboardLayout>
  );
};

export default DietPlanPage;
