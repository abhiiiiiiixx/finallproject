
import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled?: boolean;
}

const OnboardingLayout = ({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  isNextDisabled = false,
}: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-fitness-primary">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-fitness-primary h-2 rounded-full"
              initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8 mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between">
          {currentStep > 1 ? (
            <button
              onClick={onPrev}
              className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}
          <button
            onClick={onNext}
            disabled={isNextDisabled}
            className={`px-8 py-2 rounded-lg bg-fitness-primary text-white ${
              isNextDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-fitness-primary/90"
            } transition-colors`}
          >
            {currentStep === totalSteps ? "Complete" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
