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
      params.lastYear = lastYear;
    }

    return this.http.get<Record<string, number>>(
      'http://localhost:8080/api/admin-overview-info-box',
      { params },
    );
  }
}
