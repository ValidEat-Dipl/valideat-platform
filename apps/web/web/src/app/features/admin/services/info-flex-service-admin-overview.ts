import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InfoFlexServiceAdminOverview {
  private http = inject(HttpClient);

  getInfoContainerMap(lastYear?: boolean) {
    const params: any = {};

    if (lastYear) {
      params.last12months = lastYear;
    }

    return this.http.get<Record<string, number>>(
      'http://localhost:8080/foodticket/admin-overview-info-box',
      { params }
    );
  }
}
