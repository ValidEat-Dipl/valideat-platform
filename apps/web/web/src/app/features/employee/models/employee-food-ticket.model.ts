export interface EmployeeFoodTicket {
  id: number;
  firstName: string;
  lastName: string;
  useDate: string;
  tier: string;
  costOrder: string;
  restaurantName: string;
  status: 'OPEN' | 'CONFLICT' | 'CHECKED' | 'NEEDS_FIXING';
  checkDate: string | null;
  adminFirstName?: string | null;
  adminLastName?: string | null;
}

export interface EmployeeFoodTicketRequest {
  date: string;
  employeeName: string;
  costOrder: string;
  tier: string;
  restaurantName: string;
}
