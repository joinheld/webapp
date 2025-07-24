import React from 'react';
import { Link } from 'react-router-dom';
import { Flower, Heart, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 py-8 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <Flower className="w-6 h-6 text-primary-300 mr-2" />
              <span className="font-serif font-semibold text-xl text-primary-600">held</span>
            </div>
            <p className="text-neutral-600 mb-4">
              Comprehensive support for your postpartum journey, because every mom deserves care and understanding.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-500 hover:text-primary-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-neutral-800 mb-4">Features</h4>
            <ul className="space-y-2">
              <li><Link to="/mental-health" className="text-neutral-600 hover:text-primary-500 transition-colors">Mental Health</Link></li>
              <li><Link to="/physical-recovery" className="text-neutral-600 hover:text-primary-500 transition-colors">Physical Recovery</Link></li>
              <li><Link to="/breastfeeding" className="text-neutral-600 hover:text-primary-500 transition-colors">Feeding Support</Link></li>
              <li><Link to="/community" className="text-neutral-600 hover:text-primary-500 transition-colors">Community</Link></li>
              <li><Link to="/journal" className="text-neutral-600 hover:text-primary-500 transition-colors">Journal</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-neutral-800 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/resources" className="text-neutral-600 hover:text-primary-500 transition-colors">Articles</Link></li>
              <li><Link to="/healthcare" className="text-neutral-600 hover:text-primary-500 transition-colors">Healthcare Guide</Link></li>
              <li><Link to="/resources" className="text-neutral-600 hover:text-primary-500 transition-colors">Research</Link></li>
              <li><a href="#" className="text-neutral-600 hover:text-primary-500 transition-colors">Support Hotlines</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-neutral-800 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-600 hover:text-primary-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-primary-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-primary-500 transition-colors">Disclaimer</a></li>
              <li><a href="#" className="text-neutral-600 hover:text-primary-500 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
          <p className="text-neutral-600 text-sm flex items-center justify-center">
            Made with <Heart className="w-4 h-4 text-secondary-400 mx-1" /> for all mothers. held &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;