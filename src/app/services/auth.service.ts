import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { AuthModel } from '@models/auth.model';
import { User } from '@models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  apiUrl = environment.API_URL;
  user$ = new BehaviorSubject<User | null>(null);

  constructor() {}

  login(email: string, password: string) {
    return this.http
      .post<AuthModel>(`${this.apiUrl}/api/v1/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          const token = response.access_token;
          this.tokenService.saveToken(token);
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {
      name,
      email,
      password,
    });
  }

  registerAndLogin(name: string, email: string, password: string) {
    return this.register(name, email, password).pipe(
      switchMap(() => this.login(email, password))
    );
  }

  isAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(
      `${this.apiUrl}/api/v1/auth/is-available`,
      {
        email,
      }
    );
  }

  recovery(email: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/recovery`, {
      email,
    });
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`, {
      token,
      newPassword,
    });
  }

  logout() {
    this.tokenService.removeToken();
  }

  getProfile() {
    return this.http
      .get<User>(`${this.apiUrl}/api/v1/auth/profile`, {
        headers: {
          Authorization: `Bearer ${this.tokenService.getToken()}`,
        },
      })
      .pipe(
        tap((user) => {
          this.user$.next(user);
        })
      );
  }

  getDataUser() {
    return this.user$.getValue();
  }
}
