import { motion, useReducedMotion } from "framer-motion";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

const variants = {
  primary: "bg-red-500 text-white hover:bg-red-600",
  secondary: "bg-white text-red-600 hover:bg-red-50",
  soft: "bg-red-50 text-red-600 hover:bg-red-100",
};

  return (
    <motion.button
      type={type}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      className={`rounded-2xl px-5 py-3 font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
