import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  size?: string;
  className?: string;
  variant?: string;
  onClick?: () => void;
}

export default function Button({ children, size, className, variant, onClick }: ButtonProps) {
  return (
    <button
      className={`bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
