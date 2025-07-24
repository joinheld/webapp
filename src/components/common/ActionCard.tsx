import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color: 'primary' | 'secondary' | 'accent' | string;
  delay?: number;
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  to,
  color = 'primary',
  delay = 0,
}) => {
  // Get the color class based on the color prop
  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case 'primary':
        return 'bg-primary-50 border-primary-200 hover:border-primary-300';
      case 'secondary':
        return 'bg-secondary-50 border-secondary-200 hover:border-secondary-300';
      case 'accent':
        return 'bg-accent-50 border-accent-200 hover:border-accent-300';
      default:
        return 'bg-primary-50 border-primary-200 hover:border-primary-300';
    }
  };

  const getIconColorClass = (colorName: string) => {
    switch (colorName) {
      case 'primary':
        return 'text-primary-500';
      case 'secondary':
        return 'text-secondary-500';
      case 'accent':
        return 'text-accent-500';
      default:
        return 'text-primary-500';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay * 0.1
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <Link to={to} className="block">
        <div className={`rounded-xl border-2 p-6 h-full transition-all duration-300 ${getColorClass(color)}`}>
          <div className={`mb-4 ${getIconColorClass(color)}`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold font-serif mb-2">{title}</h3>
          <p className="text-neutral-600">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ActionCard;