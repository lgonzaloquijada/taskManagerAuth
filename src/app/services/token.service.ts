import { Injectable } from '@angular/core';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string): void {
    //localStorage.setItem('token', token);
    setCookie('token', token, { expires: 1, path: '/' });
  }

  getToken() {
    //return localStorage.getItem('token') || '';
    return getCookie('token');
  }

  removeToken(): void {
    //localStorage.removeItem('token');
    removeCookie('token');
  }

  isValidToken(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (decodedToken && decodedToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodedToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
