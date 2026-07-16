import { ChangeLog } from './change-log.model';

export interface AdminClearingTickets {
  empTicketId: number;
  empTicketEmpName: string;
  empTicketTier: string;
  empTicketCostOrder: string;
  empTicketRestaurant: string;
  empTicketLog: ChangeLog;
  empTicketUseDate: string;
  empTicketCheckDate: string;
  empTicketStatus: string;
  empTicketConflict: string;
  adminTicketId: number;
  adminTicketEmpName: string;
  adminTicketTier: string;
  adminTicketCostOrder: string;
  adminTicketRestaurant: string;
  adminTicketLog: ChangeLog;
  adminTicketUseDate: string;
  adminTicketCheckDate: string;
  adminTicketStatus: string;
  adminTicketConflict: string;
}
