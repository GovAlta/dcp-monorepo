import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useMenu } from './MenuContext';

export type ScrollPosition = 'no-scroll' | 'at-top' | 'middle' | 'at-bottom';

interface ScrollStateContextType {
  scrollPosition: ScrollPosition;
  isScrollable: boolean;
}

const ScrollStateContext = createContext<ScrollStateContextType | undefined>(undefined);

interface ScrollStateProviderProps {
  children: ReactNode;
}

/**
 * ScrollStateProvider tracks the scroll position of the main content container
 * and provides scroll state to child components for adaptive UI behavior.
 *
 * Scroll states:
 * - 'no-scroll': Content fits without scrolling
 * - 'at-top': Scrollable content, currently at top
 * - 'middle': Scrolled away from top and bottom
 * - 'at-bottom': Scrolled to bottom
 */
export function ScrollStateProvider({ children }: ScrollStateProviderProps) {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>('no-scroll');
  const [isScrollable, setIsScrollable] = useState(false);
  const { isMobile } = useMenu();

  const calculateScrollState = useCallback(() => {
    const containerSelector = isMobile ? '.mobile-content-container' : '.desktop-card-container';
    const container = document.querySelector(containerSelector);

    if (!container) {
      setScrollPosition('no-scroll');
      setIsScrollable(false);
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = container;
    const hasScroll = scrollHeight > clientHeight;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    setIsScrollable(hasScroll);

    if (!hasScroll) {
      setScrollPosition('no-scroll');
      return;
    }

    // Hysteresis thresholds - different values for entering vs exiting states
    // This prevents flickering when scroll position is near boundaries
    const enterThreshold = 10;
    const exitThreshold = 30;

    setScrollPosition(prevPosition => {
      if (prevPosition === 'at-top') {
        if (scrollTop > exitThreshold) {
          return 'middle';
        }
        return 'at-top';
      }

      if (prevPosition === 'at-bottom') {
        if (distanceFromBottom > exitThreshold) {
          return 'middle';
        }
        return 'at-bottom';
      }

      if (scrollTop <= enterThreshold) {
        return 'at-top';
      }
      if (distanceFromBottom <= enterThreshold) {
        return 'at-bottom';
      }
      return 'middle';
    });
  }, [isMobile]);

  useEffect(() => {
    const containerSelector = isMobile ? '.mobile-content-container' : '.desktop-card-container';
    const container = document.querySelector(containerSelector);

    if (!container) return;

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        calculateScrollState();
        rafId = null;
      });
    };

    calculateScrollState();

    container.addEventListener('scroll', handleScroll, { passive: true });

    // Observe container and children for size changes
    const resizeObserver = new ResizeObserver(() => {
      calculateScrollState();
    });
    resizeObserver.observe(container);

    const children = container.children;
    for (let i = 0; i < children.length; i++) {
      resizeObserver.observe(children[i]);
    }

    const handleWindowResize = () => {
      setTimeout(calculateScrollState, 10);
    };
    window.addEventListener('resize', handleWindowResize, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile, calculateScrollState]);

  return (
    <ScrollStateContext.Provider value={{ scrollPosition, isScrollable }}>
      {children}
    </ScrollStateContext.Provider>
  );
}

export function useScrollState() {
  const context = useContext(ScrollStateContext);
  if (context === undefined) {
    throw new Error('useScrollState must be used within a ScrollStateProvider');
  }
  return context;
}
