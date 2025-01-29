export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type DealStatus = 'lead' | 'negotiation' | 'proposal' | 'closed_won' | 'closed_lost';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: TaskStatus;
  assignedTo: string;
  tags: string[];
  createdAt: string;
}

export interface Deal {
  id: string;
  title: string;
  amount: number;
  clientName: string;
  status: DealStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}