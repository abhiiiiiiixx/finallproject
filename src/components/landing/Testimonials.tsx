
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/ui/motion-div";

const testimonials = [
  {
    id: 1,
    name: "Sarah J.",
    role: "Lost 15kg in 4 months",
    content: "FitLife completely changed my relationship with food. The personalized meal plans made healthy eating enjoyable, and the progress tracking kept me motivated throughout my journey.",
    image: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "Michael R.",
    role: "Gained 8kg muscle mass",
    content: "As someone looking to build muscle, the protein-focused meal plans were exactly what I needed. The app's ability to adjust macros based on my training schedule was a game changer.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    name: "Priya K.",
    role: "Managing PCOS through diet",
    content: "Finding a diet app that understood my medical needs was difficult until I found FitLife. The meal plans designed for my PCOS have helped reduce my symptoms significantly.",
    image: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 4,
    name: "David L.",
    role: "Maintaining after weight loss",
    content: "After losing weight, I struggled to maintain. FitLife's maintenance plans and habit building features helped me stay on track without feeling restricted.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-fitness-primary/5 filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-fitness-secondary/5 filter blur-3xl"></div>
      </div>
      
      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            What Our Users 
            <span className="text-fitness-primary"> Say </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Join thousands of users who have transformed their lives with our personalized approach to nutrition
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Mobile testimonials (slider) */}
          <div className="block md:hidden">
            <AnimatePresence mode="wait">
              <MotionDiv
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-base font-medium text-gray-700 dark:text-gray-300 italic mb-4">
                    "{testimonials[currentIndex].content}"
                  </p>
                  <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-fitness-primary">{testimonials[currentIndex].role}</p>
                </div>
              </MotionDiv>
            </AnimatePresence>

            <div className="flex justify-center mt-6 gap-4">
              <Button size="icon" variant="outline" onClick={prevTestimonial}>
                ←
              </Button>
              <Button size="icon" variant="outline" onClick={nextTestimonial}>
                →
              </Button>
            </div>
          </div>

          {/* Desktop testimonials (grid) */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <MotionDiv
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-fitness-primary">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-base font-medium text-gray-700 dark:text-gray-300 italic">
                  "{testimonial.content}"
                </p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
