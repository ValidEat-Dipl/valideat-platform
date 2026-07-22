import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  http = inject(HttpClient);

  downloadCsvFile() {
    return this.http.get("http://localhost:8080/foodticket/export-csv",
      {
        responseType: 'blob'
      });
  }

}
