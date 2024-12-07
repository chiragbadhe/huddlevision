import { FC, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FramerMotionWrapperProps {
  children: ReactNode;
  className?: string;
  initial?: boolean;
  duration?: number;
  delay?: number;
}

const FramerMotionWrapper: FC<FramerMotionWrapperProps> = ({
  children,
  className = "",
  initial = true,
  duration = 0.4,
  delay = 0,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial={initial ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{
          duration,
          delay,
          ease: "easeOut",
          stiffness: 50,
          damping: 8,
          mass: 0.8
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FramerMotionWrapper;
