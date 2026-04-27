import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem
} from '@abgov/react-components/experimental';
import { useMenu } from '../contexts/MenuContext';
import { useNotifications } from '../contexts/NotificationContext';
import { ScrollStateProvider, useScrollState } from '../contexts/ScrollStateContext';
import { PageHeader } from './PageHeader';
import { currentUser } from '../data/mockData';

interface AppLayoutProps {
  children: ReactNode;
}

// Inner component that uses scroll state
function WorkspaceContent({ children }: { children: ReactNode }) {
  const { isMobile } = useMenu();
  const { scrollPosition } = useScrollState();

  if (isMobile) {
    return (
      <div
        className="mobile-content-container"
        style={{
          backgroundColor: "white",
          height: "100%",
          overflow: "auto"
        }}
      >
        <PageHeader />
        {children}
      </div>
    );
  }

  return (
    <div
      className="desktop-card-container"
      data-scroll-state={scrollPosition}
    >
      <PageHeader />
      {children}
    </div>
  );
}

/**
 * AppLayout - Main workspace layout with side navigation
 *
 * This component provides:
 * - WorkSideMenu with navigation items
 * - Scroll state tracking for adaptive UI
 * - Mobile-responsive layout
 *
 * Customize the navigation items in the primaryContent, secondaryContent,
 * and accountContent props of GoabxWorkSideMenu.
 */
export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const { isCollapsed, isMobile, toggleMenu } = useMenu();
  const { unreadCount } = useNotifications();

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) toggleMenu();
  };

  return (
    <ScrollStateProvider>
      <div className="app-layout">
        <GoabxWorkSideMenu
          heading="Workspace App" // TODO: Customize app name
          url="/"
          userName={currentUser.name}
          userSecondaryText={currentUser.email}
          open={!isCollapsed}
          onToggle={toggleMenu}
          primaryContent={
            <>
              {/* Primary navigation - main features */}
              <GoabxWorkSideMenuItem
                icon="home"
                label="Dashboard"
                url="/"
                onClick={() => handleNavigate('/')}
              />
              <GoabxWorkSideMenuItem
                icon="person"
                label="My Items"
                badge="5" // TODO: Connect to real data
                url="/my-items"
                onClick={() => handleNavigate('/my-items')}
              />
              <GoabxWorkSideMenuItem
                icon="folder"
                label="All Items"
                url="/items"
                onClick={() => handleNavigate('/items')}
              />
              <GoabxWorkSideMenuItem
                icon="search"
                label="Search"
                url="/search"
                onClick={() => handleNavigate('/search')}
              />
            </>
          }
          secondaryContent={
            <>
              {/* Secondary navigation - notifications, help, etc. */}
              <GoabxWorkSideMenuItem
                icon="notifications"
                label="Notifications"
                badge={unreadCount > 0 ? String(unreadCount) : undefined}
                type={unreadCount > 0 ? 'emergency' : undefined}
                url="/notifications"
                onClick={() => handleNavigate('/notifications')}
              />
            </>
          }
          accountContent={
            <>
              {/* Account menu items */}
              <GoabxWorkSideMenuItem
                icon="settings"
                label="Settings"
                url="/settings"
                onClick={() => handleNavigate('/settings')}
              />
              <GoabxWorkSideMenuItem
                icon="log-out"
                label="Logout"
                onClick={() => console.log('Logout clicked - implement your logout logic')}
              />
            </>
          }
        />

        <main className="card-container">
          <WorkspaceContent>{children}</WorkspaceContent>
        </main>
      </div>
    </ScrollStateProvider>
  );
}
