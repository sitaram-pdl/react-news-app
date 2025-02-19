import React from 'react';

type TypographyProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'small' | 'caption';
  className?: string;
  children: React.ReactNode;
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'p',
  className = '',
  children,
}) => {
  const Component = variant as keyof JSX.IntrinsicElements;

  const responsiveStyles: Record<string, string> = {
    h1: 'text-3xl md:text-4xl lg:text-h1',
    h2: 'text-2xl md:text-3xl lg:text-h2',
    h3: 'text-xl md:text-2xl lg:text-h3',
    h4: 'text-lg md:text-xl lg:text-h4',
    h5: 'text-base md:text-lg lg:text-h5',
    p: 'text-base lg:text-p',
    small: 'text-sm lg:text-small',
    caption: 'text-xs lg:text-caption',
  };
  if (variant === 'caption') {
    return (
      <p className={`${responsiveStyles[variant]} ${className}`}>{children}</p>
    );
  }

  return (
    <Component className={`${responsiveStyles[variant]} ${className}`}>
      {children}
    </Component>
  );
};
