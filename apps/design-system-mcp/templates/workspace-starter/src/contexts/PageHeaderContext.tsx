import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface PageHeaderContextType {
  title: string;
  actions: ReactNode;
  setPageHeader: (title: string, actions?: ReactNode) => void;
}

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(undefined);

export function PageHeaderProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('');
  const [actions, setActions] = useState<ReactNode>(null);

  const setPageHeader = (newTitle: string, newActions?: ReactNode) => {
    setTitle(newTitle);
    setActions(newActions ?? null);
  };

  return (
    <PageHeaderContext.Provider value={{ title, actions, setPageHeader }}>
      {children}
    </PageHeaderContext.Provider>
  );
}

/**
 * Hook to get and set the page header.
 *
 * Usage in a page component:
 * ```tsx
 * // Simple title only
 * usePageHeader('Dashboard');
 *
 * // Title with actions
 * const headerActions = useMemo(() => (
 *   <GoabButton type="primary">Create New</GoabButton>
 * ), []);
 * usePageHeader('Items', headerActions);
 * ```
 */
export function usePageHeader(title?: string, actions?: ReactNode) {
  const context = useContext(PageHeaderContext);
  if (!context) {
    throw new Error('usePageHeader must be used within a PageHeaderProvider');
  }

  useEffect(() => {
    if (title !== undefined) {
      context.setPageHeader(title, actions);
    }
  }, [title, actions]);

  return context;
}
