import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  cookieStore: any = {};

  constructor() {
    this.parseCookies(document.cookie);
  }

  // tslint:disable-next-line:typedef
  parseCookies(cookies = document.cookie) {
    this.cookieStore = {};
    if (!!cookies === false) {
      return;
    }
    cookies
      .split(';')
      .forEach(c => {
        const cookieArr = c.split('=');
        this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
      });
  }

  // tslint:disable-next-line:typedef
  get(key: string) {
    this.parseCookies();
    return !!this.cookieStore[key] ? this.cookieStore[key] : null;
  }

  // tslint:disable-next-line:typedef
  del(key: string) {
    document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
  }

  // tslint:disable-next-line:typedef
  set(key: string, value: string) {
    document.cookie = key + '=' + (value || '');
  }
}
