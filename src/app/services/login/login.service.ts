import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseUrl } from '../../commonMethods/httpBaseUrl';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getAllLanguage() {
    return [
      { label: 'English', value: 'en' },
      { label: 'Hindi', value: 'hi' },
      { label: 'Urdu', value: 'ur' },
      { label: 'Poland', value: 'po' }
    ]
  }

  authenicateUser(login: any): Observable<any> {
    return this.http.post<any>(HttpBaseUrl.getHttpBaseUrl() + "Authorize", login);
  }
}
