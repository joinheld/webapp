import React from 'react';
import { motion } from 'framer-motion';
import { Flower } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Flower className="w-16 h-16 text-primary-300" />
      </motion.div>
      <h3 className="mt-6 font-serif text-xl text-primary-600">Loading held...</h3>
      <motion.div 
        className="mt-4 h-1 w-48 bg-neutral-200 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-primary-300 rounded-full"
          animate={{ x: [-192, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;