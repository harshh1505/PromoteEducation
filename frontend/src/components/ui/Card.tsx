import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card = ({
  children,
  className,
  hover = true,
  glass = false,
}: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300',
        hover && 'hover:shadow-xl hover:-translate-y-1 hover:border-[var(--action)]/20',
        glass && 'bg-white/70 backdrop-blur-md border-white/20',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('mb-4', className)}>{children}</div>
);

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('space-y-4', className)}>{children}</div>
);

export const CardFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('mt-6 pt-4 border-t border-[var(--border)]', className)}>{children}</div>
);
