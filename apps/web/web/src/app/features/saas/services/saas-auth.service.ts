import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseDTO } from '../../admin/models/LoginResponseDTO';

const API_BASE = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class SaasAuthService {


  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const login = {
      email: email,
      password: password,
    };

    // SaaS admins login über employee route
    return this.http.post<LoginResponseDTO>(`${API_BASE}/employee/login`, login);
  }
}
