import {
  GoabText,
  GoabButton,
  GoabIcon
} from '@abgov/react-components';
import { usePageHeader } from '../contexts/PageHeaderContext';
import { useNotifications } from '../contexts/NotificationContext';
import { formatRelativeDate } from '../utils/dateUtils';

/**
 * NotificationsPage - Notification center
 *
 * Features:
 * - List of notifications
 * - Unread/read visual distinction
 * - Mark as read on click
 * - Mark all as read button
 */
export function NotificationsPage() {
  usePageHeader('Notifications');

  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return 'alert-circle';
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'close-circle';
      default:
        return 'information-circle';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'var(--goa-color-warning)';
      case 'success':
        return 'var(--goa-color-success)';
      case 'error':
        return 'var(--goa-color-emergency)';
      default:
        return 'var(--goa-color-information)';
    }
  };

  return (
    <div className="content-padding" style={{ paddingBottom: '32px' }}>
      {/* Header with actions */}
      <div className="notifications-header">
        <GoabText as="span" size="body-s">
          {unreadCount > 0 ? `${unreadCount} unread` : 'All read'}
        </GoabText>
        {unreadCount > 0 && (
          <GoabButton type="tertiary" size="compact" onClick={markAllAsRead}>
            Mark all as read
          </GoabButton>
        )}
      </div>

      {/* Notifications list */}
      {notifications.length === 0 ? (
        <div className="empty-state">
          <GoabIcon type="notifications" size="large" />
          <GoabText as="span" size="body-m" mt="m">No notifications</GoabText>
          <GoabText as="span" size="body-s">You're all caught up!</GoabText>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-card ${!notification.read ? 'notification-card--unread' : ''}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-icon">
                <GoabIcon
                  type={getNotificationIcon(notification.type)}
                  size="medium"
                  fillColor={getNotificationColor(notification.type)}
                />
              </div>
              <div className="notification-content">
                <div className="notification-title-row">
                  <GoabText as="span" size="body-m" mt="none" mb="none">
                    {notification.title}
                  </GoabText>
                  <GoabText as="span" size="body-s">
                    {formatRelativeDate(notification.timestamp)}
                  </GoabText>
                </div>
                <GoabText as="p" size="body-s" mt="2xs" mb="none">
                  {notification.message}
                </GoabText>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
