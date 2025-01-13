import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '@services/token.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private tokenService = inject(TokenService);

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TOKEN)) {
      return this.addToken(request, next);
    }
    return next.handle(request);
  }

  public addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const accesToken = this.tokenService.getToken();
    if (accesToken) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accesToken}`),
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
