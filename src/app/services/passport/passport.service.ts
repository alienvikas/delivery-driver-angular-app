import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notification/notification.service';
import { Passport } from 'src/app/models/passport';
import { CrudService } from '../generic-service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class PassportService extends CrudService<Passport, string> {
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
  // constructor(private http: HttpClient,
  //   private notificationService: NotificationService) { }

  // getAllPassport(): Observable<any> {
  //   return this.http.get(environment.baseUrl + "Passport");
  // }

  // savePassport(form: Passport): Observable<any> {
  //   return this.http.post<any>(environment.baseUrl + "Passport/AddPassport/",
  //   form, this.httpOptions)
  //   .pipe(
  //     map(() => {
  //       const passportObj = new Passport();
  //       if (passportObj.Id != null || passportObj.Id != "")
  //         this.notificationService.showSuccess("Passport added successfully !!!", "Success");
  //       return passportObj;
  //     }))
  //   .pipe(catchError(err => {
  //     this.notificationService.showError(err.error, "Error");
  //     const error = err.error?.error_description || err.error?.message || err.statusText;
  //     return throwError(error);
  //   }));
  // }

  // uploadPassportList(form: FormData) {
  //   return this.http.post<any>(environment.baseUrl + "Passport/UploadPassportList",
  //     form).
  //     pipe(
  //       map((res: any) => {
  //         if (res == 200)
  //           this.notificationService.showSuccess("Passport list uploaded successfully !!!", "Success");
  //       }))
  //     .pipe(catchError(err => {
  //       this.notificationService.showError(err.error, "Error");
  //       const error = err.error?.error_description || err.error?.message || err.statusText;
  //       return throwError(error);
  //     }));
  // }

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/passport`)
  }
}
