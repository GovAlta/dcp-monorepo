import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  GoabText,
  GoabButton,
  GoabButtonGroup,
  GoabBadge,
  GoabTabs,
  GoabTab,
  GoabIcon,
  GoabCallout
} from '@abgov/react-components';
import { usePageHeader } from '../contexts/PageHeaderContext';
import { mockItems } from '../data/mockData';
import { getStatusBadgeProps, getPriorityBadgeProps } from '../utils/badgeUtils';
import { formatDate } from '../utils/dateUtils';

/**
 * ItemDetailPage - Detail view for a single item
 *
 * Features:
 * - Summary card with key information
 * - Tabbed content (Details, History, Notes)
 * - Action buttons in header
 *
 * Customize the tabs and content based on your domain needs.
 */
export function ItemDetailPage() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const item = useMemo(
    () => mockItems.find(i => i.id === itemId),
    [itemId]
  );

  // Page header with actions
  const headerActions = useMemo(() => (
    <GoabButtonGroup gap="compact" alignment="start">
      <GoabButton type="secondary" size="compact" onClick={() => navigate(-1)}>
        Back
      </GoabButton>
      <GoabButton type="primary" size="compact">
        Edit
      </GoabButton>
    </GoabButtonGroup>
  ), [navigate]);

  usePageHeader(item?.referenceNumber ?? 'Item Details', headerActions);

  if (!item) {
    return (
      <div className="content-padding">
        <GoabCallout type="emergency" heading="Item not found">
          The requested item could not be found.
        </GoabCallout>
        <GoabButton type="tertiary" mt="m" onClick={() => navigate('/items')}>
          Return to items list
        </GoabButton>
      </div>
    );
  }

  // Sample timeline data - replace with real data
  const timeline = [
    { id: '1', event: 'Item created', date: item.submittedDate, user: 'System', current: false },
    { id: '2', event: 'Assigned to ' + item.assignedTo, date: item.submittedDate, user: 'Admin', current: false },
    { id: '3', event: 'Status changed to ' + item.statusText, date: new Date().toISOString().split('T')[0], user: item.assignedTo, current: true },
  ];

  return (
    <div className="content-padding" style={{ paddingBottom: '32px' }}>
      {/* Summary card */}
      <div className="detail-summary-card">
        <div className="detail-summary-row">
          <div className="detail-summary-item">
            <GoabText as="span" size="body-s" mb="2xs">Status</GoabText>
            <GoabBadge {...getStatusBadgeProps(item.status)} />
          </div>
          <div className="detail-summary-item">
            <GoabText as="span" size="body-s" mb="2xs">Priority</GoabText>
            <GoabBadge {...getPriorityBadgeProps(item.priority)} />
          </div>
          <div className="detail-summary-item">
            <GoabText as="span" size="body-s" mb="2xs">Due Date</GoabText>
            <GoabText as="span" size="body-m" mt="none" mb="none">{formatDate(item.dueDate)}</GoabText>
          </div>
          <div className="detail-summary-item">
            <GoabText as="span" size="body-s" mb="2xs">Assigned To</GoabText>
            <GoabText as="span" size="body-m" mt="none" mb="none">{item.assignedTo}</GoabText>
          </div>
        </div>
        <div className="detail-summary-row">
          <div className="detail-summary-item">
            <GoabText as="span" size="body-s" mb="2xs">Category</GoabText>
            <GoabText as="span" size="body-m" mt="none" mb="none">{item.category}</GoabText>
          </div>
          <div className="detail-summary-item">
            <GoabText as="span" size="body-s" mb="2xs">Region</GoabText>
            <GoabText as="span" size="body-m" mt="none" mb="none">{item.region}</GoabText>
          </div>
          <div className="detail-summary-item">
            <GoabText as="span" size="body-s" mb="2xs">Submitted</GoabText>
            <GoabText as="span" size="body-m" mt="none" mb="none">{formatDate(item.submittedDate)}</GoabText>
          </div>
        </div>
      </div>

      {/* Tabbed content */}
      <GoabTabs mt="l" initialTab={1}>
        <GoabTab heading="Details">
          <div className="detail-tab-content">
            <GoabText as="h3" size="heading-s" mt="l" mb="m">Item Information</GoabText>
            <div className="detail-grid">
              <div className="detail-field">
                <GoabText as="span" size="body-s" mb="2xs">Title</GoabText>
                <GoabText as="span" size="body-m" mt="none" mb="none">{item.title}</GoabText>
              </div>
              <div className="detail-field">
                <GoabText as="span" size="body-s" mb="2xs">Reference Number</GoabText>
                <GoabText as="span" size="body-m" mt="none" mb="none">{item.referenceNumber}</GoabText>
              </div>
              <div className="detail-field">
                <GoabText as="span" size="body-s" mb="2xs">Description</GoabText>
                <GoabText as="span" size="body-m" mt="none" mb="none">{item.description}</GoabText>
              </div>
            </div>
          </div>
        </GoabTab>

        <GoabTab heading="History">
          <div className="detail-tab-content">
            <GoabText as="h3" size="heading-s" mt="l" mb="m">Activity Timeline</GoabText>
            <div className="timeline">
              {timeline.map((event, index) => (
                <div key={event.id} className="timeline-item">
                  <div className="timeline-marker">
                    <div className={`timeline-dot ${event.current ? 'timeline-dot--current' : ''}`} />
                    {index < timeline.length - 1 && <div className="timeline-line" />}
                  </div>
                  <div className="timeline-content">
                    <GoabText as="span" size="body-m" mt="none" mb="2xs">{event.event}</GoabText>
                    <GoabText as="span" size="body-s">
                      <GoabIcon type="calendar" size="small" mr="2xs" />
                      {formatDate(event.date)} by {event.user}
                    </GoabText>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GoabTab>

        <GoabTab heading="Notes">
          <div className="detail-tab-content">
            <GoabText as="h3" size="heading-s" mt="l" mb="m">Notes</GoabText>
            <div className="empty-state">
              <GoabIcon type="document-text" size="large" />
              <GoabText as="span" size="body-m" mt="m">No notes yet</GoabText>
              <GoabText as="span" size="body-s">Add a note to keep track of important information.</GoabText>
              <GoabButton type="tertiary" size="compact" mt="m">Add Note</GoabButton>
            </div>
          </div>
        </GoabTab>
      </GoabTabs>
    </div>
  );
}
