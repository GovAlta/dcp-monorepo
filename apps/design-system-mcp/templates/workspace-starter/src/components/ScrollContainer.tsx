import { useRef, useState, useEffect, type ReactNode } from 'react';

interface ScrollContainerProps {
  children: ReactNode;
}

/**
 * ScrollContainer - Horizontal scroll container with edge shadows
 *
 * Wraps content that may need horizontal scrolling (like tables) and
 * shows visual shadows at the edges to indicate more content.
 *
 * Usage:
 * ```tsx
 * <ScrollContainer>
 *   <GoabTable>...</GoabTable>
 * </ScrollContainer>
 * ```
 */
export function ScrollContainer({ children }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const hasOverflow = el.scrollWidth > el.clientWidth;
    setShowLeftShadow(hasOverflow && el.scrollLeft > 0);
    setShowRightShadow(
      hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1
    );
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <div className="scroll-container-wrapper">
      {showLeftShadow && <div className="scroll-shadow scroll-shadow--left" />}
      <div
        ref={containerRef}
        className="scroll-container"
        onScroll={checkScroll}
      >
        {children}
      </div>
      {showRightShadow && <div className="scroll-shadow scroll-shadow--right" />}
    </div>
  );
}
