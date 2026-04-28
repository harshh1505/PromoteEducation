import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: 'bg-[var(--action)] text-white hover:opacity-90 shadow-sm hover:shadow-md',
    secondary: 'bg-[var(--gold-light)] text-[var(--gold-dark)] hover:bg-[var(--gold)] hover:text-white',
    outline: 'border-2 border-[var(--border)] bg-transparent hover:border-[var(--action)] hover:text-[var(--action)]',
    ghost: 'bg-transparent hover:bg-[var(--surface-2)] text-[var(--ink-2)]',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm rounded-lg',
    md: 'px-6 py-2.5 text-base font-medium rounded-xl',
    lg: 'px-8 py-3.5 text-lg font-semibold rounded-2xl',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
