export interface EmployeeFoodTicket {
  id: number;
  employee: {
    firstName: string;
    lastName: string;
  };
  useDate: string;
  tier: {
    name: string;
  };
  status: 'OPEN' | 'CONFLICT' | 'CHECKED' | 'NEEDS_FIXING';
  ticketType: 'EMPLOYEE' | 'ADMIN';
}
