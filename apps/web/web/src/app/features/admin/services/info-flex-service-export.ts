import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoFlexServiceExport {

  http = inject(HttpClient)

  getInfoContainerMap() {
    return this.http.get<Record<string, number>>("http://localhost:8080/foodticket/export-info-box")
  }

}
