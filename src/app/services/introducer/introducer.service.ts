import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Introducer } from 'src/app/models/introducer';
import { environment } from 'src/environments/environment';
import { CrudService } from '../generic-service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class IntroducerService extends CrudService<Introducer, string> {

  // constructor(private http: HttpClient) { }

  // getAllIntroducer(): Observable<Introducer> {
  //   return this.http.get<Introducer>(environment.baseUrl + "Introducer");
  // }
  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.baseUrl}/introducer`)
  }
}
