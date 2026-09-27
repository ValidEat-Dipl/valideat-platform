import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginResponseDTO } from '../../admin/models/LoginResponseDTO';

import { API_BASE } from '../../../api.config';

@Injectable({ providedIn: 'root' })
export class RestaurantAuthService {
    private http = inject(HttpClient);

  login(email: string, password: string) {
    let data = {
      email: email,
      password: password,
    };

    return this.http.post<LoginResponseDTO>(`${API_BASE}/restaurantUser/login`, data);
  }
}
