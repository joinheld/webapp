import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Flower, Sun, Moon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface NavbarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, toggleMenu }) => {
  const { appState, toggleDarkMode } = useAppContext();
  const { darkMode } = appState;

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.07,
        delayChildren: 0.1,
      }
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Flower className="w-8 h-8 text-primary-300" />
            <span className="text-xl font-serif font-semibold text-primary-600">held</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/mental-health" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary-500 font-medium" 
                  : "text-neutral-600 hover:text-primary-500 transition-colors"
              }
            >
              Mental Health
            </NavLink>
            <NavLink 
              to="/physical-recovery" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary-500 font-medium" 
                  : "text-neutral-600 hover:text-primary-500 transition-colors"
              }
            >
              Physical Recovery
            </NavLink>
            <NavLink 
              to="/breastfeeding" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary-500 font-medium" 
                  : "text-neutral-600 hover:text-primary-500 transition-colors"
              }
            >
              Feeding
            </NavLink>
            <NavLink 
              to="/community" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary-500 font-medium" 
                  : "text-neutral-600 hover:text-primary-500 transition-colors"
              }
            >
              Community
            </NavLink>
            <NavLink 
              to="/journal" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary-500 font-medium" 
                  : "text-neutral-600 hover:text-primary-500 transition-colors"
              }
            >
              Journal
            </NavLink>
            <NavLink 
              to="/resources" 
              className={({ isActive }) => 
                isActive 
                  ? "text-primary-500 font-medium" 
                  : "text-neutral-600 hover:text-primary-500 transition-colors"
              }
            >
              Resources
            </NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button 
              className="md:hidden p-2 rounded-full hover:bg-neutral-100 transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 pt-16"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-6">
                {[
                  { to: '/mental-health', label: 'Mental Health' },
                  { to: '/physical-recovery', label: 'Physical Recovery' },
                  { to: '/breastfeeding', label: 'Feeding Support' },
                  { to: '/community', label: 'Community' },
                  { to: '/journal', label: 'Journal' },
                  { to: '/healthcare', label: 'Healthcare Guide' },
                  { to: '/resources', label: 'Resources' },
                ].map((item) => (
                  <motion.div key={item.to} variants={itemVariants}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `text-xl ${isActive ? 'text-primary-500 font-medium' : 'text-neutral-700'}`
                      }
                      onClick={toggleMenu}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;