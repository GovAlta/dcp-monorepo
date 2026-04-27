import type { Item, User } from '../types';

/**
 * Current user - customize for your authentication system
 */
export const currentUser: User = {
  id: 'user-001',
  name: 'Jane Smith',
  email: 'jane.smith@gov.ab.ca',
  role: 'Senior Reviewer'
};

/**
 * Mock items data - replace with your API calls
 *
 * This sample data demonstrates the Item type structure.
 * In a real app, you would fetch this from your backend.
 */
export const mockItems: Item[] = [
  {
    id: 'ITEM-2024-0001',
    title: 'Sample Item One',
    description: 'This is a sample item for demonstration purposes.',
    status: 'in-progress',
    statusText: 'In Progress',
    priority: 'high',
    category: 'new',
    submittedDate: '2024-11-15',
    dueDate: '2024-12-10',
    assignedTo: 'Jane Smith',
    region: 'Edmonton',
    referenceNumber: 'EDM-2024-0001'
  },
  {
    id: 'ITEM-2024-0002',
    title: 'Sample Item Two',
    description: 'Another sample item to show list functionality.',
    status: 'pending',
    statusText: 'Pending',
    priority: 'medium',
    category: 'renewal',
    submittedDate: '2024-11-10',
    dueDate: '2024-12-15',
    assignedTo: 'John Doe',
    region: 'Calgary',
    referenceNumber: 'CAL-2024-0002'
  },
  {
    id: 'ITEM-2024-0003',
    title: 'Sample Item Three',
    description: 'Third sample item with different status.',
    status: 'draft',
    statusText: 'Draft',
    priority: 'low',
    category: 'update',
    submittedDate: '2024-11-05',
    dueDate: '2024-12-20',
    assignedTo: 'Jane Smith',
    region: 'Red Deer',
    referenceNumber: 'RDR-2024-0003'
  },
  {
    id: 'ITEM-2024-0004',
    title: 'Completed Sample',
    description: 'An item that has been completed.',
    status: 'completed',
    statusText: 'Completed',
    priority: 'medium',
    category: 'new',
    submittedDate: '2024-10-28',
    dueDate: '2024-12-05',
    assignedTo: 'Jane Smith',
    region: 'Edmonton',
    referenceNumber: 'EDM-2024-0004'
  },
  {
    id: 'ITEM-2024-0005',
    title: 'Rejected Sample',
    description: 'An item that was rejected.',
    status: 'rejected',
    statusText: 'Rejected',
    priority: 'high',
    category: 'new',
    submittedDate: '2024-10-20',
    dueDate: '2024-11-25',
    assignedTo: 'John Doe',
    region: 'Lethbridge',
    referenceNumber: 'LTH-2024-0005'
  },
  {
    id: 'ITEM-2024-0006',
    title: 'High Priority Item',
    description: 'Urgent item requiring immediate attention.',
    status: 'in-progress',
    statusText: 'In Progress',
    priority: 'high',
    category: 'renewal',
    submittedDate: '2024-10-15',
    dueDate: '2024-12-08',
    assignedTo: 'Jane Smith',
    region: 'Calgary',
    referenceNumber: 'CAL-2024-0006'
  },
  {
    id: 'ITEM-2024-0007',
    title: 'Regional Item',
    description: 'Item from Grande Prairie region.',
    status: 'pending',
    statusText: 'Pending',
    priority: 'medium',
    category: 'new',
    submittedDate: '2024-10-10',
    dueDate: '2024-12-18',
    assignedTo: 'Sarah Johnson',
    region: 'Grande Prairie',
    referenceNumber: 'GPR-2024-0007'
  },
  {
    id: 'ITEM-2024-0008',
    title: 'Recently Completed',
    description: 'Another completed item for reference.',
    status: 'completed',
    statusText: 'Completed',
    priority: 'low',
    category: 'renewal',
    submittedDate: '2024-10-01',
    dueDate: '2024-11-30',
    assignedTo: 'John Doe',
    region: 'Edmonton',
    referenceNumber: 'EDM-2024-0008'
  }
];
