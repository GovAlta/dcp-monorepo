import { createContext, useContext, useState, type ReactNode } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Example initial notifications - customize for your domain
const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Item Due Soon',
    message: 'ITEM-2024-0001 is due in 2 days',
    type: 'warning',
    read: false,
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    title: 'New Assignment',
    message: 'You have been assigned a new item',
    type: 'info',
    read: false,
    timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: '3',
    title: 'Item Completed',
    message: 'ITEM-2024-0002 has been completed',
    type: 'success',
    read: true,
    timestamp: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}`,
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
