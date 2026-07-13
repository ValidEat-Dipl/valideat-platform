import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InfoFlexServiceClearing {
  http = inject(HttpClient);

  data = Map<string, number>;
  data$ = this.http.get('http://localhost:8080/api/clearing-info-box')
    .subscribe((data) => {
    console.log(data);
    // @ts-ignore
    this.data = data;
  });

  getInfoContainerMap() {
    return new Map()
      .set('Gesamt', 128)
      .set('Automatisch abgeglichen', 121)
      .set('Manuell abgeschlossen', 5)
      .set('Konflikt', 2);
  }
}
