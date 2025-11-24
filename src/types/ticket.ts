export interface Ticket {
  data: any;
  id: string;
  subject: string;
  description: string;
  requesterId: string;
  requester: Requester | null;
  technicianId?: string;
  assignee: Requester | null;
  groupId?: string;
  group?: Group | null;
  status: Group | null;
  priority: TicketPriority;
  urgency?: TicketUrgency;
  impact?: TicketImpact;
  mode?: string;
  level?: string;
  category?: string;
  subCategory?: string;
  site?: string;
  attachments?: TicketAttachment[];
  createdAt: string;
  updatedAt?: string;
  ticket_number: number;
  due_date: string | null;
}

export interface Requester {
  id: number;
  firstname: string;
  lastname: string;
}

export interface Group {
  id: number;
  name: string;
}

export interface Site {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  category: string;
}

export interface Status {
  id: number;
  name: string;
}
export interface TicketListResponse {
  message: string;
  success: boolean;
  data: {
    tickets: Ticket[];
    pagination: {
      currentPage: number;
      hasNext: boolean;
      hasPrev: boolean;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  };
}

export type TicketStatus =
  | "open"
  | "in-progress"
  | "pending"
  | "closed"
  | "cancelled";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketUrgency = "low" | "medium" | "high";
export type TicketImpact = "low" | "medium" | "high";

export interface TicketAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface DropdownData {
  base: any;
  repair: any[];
  vendors: any[];
  products: any[];
  domains: any;
  requesters: DropdownOptionReq[];
  requestTypes: DropdownOption[];
  sites: DropdownOption[];
  priorities: DropdownOption[];
  statuses: DropdownOption[];
  impacts: DropdownOption[];
  modes: DropdownOption[];
  category: { id: number; category: string }[];
  technicians: DropdownOption[];
  userEmails: DropdownOption[];
  groups: DropdownOption[];
  levels: DropdownOption[];
  categories: DropdownOption[];
  assets: DropdownOption[];
  departments:DropdownOption[];
  users:DropdownOption[];
  roles:DropdownOption[];
  allowedToView:DropdownOption[];
  closureCodes:DropdownOption[];
}

export interface DropdownOption {
  id: string;
  name: string; 
}

export interface DropdownOptionReq {
  id: string;
  name: string;
  email?: string;
  site_name?: string;
  department_name?: string;
  job_title?: string;
  phonenumber?: string;  
}

export interface TicketFormData {
  subject: string;
  description: string;
  requesterId: string;
  technicianId?: string;
  groupId?: string;
  status: TicketStatus;
  priority: TicketPriority;
  urgency?: TicketUrgency;
  impact?: TicketImpact;
  mode?: string;
  level?: string;
  category?: string;
  subCategory?: string;
  site?: string;
  dueDate?: string;
  tags?: string[];
  attachments?: File[];
}
