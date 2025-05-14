
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/ui/motion-div";
import { motion } from "framer-motion";

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-fitness-primary/10 filter blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-fitness-secondary/10 filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-fitness-accent/10 filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center relative z-10">
        <motion.div 
          className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            Your Personal
            <span className="text-fitness-primary"> Nutrition </span>
            and 
            <span className="text-fitness-secondary"> Fitness </span>
            Coach
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            variants={itemVariants}
          >
            Get personalized diet plans, track your progress, and achieve your fitness goals with our AI-powered platform.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            variants={itemVariants}
          >
            <Link to="/register">
              <Button size="lg" className="rounded-full bg-fitness-primary hover:bg-fitness-primary/90 text-white px-8">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/#features">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        <MotionDiv 
          className="lg:w-1/2 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-panel p-6 rounded-3xl overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Healthy meal planning" 
              className="w-full h-auto rounded-2xl shadow-lg object-cover"
            />
            
            {/* Floating stats card */}
            <MotionDiv
              className="absolute -right-5 -bottom-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 w-48"
              initial={{ x: 50, y: 50, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Calories today</span>
                <span className="text-2xl font-bold">1,840 / 2,200</span>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-fitness-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </MotionDiv>
            
            {/* Floating meal card */}
            <MotionDiv
              className="absolute -left-5 top-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 max-w-[200px]"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <span className="text-green-500 text-lg">🥑</span>
                </div>
                <div>
                  <p className="font-medium">Breakfast</p>
                  <p className="text-xs text-muted-foreground">Avocado Toast</p>
                </div>
              </div>
            </MotionDiv>
          </div>
        </MotionDiv>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <div className="w-8 h-12 rounded-full border-2 border-gray-400 flex justify-center items-start p-2">
            <motion.div 
              className="w-1 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
