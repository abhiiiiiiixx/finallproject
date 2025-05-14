
import { motion } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";

const CompletionStep = ({ userData }: { userData: any }) => {
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
            <span className="text-muted-foreground">Name:</span>
            <span className="font-medium">{userData.personalInfo?.fullName || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Age:</span>
            <span className="font-medium">{userData.personalInfo?.age || "Not provided"} years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Diet Preference:</span>
            <span className="font-medium capitalize">{userData.dietGoals?.dietPreference.replace("-", " ") || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Health Goal:</span>
            <span className="font-medium capitalize">{userData.dietGoals?.healthGoal.replace("-", " ") || "Not provided"}</span>
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
