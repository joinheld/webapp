import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
  icon?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  image,
  icon,
}) => {
  return (
    <div className="mb-8">
      <div className="relative">
        {image && (
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/80 to-secondary-500/60"></div>
          </div>
        )}
        
        <div className={`${image ? 'relative text-white py-12 px-8' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center mb-3"
          >
            {icon && (
              <div className={`mr-3 ${image ? 'text-white' : 'text-primary-400'}`}>
                {icon}
              </div>
            )}
            <h1 className="font-serif font-bold">{title}</h1>
          </motion.div>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`text-lg ${image ? 'text-white/90' : 'text-neutral-600'} max-w-2xl`}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;