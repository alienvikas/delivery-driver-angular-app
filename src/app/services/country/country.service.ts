import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpBaseUrl } from '../../commonMethods/httpBaseUrl';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient) { }

  fetchAllCountries() {
    return this.http.get(HttpBaseUrl.getHttpBaseUrl() + "Country");
  }
}
