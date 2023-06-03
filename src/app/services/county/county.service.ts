import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Country } from 'src/app/models/country';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notification/notification.service';
import { County } from 'src/app/models/county';
import { CrudService } from '../generic-service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CountyService extends CrudService<County, string> {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  // constructor(private http: HttpClient,
  //   private notificationService: NotificationService) { }

  // getAllCounties(): Observable<any> {
  //   return this.http.get(environment.baseUrl + "County");
  // }

  // saveCounty(county: County): Observable<any> {
  //   return this.http.post<any>(environment.baseUrl + "County/AddCounty/",
  //     county, this.httpOptions)
  //     .pipe(
  //       map(() => {
  //         const countryObj = new Country();
  //         if (countryObj.Id != null || countryObj.Id != "")
  //           this.notificationService.showSuccess("County added successfully !!!", "Success");
  //         return countryObj;
  //       }))
  //     .pipe(catchError(err => {
  //       this.notificationService.showError(err.error, "Error");
  //       const error = err.error?.error_description || err.error?.message || err.statusText;
  //       return throwError(error);
  //     }));
  // }

  // updateCounty(county: County): Observable<any> {
  //   return this.http.put<any>(environment.baseUrl + "County/UpdateCounty/",
  //     county, this.httpOptions)
  //     .pipe(
  //       map(() => {
  //         const countyObj = new County();
  //         if (countyObj.Id != null || countyObj.Id != "")
  //           this.notificationService.showSuccess("County updated successfully !!!", "Success");
  //         return countyObj;
  //       }))
  //     .pipe(catchError(err => {
  //       this.notificationService.showError(err.error, "Error");
  //       const error = err.error?.error_description || err.error?.message || err.statusText;
  //       return throwError(error);
  //     }));
  // }

  // uploadCounty(form: FormData) {
  //   return this.http.post<any>(environment.baseUrl + "County/UploadCounty",
  //     form).
  //     pipe(
  //       map((res: any) => {
  //         if (res == 200)
  //           this.notificationService.showSuccess("County updated successfully !!!", "Success");
  //       }))
  //     .pipe(catchError(err => {
  //       this.notificationService.showError(err.error, "Error");
  //       const error = err.error?.error_description || err.error?.message || err.statusText;
  //       return throwError(error);
  //     }));
  // }

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/county`);
  }

  getCountyBasedOnArea(id: any) {
    return this._http.post<any>(environment.baseUrl + '/county/getCountyBasedOnArea?id=' + id, this.httpOptions);
  }
}
