import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private tokenService = inject(TokenService);
  private router = inject(Router);

  canActivate() {
    const isValidToken = this.tokenService.isValidToken();
    if (!isValidToken) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
