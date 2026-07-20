import { ChangeLog } from './change-log.model';

export interface AdminClearingTickets {
  empTicketId: number;
  empTicketEmpName: string;
  empTicketTier: string;
  empTicketCostOrder: string;
  empTicketRestaurant: string;
  empTicketLogs: ChangeLog[];
  empTicketUseDate: string;
  empTicketCheckDate: string;
  empTicketStatus: string;
  empTicketConflict: string;
  adminTicketId: number;
  adminTicketEmpName: string;
  adminTicketTier: string;
  adminTicketCostOrder: string;
  adminTicketRestaurant: string;
  adminTicketLogs: ChangeLog[];
  adminTicketUseDate: string;
  adminTicketCheckDate: string;
  adminTicketStatus: string;
  adminTicketConflict: string;
}
