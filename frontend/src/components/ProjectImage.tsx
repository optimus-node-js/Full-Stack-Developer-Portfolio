import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ProjectImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const ProjectImage = ({ src, alt, title, className = '', loading = 'lazy' }: ProjectImageProps) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`relative flex items-center justify-center bg-gradient-to-br from-primary/15 via-background to-secondary/15 ${className}`}>
        <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />
        <div className="relative text-center px-4">
          <ImageOff className="h-6 w-6 text-muted-foreground/50 mx-auto mb-2" />
          <div className="text-sm font-heading font-semibold text-foreground/70">{title}</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export default ProjectImage;
