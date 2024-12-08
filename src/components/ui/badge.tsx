import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'secondary' | 'outline';
}

export default function Badge({ children, className = '', onClick, variant = 'default' }: BadgeProps) {
  const baseStyles = 'py-2 px-4 rounded-lg cursor-pointer transition-all duration-200 font-medium';
  
  const variantStyles = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200',
    outline: 'border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 bg-white'
  };

  return (
    <span 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
