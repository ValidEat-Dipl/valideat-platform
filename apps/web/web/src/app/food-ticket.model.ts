import { Status } from './status.model';
import { Employee } from './employee.model';
import { Tier } from './tier.model';

export interface FoodTicket {
  id: number;
  employee: Employee;
  useDate: Date;
  tier: Tier;
  costDepartment: string;
  status: Status;
  restaurant: string;
  admin: Employee;
  checkDate: Date;
  changeLog: number;
}
