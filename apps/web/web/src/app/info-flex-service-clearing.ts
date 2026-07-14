import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InfoFlexServiceClearing {
  private http = inject(HttpClient);

  getInfoContainerMap(
    person?: string,
    costRank?: string,
    costDepartment?: string,
    status?: string,
  ) {
    const params: any = {};
    if (person && person.length > 0) params.person = person;
    if (costRank && costRank.length > 0) params.costRank = costRank;
    if (costDepartment && costDepartment.length > 0) params.costDepartment = costDepartment;
    if (status && status != 'ALL') params.status = status;

    return this.http.get<Record<string, number>>(
      'http://localhost:8080/foodticket/clearing-info-box',
      { params },
    );
  }
}
