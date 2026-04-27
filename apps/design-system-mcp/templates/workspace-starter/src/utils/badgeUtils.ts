/**
 * Badge utility functions for mapping data to GoA Badge props
 *
 * These functions return objects that can be spread directly on GoabBadge:
 * <GoabBadge {...getStatusBadgeProps(item.status)} />
 */

type BadgeType = 'information' | 'success' | 'important' | 'emergency' | 'dark' | 'midtone' | 'light';

interface BadgeProps {
  type: BadgeType;
  content: string;
}

/**
 * Get badge props for priority levels
 */
export function getPriorityBadgeProps(priority: 'high' | 'medium' | 'low'): BadgeProps {
  switch (priority) {
    case 'high':
      return { type: 'emergency', content: 'High' };
    case 'medium':
      return { type: 'important', content: 'Medium' };
    case 'low':
      return { type: 'information', content: 'Low' };
    default:
      return { type: 'midtone', content: priority };
  }
}

/**
 * Get badge props for item status
 * Customize this function for your specific statuses
 */
export function getStatusBadgeProps(status: string): BadgeProps {
  switch (status) {
    case 'completed':
      return { type: 'success', content: 'Completed' };
    case 'rejected':
      return { type: 'emergency', content: 'Rejected' };
    case 'in-progress':
      return { type: 'important', content: 'In Progress' };
    case 'pending':
      return { type: 'information', content: 'Pending' };
    case 'draft':
      return { type: 'midtone', content: 'Draft' };
    default:
      return { type: 'light', content: status };
  }
}

/**
 * Get badge props for item categories
 * Customize this function for your specific categories
 */
export function getCategoryBadgeProps(category: string): BadgeProps {
  switch (category) {
    case 'new':
      return { type: 'information', content: 'New' };
    case 'update':
      return { type: 'dark', content: 'Update' };
    case 'renewal':
      return { type: 'important', content: 'Renewal' };
    default:
      return { type: 'light', content: category };
  }
}
