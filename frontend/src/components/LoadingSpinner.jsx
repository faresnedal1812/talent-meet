import { motion } from "framer-motion";
// duration: 1, repeat: Infinity, ease: "linear"
const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 rounded-full border-4 border-primary/10 border-t-primary"
      />
    </div>
  );
};

export default LoadingSpinner;
