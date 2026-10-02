import { useRef, type ReactNode, type PointerEvent } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Animated gradient border that slowly travels around the card. */
  beam?: boolean;
}

/**
 * Card with a cursor-following glow. The pointer position is written to CSS
 * variables directly, so moving the mouse never triggers a React re-render.
 */
const SpotlightCard = ({ children, className, beam = false }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn('group/spot relative h-full rounded-3xl', beam && 'border-beam')}
    >
      <div className="relative h-full rounded-[inherit] border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden">
        <div className="spotlight-glow pointer-events-none absolute inset-0 opacity-0 group-hover/spot:opacity-100 transition-opacity duration-300" />
        <div className={cn('relative h-full', className)}>{children}</div>
      </div>
    </div>
  );
};

export default SpotlightCard;
