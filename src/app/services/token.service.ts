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

  saveRefreshToken(refreshToken: string): void {
    //localStorage.setItem('refreshToken', refreshToken);
    setCookie('refreshToken', refreshToken, { expires: 1, path: '/' });
  }

  getRefreshToken() {
    //return localStorage.getItem('refreshToken') || '';
    return getCookie('refreshToken');
  }

  removeRefreshToken(): void {
    //localStorage.removeItem('refreshToken');
    removeCookie('refreshToken');
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

  isValidRefreshToken(): boolean {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return false;
    }
    const decodedToken = jwtDecode<JwtPayload>(refreshToken);
    if (decodedToken && decodedToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodedToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
