import { Status } from './status.model';
import { Employee } from './employee.model';
import { Tier } from './tier.model';
import { CostOrder } from './costOrder.model';

export interface FoodTicket {
  id: number;
  employee: Employee;
  useDate: Date;
  tier: Tier;
  ticketType: string;
  costOrder: CostOrder;
  status: string;
  restaurant: string;
  admin: Employee;
  checkDate: Date;
  changeLog: number;
}
