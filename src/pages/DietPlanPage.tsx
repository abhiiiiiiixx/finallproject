
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DietPlanGenerator from "@/components/dashboard/DietPlanGenerator";

const DietPlanPage = () => {
  return (
    <DashboardLayout activeTab="diet">
      <DietPlanGenerator />
    </DashboardLayout>
  );
};

export default DietPlanPage;
