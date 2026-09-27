import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTenantRequest, Tenant, TenantOverview } from '../models/tenant.model';

import { Branding, EditTenant, TenantBranding, TenantModule, TenantRules, UnassignedEmployee } from '../models/saas-settings.model';

import { API_BASE } from '../../../api.config';

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

  updateTenant(tenantId: number, tenant: EditTenant) {
    return this.http.put<void>(`${API_BASE}/saas-admin/tenant/${tenantId}`, tenant);
  }


  getUnassignedEmployees() {
    return this.http.get<UnassignedEmployee[]>(`${API_BASE}/saas-admin/unassigned-employees`);
  }

  assignEmployee(tenantId: number, employeeId: number) {
    return this.http.put<void>(`${API_BASE}/saas-admin/assign/${tenantId}/${employeeId}`, {});
  }


  getModules(tenantId: number) {
    return this.http.get<TenantModule[]>(`${API_BASE}/saas-admin/tenant/${tenantId}/modules`);
  }

  updateModules(tenantId: number, moduleIds: number[]) {
    return this.http.put<void>(`${API_BASE}/saas-admin/tenant/${tenantId}/modules`, { moduleIds: moduleIds });
  }


  getRules(tenantId: number) {
    return this.http.get<TenantRules>(`${API_BASE}/saas-admin/tenant/${tenantId}/rules`);
  }

  updateRules(tenantId: number, rules: TenantRules) {
    return this.http.put<void>(`${API_BASE}/saas-admin/tenant/${tenantId}/rules`, rules);
  }


  getBranding(tenantId: number) {
    return this.http.get<TenantBranding>(`${API_BASE}/saas-admin/tenant/${tenantId}/branding`);
  }

  updateBranding(tenantId: number, branding: Branding) {
    return this.http.put<void>(`${API_BASE}/saas-admin/tenant/${tenantId}/branding`, branding);
  }

  publishBranding(tenantId: number) {
    return this.http.post<void>(`${API_BASE}/saas-admin/tenant/${tenantId}/branding/publish`, {});
  }
}
