import { GoabText, GoabIconButton } from '@abgov/react-components';
import { usePageHeader } from '../contexts/PageHeaderContext';
import { useScrollState } from '../contexts/ScrollStateContext';
import { useMenu } from '../contexts/MenuContext';

/**
 * PageHeader - Scroll-aware page header component
 *
 * Features:
 * - Sticks to top of content area
 * - Collapses when scrolling down (smaller title, bottom border)
 * - Expands when at top or no scroll
 * - Shows shadow when content is behind the header
 * - Mobile menu button on small screens
 *
 * Usage: Set the page header from your page component using usePageHeader:
 * ```tsx
 * usePageHeader('Page Title');
 * // or with actions
 * usePageHeader('Page Title', <GoabButton>Action</GoabButton>);
 * ```
 */
export function PageHeader() {
  const { title, actions } = usePageHeader();
  const { scrollPosition, isScrollable } = useScrollState();
  const { isMobile, toggleMenu } = useMenu();

  // Collapsed when scrolled into middle or bottom
  const isCollapsed = scrollPosition === 'middle' || scrollPosition === 'at-bottom';

  // On desktop, don't render if no title
  // On mobile, always render to show the menu button
  if (!title && !isMobile) return null;

  // Build class names based on state
  const headerClasses = [
    'page-header',
    isCollapsed ? 'page-header--collapsed' : 'page-header--expanded',
    isScrollable && scrollPosition ? `page-header--${scrollPosition.replace('-', '')}` : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={headerClasses}>
      <div className="page-header__content">
        <div className="page-header__title-container">
          {isMobile && (
            <GoabIconButton
              icon="menu"
              size="medium"
              variant="dark"
              onClick={() => toggleMenu()}
              ariaLabel="Open menu"
            />
          )}
          {title && (
            <GoabText
              as="h1"
              size={isCollapsed ? "heading-s" : (isMobile ? "heading-m" : "heading-l")}
              mt="none"
              mb="none"
            >
              {title}
            </GoabText>
          )}
        </div>
        {!isMobile && <div className="page-header__spacer" />}
        {actions && (
          <div className="page-header__actions">{actions}</div>
        )}
      </div>
    </div>
  );
}
