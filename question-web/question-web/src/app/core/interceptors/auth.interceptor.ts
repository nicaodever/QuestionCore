import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private toast: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url: req.url,
      setHeaders: {Authorization: `Bearer ${this.authService.token}`}
    });

    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401 || err.status === 403) {
        this.authService.logout();
      }
      this.toast.error(`[${err.statusText}]: ${JSON.stringify(err.error)}`);

      return throwError(err.error);
    }));
  }
}
