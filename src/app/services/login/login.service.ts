import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { environment } from 'src/environments/environment';

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
    return this.http.post<any>(environment.baseUrl + "Authorize", login);
  }

  isLoggedIn() {
    return GlobalComponent.isloggedIn;
  }
}
