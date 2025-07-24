import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Brain, 
  Activity, 
  Baby, 
  Users, 
  BookHeart 
} from 'lucide-react';

const BottomNav: React.FC = () => {
  const navItems = [
    { to: '/', icon: <Home className="w-6 h-6" />, label: 'Home' },
    { to: '/mental-health', icon: <Brain className="w-6 h-6" />, label: 'Mental' },
    { to: '/physical-recovery', icon: <Activity className="w-6 h-6" />, label: 'Physical' },
    { to: '/breastfeeding', icon: <Baby className="w-6 h-6" />, label: 'Feeding' },
    { to: '/community', icon: <Users className="w-6 h-6" />, label: 'Community' },
    { to: '/journal', icon: <BookHeart className="w-6 h-6" />, label: 'Journal' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
      <div className="grid grid-cols-6 h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center transition-colors ${
                isActive 
                  ? 'text-primary-500' 
                  : 'text-neutral-500 hover:text-primary-400'
              }`
            }
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;