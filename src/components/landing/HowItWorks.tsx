
import { useRef } from "react";
import { MotionDiv } from "@/components/ui/motion-div";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Complete Onboarding",
    description:
      "Answer questions about your diet preferences, health goals, and lifestyle to personalize your experience.",
    color: "bg-fitness-primary",
  },
  {
    number: "02",
    title: "Get Personalized Plan",
    description:
      "Receive a custom 7-day meal plan tailored to your specific needs, preferences, and goals.",
    color: "bg-fitness-secondary",
  },
  {
    number: "03",
    title: "Track Your Progress",
    description:
      "Log your meals, track your weight changes, and monitor your progress with our analytics dashboard.",
    color: "bg-fitness-accent",
  },
  {
    number: "04",
    title: "Adjust & Optimize",
    description:
      "Get recommendations to adjust your plan based on your progress and feedback for continuous improvement.",
    color: "bg-fitness-green",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-fitness-primary/5 filter blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-fitness-secondary/5 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            How FitLife 
            <span className="text-fitness-primary"> Works </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Our simple 4-step process to help you achieve your diet and fitness goals
          </motion.p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-700 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all"
            >
              <div className={`${step.color} text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg mb-5`}>
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </MotionDiv>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-panel dark:glass-panel-dark p-8"
          >
            <h3 className="text-2xl font-semibold mb-4">Ready to get started?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands who have already transformed their relationship with food and fitness.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-fitness-primary hover:bg-fitness-primary/90 text-white px-8 py-3 rounded-full font-medium"
            >
              Create Your Account
            </motion.button>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
