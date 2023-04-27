import { Observable, catchError, retry, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudOperations } from 'src/app/interface/crud-operation';
import { NotificationService } from '../notification/notification.service';

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {

  constructor(protected _http: HttpClient,
    protected _base: string) { }

  save(t: T): Observable<T> {
    return this._http
      .post<T>(this._base, t);
    // return this._http
    //   .post<T>(this._base, t)
    //   .pipe(retry(1), catchError(this.handleError));
  }

  update(id: ID, t: T): Observable<T> {
    return this._http
      .put<T>(this._base + "/" + id, t, {});
    // return this._http
    //   .put<T>(this._base + "/" + id, t, {})
    //   .pipe(retry(1), catchError(this.handleError));
  }

  findOne(id: ID): Observable<T> {
    return this._http
      .get<T>(this._base + "/" + id);
    // return this._http
    //   .get<T>(this._base + "/" + id)
    //   .pipe(retry(1), catchError(this.handleError));
  }

  findAll(): Observable<T[]> {
    return this._http
      .get<T[]>(this._base);
    // return this._http
    //   .get<T[]>(this._base)
    //   .pipe(retry(1), catchError(this.handleError));
  }

  delete(id: ID): Observable<T> {
    return this._http
      .delete<T>(this._base + '/' + id);
  }

  deleteAll(): Observable<any> {
    return this._http.delete<any>(this._base + '/deleteall');
  }

  upload(data: FormData): Observable<T> {
    return this._http.post<T>(this._base + '/upload', data);
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
