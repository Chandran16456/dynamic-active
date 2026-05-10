import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedPage({ children, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.main
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? {} : { opacity: 0, y: -14 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.main>
  );
}
