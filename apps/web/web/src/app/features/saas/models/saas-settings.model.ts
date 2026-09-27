export interface TenantModule {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
}

export interface TenantRules {
  usageDays: string[];
  restaurantRequired: boolean;
  correctionHints: boolean;
}

export interface Branding {
  appName: string | null;
  shortName: string | null;
  primaryColor: string | null;
  accentColor: string | null;
  logo: string | null;
}

export interface TenantBranding {
  draft: Branding;
  published: Branding;
}

export interface UnassignedEmployee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

export interface EditTenant {
  organisationName: string;
  contactPerson: string;
  email: string;
  country: string;
  companySize: string;
  primaryColor: string | null;
  accentColor: string | null;
}
