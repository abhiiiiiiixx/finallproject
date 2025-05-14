
"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";

interface MotionDivProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div ref={ref} {...props}>
        {children}
      </motion.div>
    );
  }
);

MotionDiv.displayName = "MotionDiv";

export { MotionDiv };
