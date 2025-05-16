import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import PersonalInfoStep from "@/components/onboarding/PersonalInfoStep";
import ActivityStep from "@/components/onboarding/ActivityStep";
import DietGoalsStep from "@/components/onboarding/DietGoalsStep";
import CompletionStep from "@/components/onboarding/CompletionStep";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [userData, setUserData] = useState({
    personalInfo: null,
    activityInfo: null,
    dietGoals: null
  });

  // Debug userData changes
  useEffect(() => {
    console.log("userData updated:", userData);
  }, [userData]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // All steps completed, redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updatePersonalInfo = (data) => {
    console.log("Personal info updated with:", data);
    setUserData({ ...userData, personalInfo: data });
  };

  const updateActivityInfo = (data) => {
    console.log("Activity info updated with:", data);
    setUserData({ ...userData, activityInfo: data });
  };
  
  const updateDietGoals = (data) => {
    console.log("Diet goals updated with:", data);
    setUserData({ ...userData, dietGoals: data });
  };
  
  const isNextDisabled = () => {
    return false;
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
      isNextDisabled={isNextDisabled()}
    >
      {currentStep === 1 && (
        <PersonalInfoStep onDataChange={updatePersonalInfo} defaultValues={userData.personalInfo} />
      )}
      
      {currentStep === 2 && (
        <ActivityStep onDataChange={updateActivityInfo} defaultValues={userData.activityInfo} />
      )}
      
      {currentStep === 3 && (
        <DietGoalsStep onDataChange={updateDietGoals} defaultValues={userData.dietGoals} />
      )}
      
      {currentStep === 4 && (
        <CompletionStep userData={userData} />
      )}
    </OnboardingLayout>
  );
};

export default OnboardingPage;
