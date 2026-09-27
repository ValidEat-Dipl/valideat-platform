import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminLogin } from '../models/admin-login.model';
import { AdminRegister } from '../models/admin-register.model';
import { LoginResponseDTO } from '../models/LoginResponseDTO';
import { API_BASE } from '../../../api.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(dto: AdminLogin) {
    return this.http.post<LoginResponseDTO>(`${API_BASE}/employee/login`, dto);
  }

  register(dto: AdminRegister) {
    return this.http.post(`${API_BASE}/employee/register`, dto, { responseType: 'text' });
  }
}
