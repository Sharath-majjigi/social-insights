import { useEffect, useRef, useState } from 'react';

interface ScrollIndicatorProps {
  containerRef: React.RefObject<HTMLDivElement>;
  className?: string;
}

export function ScrollIndicator({ containerRef, className = "" }: ScrollIndicatorProps) {
  const [showIndicator, setShowIndicator] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const canScroll = scrollWidth > clientWidth;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      
      setShowIndicator(canScroll);
      setScrollProgress(progress);
    };

    // Check initial state
    handleScroll();
    
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [containerRef]);

  if (!showIndicator) return null;

  return (
    <div className={`flex justify-center gap-1 mt-2 lg:hidden ${className}`}>
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
            Math.abs(index / 2 - scrollProgress) < 0.5
              ? 'bg-primary'
              : 'bg-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}