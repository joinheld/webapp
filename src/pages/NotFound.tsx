import React from 'react';
import { motion } from 'framer-motion';
import { Flower, Home, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-8"
      >
        <Flower className="w-10 h-10 text-primary-300 mr-3" />
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-600">held</h1>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-medium w-full max-w-md p-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-4xl font-serif font-bold mb-2">404</h2>
          <h3 className="text-2xl font-serif font-semibold mb-4">Page Not Found</h3>
          <p className="text-neutral-600 mb-8">
            The page you're looking for doesn't seem to exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="primary"
              onClick={() => navigate('/')}
              icon={<Home className="w-5 h-5" />}
            >
              Go Home
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              icon={<ArrowLeft className="w-5 h-5" />}
            >
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;