import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTenantRequest, Tenant, TenantOverview } from '../models/tenant.model';

const API_BASE = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class SaasService {


  constructor(private http: HttpClient) {}

  getTenants() {
    return this.http.get<TenantOverview[]>(`${API_BASE}/saas-admin/tenants`);
  }

  getTenant(tenantId: number) {
    return this.http.get<Tenant>(`${API_BASE}/saas-admin/tenant/${tenantId}`);
  }

  createTenant(tenant: CreateTenantRequest) {
    return this.http.post<Tenant>(`${API_BASE}/saas-admin/tenant`, tenant);
  }
}
