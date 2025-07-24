import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  type = 'button',
}) => {
  // Get variant classes
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-300 text-white hover:bg-primary-400 active:bg-primary-500';
      case 'secondary':
        return 'bg-secondary-300 text-white hover:bg-secondary-400 active:bg-secondary-500';
      case 'accent':
        return 'bg-accent-300 text-white hover:bg-accent-400 active:bg-accent-500';
      case 'outline':
        return 'bg-transparent border-2 border-primary-300 text-primary-300 hover:bg-primary-50 active:bg-primary-100';
      case 'ghost':
        return 'bg-transparent text-primary-300 hover:bg-primary-50 active:bg-primary-100';
      default:
        return 'bg-primary-300 text-white hover:bg-primary-400 active:bg-primary-500';
    }
  };

  // Get size classes
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'text-sm px-4 py-2';
      case 'md':
        return 'px-6 py-3';
      case 'lg':
        return 'text-lg px-8 py-4';
      default:
        return 'px-6 py-3';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-full transition-all duration-300 font-medium
        ${getVariantClass()}
        ${getSizeClass()}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <span className="flex items-center justify-center">
        {icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </span>
    </button>
  );
};

export default Button;