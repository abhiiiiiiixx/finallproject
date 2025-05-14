
import { useEffect, useRef } from "react";
import { MotionDiv } from "@/components/ui/motion-div";
import { motion, useInView } from "framer-motion";
import { 
  BarChartIcon, 
  SparkleIcon, 
  BellRingIcon, 
  ImageIcon,
  DatabaseIcon, 
  TrendingUpIcon, 
  RefreshCwIcon,
  MoonIcon 
} from "lucide-react";

const featuresList = [
  {
    title: "Personalized Diet Plan",
    description: "Get a tailored 7-day meal plan matching your goals, preferences, and dietary restrictions.",
    icon: <SparkleIcon className="w-8 h-8 text-fitness-primary" />,
    delay: 0.1,
  },
  {
    title: "Progress Tracking",
    description: "Monitor your progress with detailed charts and analytics to stay motivated.",
    icon: <BarChartIcon className="w-8 h-8 text-fitness-secondary" />,
    delay: 0.2,
  },
  {
    title: "Smart Food Recognition",
    description: "Simply take a photo of your meal to instantly log nutrition info and calories.",
    icon: <ImageIcon className="w-8 h-8 text-fitness-accent" />,
    delay: 0.3,
  },
  {
    title: "Meal Reminders",
    description: "Never miss a meal with customizable notifications and reminders.",
    icon: <BellRingIcon className="w-8 h-8 text-fitness-yellow" />,
    delay: 0.4,
  },
  {
    title: "Intelligent Meal Swaps",
    description: "Not feeling a meal? Get smart alternative options that maintain your nutritional needs.",
    icon: <RefreshCwIcon className="w-8 h-8 text-fitness-green" />,
    delay: 0.5,
  },
  {
    title: "Goal Forecasting",
    description: "See projected results with our ML-powered prediction models based on your activity.",
    icon: <TrendingUpIcon className="w-8 h-8 text-fitness-red" />,
    delay: 0.6,
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-20 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-fitness-primary/5 filter blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-72 h-72 rounded-full bg-fitness-secondary/5 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Transform Your Diet with
            <span className="text-fitness-primary"> Smart </span>
            Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Our platform combines AI technology with nutritional science to help you reach your health goals effectively and sustainably.
          </motion.p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {featuresList.map((feature, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 inline-block mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
