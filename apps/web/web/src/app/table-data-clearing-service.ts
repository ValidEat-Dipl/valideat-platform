import { inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodTicket } from './food-ticket.model';


@Injectable({
  providedIn: 'root',
})
export class TableDataClearingService {
  http = inject(HttpClient);

  getTableData(person?: string,
               fromDate?: string,
               toDate?: string,
               status?: string) {

    const params: any = {};
    if (person && person.length > 0) params.person = person;
    if (fromDate) params.costRank = fromDate;
    if (toDate) params.costDepartment = toDate;
    if (status && status != 'ALL') params.status = status;

    return this.http.get<FoodTicket[]>('http://localhost:8080/foodticket/table-clearing',
      { params });
  }

  /*/ ChatGpt #1 Anfang
  currentRoute: string = '';
  constructor(private router: Router) {
    console.log(router.url);

    router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRoute = event.url;
      });
  }
  // ChatGpt #1 Ende*/
}
