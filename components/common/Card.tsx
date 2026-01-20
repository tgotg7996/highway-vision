import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid';
  interactive?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  interactive = false,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'card-base';
  const variantClasses = {
    glass: 'card-glass',
    solid: 'card-solid',
  };
  
  const interactiveClasses = interactive ? 'card-interactive clickable' : '';

  const classes = [
    baseClasses,
    variantClasses[variant],
    interactiveClasses,
    className,
  ].join(' ');

  const Component = interactive ? 'button' : 'div';

  return (
    <Component
      className={classes}
      onClick={onClick}
      {...(interactive && { type: 'button', role: 'button', tabIndex: 0 })}
      {...props}
    >
      {children}
    </Component>
  );
};
