import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Country } from 'src/app/models/country';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notification/notification.service';
import { CrudService } from '../generic-service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends CrudService<Country, string>{
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  // constructor(private http: HttpClient,
  //   private notificationService: NotificationService) { }

  // fetchAllCountries(): Observable<any> {
  //   return this.http.get(environment.baseUrl + "Country");
  // }

  // saveCountry(country: Country): Observable<any> {
  //   return this.http.post<any>(environment.baseUrl + "Country/AddCountry/",
  //     country, this.httpOptions)
  //     .pipe(
  //       map(() => {
  //         const countryObj = new Country();
  //         if (countryObj.Id != null || countryObj.Id != "")
  //           this.notificationService.showSuccess("Country added successfully !!!", "Success");
  //         return countryObj;
  //       }))
  //     .pipe(catchError(err => {
  //       this.notificationService.showError(err.error, "Error");
  //       const error = err.error?.error_description || err.error?.message || err.statusText;
  //       return throwError(error);
  //     }));
  // }

  // updateCountry(country: Country): Observable<any> {
  //   return this.http.put<any>(environment.baseUrl + "Country/UpdateCountry/",
  //     country, this.httpOptions)
  //     .pipe(
  //       map(() => {
  //         const countryObj = new Country();
  //         if (countryObj.Id != null || countryObj.Id != "")
  //           this.notificationService.showSuccess("Country updated successfully !!!", "Success");
  //         return countryObj;
  //       }))
  //     .pipe(catchError(err => {
  //       this.notificationService.showError(err.error, "Error");
  //       const error = err.error?.error_description || err.error?.message || err.statusText;
  //       return throwError(error);
  //     }));
  // }

  // deleteCountry(id: string): Observable<any> {
  //   return this.http.delete<any>(environment.baseUrl + 'Country/DeleteCountry/' + id)
  //     .pipe(
  //       map(() => {
  //         this.notificationService.showSuccess("Country deleted successfully !!!", "Success");
  //       }))
  //     .pipe(catchError(err => {
  //       this.notificationService.showError(err.error, "Error");
  //       const error = err.error?.error_description || err.error?.message || err.statusText;
  //       return throwError(error);
  //     }));
  // }

  // uploadCountry(form: FormData) {
  //   return this.http.post<any>(environment.baseUrl + "County/UploadCountry",
  //     form).
  //     pipe(
  //       map((res: any) => {
  //         if (res == 200)
  //           this.notificationService.showSuccess("Country uploaded successfully !!!", "Success");
  //       }))
  //     .pipe(catchError(err => {
  //       this.notificationService.showError(err.error, "Error");
  //       const error = err.error?.error_description || err.error?.message || err.statusText;
  //       return throwError(error);
  //     }));
  // }

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/country`);
  }
  getCountryBasedOnArea(areaName: string) {
    return this._http.post<Country>(environment.baseUrl + '/country/getCountryBasedOnArea?areaName=' + areaName, this.httpOptions);
  }
}