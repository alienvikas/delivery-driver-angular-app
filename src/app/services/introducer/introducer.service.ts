import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Introducer } from 'src/app/models/introducer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntroducerService {

  constructor(private http: HttpClient) { }

  getAllIntroducer(): Observable<Introducer> {
    return this.http.get<Introducer>(environment.baseUrl + "Introducer");
  }
}
