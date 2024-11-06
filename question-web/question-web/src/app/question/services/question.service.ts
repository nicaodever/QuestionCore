import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Question} from '../models/question';
import {catchError} from 'rxjs/operators';
import {from} from 'rxjs';

@Injectable()
export class QuestionService {
  private url = `${environment.urlBase}/api/pools/`;

  constructor(private http: HttpClient) {
  }


  // tslint:disable-next-line:typedef
  all() {
    return this.http.get<Question[]>(this.url);
  }

  // tslint:disable-next-line:typedef
  create(obj: Question) {
    return this.http.post<Question[]>(this.url, obj)
      .pipe(catchError(err => from([])));
  }

  // tslint:disable-next-line:typedef
  update(pk: number, obj: Question) {
    return this.http.put<Question[]>(`${this.url}${obj.id}/`, obj)
      .pipe(catchError(err => from([])));
  }

  // tslint:disable-next-line:typedef
  delete(pk: number) {
    return this.http.delete<Question[]>(`${this.url}${pk}/`)
      .pipe(catchError(err => from([])));
  }
}
