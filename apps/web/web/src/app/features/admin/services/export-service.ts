import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../../../api.config';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  http = inject(HttpClient);

  downloadCsvFile() {
    return this.http.get(`${API_BASE}/foodticket/export-csv`,
      {
        responseType: 'blob'
      });
  }

}
