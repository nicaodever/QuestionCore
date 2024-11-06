import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {shareReplay, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {CookieService} from './cookie.service';

import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import {Moment} from 'moment';

export interface JwtToken {
  access: string;
  refresh: string;
}

export interface JwtDecodeToken {
  user: User;
  exp: number;
  jti: string;
  token_type: string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService) {
  }

  // tslint:disable-next-line:typedef
  login(username: string, password: string) {
    const url = `${environment.urlBase}/api/token/`;
    const data = {username, password};

    return this.http.post<JwtToken>(url, data)
      .pipe(
        tap(response => this._setSession(response)),
        shareReplay(),
      );
  }

  // tslint:disable-next-line:typedef
  refreshToken() {
    const token = this._refreshToken();
    if (!token) {
      this.logout();
      return;
    }

    const url = `${environment.urlBase}/api/refresh_token/`;
    const data = {refresh: token};

    this.http.post<JwtToken>(url, data)
      .pipe(
        tap(response => this._setToken(response)),
        shareReplay(),
      ).subscribe();
  }

  // tslint:disable-next-line:typedef
  logout(goToLogin: boolean = true) {
    this.cookieService.del('token');
    this.cookieService.del('refreshToken');

    if (goToLogin) {
      this.router.navigate(['login']).then();
    }
  }

  get user(): User | null {
    const payload = this._decodeToken();
    return payload ? payload.user : null;
  }

  get token(): string {
    return this.cookieService.get('token');
  }

  // tslint:disable-next-line:typedef
  isLoggedIn() {
    return moment().isBefore(this._expiration());
  }


  _refreshToken(): string {
    return this.cookieService.get('refreshToken');
  }

  // tslint:disable-next-line:typedef
  _setToken(jwtToken: JwtToken) {
    this.cookieService.set('token', jwtToken.access);
  }

  // tslint:disable-next-line:typedef
  _setSession(jwtToken: JwtToken) {
    this.cookieService.set('token', jwtToken.access);
    this.cookieService.set('refreshToken', jwtToken.refresh);
  }

  _decodeToken(): JwtDecodeToken {
    const token = this.token;
    return token ? jwt_decode(this.token) as JwtDecodeToken : null;
  }

  _expiration(): Moment | null {
    const payload = this._decodeToken();
    return payload ? moment.unix(payload.exp) : null;
  }
}
