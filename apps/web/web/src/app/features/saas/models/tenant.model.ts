export interface Tenant {
  id: number;
  name: string;
  manager: string;
  email: string;
  country: string;
  companySize: string;
  primaryColor: string | null;
  accentColor: string | null;
}

export interface CreateTenantRequest {
  name: string;
  manager: string;
  email: string;
  country: string;
  companySize: string;
  primaryColor: string;
  accentColor: string;
}

export interface TenantOverview {
  tenantId: number;
  tenantName: string;
  manager: string;
  email: string;
  country: string;
  companySize: string;
  employeeCount: number;
  adminCount: number;
  restaurantCount: number;
  costOrderCount: number;
  tierCount: number;
  foodTicketCount: number;
}
