import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Country } from 'src/app/models/country';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  fetchAllCountries() {
    return this.http.get(environment.baseUrl + "Country");
  }

  saveCountry(country: Country): Observable<any> {
    return this.http.post<any>(environment.baseUrl + "Country/AddCountry/",
    country, this.httpOptions)
      .pipe(
        map(() => {
          const countryObj = new Country();
          return countryObj;
        }))
      .pipe(catchError(err => {
        const error = err.error?.error_description || err.error?.message || err.statusText;
        return throwError(error);
      }));
  }
}
