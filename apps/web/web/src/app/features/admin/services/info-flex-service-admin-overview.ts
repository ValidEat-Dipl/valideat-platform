import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../../../api.config';

@Injectable({
  providedIn: 'root',
})
export class InfoFlexServiceAdminOverview {
  private http = inject(HttpClient);

  getInfoContainerMap(lastYear?: boolean) {
    const params: any = {};

    if (lastYear) params.last12months = lastYear;


    return this.http.get<Record<string, number>>(
      `${API_BASE}/foodticket/admin-overview-info-box`, { params });
  }
}
