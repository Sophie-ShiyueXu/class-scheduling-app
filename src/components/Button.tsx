import React from 'react';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

function Button({ onClick, children, disabled = false, className = '' }: Props) {
  return (
    <button
      type="button"
      className={`btn btn-primary ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;