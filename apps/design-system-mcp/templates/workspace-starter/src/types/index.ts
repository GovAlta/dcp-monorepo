/**
 * Type definitions for the workspace app.
 *
 * Customize these types to match your domain.
 * Example: For a license review app, "Item" might become "License"
 */

export type ItemStatus = 'pending' | 'in-progress' | 'completed' | 'rejected' | 'draft';

export type ItemPriority = 'high' | 'medium' | 'low';

export type ItemCategory = 'new' | 'update' | 'renewal';

export interface Item {
  id: string;
  title: string;
  description: string;
  status: ItemStatus;
  statusText: string;
  priority: ItemPriority;
  category: ItemCategory;
  submittedDate: string;
  dueDate: string;
  assignedTo: string;
  region: string;
  referenceNumber: string;
  selected?: boolean;
}

export interface ItemEvent {
  id: string;
  type: 'status-change' | 'note-added' | 'document-uploaded' | 'assigned';
  description: string;
  timestamp: string;
  user: string;
}

export interface ItemNote {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
