import { inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InfoFlexServiceAdminOverview {
  http = inject(HttpClient);

  data = Map<string, number>;
  data$ = this.http.get('http://localhost:8080/api/admin-overview-info-box')
    .subscribe((data) => {
    console.log(data);
    // @ts-ignore
    this.data = data;
  });

  getInfoContainerMap() {
    return new Map()
      .set('Mitarbeitereinträge', 128)
      .set('Physische Markerl erfasst', 121)
      .set('Abgeglichen', 112)
      .set('Konflikte', 9);
  }
}
