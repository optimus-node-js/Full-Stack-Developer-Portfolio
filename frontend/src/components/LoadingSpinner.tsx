interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  className = '' 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    accent: 'border-accent'
  };

  return (
    <div className={`
      ${sizeClasses[size]} 
      border-2 
      ${colorClasses[color]} 
      border-t-transparent 
      rounded-full 
      animate-spin 
      ${className}
    `} />
  );
};

export default LoadingSpinner;
