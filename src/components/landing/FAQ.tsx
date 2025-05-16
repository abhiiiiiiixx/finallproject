import { useState } from "react";
import { motion } from "framer-motion";

const faqItems = [
  {
    question: "How does the personalized diet plan work?",
    answer: "Our AI analyzes your preferences, goals, and restrictions to create a tailored meal plan. It considers factors like your dietary preferences (vegetarian, non-vegetarian, etc.), health goals (weight loss, gain, maintenance), and any medical conditions to provide optimal nutrition."
  },
  {
    question: "Can I change my diet preferences after signing up?",
    answer: "Yes, you can update your diet preferences and health goals any time from your profile settings. Your meal plans will automatically adjust to reflect your new choices."
  },
  {
    question: "How often are the meal plans updated?",
    answer: "We provide a new 7-day meal plan each week, but you can refresh your plan at any time if you want new meal suggestions while maintaining your nutritional goals."
  },
  {
    question: "Are meal plans suitable for people with medical conditions?",
    answer: "Yes, our system takes into account common medical conditions like diabetes, hypertension, and thyroid issues. However, we recommend consulting with your healthcare provider before making significant dietary changes."
  },
  {
    question: "Can I customize individual meals in my plan?",
    answer: "Absolutely! You can swap meals you don't like with alternate suggestions that maintain similar nutritional values, or adjust portion sizes based on your needs."
  },
  {
    question: "Is there a mobile app available?",
    answer: "Yes, we offer both web and mobile applications for iOS and Android, providing a seamless experience across all your devices."
  },
];

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Frequently Asked 
            <span className="text-fitness-primary"> Questions </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Find answers to the most common questions about our platform
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleExpand(index)}
                className="w-full text-left p-5 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-lg">{item.question}</h3>
                  <span className="text-xl transition-transform duration-300" style={{ transform: expandedIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </div>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-muted-foreground"
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 