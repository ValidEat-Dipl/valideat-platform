import { ChangeLog } from './change-log.model';
import { Status } from './status.model';


export interface FoodTicketConflictResponse {
  conflicts: FoodTicketConflict[];
  count: number;
}

interface FoodTicketConflict {
  id: number;
  empName: string;
  useDate: string;
  conflict: string;
  wrongField: string;
  status: string;
  adminName: string;
  changeLogs: ChangeLog[];
}
