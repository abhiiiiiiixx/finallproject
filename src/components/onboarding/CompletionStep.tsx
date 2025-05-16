import { motion } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";

const CompletionStep = ({ userData }: { userData: any }) => {
  // For debugging - output structured data
  console.log("User data in completion step:", {
    personalInfo: userData.personalInfo,
    personalInfo_fullName: userData.personalInfo?.fullName,
    personalInfo_gender: userData.personalInfo?.gender,
    dietGoals_age: userData.dietGoals?.age,
    dietGoals_preference: userData.dietGoals?.dietPreference
  });
  
  // Additional debug to check more specific issues
  console.log("Name check:", {
    hasPersonalInfo: Boolean(userData.personalInfo),
    fullNameValue: userData.personalInfo?.fullName,
    fullNameType: typeof userData.personalInfo?.fullName,
    fullNameLength: userData.personalInfo?.fullName?.length,
    isEmpty: userData.personalInfo?.fullName === "",
    isUndefined: userData.personalInfo?.fullName === undefined,
    isNull: userData.personalInfo?.fullName === null,
  });
  
  // Format the weight to consistently show one decimal place
  const formatWeight = (weight: number | undefined): string => {
    if (weight === undefined || isNaN(weight)) return "Not provided";
    return weight.toFixed(1) + " kg";
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-20 h-20 rounded-full bg-fitness-primary/20 flex items-center justify-center mb-6"
      >
        <CheckCircleIcon className="h-12 w-12 text-fitness-primary" />
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold mb-2 text-center"
      >
        Profile Complete!
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-muted-foreground text-center mb-8"
      >
        We're generating your personalized diet plan based on your profile
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-md bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-8"
      >
        <h3 className="font-semibold mb-4">Your Profile Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground"></span>
            <span className="font-medium">
              {/* {userData.personalInfo?.fullName ?  */}
                {/* userData.personalInfo.fullName :  */}
                {/* ""} */}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Age:</span>
            <span className="font-medium">{userData.dietGoals?.age || "Not provided"} {userData.dietGoals?.age ? "years" : ""}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Gender:</span>
            <span className="font-medium capitalize">{userData.personalInfo?.gender || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Height:</span>
            <span className="font-medium">{userData.dietGoals?.height || "Not provided"} {userData.dietGoals?.height ? "cm" : ""}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground"></span>
            {/* <span className="font-medium">{userData.dietGoals?.weight ? formatWeight(userData.dietGoals.weight) : ""}</span> */}
          </div>
          <div className="flex justify-between">
            {/* <span className="text-muted-foreground">Diet Preference:</span> */}
            {/* <span className="font-medium capitalize">{userData.dietGoals?.dietPreference?.replace("-", " ") || "Not provided"}</span> */}
          </div>
          <div className="flex justify-between">
            {/* <span className="text-muted-foreground">Health Goal:</span> */}
            {/* <span className="font-medium capitalize">{userData.dietGoals?.healthGoal?.replace("-", " ") || "Not provided"}</span> */}
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center"
      >
        <div className="animate-pulse flex items-center space-x-2 text-fitness-primary">
          <div className="w-3 h-3 bg-fitness-primary rounded-full"></div>
          <div className="text-sm font-medium">Preparing your dashboard...</div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompletionStep;
