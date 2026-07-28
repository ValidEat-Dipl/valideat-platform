import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseDTO } from '../../admin/models/LoginResponseDTO';
import { EmployeeRegisterRequest } from '../models/employee-register-request.model';

const API_BASE = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class EmployeeAuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const login = {
      email: email,
      password: password,
    };

    return this.http.post<LoginResponseDTO>(`${API_BASE}/employee/login`, login);
  }

  register(employee: EmployeeRegisterRequest) {
    return this.http.post(`${API_BASE}/employee/register`, employee, { responseType: 'text' });
  }
}
