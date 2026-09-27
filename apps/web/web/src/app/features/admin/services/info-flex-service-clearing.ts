import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../../../api.config';

@Injectable({
  providedIn: 'root',
})
export class InfoFlexServiceClearing {
  private http = inject(HttpClient);

  getInfoContainerMap(
    person?: string,
    fromDate?: string,
    toDate?: string,
    status?: string,
  ) {
    const params: any = {};
    if (person && person.length > 0) params.employeeName = person;
    if (fromDate) params.costRank = fromDate;
    if (toDate) params.costDepartment = toDate;
    if (status && status != 'ALL') params.status = status;

    return this.http.get<Record<string, number>>(
      `${API_BASE}/foodticket/clearing-info-box`,
      { params },
    );
  }
}
