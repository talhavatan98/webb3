import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'secondary' | 'outline';
}

export default function Badge({ children, className = '', onClick, variant = 'default' }: BadgeProps) {
  const baseStyles = 'py-1 px-2 rounded cursor-pointer transition-all';
  
  const variantStyles = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    outline: 'border border-gray-200 bg-transparent hover:bg-gray-100'
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
