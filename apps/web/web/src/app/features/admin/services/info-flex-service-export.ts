import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../../../api.config';

@Injectable({
  providedIn: 'root'
})
export class InfoFlexServiceExport {

  http = inject(HttpClient)

  getInfoContainerMap() {
    return this.http.get<Record<string, number>>(`${API_BASE}/foodticket/export-info-box`)
  }

}
