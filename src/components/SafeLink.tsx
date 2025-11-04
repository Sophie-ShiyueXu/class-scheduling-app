import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

interface SafeLinkProps {
  to: string;
  params?: Record<string, string>;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: ReactNode;
}

function SafeLink({ to, params, className, onClick, children }: SafeLinkProps) {
  try {
    return (
      <Link 
        to={to as any}
        params={params as any}
        className={className}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  } catch (error) {
    console.warn('Link component failed, falling back to button:', error);
    return (
      <button 
        className={className}
        onClick={(e) => {
          onClick?.(e);
          const url = to.replace(/\$(\w+)/g, (match, paramName) => {
            return params?.[paramName] || match;
          });
          window.location.href = url;
        }}
      >
        {children}
      </button>
    );
  }
}

export default SafeLink;