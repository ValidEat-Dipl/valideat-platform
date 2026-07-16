import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeRegisterRequest } from '../models/employee-register-request.model';

const API_BASE = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class EmployeeAuthService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string) {

      const loginUrl = `${API_BASE}/employee/login/${encodeURIComponent(email)}/${encodeURIComponent(password)}`;

      return this.http.post(loginUrl, null, { responseType: 'text' });

    }
    

    register(employee: EmployeeRegisterRequest) {
      return this.http.post(`${API_BASE}/employee/register`, employee, { responseType: 'text' });

  }
}
