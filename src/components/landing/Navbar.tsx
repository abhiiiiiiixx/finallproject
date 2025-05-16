import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/ui/motion-div";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for the navbar height
        behavior: "smooth",
      });
    }
  };

  return (
    <MotionDiv
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-fitness-primary">FitLife</span>
        </Link>

        <div className="hidden md:flex space-x-8 items-center">
          <button 
            onClick={() => scrollToSection("features")} 
            className="font-medium text-foreground/80 hover:text-fitness-primary transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection("plans")} 
            className="font-medium text-foreground/80 hover:text-fitness-primary transition-colors"
          >
            Plans
          </button>
          <button 
            onClick={() => scrollToSection("testimonials")} 
            className="font-medium text-foreground/80 hover:text-fitness-primary transition-colors"
          >
            Testimonials
          </button>
          <button 
            onClick={() => scrollToSection("faq")} 
            className="font-medium text-foreground/80 hover:text-fitness-primary transition-colors"
          >
            FAQ
          </button>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline" className="rounded-full">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="rounded-full bg-fitness-primary hover:bg-fitness-primary/90">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </MotionDiv>
  );
};

export default Navbar;
