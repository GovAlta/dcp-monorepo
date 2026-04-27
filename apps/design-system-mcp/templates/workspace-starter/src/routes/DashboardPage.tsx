import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  GoabText,
  GoabBadge,
  GoabButton,
  GoabIcon,
  GoabCallout
} from '@abgov/react-components';
import { usePageHeader } from '../contexts/PageHeaderContext';
import { mockItems, currentUser } from '../data/mockData';
import { getStatusBadgeProps, getPriorityBadgeProps } from '../utils/badgeUtils';
import { formatRelativeDate, isOverdue, isDueSoon } from '../utils/dateUtils';

/**
 * DashboardPage - Main dashboard/home page
 *
 * Shows:
 * - Welcome message
 * - Stats summary cards
 * - Urgent/important items list
 * - Quick actions
 *
 * Customize this page to show the most relevant information for your domain.
 */
export function DashboardPage() {
  usePageHeader(`Welcome, ${currentUser.name.split(' ')[0]}`);

  // Filter items assigned to current user
  const myItems = useMemo(
    () => mockItems.filter(item => item.assignedTo === currentUser.name),
    []
  );

  // Calculate stats
  const stats = useMemo(() => ({
    assigned: myItems.length,
    inProgress: myItems.filter(item => item.status === 'in-progress').length,
    dueSoon: myItems.filter(item => isDueSoon(item.dueDate, 7)).length,
    overdue: myItems.filter(item =>
      isOverdue(item.dueDate) &&
      item.status !== 'completed' &&
      item.status !== 'rejected'
    ).length
  }), [myItems]);

  // Get urgent items (high priority or overdue)
  const urgentItems = useMemo(
    () => myItems
      .filter(item => item.priority === 'high' || isOverdue(item.dueDate))
      .slice(0, 5),
    [myItems]
  );

  return (
    <div className="content-padding">
      {/* Stats row */}
      <div className="stats-row">
        <div className="stat-card">
          <GoabText as="span" size="body-s" mb="2xs">Assigned</GoabText>
          <GoabText as="span" size="heading-xl" mt="none" mb="none">{stats.assigned}</GoabText>
        </div>
        <div className="stat-card">
          <GoabText as="span" size="body-s" mb="2xs">In Progress</GoabText>
          <GoabText as="span" size="heading-xl" mt="none" mb="none">{stats.inProgress}</GoabText>
        </div>
        <div className="stat-card">
          <GoabText as="span" size="body-s" mb="2xs">Due Soon</GoabText>
          <GoabText as="span" size="heading-xl" mt="none" mb="none">{stats.dueSoon}</GoabText>
        </div>
        <div className="stat-card stat-card--alert">
          <GoabText as="span" size="body-s" mb="2xs">Overdue</GoabText>
          <GoabText as="span" size="heading-xl" mt="none" mb="none">{stats.overdue}</GoabText>
        </div>
      </div>

      {/* Overdue warning */}
      {stats.overdue > 0 && (
        <GoabCallout type="emergency" heading="Overdue items" mb="l">
          You have {stats.overdue} item(s) past their due date that need immediate attention.
        </GoabCallout>
      )}

      {/* Urgent items section */}
      <div className="urgent-items-section">
        <GoabText as="h2" size="heading-m" mt="l" mb="m">Urgent Items</GoabText>

        {urgentItems.length === 0 ? (
          <GoabText>No urgent items at this time.</GoabText>
        ) : (
          <div className="item-cards">
            {urgentItems.map(item => (
              <div key={item.id} className="item-card">
                <div className="item-card__header">
                  <GoabText as="span" size="body-s" mt="none" mb="none">{item.referenceNumber}</GoabText>
                  <GoabBadge {...getStatusBadgeProps(item.status)} />
                </div>
                <GoabText as="h3" size="body-m" mt="xs" mb="xs">
                  <Link to={`/items/${item.id}`} className="card-link">
                    {item.title}
                  </Link>
                </GoabText>
                <div className="item-card__meta">
                  <span><GoabIcon type="calendar" size="small" mr="2xs" />{formatRelativeDate(item.dueDate)}</span>
                  <GoabBadge {...getPriorityBadgeProps(item.priority)} />
                </div>
              </div>
            ))}
          </div>
        )}

        <GoabButton type="tertiary" mt="m" onClick={() => window.location.href = '/my-items'}>
          View all my items
        </GoabButton>
      </div>
    </div>
  );
}
